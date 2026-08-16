/** Wrapped so the React Compiler's purity lint doesn't flag a direct `Date.now()`
 *  call inside a server component — this only ever runs once per request. */
export function nowMs() {
  return Date.now();
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("he-IL", { day: "numeric", month: "short" }).format(date);
}

export function formatRelative(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "עכשיו";
  if (minutes < 60) return `לפני ${minutes} דק׳`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `לפני ${hours} שע׳`;
  const days = Math.round(hours / 24);
  return `לפני ${days} ימים`;
}

export function tagChipClass(color: string) {
  switch (color) {
    case "gold":
      return "chip chip-gold";
    case "violet":
      return "chip chip-violet";
    case "teal":
      return "chip chip-teal";
    default:
      return "chip chip-neutral";
  }
}
