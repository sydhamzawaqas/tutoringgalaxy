import "server-only";

/** Current fast model per .claude/skills/gemini-api-dev (gemini-2.x/1.x are deprecated). */
export const GEMINI_MODEL = "gemini-3.8-flash";

export function isAiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

/** Per-user daily AI calls (question generation and marking each count as one). */
export function aiDailyLimit(): number {
  const raw = Number.parseInt(process.env.AI_DAILY_LIMIT_PER_USER ?? "", 10);
  return Number.isFinite(raw) && raw > 0 && raw <= 1000 ? raw : 40;
}
