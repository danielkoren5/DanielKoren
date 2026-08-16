"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentTenant } from "@/lib/tenant";

export async function createContact(formData: FormData) {
  const tenant = await getCurrentTenant();
  const name = text(formData.get("name"));
  if (!name) {
    throw new Error("שם הליד הוא שדה חובה");
  }

  const fields = leadFieldsFrom(formData);

  const contact = await prisma.contact.create({
    data: {
      tenantId: tenant.id,
      name,
      ...fields,
      // Handing a lead to an owner is what "תאריך העברה" records, so it is
      // stamped automatically the moment an owner is set — without
      // overriding a date the user entered explicitly.
      handedOverAt: fields.handedOverAt ?? (fields.ownerId ? new Date() : null),
    },
  });

  revalidatePath("/contacts");
  redirect(`/contacts/${contact.id}`);
}

export async function updateContact(formData: FormData) {
  const contactId = text(formData.get("contactId"));
  if (!contactId) return;

  const name = text(formData.get("name"));
  if (!name) {
    throw new Error("שם הליד הוא שדה חובה");
  }

  const existing = await prisma.contact.findUnique({
    where: { id: contactId },
    select: { ownerId: true, handedOverAt: true },
  });
  if (!existing) return;

  const fields = leadFieldsFrom(formData);
  const ownerJustAssigned = fields.ownerId && fields.ownerId !== existing.ownerId;

  await prisma.contact.update({
    where: { id: contactId },
    data: {
      name,
      ...fields,
      handedOverAt:
        fields.handedOverAt ??
        (ownerJustAssigned ? new Date() : existing.handedOverAt),
    },
  });

  revalidatePath(`/contacts/${contactId}`);
  revalidatePath("/contacts");
  redirect(`/contacts/${contactId}`);
}

export async function addActivity(formData: FormData) {
  const tenant = await getCurrentTenant();
  const contactId = text(formData.get("contactId"));
  const summary = text(formData.get("summary"));
  const type = text(formData.get("type")) ?? "note";
  if (!contactId || !summary) return;

  await prisma.activity.create({
    data: { tenantId: tenant.id, contactId, type, summary },
  });

  revalidatePath(`/contacts/${contactId}`);
}

/** Every editable contact field except the name, shared by create and update. */
function leadFieldsFrom(formData: FormData) {
  return {
    company: text(formData.get("company")),
    role: text(formData.get("role")),
    phone: text(formData.get("phone")),
    email: text(formData.get("email")),

    taxId: text(formData.get("taxId")),
    address: text(formData.get("address")),
    city: text(formData.get("city")),
    billingAddress: text(formData.get("billingAddress")),
    billingCity: text(formData.get("billingCity")),

    source: text(formData.get("source")) ?? "ידני",
    temperature: text(formData.get("temperature")),
    leadType: text(formData.get("leadType")),
    status: text(formData.get("status")) ?? "חדש",
    inquiredAt: date(formData.get("inquiredAt")),
    handedOverAt: date(formData.get("handedOverAt")),
    ownerId: text(formData.get("ownerId")),
  };
}

/** Trims, and treats a blank field as "not provided" rather than "". */
function text(value: FormDataEntryValue | null) {
  const str = String(value ?? "").trim();
  return str.length > 0 ? str : null;
}

function date(value: FormDataEntryValue | null) {
  const str = text(value);
  if (!str) return null;
  const parsed = new Date(str);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}
