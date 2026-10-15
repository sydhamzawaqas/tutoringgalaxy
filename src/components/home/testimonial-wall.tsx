"use client";

import { useMemo, useState } from "react";
import { Quote } from "lucide-react";
import { Avatar, FilterChip, GradeJump, Stars } from "./parts";

export type WallTestimonial = {
  name: string;
  initials: string;
  role: string;
  location: string;
  flag: string;
  city: string;
  cityName: string;
  subject?: string;
  subjectSlug?: string;
  subjectName?: string;
  quote: string;
  rating: number;
  before?: string;
  after?: string;
  duration?: string;
};

const INITIAL = 6;

export function TestimonialWall({ items }: { items: WallTestimonial[] }) {
  const [city, setCity] = useState("all");
  const [subject, setSubject] = useState("all");
  const [expanded, setExpanded] = useState(false);

  const cities = useMemo(() => {
    const m = new Map<string, string>();
    items.forEach((t) => m.set(t.city, t.cityName));
    return [...m].sort((a, b) => a[1].localeCompare(b[1]));
  }, [items]);
  const subjects = useMemo(() => {
    const m = new Map<string, string>();
    items.forEach((t) => t.subjectSlug && t.subjectName && m.set(t.subjectSlug, t.subjectName));
    return [...m].sort((a, b) => a[1].localeCompare(b[1]));
  }, [items]);

  const matches = items.filter((t) => (city === "all" || t.city === city) && (subject === "all" || t.subjectSlug === subject));
  const shown = expanded ? matches : matches.slice(0, INITIAL);

  return (
    <div>
      <div className="space-y-3">
        <div role="group" aria-label="Filter reviews by city" className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 w-full text-label font-semibold text-on-dark-muted sm:w-16">City</span>
          <FilterChip dark active={city === "all"} onClick={() => setCity("all")}>All cities</FilterChip>
          {cities.map(([k, l]) => (
            <FilterChip key={k} dark active={city === k} onClick={() => setCity(city === k ? "all" : k)}>{l}</FilterChip>
          ))}
        </div>
        <div role="group" aria-label="Filter reviews by subject" className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 w-full text-label font-semibold text-on-dark-muted sm:w-16">Subject</span>
          <FilterChip dark accent active={subject === "all"} onClick={() => setSubject("all")}>All subjects</FilterChip>
          {subjects.map(([k, l]) => (
            <FilterChip key={k} dark accent active={subject === k} onClick={() => setSubject(subject === k ? "all" : k)}>{l}</FilterChip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-small text-on-dark-muted" aria-live="polite">
        {matches.length === 0 ? "No reviews match that combination yet." : `Showing ${shown.length} of ${matches.length} reviews`}
      </p>

      {matches.length === 0 ? (
        <div className="mt-4 rounded-panel border border-dashed border-on-dark/20 p-10 text-center text-on-dark-muted">
          Try a different city or subject.{" "}
          <button type="button" onClick={() => { setCity("all"); setSubject("all"); }} className="font-semibold text-gold underline-offset-4 hover:underline">
            Show all reviews
          </button>
        </div>
      ) : (
        <ul className="mt-4 gap-5 sm:columns-2 lg:columns-3">
          {shown.map((t, i) => (
            <li key={t.name + t.location} className="mb-5 break-inside-avoid">
              <figure className="relative overflow-hidden rounded-panel border border-on-dark/10 bg-on-dark/5 p-6 backdrop-blur transition-colors hover:border-gold/40">
                <Quote aria-hidden className="pointer-events-none absolute -top-1 -right-1 size-16 text-on-dark/5" strokeWidth={1.5} />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {t.before && t.after ? <GradeJump before={t.before} after={t.after} dark /> : <span />}
                  <Stars rating={t.rating} />
                </div>
                {t.subject ? (
                  <p className="mt-3 text-label font-semibold text-gold">
                    {t.subject}
                    {t.duration ? `, ${t.duration}` : ""}
                  </p>
                ) : null}
                <blockquote className="mt-3 text-on-dark">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-on-dark/10 pt-4">
                  <Avatar initials={t.initials} i={i} size="sm" />
                  <div className="min-w-0">
                    <p className="text-small font-bold text-on-dark">{t.name}</p>
                    <p className="truncate text-label text-on-dark-muted">
                      {t.role}, <span aria-hidden>{t.flag} </span>{t.location}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}
      {matches.length > shown.length ? (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex h-11 items-center rounded-control border border-on-dark/40 px-5 font-semibold text-on-dark transition-colors hover:bg-on-dark/10"
          >
            Show all {matches.length} reviews
          </button>
        </div>
      ) : null}
    </div>
  );
}
