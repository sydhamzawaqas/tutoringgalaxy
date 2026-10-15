import "server-only";
import { headers } from "next/headers";

/**
 * Small fixed-window, in-memory rate limiter.
 *
 * PRODUCTION NOTE: memory is per server instance and resets on deploy/cold start, so on
 * serverless or multi-instance hosting this is only a best-effort burst limit. Move the
 * counters to a shared store (e.g. Upstash Redis, or a Postgres table with an atomic upsert
 * like increment_ai_usage) before relying on it for brute-force protection. Supabase Auth
 * also applies its own server-side rate limits to sign-in and email endpoints.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 10_000;

export type RateLimitResult = { ok: boolean; retryAfterSeconds: number };

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  if (buckets.size > MAX_KEYS) sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }
  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
  }
  return { ok: true, retryAfterSeconds: 0 };
}

function sweep(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  // Still too big (e.g. under attack): drop the oldest entries rather than grow without bound.
  if (buckets.size > MAX_KEYS) {
    const excess = buckets.size - MAX_KEYS;
    let i = 0;
    for (const key of buckets.keys()) {
      if (i++ >= excess) break;
      buckets.delete(key);
    }
  }
}

/**
 * Best-effort client IP for rate limiting. Behind a trusted proxy (Vercel, Cloudflare) the
 * left-most X-Forwarded-For entry is the client. Self-hosted deployments must make sure the
 * edge proxy overwrites this header, otherwise clients can spoof it.
 */
export async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || h.get("x-real-ip")?.trim() || "unknown";
  return ip.slice(0, 64);
}
