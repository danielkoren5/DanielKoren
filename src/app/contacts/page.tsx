import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentTenant } from "@/lib/tenant";
import { formatCurrency, tagChipClass } from "@/lib/format";
import { LEAD_STATUSES, statusChipClass } from "@/lib/lead-options";
import { Temperature } from "@/components/Temperature";
import { IconPlus } from "@/components/icons";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const tenant = await getCurrentTenant();

  const activeStatus = LEAD_STATUSES.find((s) => s === status);

  const contacts = await prisma.contact.findMany({
    where: {
      tenantId: tenant.id,
      ...(activeStatus ? { status: activeStatus } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      tags: true,
      owner: true,
      deals: { include: { stage: true } },
    },
  });

  const counts = await prisma.contact.groupBy({
    by: ["status"],
    where: { tenantId: tenant.id },
    _count: true,
  });
  const countFor = (s: string) => counts.find((c) => c.status === s)?._count ?? 0;
  const total = counts.reduce((sum, c) => sum + c._count, 0);

  return (
    <>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-[19px]">לקוחות ולידים</h2>
        <Link href="/contacts/new" className="btn-primary inline-flex items-center gap-1.5">
          <IconPlus className="w-4 h-4" />
          ליד חדש
        </Link>
      </div>

      <nav className="flex gap-1.5 flex-wrap" aria-label="סינון לפי סטטוס">
        <FilterChip href="/contacts" label="הכל" count={total} active={!activeStatus} />
        {LEAD_STATUSES.map((s) => (
          <FilterChip
            key={s}
            href={`/contacts?status=${encodeURIComponent(s)}`}
            label={s}
            count={countFor(s)}
            active={activeStatus === s}
          />
        ))}
      </nav>

      <section className="card overflow-x-auto">
        {contacts.length === 0 ? (
          <p className="text-[13px] text-[var(--text-faint)] px-5 py-8 text-center">
            {activeStatus ? `אין לידים בסטטוס "${activeStatus}".` : "עדיין אין לידים במערכת."}{" "}
            <Link href="/contacts/new" className="text-[var(--accent)] hover:underline">
              להוספת ליד חדש
            </Link>
          </p>
        ) : (
          <table className="w-full text-[13px] border-collapse min-w-[900px]">
            <thead>
              <tr className="text-[12px] text-[var(--text-faint)] border-b border-[var(--border)]">
                <Th>שם</Th>
                <Th>חברה / תפקיד</Th>
                <Th>סטטוס</Th>
                <Th>טמפרטורה</Th>
                <Th>סוג / מקור</Th>
                <Th>עיר</Th>
                <Th>אחראי</Th>
                <Th>פניה</Th>
                <Th className="text-end">שווי פתוח</Th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => {
                const openDeals = c.deals.filter((d) => !d.stage.isWon && !d.stage.isLost);
                const openValue = openDeals.reduce((sum, d) => sum + d.value, 0);
                return (
                  <tr
                    key={c.id}
                    className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-2)]"
                  >
                    <Td>
                      <Link href={`/contacts/${c.id}`} className="font-semibold hover:underline">
                        {c.name}
                      </Link>
                      {c.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap mt-1">
                          {c.tags.map((t) => (
                            <span key={t.id} className={tagChipClass(t.color)}>
                              {t.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </Td>
                    <Td className="text-[var(--text-muted)]">
                      {c.company ?? "—"}
                      {c.role && <span className="text-[var(--text-faint)]"> · {c.role}</span>}
                    </Td>
                    <Td>
                      <span className={statusChipClass(c.status)}>{c.status}</span>
                    </Td>
                    <Td>
                      <Temperature value={c.temperature} />
                    </Td>
                    <Td className="text-[var(--text-muted)]">
                      {c.leadType ?? "—"}
                      <div className="text-[11px] text-[var(--text-faint)]">{c.source}</div>
                    </Td>
                    <Td className="text-[var(--text-muted)]">{c.city ?? "—"}</Td>
                    <Td className="text-[var(--text-muted)]">{c.owner?.name ?? "—"}</Td>
                    <Td className="text-[var(--text-muted)] whitespace-nowrap">
                      {c.inquiredAt ? c.inquiredAt.toLocaleDateString("he-IL") : "—"}
                    </Td>
                    <Td className="text-end font-semibold [font-variant-numeric:tabular-nums]">
                      {openValue > 0 ? formatCurrency(openValue) : "—"}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={`text-start font-semibold px-4 py-3 ${className}`}>{children}</th>;
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}

function FilterChip({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link href={href} className={`filter-chip ${active ? "is-active" : ""}`}>
      {label}
      <span className="count"> {count}</span>
    </Link>
  );
}
