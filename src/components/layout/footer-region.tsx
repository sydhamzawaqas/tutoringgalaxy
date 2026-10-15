"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRegion } from "@/lib/region-context";
import { popularSubjects, regionCities, regionCurricula } from "@/lib/region";
import { RegionSelector } from "./region-selector";

/** Region-aware footer columns (client island; follows the visitor's region). */
export function FooterRegion() {
  const { region, autoDetected } = useRegion();
  const curricula = regionCurricula(region.slug, 8);
  const cities = regionCities(region.slug, 12);
  const subjects = popularSubjects(8);

  return (
    <div className="border-t border-on-dark/10">
      <div className="flex flex-wrap items-center gap-3 pt-10">
        <span aria-hidden className="text-h3 leading-none">{region.flag}</span>
        <div className="mr-auto">
          <p className="text-small font-semibold text-on-dark">Showing tutoring for {region.name}</p>
          <p className="text-label">{autoDetected ? "Detected from your device. Change it any time." : "Change your region here."}</p>
        </div>
        <RegionSelector tone="dark" side="top" align="end" />
      </div>

      <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_2fr]">
        <nav aria-label={`Curricula in ${region.name}`}>
          <h2 className="text-small font-bold text-on-dark">Curricula in {region.name}</h2>
          <ul className="mt-3 space-y-2 text-small">
            {curricula.map((c) => (
              <li key={c.slug}>
                <Link href={`/curricula/${c.slug}`} className="hover:text-on-dark">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Popular subjects">
          <h2 className="text-small font-bold text-on-dark">Popular subjects</h2>
          <ul className="mt-3 space-y-2 text-small">
            {subjects.map((s) => (
              <li key={s.slug}>
                <Link href={`/subjects/${s.slug}`} className="hover:text-on-dark">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={`Top cities in ${region.name}`} className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-small font-bold text-on-dark">Top cities in {region.name}</h2>
          <ul className="mt-3 flex flex-wrap gap-2 text-small">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/cities/${c.slug}`}
                  className="inline-flex rounded-pill border border-on-dark/15 px-3 py-1.5 transition-colors hover:border-on-dark/40 hover:text-on-dark"
                >
                  Tutors in {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/regions/${region.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-small font-semibold text-gold hover:underline">
            Tutoring in {region.name}
            <ArrowRight aria-hidden className="size-3.5" />
          </Link>
        </nav>
      </div>
    </div>
  );
}
