/** Pure helpers shared by server pages and the client blog explorer (no post data imported here). */

/** "11+" → "11-plus", "Parents Guide" → "parents-guide". */
export function categorySlug(category: string) {
  return category
    .toLowerCase()
    .replace(/\+/g, "-plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * "2026-07-16" → "16 July 2026". Pure string formatting: no Date object, so it is the same on the
 * server and the client and safe to prerender with Cache Components.
 */
export function formatPostDate(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1] ?? ""} ${m[1]}`.trim();
}
