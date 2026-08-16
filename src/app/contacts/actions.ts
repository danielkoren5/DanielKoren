"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentTenant } from "@/lib/tenant";

export async function createContact(formData: FormData) {
  const tenant = await getCurrentTenant();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    throw new Error("שם הלקוח הוא שדה חובה");
  }

  const contact = await prisma.contact.create({
    data: {
      tenantId: tenant.id,
      name,
      company: emptyToNull(formData.get("company")),
      role: emptyToNull(formData.get("role")),
      phone: emptyToNull(formData.get("phone")),
      email: emptyToNull(formData.get("email")),
      source: "ידני",
    },
  });

  revalidatePath("/contacts");
  redirect(`/contacts/${contact.id}`);
}

export async function addActivity(formData: FormData) {
  const tenant = await getCurrentTenant();
  const contactId = String(formData.get("contactId") ?? "");
  const summary = String(formData.get("summary") ?? "").trim();
  const type = String(formData.get("type") ?? "note");
  if (!contactId || !summary) return;

  await prisma.activity.create({
    data: { tenantId: tenant.id, contactId, type, summary },
  });

  revalidatePath(`/contacts/${contactId}`);
}

function emptyToNull(value: FormDataEntryValue | null) {
  const str = String(value ?? "").trim();
  return str.length > 0 ? str : null;
}
