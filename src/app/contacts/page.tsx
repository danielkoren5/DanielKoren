import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentTenant } from "@/lib/tenant";
import { formatCurrency } from "@/lib/format";
import { tagChipClass } from "@/lib/format";
import { createContact } from "./actions";

export default async function ContactsPage() {
  const tenant = await getCurrentTenant();
  const contacts = await prisma.contact.findMany({
    where: { tenantId: tenant.id },
    orderBy: { name: "asc" },
    include: {
      tags: true,
      deals: { include: { stage: true } },
    },
  });

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[19px]">לקוחות</h2>
        <span className="text-[12.5px] text-[var(--text-faint)]">{contacts.length} לקוחות במערכת</span>
      </div>

      <section className="card p-5">
        <h3 className="text-[14px] mb-3">הוספת לקוח חדש</h3>
        <form action={createContact} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <input name="name" required placeholder="שם *" className="field" />
          <input name="company" placeholder="חברה" className="field" />
          <input name="role" placeholder="תפקיד" className="field" />
          <input name="phone" placeholder="טלפון" className="field" />
          <div className="flex gap-2">
            <input name="email" type="email" placeholder="אימייל" className="field flex-1" />
            <button type="submit" className="btn-primary">
              הוספה
            </button>
          </div>
        </form>
      </section>

      <section className="card overflow-x-auto">
        <table className="w-full text-[13px] border-collapse min-w-[720px]">
          <thead>
            <tr className="text-start text-[12px] text-[var(--text-faint)] border-b border-[var(--border)]">
              <th className="text-start font-semibold px-5 py-3">שם</th>
              <th className="text-start font-semibold px-5 py-3">חברה / תפקיד</th>
              <th className="text-start font-semibold px-5 py-3">תגיות</th>
              <th className="text-start font-semibold px-5 py-3">עסקאות פתוחות</th>
              <th className="text-end font-semibold px-5 py-3">שווי פתוח</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => {
              const openDeals = c.deals.filter((d) => !d.stage.isWon && !d.stage.isLost);
              const openValue = openDeals.reduce((sum, d) => sum + d.value, 0);
              return (
                <tr key={c.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-2)]">
                  <td className="px-5 py-3">
                    <Link href={`/contacts/${c.id}`} className="font-semibold hover:underline">
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[var(--text-muted)]">
                    {c.company}
                    {c.role && <span className="text-[var(--text-faint)]"> · {c.role}</span>}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5 flex-wrap">
                      {c.tags.map((t) => (
                        <span key={t.id} className={tagChipClass(t.color)}>
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[var(--text-muted)]">{openDeals.length}</td>
                  <td className="px-5 py-3 text-end font-semibold [font-variant-numeric:tabular-nums]">
                    {openValue > 0 ? formatCurrency(openValue) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}
