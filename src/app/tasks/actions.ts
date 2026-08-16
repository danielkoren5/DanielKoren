"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentTenant } from "@/lib/tenant";

export async function createTask(formData: FormData) {
  const tenant = await getCurrentTenant();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("כותרת המשימה היא שדה חובה");

  const dueRaw = String(formData.get("dueAt") ?? "");
  const assigneeId = String(formData.get("assigneeId") ?? "") || null;
  const contactId = String(formData.get("contactId") ?? "") || null;

  await prisma.task.create({
    data: {
      tenantId: tenant.id,
      title,
      dueAt: dueRaw ? new Date(dueRaw) : null,
      assigneeId,
      contactId,
    },
  });

  revalidatePath("/tasks");
  revalidatePath("/");
}

export async function setTaskDone(formData: FormData) {
  const taskId = String(formData.get("taskId") ?? "");
  const done = String(formData.get("done") ?? "") === "true";
  if (!taskId) return;

  await prisma.task.update({ where: { id: taskId }, data: { done } });

  revalidatePath("/tasks");
  revalidatePath("/");
}
