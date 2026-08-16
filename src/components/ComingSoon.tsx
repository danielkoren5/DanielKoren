import type { ReactNode } from "react";

export function ComingSoon({
  title,
  description,
  phase,
  icon,
  points,
}: {
  title: string;
  description: string;
  phase: string;
  icon: ReactNode;
  points: string[];
}) {
  return (
    <section className="card p-8 flex flex-col items-center text-center gap-4 max-w-xl mx-auto mt-6">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{ background: "var(--violet-soft)", color: "var(--violet)" }}
      >
        {icon}
      </div>
      <div>
        <h2 className="text-[19px]">{title}</h2>
        <p className="text-[13.5px] text-[var(--text-muted)] mt-1.5">{description}</p>
      </div>
      <span className="chip chip-violet">{phase}</span>
      <ul className="text-start w-full flex flex-col gap-2 mt-2">
        {points.map((p) => (
          <li key={p} className="text-[12.5px] text-[var(--text-muted)] flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--violet)] shrink-0 mt-1.5" />
            {p}
          </li>
        ))}
      </ul>
    </section>
  );
}
