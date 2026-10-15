/**
 * First-touch lead attribution (browser only).
 *
 * On a visitor's first page view we store where they came from in localStorage, so a booking made
 * days later can still be credited to the ad or search that brought them. Later visits never
 * overwrite it. Ported from the old site's lib/leads.ts, plus click IDs.
 *
 * Only marketing parameters are kept: no names, contact details or full referrer URLs.
 */

export const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>> & {
  /** Hostname of an external referring site, or "direct". */
  referrer?: string;
  /** Path and query of the first page seen on this site. */
  landing_page?: string;
  /** ISO time of the first visit. */
  ts?: string;
};

export const ATTRIBUTION_LIMITS = { value: 200, landing_page: 300, ts: 40, serialized: 2000 } as const;

const STORAGE_KEY = "tg_attribution_v2";

const cap = (v: string, max: number = ATTRIBUTION_LIMITS.value) => v.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);

function readStored(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Attribution) : null;
  } catch {
    return null;
  }
}

function fromCurrentVisit(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const data: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const v = params.get(key);
    if (v) data[key] = cap(v);
  }
  let referrer = "direct";
  try {
    if (document.referrer) {
      const host = new URL(document.referrer).hostname;
      if (host && host !== window.location.hostname) referrer = cap(host);
    }
  } catch {
    // Unparseable referrer: treat as direct.
  }
  data.referrer = referrer;
  data.landing_page = cap(`${window.location.pathname}${window.location.search}`, ATTRIBUTION_LIMITS.landing_page);
  data.ts = new Date().toISOString();
  return data;
}

/** Record first-touch attribution if none is stored yet. Call once per page load. */
export function captureAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  const stored = readStored();
  if (stored) return stored;
  const data = fromCurrentVisit();
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage blocked (private mode): attribution for this page only.
  }
  return data;
}

/** First-touch attribution for this visitor (captured now if it wasn't already). */
export function getAttribution(): Attribution | null {
  return captureAttribution();
}

/** Serialised attribution for a hidden form field ("" when unavailable). */
export function attributionFieldValue(): string {
  const data = getAttribution();
  if (!data) return "";
  const json = JSON.stringify(data);
  return json.length <= ATTRIBUTION_LIMITS.serialized ? json : "";
}
