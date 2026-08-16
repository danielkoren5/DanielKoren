import { prisma } from "@/lib/prisma";

/**
 * Single-tenant deployment today: every model already carries a tenantId,
 * so this is the one place that needs to change when a second tenant
 * shows up (swap for auth-derived tenant resolution).
 */
export async function getCurrentTenant() {
  const tenant = await prisma.tenant.findFirst();
  if (!tenant) {
    throw new Error("No tenant found — run `npm run db:seed` first.");
  }
  return tenant;
}
