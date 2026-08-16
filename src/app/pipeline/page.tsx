import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentTenant } from "@/lib/tenant";
import { formatCurrency } from "@/lib/format";
import { createDeal } from "./actions";
import { StageSelect } from "./StageSelect";

export default async function PipelinePage() {
  const tenant = await getCurrentTenant();

  const [stages, contacts, users] = await Promise.all([
    prisma.stage.findMany({
      where: { tenantId: tenant.id },
      orderBy: { order: "asc" },
      include: {
        deals: {
          orderBy: { createdAt: "desc" },
          include: { contact: true, owner: true },
        },
      },
    }),
    prisma.contact.findMany({ where: { tenantId: tenant.id }, orderBy: { name: "asc" } }),
    prisma.user.findMany({ where: { tenantId: tenant.id }, orderBy: { name: "asc" } }),
  ]);

  const totalOpen = stages
    .filter((s) => !s.isWon && !s.isLost)
    .flatMap((s) => s.deals)
    .reduce((sum, d) => sum + d.value, 0);
  const totalOpenCount = stages
    .filter((s) => !s.isWon && !s.isLost)
    .reduce((sum, s) => sum + s.deals.length, 0);

  const stageOptions = stages.map((s) => ({ id: s.id, name: s.name }));

  return (
    <>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-[19px]">צנרת עסקאות</h2>
        <span className="text-[12.5px] text-[var(--text-faint)]">
          {totalOpenCount} עסקאות פתוחות · {formatCurrency(totalOpen)}
        </span>
      </div>

      <section className="card p-5">
        <h3 className="text-[14px] mb-3">עסקה חדשה</h3>
        {contacts.length === 0 ? (
          <p className="text-[13px] text-[var(--text-faint)]">
            צריך קודם{" "}
            <Link href="/contacts" className="text-[var(--accent)] hover:underline">
              להוסיף לקוח
            </Link>{" "}
            לפני יצירת עסקה.
          </p>
        ) : (
          <form action={createDeal} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <input name="title" required placeholder="שם העסקה *" className="field lg:col-span-2" />
            <select name="contactId" required className="field" defaultValue="">
              <option value="" disabled>
                לקוח *
              </option>
              {contacts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <select name="stageId" required className="field" defaultValue={stages[0]?.id ?? ""}>
              {stages.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <input name="value" type="number" min="0" placeholder="שווי (₪)" className="field" />
            <div className="flex gap-2">
              <select name="ownerId" className="field flex-1" defaultValue="">
                <option value="">בעלים</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn-primary">
                יצירה
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-[900px]">
          {stages.map((stage) => {
            const stageValue = stage.deals.reduce((sum, d) => sum + d.value, 0);
            return (
              <div key={stage.id} className="flex-1 min-w-[190px] flex flex-col gap-2.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[12.5px] font-bold text-[var(--text-muted)]">{stage.name}</span>
                  <span className="text-[11px] text-[var(--text-faint)] bg-[var(--surface-2)] px-1.5 py-0.5 rounded-full">
                    {stage.deals.length}
                  </span>
                </div>
                <div className="text-[11px] text-[var(--text-faint)] px-1 [font-variant-numeric:tabular-nums]">
                  {formatCurrency(stageValue)}
                </div>

                <div className="flex flex-col gap-2.5">
                  {stage.deals.map((deal) => (
                    <div key={deal.id} className="deal-card cursor-default">
                      <Link href={`/contacts/${deal.contactId}`} className="text-[13px] font-bold leading-snug hover:underline">
                        {deal.title}
                      </Link>
                      <div className="text-[14px] font-extrabold font-display [font-variant-numeric:tabular-nums]">
                        {formatCurrency(deal.value)}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] text-[var(--text-faint)] truncate">{deal.contact.name}</span>
                        {deal.owner && <span className="mini-avatar">{deal.owner.initials}</span>}
                      </div>
                      {deal.engagementType && (
                        <span className="chip chip-neutral self-start">{deal.engagementType}</span>
                      )}
                      <StageSelect dealId={deal.id} currentStageId={stage.id} stages={stageOptions} />
                    </div>
                  ))}
                  {stage.deals.length === 0 && (
                    <div className="border border-dashed border-[var(--border)] rounded-[10px] py-4 text-center text-[11.5px] text-[var(--text-faint)]">
                      אין עסקאות בשלב זה
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
