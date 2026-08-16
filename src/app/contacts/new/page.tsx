import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentTenant } from "@/lib/tenant";
import { ContactForm } from "@/components/ContactForm";
import { createContact } from "../actions";

export default async function NewContactPage() {
  const tenant = await getCurrentTenant();
  const users = await prisma.user.findMany({
    where: { tenantId: tenant.id },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <Link href="/contacts" className="text-[12.5px] text-[var(--accent)] hover:underline">
        ← חזרה ללקוחות
      </Link>

      <h2 className="text-[19px]">ליד חדש</h2>

      <section className="card p-6">
        <ContactForm action={createContact} users={users} submitLabel="שמירת ליד" />
      </section>
    </>
  );
}
