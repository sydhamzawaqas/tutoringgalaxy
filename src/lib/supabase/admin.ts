import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";

/**
 * Service-role client. BYPASSES ROW LEVEL SECURITY.
 *
 * Only call this from server code AFTER an authorization check in the DAL:
 *   - admin screens/actions: after requireRole("admin")
 *   - practice writes: after verifySession(), always scoped to the session user's id
 * Never pass it, or anything it returns unfiltered, to a Client Component.
 */
export function createAdminClient() {
  const config = getSupabaseConfig();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!config || !serviceKey) return null;
  return createSupabaseClient(config.url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

export function isServiceRoleConfigured() {
  return Boolean(getSupabaseConfig() && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
