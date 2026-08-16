"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentTenant } from "@/lib/tenant";

export async function createDeal(formData: FormData) {
  const tenant = await getCurrentTenant();
  const title = String(formData.get("title") ?? "").trim();
  const contactId = String(formData.get("contactId") ?? "");
  const stageId = String(formData.get("stageId") ?? "");
  const value = Number(formData.get("value") ?? 0);
  const ownerId = String(formData.get("ownerId") ?? "") || null;
  const engagementType = String(formData.get("engagementType") ?? "") || null;

  if (!title || !contactId || !stageId) {
    throw new Error("שם העסקה, לקוח ושלב הם שדות חובה");
  }

  await prisma.deal.create({
    data: {
      tenantId: tenant.id,
      title,
      contactId,
      stageId,
      value: Number.isFinite(value) ? Math.round(value) : 0,
      ownerId,
      engagementType,
    },
  });

  revalidatePath("/pipeline");
  revalidatePath("/");
}

export async function moveDealStage(formData: FormData) {
  const dealId = String(formData.get("dealId") ?? "");
  const stageId = String(formData.get("stageId") ?? "");
  if (!dealId || !stageId) return;

  const stage = await prisma.stage.findUnique({ where: { id: stageId } });

  await prisma.deal.update({
    where: { id: dealId },
    data: {
      stageId,
      stageEnteredAt: new Date(),
      closedAt: stage?.isWon || stage?.isLost ? new Date() : null,
    },
  });

  revalidatePath("/pipeline");
  revalidatePath("/");
}
