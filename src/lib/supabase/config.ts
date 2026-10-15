/**
 * Supabase public config. Safe to import anywhere (proxy, server, browser): it only reads
 * NEXT_PUBLIC_* values, which are public by design. Never put the service-role key here.
 */
export type SupabasePublicConfig = { url: string; anonKey: string };

export function getSupabaseConfig(): SupabasePublicConfig | null {
  // Referenced literally so Next.js can inline them into browser bundles.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.hostname !== "localhost" && parsed.hostname !== "127.0.0.1") return null;
  } catch {
    return null;
  }
  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}
