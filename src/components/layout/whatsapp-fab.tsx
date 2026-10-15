"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/brand/marks";
import { site, whatsappLink } from "@/data/content/site";

// Rotating lines from the old site's floating button.
const TOOLTIPS = ["Book Free Trial Class", "Need a Tutor?", "Chat with Tutoring Galaxy", "Get Expert Help Now"];
const LABEL = "Book Free Trial Class";

/**
 * Floating WhatsApp pill, bottom right, from the `sm` breakpoint up. On phones the sticky
 * MobileCtaBar already has a WhatsApp button, so this stays hidden there to avoid stacking.
 * Clicks are tracked by the delegated listener in analytics.tsx (wa.me link + data-track).
 */
export function WhatsAppFab() {
  const pathname = usePathname();
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % TOOLTIPS.length), 3500);
    return () => window.clearInterval(id);
  }, []);

  // The booking form has its own WhatsApp fallback.
  if (pathname?.startsWith("/book")) return null;

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp_fab"
      aria-label={`WhatsApp ${site.name}: ${LABEL}`}
      className="group fixed right-6 bottom-6 z-30 hidden items-center gap-3 rounded-pill bg-success py-2 pr-5 pl-2 text-on-dark shadow-lift transition-transform hover:-translate-y-0.5 focus-visible:outline-offset-4 sm:inline-flex print:hidden"
    >
      <span aria-hidden className="relative grid size-11 place-items-center rounded-pill bg-on-dark/15">
        <span className="absolute inset-0 rounded-pill bg-on-dark/30 motion-safe:animate-ping" />
        <WhatsAppIcon className="relative size-6" />
      </span>
      <span aria-hidden className="flex flex-col text-left">
        <span key={i} className="text-micro font-medium text-on-dark/80 uppercase">
          {TOOLTIPS[i]}
        </span>
        <span className="text-small font-semibold">{LABEL}</span>
      </span>
    </a>
  );
}
