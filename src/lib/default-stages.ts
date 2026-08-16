/**
 * Default pipeline for a consulting engagement lifecycle.
 *
 * Shared by the first-run bootstrap and the demo seed so the two can never
 * drift apart. Stage wording lives in the database per tenant, so a business
 * can rename or reorder these later without a code change.
 */
export const DEFAULT_STAGES = [
  { name: "ליד חדש", order: 1 },
  { name: "שיחת אבחון", order: 2 },
  { name: "הצעת שירות", order: 3 },
  { name: "חוזה נחתם", order: 4 },
  { name: "ליווי פעיל", order: 5 },
  { name: "הסתיים / חידוש", order: 6, isWon: true },
];

export const DEFAULT_TENANT_NAME = "העסק שלי";
