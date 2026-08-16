import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentTenant } from "@/lib/tenant";
import { formatCurrency, formatRelative, nowMs } from "@/lib/format";
import { IconMoney, IconCheck, IconUsers, IconChecklist, IconWhatsapp } from "@/components/icons";

export default async function DashboardPage() {
  const tenant = await getCurrentTenant();

  const stages = await prisma.stage.findMany({
    where: { tenantId: tenant.id },
    orderBy: { order: "asc" },
    include: { deals: true },
  });

  const openStages = stages.filter((s) => !s.isWon && !s.isLost);
  const openDeals = openStages.flatMap((s) => s.deals);
  const openValue = openDeals.reduce((sum, d) => sum + d.value, 0);

  const wonDeals = stages.filter((s) => s.isWon).flatMap((s) => s.deals);
  const wonValue = wonDeals.reduce((sum, d) => sum + d.value, 0);

  const [contactsCount, openTasksCount, recentActivities, upcomingTasks] = await Promise.all([
    prisma.contact.count({ where: { tenantId: tenant.id } }),
    prisma.task.count({ where: { tenantId: tenant.id, done: false } }),
    prisma.activity.findMany({
      where: { tenantId: tenant.id },
      orderBy: { occurredAt: "desc" },
      take: 5,
      include: { contact: true, deal: true },
    }),
    prisma.task.findMany({
      where: { tenantId: tenant.id, done: false },
      orderBy: { dueAt: "asc" },
      take: 5,
      include: { assignee: true, deal: true, contact: true },
    }),
  ]);

  const maxStageValue = Math.max(...stages.map((s) => s.deals.reduce((sum, d) => sum + d.value, 0)), 1);
  const now = nowMs();

  return (
    <>
      <section>
        <h2 className="text-[19px] mb-3.5">סקירה כללית</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <StatTile
            icon={<IconMoney className="w-4 h-4" />}
            iconBg="var(--accent-soft)"
            iconColor="var(--accent-ink)"
            label="שווי צנרת פתוחה"
            value={formatCurrency(openValue)}
            sub={`${openDeals.length} עסקאות פתוחות`}
          />
          <StatTile
            icon={<IconCheck className="w-4 h-4" />}
            iconBg="var(--success-soft)"
            iconColor="var(--success)"
            label="עסקאות שנסגרו בזכייה"
            value={String(wonDeals.length)}
            sub={formatCurrency(wonValue)}
          />
          <StatTile
            icon={<IconUsers className="w-4 h-4" />}
            iconBg="var(--teal-soft)"
            iconColor="var(--teal)"
            label="לקוחות במערכת"
            value={String(contactsCount)}
            sub="כולל אנשי קשר וחברות"
          />
          <StatTile
            icon={<IconChecklist className="w-4 h-4" />}
            iconBg="var(--violet-soft)"
            iconColor="var(--violet)"
            label="משימות פתוחות"
            value={String(openTasksCount)}
            sub="ממתינות לטיפול"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 items-start">
        <div className="card">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[var(--border)]">
            <h3 className="text-[15.5px]">צנרת עסקאות</h3>
            <Link href="/pipeline" className="ms-auto text-[12.5px] text-[var(--accent)] hover:underline">
              לצפייה מלאה →
            </Link>
          </div>
          <div className="p-5 flex flex-col gap-3">
            {stages.map((stage) => {
              const value = stage.deals.reduce((sum, d) => sum + d.value, 0);
              const pct = Math.max((value / maxStageValue) * 100, value > 0 ? 4 : 0);
              return (
                <div key={stage.id} className="flex items-center gap-3">
                  <div className="w-32 shrink-0 text-[12.5px] font-medium text-[var(--text-muted)] truncate">
                    {stage.name}
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: stage.isWon ? "var(--success)" : "var(--accent)",
                      }}
                    />
                  </div>
                  <div className="w-24 shrink-0 text-end text-[12.5px] font-semibold [font-variant-numeric:tabular-nums]">
                    {formatCurrency(value)}
                  </div>
                  <div className="w-8 shrink-0 text-end text-[11px] text-[var(--text-faint)]">
                    {stage.deals.length}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[var(--border)]">
            <h3 className="text-[15.5px]">פעילות אחרונה</h3>
          </div>
          <div className="p-2 flex flex-col">
            {recentActivities.length === 0 && (
              <p className="text-[13px] text-[var(--text-faint)] px-3 py-4">אין עדיין פעילות רשומה.</p>
            )}
            {recentActivities.map((a) => (
              <div key={a.id} className="flex gap-2.5 px-3 py-2.5 rounded-[10px] hover:bg-[var(--surface-2)]">
                <div className="w-7 h-7 rounded-full bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center shrink-0 text-[var(--teal)]">
                  <IconWhatsapp className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-medium truncate">{a.summary}</p>
                  <p className="text-[11px] text-[var(--text-faint)] mt-0.5">
                    {a.contact?.name ?? a.deal?.title} · {formatRelative(a.occurredAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[var(--border)]">
          <h3 className="text-[15.5px]">משימות קרובות</h3>
          <Link href="/tasks" className="ms-auto text-[12.5px] text-[var(--accent)] hover:underline">
            לכל המשימות →
          </Link>
        </div>
        <div className="p-2 flex flex-col">
          {upcomingTasks.length === 0 && (
            <p className="text-[13px] text-[var(--text-faint)] px-3 py-4">אין משימות פתוחות כרגע.</p>
          )}
          {upcomingTasks.map((t) => {
            const overdue = t.dueAt && t.dueAt.getTime() < now;
            return (
              <div key={t.id} className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-[var(--surface-2)]">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: overdue ? "var(--danger)" : "var(--accent)" }} />
                <p className="text-[13px] flex-1 min-w-0 truncate">{t.title}</p>
                <span className="mini-avatar">{t.assignee?.initials ?? "?"}</span>
                {t.dueAt && (
                  <span className={`text-[11px] ${overdue ? "text-[var(--danger)]" : "text-[var(--text-faint)]"} shrink-0`}>
                    {overdue ? "באיחור" : "יעד"} · {t.dueAt.toLocaleDateString("he-IL")}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function StatTile({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="card p-[18px_18px_16px] flex flex-col gap-2.5">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[12.5px] text-[var(--text-muted)] font-semibold">{label}</span>
        <span
          className="w-[30px] h-[30px] rounded-[9px] flex items-center justify-center shrink-0"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </span>
      </div>
      <div className="font-display font-extrabold text-[25px] [letter-spacing:-0.01em] [font-variant-numeric:tabular-nums]">
        {value}
      </div>
      <div className="text-[12px] text-[var(--text-faint)]">{sub}</div>
    </div>
  );
}
