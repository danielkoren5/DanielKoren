"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  IconGrid,
  IconKanban,
  IconWorkflow,
  IconChat,
  IconUsers,
  IconReceipt,
  IconChart,
  IconChecklist,
  IconGear,
  IconSearch,
  IconBell,
} from "@/components/icons";

const NAV_ITEMS = [
  { href: "/", label: "סקירה כללית", icon: IconGrid },
  { href: "/pipeline", label: "צנרת עסקאות", icon: IconKanban },
  { href: "/contacts", label: "לקוחות", icon: IconUsers },
  { href: "/tasks", label: "משימות", icon: IconChecklist },
  { href: "/automations", label: "אוטומציות", icon: IconWorkflow, soon: true },
  { href: "/bot", label: "בוט ושיחות", icon: IconChat, soon: true },
  { href: "/billing", label: "חיוב וחשבונות", icon: IconReceipt, soon: true },
  { href: "/reports", label: "דוחות", icon: IconChart, soon: true },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen max-w-[1400px] mx-auto">
      <aside className="w-[220px] shrink-0 p-4 flex flex-col gap-6 sticky top-0 self-start h-screen border-s border-[var(--border)]">
        <div className="flex items-center gap-2.5 px-2.5 pb-3.5">
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center font-display font-extrabold text-base shrink-0"
            style={{
              background: "linear-gradient(155deg, var(--accent), var(--violet))",
              color: "var(--accent-ink)",
            }}
          >
            מ
          </div>
          <div>
            <div className="font-display font-extrabold text-[19px]">מוקד</div>
            <div className="text-[11px] text-[var(--text-faint)] mt-px">
              מרכז שליטה ללקוחות
            </div>
          </div>
        </div>

        <ul className="list-none m-0 p-0 flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link href={item.href} className={`navlink ${isActive ? "is-active" : ""}`}>
                  <Icon />
                  {item.label}
                  {item.soon && <span className="soon">בקרוב</span>}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto flex flex-col gap-0.5">
          <a className="navlink" href="#">
            <IconGear />
            הגדרות
          </a>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3.5 px-6 py-4 border-b border-[var(--border)] backdrop-blur-md bg-[var(--bg)]/80">
          <label className="flex-1 max-w-[420px] flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-[10px] px-3 py-2.5 text-[var(--text-faint)] cursor-text">
            <IconSearch className="w-[17px] h-[17px] shrink-0" />
            <input
              type="text"
              placeholder="חיפוש לקוח, עסקה או פקודה…"
              className="border-0 outline-0 bg-transparent text-[var(--text)] text-sm w-full placeholder:text-[var(--text-faint)]"
            />
            <span className="text-[11px] text-[var(--text-faint)] border border-[var(--border)] rounded-md px-1.5 py-0.5 shrink-0">
              Ctrl K
            </span>
          </label>
          <div className="flex-1" />
          <button className="icon-btn" aria-label="התראות">
            <IconBell />
          </button>
          <div
            className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 cursor-pointer"
            style={{ background: "linear-gradient(155deg, var(--violet), var(--teal))" }}
          >
            ד
          </div>
        </header>

        <main className="px-6 py-6 pb-16 flex flex-col gap-5">{children}</main>
      </div>
    </div>
  );
}
