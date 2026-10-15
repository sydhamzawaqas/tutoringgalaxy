"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { useEffect } from "react";
import { GA_ID, track, trackPageView } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

const WHATSAPP_HOSTS = /(^|\.)(wa\.me|whatsapp\.com)$/;

/** Short, non-personal label for a clicked element. */
function labelOf(el: Element) {
  const text = (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim();
  return text.slice(0, 80);
}

/**
 * Site-wide analytics: loads GA4 (only when NEXT_PUBLIC_GA_ID is set), sends a page view on every
 * route change, reports Core Web Vitals, records first-touch attribution, and tracks clicks with
 * one delegated listener:
 *   - whatsapp_click  links to wa.me / whatsapp.com
 *   - call_click      tel: links
 *   - outbound_click  links to other sites
 *   - cta_click       anything with data-track="name" (also added as `cta` on the events above)
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    if (pathname) trackPageView(pathname);
  }, [pathname]);

  useReportWebVitals((metric) => {
    track("web_vital", {
      metric_name: metric.name,
      metric_value: metric.name === "CLS" ? Math.round(metric.value * 1000) / 1000 : Math.round(metric.value),
      metric_rating: metric.rating,
      metric_id: metric.id,
      non_interaction: true,
    });
  });

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      const tracked = target.closest("[data-track]");
      const anchor = target.closest("a[href]");
      const cta = tracked?.getAttribute("data-track")?.slice(0, 60) || undefined;
      const base = { page_path: window.location.pathname, cta };

      if (anchor instanceof HTMLAnchorElement) {
        const href = anchor.getAttribute("href") ?? "";
        if (href.startsWith("tel:")) {
          track("call_click", { ...base, link_text: labelOf(anchor) });
          return;
        }
        let url: URL | null = null;
        try {
          url = new URL(anchor.href, window.location.href);
        } catch {
          url = null;
        }
        if (url && WHATSAPP_HOSTS.test(url.hostname)) {
          track("whatsapp_click", { ...base, link_text: labelOf(anchor) });
          return;
        }
        if (url && /^https?:$/.test(url.protocol) && url.hostname !== window.location.hostname) {
          track("outbound_click", { ...base, link_domain: url.hostname, link_url: `${url.origin}${url.pathname}`.slice(0, 200) });
          return;
        }
      }
      if (tracked) track("cta_click", { ...base, link_text: labelOf(tracked) });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;
  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`} strategy="afterInteractive" />;
}
