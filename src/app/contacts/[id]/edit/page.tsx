import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentTenant } from "@/lib/tenant";
import { ContactForm } from "@/components/ContactForm";
import { updateContact } from "../../actions";

export default async function EditContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tenant = await getCurrentTenant();

  const [contact, users] = await Promise.all([
    prisma.contact.findUnique({ where: { id } }),
    prisma.user.findMany({ where: { tenantId: tenant.id }, orderBy: { name: "asc" } }),
  ]);

  if (!contact) notFound();

  return (
    <>
      <Link href={`/contacts/${id}`} className="text-[12.5px] text-[var(--accent)] hover:underline">
        ← חזרה לכרטיס הלקוח
      </Link>

      <h2 className="text-[19px]">עריכת {contact.name}</h2>

      <section className="card p-6">
        <ContactForm
          action={updateContact}
          users={users}
          contact={contact}
          submitLabel="שמירת שינויים"
        />
      </section>
    </>
  );
}
