"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

/**
 * Browser Supabase client (anon key + the user's session cookie; RLS applies).
 * Most of the app uses Server Actions instead; use this only for browser-only features.
 * Returns null when Supabase isn't configured.
 */
export function createClient() {
  const config = getSupabaseConfig();
  if (!config) return null;
  return createBrowserClient(config.url, config.anonKey);
}
