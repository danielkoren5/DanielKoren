import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, tagChipClass } from "@/lib/format";
import { addActivity } from "../actions";
import { IconWhatsapp, IconClock } from "@/components/icons";

const ACTIVITY_TYPE_LABEL: Record<string, string> = {
  whatsapp: "וואטסאפ",
  call: "שיחת טלפון",
  email: "אימייל",
  meeting: "פגישה",
  note: "הערה",
  stage_change: "שינוי שלב",
};

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contact = await prisma.contact.findUnique({
    where: { id },
    include: {
      tags: true,
      deals: { include: { stage: true }, orderBy: { createdAt: "desc" } },
      activities: { orderBy: { occurredAt: "desc" } },
      tasks: { where: { done: false }, orderBy: { dueAt: "asc" } },
    },
  });

  if (!contact) notFound();

  const openDeals = contact.deals.filter((d) => !d.stage.isWon && !d.stage.isLost);
  const openValue = openDeals.reduce((sum, d) => sum + d.value, 0);
  const initials = contact.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <>
      <Link href="/contacts" className="text-[12.5px] text-[var(--accent)] hover:underline">
        ← חזרה ללקוחות
      </Link>

      <section className="card p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-base shrink-0"
            style={{ background: "linear-gradient(155deg, var(--accent), var(--teal))" }}
          >
            {initials}
          </div>
          <div>
            <div className="text-[15.5px] font-extrabold">{contact.name}</div>
            <div className="text-[12.5px] text-[var(--text-muted)]">
              {contact.role}
              {contact.role && contact.company && " · "}
              {contact.company}
            </div>
          </div>
          <div className="ms-auto flex gap-1.5 flex-wrap">
            {contact.tags.map((t) => (
              <span key={t.id} className={tagChipClass(t.color)}>
                {t.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2.5 flex-wrap text-[12.5px] text-[var(--text-muted)]">
          {contact.phone && <span>📞 {contact.phone}</span>}
          {contact.email && <span>✉ {contact.email}</span>}
          <span>מקור: {contact.source}</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <Stat n={openValue > 0 ? formatCurrency(openValue) : "—"} l="עסקאות פתוחות" />
          <Stat n={String(contact.activities.length)} l="אינטראקציות רשומות" />
          <Stat n={contact.createdAt.getFullYear().toString()} l="לקוח מאז" />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 items-start">
        <div className="card p-5 flex flex-col gap-4">
          <h3 className="text-[15px]">ציר זמן</h3>

          <form action={addActivity} className="flex flex-col gap-2 sm:flex-row">
            <input type="hidden" name="contactId" value={contact.id} />
            <select name="type" className="field sm:w-36" defaultValue="note">
              {Object.entries(ACTIVITY_TYPE_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <input name="summary" required placeholder="מה קרה בשיחה/פגישה?" className="field flex-1" />
            <button type="submit" className="btn-primary">
              הוספה
            </button>
          </form>

          <div className="flex flex-col">
            {contact.activities.length === 0 && (
              <p className="text-[13px] text-[var(--text-faint)]">אין עדיין רישום פעילות עבור הלקוח.</p>
            )}
            {contact.activities.map((a, i) => (
              <div key={a.id} className="flex gap-3 relative pb-4 last:pb-0">
                {i < contact.activities.length - 1 && (
                  <span className="absolute top-7 bottom-0 end-[13px] w-px bg-[var(--border)]" />
                )}
                <div className="w-[27px] h-[27px] rounded-full bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center shrink-0 z-10 text-[var(--text-muted)]">
                  <IconWhatsapp className="w-3 h-3" />
                </div>
                <div className="pt-0.5">
                  <div className="text-[12.5px] font-semibold">{a.summary}</div>
                  <div className="text-[12px] text-[var(--text-faint)] mt-0.5">
                    {ACTIVITY_TYPE_LABEL[a.type] ?? a.type} · {a.occurredAt.toLocaleDateString("he-IL")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="card p-5">
            <h3 className="text-[15px] mb-3">עסקאות</h3>
            {contact.deals.length === 0 && (
              <p className="text-[13px] text-[var(--text-faint)]">אין עדיין עסקאות ללקוח זה.</p>
            )}
            <div className="flex flex-col gap-2">
              {contact.deals.map((d) => (
                <Link key={d.id} href="/pipeline" className="deal-card block">
                  <div className="text-[13px] font-bold">{d.title}</div>
                  <div className="flex items-center justify-between">
                    <span className="chip chip-neutral">{d.stage.name}</span>
                    <span className="text-[13px] font-extrabold [font-variant-numeric:tabular-nums]">
                      {formatCurrency(d.value)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-[15px] mb-3 flex items-center gap-2">
              <IconClock className="w-4 h-4 text-[var(--text-faint)]" />
              משימות פתוחות
            </h3>
            {contact.tasks.length === 0 && (
              <p className="text-[13px] text-[var(--text-faint)]">אין משימות פתוחות.</p>
            )}
            <div className="flex flex-col gap-2">
              {contact.tasks.map((t) => (
                <div key={t.id} className="text-[13px] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  {t.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="bg-[var(--surface-2)] rounded-[10px] px-3 py-2.5">
      <div className="font-display font-extrabold text-base [font-variant-numeric:tabular-nums]">{n}</div>
      <div className="text-[11px] text-[var(--text-faint)] mt-0.5">{l}</div>
    </div>
  );
}
