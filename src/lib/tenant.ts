import { prisma } from "@/lib/prisma";
import { DEFAULT_STAGES, DEFAULT_TENANT_NAME } from "@/lib/default-stages";

/**
 * Single-tenant deployment today: every model already carries a tenantId,
 * so this is the one place that needs to change when a second tenant
 * shows up (swap for auth-derived tenant resolution).
 *
 * On an empty database this bootstraps the tenant and its default pipeline
 * so the app is usable immediately — a real business starts with no data,
 * and should never have to run the demo seed to get a working system.
 */
export async function getCurrentTenant() {
  const existing = await prisma.tenant.findFirst({ orderBy: { createdAt: "asc" } });
  if (existing) return existing;

  return prisma.$transaction(async (tx) => {
    // Re-check inside the transaction: two concurrent first requests would
    // otherwise each create a tenant.
    const raced = await tx.tenant.findFirst({ orderBy: { createdAt: "asc" } });
    if (raced) return raced;

    return tx.tenant.create({
      data: {
        name: DEFAULT_TENANT_NAME,
        stages: { create: DEFAULT_STAGES },
      },
    });
  });
}
