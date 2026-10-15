import { cacheLife } from "next/cache";

/** Current year, cached for a day so pages can still be prerendered (Cache Components). */
export async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
