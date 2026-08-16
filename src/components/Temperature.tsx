import { temperatureColor, temperatureLevel } from "@/lib/lead-options";

/**
 * Temperature as a 3-dot meter plus its label. Colour alone never carries
 * the value — the text is always present for accessibility.
 */
export function Temperature({ value }: { value: string | null }) {
  if (!value) return <span className="text-[var(--text-faint)]">—</span>;

  const level = temperatureLevel(value);
  const color = temperatureColor(value);

  return (
    <span className="inline-flex items-center gap-1.5" title={`טמפרטורה: ${value}`}>
      <span className="inline-flex gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: i <= level ? color : "var(--surface-3)" }}
          />
        ))}
      </span>
      <span className="text-[12px]" style={{ color }}>
        {value}
      </span>
    </span>
  );
}
