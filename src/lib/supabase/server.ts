import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

/**
 * Per-request Supabase client acting as the signed-in user (RLS applies).
 * Create a new one for every request; never share it across requests.
 * Returns null when Supabase isn't configured, so callers can show a clear state.
 */
export async function createClient() {
  const config = getSupabaseConfig();
  if (!config) return null;
  const cookieStore = await cookies();

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component, where cookies are read-only. The proxy refreshes
          // the session cookies on every /app and /admin request, so this is safe to ignore.
        }
      },
    },
  });
}
