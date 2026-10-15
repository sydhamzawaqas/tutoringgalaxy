/**
 * GA4 event helper. Safe to import anywhere; every call is a no-op on the server and when
 * NEXT_PUBLIC_GA_ID is not set. The gtag.js script itself is loaded by
 * src/components/layout/analytics.tsx.
 *
 * Never put personal data (names, phone numbers, emails, free text) in event params.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || "";

export type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

let initialised = false;

/** Define the gtag queue and configure GA once. Events queue up until gtag.js has loaded. */
function gtag(): ((...args: unknown[]) => void) | null {
  if (typeof window === "undefined" || !GA_ID) return null;
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) {
    w.gtag = function gtagStub() {
      // gtag.js expects the `arguments` object itself, not an array.
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
  }
  if (!initialised) {
    initialised = true;
    w.gtag("js", new Date());
    // Page views are sent by hand on every client-side route change.
    w.gtag("config", GA_ID, { send_page_view: false, anonymize_ip: true });
  }
  return w.gtag;
}

/** Send a GA4 event. */
export function track(event: string, params: AnalyticsParams = {}) {
  const g = gtag();
  if (!g) {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") console.debug("[track]", event, params);
    return;
  }
  try {
    g("event", event, params);
  } catch {
    // Analytics must never break the page.
  }
}

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  track("page_view", { page_path: path, page_location: window.location.href, page_title: document.title });
}
