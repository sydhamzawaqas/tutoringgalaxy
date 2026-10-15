import { connection } from "next/server";

/**
 * Marks a private page as rendered per request (Cache Components). Needed on dynamic
 * [param] routes in the app/admin areas, which must never be prerendered or shared-cached.
 * Render inside <Suspense>.
 */
export async function RequestTime() {
  await connection();
  return null;
}
