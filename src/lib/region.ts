import { CITIES, CURRICULA, REGIONS, REGION_BY_SLUG, SUBJECTS, type Region } from "@/data/legacy/seo";

/**
 * Region data and detection helpers. Safe to import from server or client code.
 * The React provider and `useRegion()` live in src/lib/region-context.tsx.
 *
 * Detection order (all on the visitor's device, no third-party IP lookups):
 *   1. the `tg_region` cookie (set when the visitor picks a region),
 *   2. the browser time zone (Intl),
 *   3. the country part of the browser language (en-PK, ar-AE, ...),
 *   4. Pakistan.
 */

export type RegionSlug = Region["slug"];
export type { Region };

export const REGION_COOKIE = "tg_region";
export const DEFAULT_REGION: RegionSlug = "pakistan";
export { REGIONS };

export function isRegionSlug(value: unknown): value is RegionSlug {
  return typeof value === "string" && value in REGION_BY_SLUG;
}

export function getRegion(slug: string | null | undefined): Region {
  return (slug && REGION_BY_SLUG[slug]) || REGION_BY_SLUG[DEFAULT_REGION];
}

/** ISO country code → region. Only covers regions we serve (from the old region-context.tsx). */
const COUNTRY_TO_REGION: Record<string, RegionSlug> = {
  PK: "pakistan",
  AE: "uae",
  GB: "uk",
  UK: "uk",
  AU: "australia",
  US: "usa",
  CA: "canada",
  SA: "saudi-arabia",
  QA: "qatar",
  OM: "oman",
  BH: "bahrain",
  KW: "kuwait",
};

const ZONE_TO_REGION: Record<string, RegionSlug> = {
  "Asia/Karachi": "pakistan",
  "Asia/Dubai": "uae",
  "Europe/London": "uk",
  "Europe/Belfast": "uk",
  "Asia/Riyadh": "saudi-arabia",
  "Asia/Qatar": "qatar",
  "Asia/Muscat": "oman",
  "Asia/Bahrain": "bahrain",
  "Asia/Kuwait": "kuwait",
};

const CANADA_ZONES = /^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|Regina|St_Johns|Montreal|Moncton|Whitehorse|Yellowknife|Iqaluit|Glace_Bay|Goose_Bay|Swift_Current)$/;
const USA_ZONES = /^(America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Detroit|Boise|Indiana\/.+|Kentucky\/.+|North_Dakota\/.+|Juneau|Sitka|Menominee)|Pacific\/Honolulu)$/;

export function regionFromTimeZone(zone: string | undefined): RegionSlug | null {
  if (!zone) return null;
  if (ZONE_TO_REGION[zone]) return ZONE_TO_REGION[zone];
  if (zone.startsWith("Australia/")) return "australia";
  if (CANADA_ZONES.test(zone)) return "canada";
  if (USA_ZONES.test(zone)) return "usa";
  return null;
}

export function regionFromLanguages(languages: readonly string[] | undefined): RegionSlug | null {
  for (const tag of languages ?? []) {
    const country = tag.split("-")[1]?.toUpperCase();
    if (country && COUNTRY_TO_REGION[country]) return COUNTRY_TO_REGION[country];
  }
  return null;
}

/* ------------------------------------------------------------------------------------------------
 * Region-specific content (ported from the old hero.tsx and footer.tsx)
 * ---------------------------------------------------------------------------------------------- */

/** Most relevant curricula first for each region (old hero REGION_CURRICULA, as legacy slugs). */
export const REGION_CURRICULA: Record<RegionSlug, string[]> = {
  pakistan: ["o-level", "a-level", "igcse", "matric", "fsc", "mdcat", "ecat", "sat"],
  uae: ["igcse", "gcse", "ib", "a-level", "sat", "act", "ap", "o-level"],
  uk: ["gcse", "a-level", "igcse", "ib", "sat"],
  australia: ["hsc", "vce", "ib", "igcse", "a-level", "sat"],
  usa: ["sat", "act", "ap", "ged", "ib", "igcse"],
  canada: ["sat", "act", "ap", "ib", "igcse", "a-level"],
  "saudi-arabia": ["igcse", "gcse", "ib", "a-level", "sat", "act"],
  qatar: ["igcse", "gcse", "ib", "a-level", "sat"],
  oman: ["igcse", "gcse", "ib", "a-level", "sat"],
  bahrain: ["igcse", "gcse", "ib", "a-level", "sat"],
  kuwait: ["igcse", "gcse", "ib", "a-level", "sat"],
};

/** Region-specific hero sub-line (old hero REGION_HOOK, verbatim). */
export const REGION_HOOK: Record<RegionSlug, string> = {
  pakistan: "Join families across Pakistan preparing for O-Level, A-Level & MDCAT with Cambridge-trained tutors.",
  uae: "Join families across the UAE acing IGCSE, GCSE & IB with expert tutors — online or at home in Dubai & Abu Dhabi.",
  uk: "Join UK families preparing for GCSE, A-Level & 11+ with qualified specialist teachers.",
  australia: "Join Australian families mastering HSC, VCE & IB with expert online tutors — Sydney to Perth.",
  usa: "Join US families preparing for SAT, ACT, AP & GED with top-tier online tutors.",
  canada: "Join Canadian families acing OSSD, IB & SAT with expert online tutors.",
  "saudi-arabia": "Join families across Saudi Arabia acing IGCSE, GCSE & IB with Cambridge-trained tutors.",
  qatar: "Join families in Qatar preparing for IGCSE, GCSE & IB with expert online tutors.",
  oman: "Join families in Oman preparing for IGCSE, GCSE & IB with expert online tutors.",
  bahrain: "Join families in Bahrain preparing for IGCSE, GCSE & IB with expert online tutors.",
  kuwait: "Join families in Kuwait preparing for IGCSE, GCSE & IB with expert online tutors.",
};

/** Curricula for a region, most relevant first (falls back to all curricula). */
export function regionCurricula(slug: RegionSlug, limit = 8) {
  const order = [...REGION_CURRICULA[slug], ...REGION_BY_SLUG[slug].curricula];
  const picked = [...new Set(order)].map((s) => CURRICULA.find((c) => c.slug === s)).filter((c) => c !== undefined);
  return (picked.length ? picked : CURRICULA).slice(0, limit);
}

export function regionCities(slug: RegionSlug, limit = 12) {
  const cities = CITIES.filter((c) => c.region === slug);
  return (cities.length ? cities : CITIES).slice(0, limit);
}

export function popularSubjects(limit = 8) {
  return SUBJECTS.slice(0, limit);
}
