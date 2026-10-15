"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Globe2, MapPin, Search, X } from "lucide-react";
import { whatsappLink } from "@/data/content/site";
import { cn } from "@/lib/utils";

export type RegionCard = {
  slug: string;
  name: string;
  flag: string;
  landmark: string;
  curricula: readonly string[];
  cities: number;
  /** Lower-case text the search box matches against (names, cities, every curriculum taught there). */
  keywords: string;
};

const TOP = ["bg-mint-tint", "bg-gold-tint", "bg-lilac-tint", "bg-sky-tint", "bg-coral-tint"];

export function RegionFinder({ regions }: { regions: RegionCard[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = useMemo(() => (q ? regions.filter((r) => r.keywords.includes(q)) : regions), [q, regions]);

  return (
    <div>
      <div className="mx-auto max-w-lg">
        <label htmlFor="region-search" className="sr-only">Search regions, cities or curricula</label>
        <div className="relative">
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-muted-foreground" />
          <input
            id="region-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a country, city or curriculum (e.g. UAE, IGCSE)"
            aria-controls="region-results"
            className="h-12 w-full rounded-pill border border-border bg-background pr-4 pl-11 text-body shadow-card placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-focus"
          />
        </div>
        <p className="mt-2 text-center text-label text-muted-foreground" aria-live="polite">
          {q ? `${shown.length} of ${regions.length} regions match` : `${regions.length} regions, online everywhere`}
        </p>
      </div>

      {shown.length === 0 ? (
        <p className="mt-10 text-center text-muted-foreground">
          No regions match &ldquo;{query}&rdquo;.{" "}
          <button type="button" onClick={() => setQuery("")} className="inline-flex items-center gap-1 font-semibold text-navy-soft underline-offset-4 hover:underline">
            <X aria-hidden className="size-4" /> Clear search
          </button>
        </p>
      ) : (
        <ul id="region-results" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((r, i) => (
            <li key={r.slug}>
              <Link
                href={`/regions/${r.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-panel border border-border bg-background shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift"
              >
                <span aria-hidden className={cn("absolute inset-x-0 top-0 h-20", TOP[i % TOP.length])} />
                <span aria-hidden className="pointer-events-none absolute -right-2 -bottom-4 text-display leading-none opacity-15 transition-opacity select-none group-hover:opacity-30">
                  {r.landmark}
                </span>
                <div className="relative flex items-center gap-3 p-5 pb-0">
                  <span aria-hidden className="grid h-11 w-14 place-items-center rounded-control bg-background text-h3 shadow-card">{r.flag}</span>
                  <div>
                    <h3 className="text-lead font-bold">{r.name}</h3>
                    <p className="inline-flex items-center gap-1 text-label text-muted-foreground">
                      <MapPin aria-hidden className="size-3.5" />
                      {r.cities} {r.cities === 1 ? "city" : "cities"}
                    </p>
                  </div>
                </div>
                <ul className="relative mt-5 flex flex-wrap gap-1.5 px-5">
                  {r.curricula.map((c) => (
                    <li key={c} className="rounded-pill bg-surface px-2.5 py-0.5 text-label font-medium text-navy-soft">{c}</li>
                  ))}
                </ul>
                <span className="relative mt-auto inline-flex items-center gap-1 p-5 text-small font-semibold text-navy-soft">
                  Explore {r.name}
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
          {!q ? (
            <li>
              <a
                href={whatsappLink("Hi! I'm outside your listed regions. Can you help me find an online tutor?")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between gap-4 rounded-panel border border-dashed border-navy/30 bg-navy p-5 text-on-dark shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid size-11 place-items-center rounded-control bg-on-dark/10 text-gold"><Globe2 aria-hidden className="size-6" /></span>
                <span>
                  <span className="block text-lead font-bold">Somewhere else?</span>
                  <span className="mt-1 block text-small text-on-dark-muted">Online lessons work in any time zone. Tell us your country and curriculum.</span>
                </span>
                <span className="inline-flex items-center gap-1 text-small font-semibold text-gold">
                  Ask on WhatsApp <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </li>
          ) : null}
        </ul>
      )}
    </div>
  );
}
