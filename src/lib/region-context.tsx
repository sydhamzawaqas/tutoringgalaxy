"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import {
  DEFAULT_REGION,
  REGIONS,
  REGION_COOKIE,
  getRegion,
  isRegionSlug,
  regionFromLanguages,
  regionFromTimeZone,
  type Region,
  type RegionSlug,
} from "./region";

/**
 * Visitor region, resolved entirely in the browser so marketing pages stay static.
 * Server render (and the first client render) uses the default region; after hydration the
 * stored/detected region takes over. Components that change copy by region should accept that
 * brief switch, or render region-specific bits inside a client island.
 */

type State = { slug: RegionSlug; source: "cookie" | "detected" | "default" };

const SERVER_STATE: State = { slug: DEFAULT_REGION, source: "default" };
let state: State | null = null;
const listeners = new Set<() => void>();

function readCookie(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${REGION_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function detect(): State {
  try {
    const stored = readCookie();
    if (isRegionSlug(stored)) return { slug: stored, source: "cookie" };
    const byZone = regionFromTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    if (byZone) return { slug: byZone, source: "detected" };
    const byLang = regionFromLanguages(navigator.languages?.length ? navigator.languages : [navigator.language]);
    if (byLang) return { slug: byLang, source: "detected" };
  } catch {
    // Cookies or Intl unavailable: use the default.
  }
  return SERVER_STATE;
}

function getSnapshot(): State {
  if (!state) state = detect();
  return state;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writeRegion(slug: RegionSlug) {
  state = { slug, source: "cookie" };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${REGION_COOKIE}=${encodeURIComponent(slug)}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax${secure}`;
  listeners.forEach((l) => l());
}

export type RegionContextValue = {
  region: Region;
  regionSlug: RegionSlug;
  setRegion: (slug: RegionSlug) => void;
  /** True when the region came from time zone / language rather than the visitor's own choice. */
  autoDetected: boolean;
  regions: Region[];
};

const RegionContext = createContext<RegionContextValue | null>(null);

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const current = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_STATE);
  const setRegion = useCallback((slug: RegionSlug) => writeRegion(slug), []);
  const value = useMemo<RegionContextValue>(
    () => ({
      region: getRegion(current.slug),
      regionSlug: current.slug,
      setRegion,
      autoDetected: current.source === "detected",
      regions: REGIONS,
    }),
    [current, setRegion],
  );
  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}

const FALLBACK: RegionContextValue = {
  region: getRegion(DEFAULT_REGION),
  regionSlug: DEFAULT_REGION,
  setRegion: () => {},
  autoDetected: false,
  regions: REGIONS,
};

/** Current visitor region. Outside <RegionProvider> it returns the default region (never throws). */
export function useRegion(): RegionContextValue {
  return useContext(RegionContext) ?? FALLBACK;
}
