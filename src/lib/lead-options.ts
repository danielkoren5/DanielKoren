/**
 * Option lists for the lead-management fields on a contact.
 *
 * These live in code (not the database) because they are shared by the
 * form, the table and the server-side validation — one source of truth
 * means a renamed status cannot silently split into two spellings. If a
 * business needs to manage these itself later, they move to a table with
 * the same shape.
 */

export const LEAD_STATUSES = [
  "חדש",
  "בטיפול",
  "ממתין ללקוח",
  "הומר ללקוח",
  "לא רלוונטי",
] as const;

export const LEAD_TEMPERATURES = ["חם", "פושר", "קר"] as const;

export const LEAD_TYPES = [
  "ליווי שוטף",
  "פרויקט חד-פעמי",
  "ייעוץ נקודתי",
  "הדרכה",
] as const;

export const LEAD_SOURCES = [
  "ידני",
  "אתר",
  "המלצה",
  "פייסבוק",
  "גוגל",
  "כנס",
  "LeadMeCMS",
  "CSV",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type LeadTemperature = (typeof LEAD_TEMPERATURES)[number];

/** Chip styling per status, so state reads at a glance in the table. */
export function statusChipClass(status: string) {
  switch (status) {
    case "חדש":
      return "chip chip-violet";
    case "בטיפול":
      return "chip chip-gold";
    case "ממתין ללקוח":
      return "chip chip-warning";
    case "הומר ללקוח":
      return "chip chip-success";
    case "לא רלוונטי":
      return "chip chip-neutral";
    default:
      return "chip chip-neutral";
  }
}

/**
 * Temperature is ordinal (cold → hot), so it gets a filled/empty dot meter
 * rather than three unrelated colors — the form carries the ranking.
 */
export function temperatureLevel(temperature: string | null) {
  switch (temperature) {
    case "חם":
      return 3;
    case "פושר":
      return 2;
    case "קר":
      return 1;
    default:
      return 0;
  }
}

export function temperatureColor(temperature: string | null) {
  switch (temperature) {
    case "חם":
      return "var(--danger)";
    case "פושר":
      return "var(--warning)";
    case "קר":
      return "var(--teal)";
    default:
      return "var(--text-faint)";
  }
}
