/** Status values used by the admin screens. Shared by server and client (no data access). */

// Must match the CHECK constraint on public.leads.status in supabase/migrations/0001_leads.sql.
export const LEAD_STATUSES = ["new", "contacted", "trial_booked", "enrolled", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const TUTOR_APPLICATION_STATUSES = ["new", "reviewing", "interview", "approved", "rejected"] as const;
export type TutorApplicationStatus = (typeof TUTOR_APPLICATION_STATUSES)[number];

export function statusLabel(status: string) {
  const s = status.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Lead ids may be uuid or bigint identity depending on the leads migration. */
export function isRecordId(value: unknown): value is string {
  return typeof value === "string" && /^(\d{1,19}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i.test(value);
}
