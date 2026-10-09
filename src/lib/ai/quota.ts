import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { getClientIp, rateLimit } from "@/lib/auth/rate-limit";
import { aiDailyLimit } from "./config";

export type QuotaResult = { ok: true } | { ok: false; reason: "burst" | "daily" | "unavailable" };

/**
 * Spend one AI call for `userId` (OWASP LLM06: unbounded consumption).
 *   1. Per-IP and per-user burst limits in memory (best effort; see rate-limit.ts).
 *   2. Per-user daily quota in Postgres via increment_ai_usage(), an atomic upsert that only the
 *      service role can execute. Fails closed if the database can't be reached.
 * Call AFTER verifySession(); `userId` must come from the session, never from the client.
 */
export async function spendAiQuota(userId: string): Promise<QuotaResult> {
  const ip = await getClientIp();
  if (!rateLimit(`ai:ip:${ip}`, 20, 60_000).ok) return { ok: false, reason: "burst" };
  if (!rateLimit(`ai:user:${userId}`, 8, 60_000).ok) return { ok: false, reason: "burst" };

  const admin = createAdminClient();
  if (!admin) return { ok: false, reason: "unavailable" };

  const day = new Date().toISOString().slice(0, 10); // UTC day
  const { data, error } = await admin.rpc("increment_ai_usage", {
    p_user_id: userId,
    p_day: day,
    p_limit: aiDailyLimit(),
  });
  if (error) {
    console.error("[ai] quota check failed", error.code ?? "unknown");
    return { ok: false, reason: "unavailable" };
  }
  return data === true ? { ok: true } : { ok: false, reason: "daily" };
}
