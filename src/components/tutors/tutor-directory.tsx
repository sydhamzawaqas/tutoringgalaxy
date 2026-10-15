"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { SlidersHorizontal, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/form";
import {
  FACETS,
  SORTS,
  TUTOR_CERTIFICATIONS,
  TUTOR_COUNTRIES,
  TUTOR_CURRICULA,
  TUTOR_SUBJECTS,
  filterTutors,
  sortTutors,
  tutors as ALL,
  type Facet,
  type SortKey,
  type TutorFilters,
} from "@/data/content/tutors";
import { cn } from "@/lib/utils";
import { TutorProfileCard } from "./tutor-card";

const FACET_LABEL: Record<Facet, string> = {
  subject: "Subject",
  curriculum: "Curriculum",
  country: "Country",
  certification: "Certification",
  mode: "Lessons",
};

const ANY: Record<Facet, string> = {
  subject: "Any subject",
  curriculum: "Any curriculum",
  country: "Any country",
  certification: "Any certification",
  mode: "Online or at home",
};

const OPTIONS: Record<Facet, { value: string; label: string }[]> = {
  subject: TUTOR_SUBJECTS.map((s) => ({ value: s.slug, label: s.name })),
  curriculum: TUTOR_CURRICULA.map((c) => ({ value: c.slug, label: c.name })),
  country: TUTOR_COUNTRIES.map((c) => ({ value: c.slug, label: c.name })),
  certification: TUTOR_CERTIFICATIONS.map((c) => ({ value: c.id, label: c.label })),
  mode: [
    { value: "online", label: "Online" },
    { value: "home", label: "At home (Islamabad, Rawalpindi)" },
  ],
};

const labelFor = (f: Facet, v: string) => OPTIONS[f].find((o) => o.value === v)?.label ?? v;

/**
 * Filterable tutor list. On /tutors the filters are mirrored into the URL (?subject=&curriculum=…)
 * with history.replaceState, so views are shareable without a server round trip. Hub pages pass
 * `lock` to fix one facet (e.g. subject on /tutors/subject/physics) and hide it.
 */
export function TutorDirectory({
  initial = {},
  lock = {},
  syncUrl = false,
  label = "Filter tutors",
}: {
  initial?: TutorFilters & { sort?: SortKey };
  lock?: TutorFilters;
  syncUrl?: boolean;
  label?: string;
}) {
  const id = useId();
  const [filters, setFilters] = useState<TutorFilters>(() => ({
    subject: initial.subject,
    curriculum: initial.curriculum,
    country: initial.country,
    certification: initial.certification,
    mode: initial.mode,
  }));
  const [sort, setSort] = useState<SortKey>(initial.sort ?? "recommended");
  const [open, setOpen] = useState(false);
  const first = useRef(true);

  const lockKey = JSON.stringify(lock);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on the serialised lock so inline objects don't recompute
  const base = useMemo(() => filterTutors(ALL, lock), [lockKey]);
  const facets = FACETS.filter((f) => !lock[f]);
  const results = useMemo(() => sortTutors(filterTutors(base, filters), sort), [base, filters, sort]);
  const active = facets.filter((f) => filters[f]);

  // Count per option against the locked base, so empty options are visible as (0).
  const counts = useMemo(() => {
    const out = {} as Record<Facet, Record<string, number>>;
    for (const f of FACETS) {
      out[f] = {};
      for (const o of OPTIONS[f]) out[f][o.value] = filterTutors(base, { [f]: o.value }).length;
    }
    return out;
  }, [base]);

  useEffect(() => {
    if (!syncUrl) return;
    if (first.current) {
      first.current = false;
      return;
    }
    const qs = new URLSearchParams();
    for (const f of FACETS) if (filters[f]) qs.set(f, filters[f]!);
    if (sort !== "recommended") qs.set("sort", sort);
    const q = qs.toString();
    window.history.replaceState(null, "", q ? `?${q}` : window.location.pathname);
  }, [filters, sort, syncUrl]);

  const set = (f: Facet, v: string) => setFilters((prev) => ({ ...prev, [f]: v || undefined }));
  const clear = () => setFilters({});

  const bookQs = new URLSearchParams();
  if (filters.curriculum ?? lock.curriculum) bookQs.set("curriculum", (filters.curriculum ?? lock.curriculum)!);
  if (filters.subject ?? lock.subject) bookQs.set("subject", (filters.subject ?? lock.subject)!);

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
      {/* Filters */}
      <div>
        <Button
          type="button"
          variant="secondary"
          className="w-full lg:hidden"
          aria-expanded={open}
          aria-controls={`${id}-filters`}
          onClick={() => setOpen((o) => !o)}
        >
          <SlidersHorizontal aria-hidden />
          {open ? "Hide filters" : "Show filters"}
          {active.length ? <span className="rounded-pill bg-gold px-2 text-label text-navy-deep">{active.length}</span> : null}
        </Button>

        <form
          id={`${id}-filters`}
          role="search"
          aria-label={label}
          onSubmit={(e) => e.preventDefault()}
          className={cn("mt-4 space-y-4 rounded-panel border border-border bg-background p-5 shadow-card lg:sticky lg:top-24 lg:mt-0 lg:block", open ? "block" : "hidden")}
        >
          <p className="flex items-center justify-between text-small font-bold">
            Filters
            {active.length ? (
              <button type="button" onClick={clear} className="rounded-control text-label font-semibold text-navy-soft underline underline-offset-4 hover:text-navy focus-visible:outline-2 focus-visible:outline-focus">
                Clear all
              </button>
            ) : null}
          </p>
          {facets.map((f) => (
            <div key={f} className="flex flex-col gap-1.5">
              <label htmlFor={`${id}-${f}`} className="text-label font-semibold">
                {FACET_LABEL[f]}
              </label>
              <Select id={`${id}-${f}`} value={filters[f] ?? ""} onChange={(e) => set(f, e.target.value)} className="h-10 text-small">
                <option value="">{ANY[f]}</option>
                {OPTIONS[f].map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label} ({counts[f][o.value]})
                  </option>
                ))}
              </Select>
            </div>
          ))}
          <div className="flex flex-col gap-1.5 border-t border-dashed border-rule pt-4">
            <label htmlFor={`${id}-sort`} className="text-label font-semibold">
              Sort by
            </label>
            <Select id={`${id}-sort`} value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="h-10 text-small">
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
          </div>
        </form>

        <Link
          href="/match"
          className="mt-4 hidden items-start gap-3 rounded-panel bg-navy p-5 text-on-dark shadow-card transition-shadow hover:shadow-lift focus-visible:outline-2 focus-visible:outline-focus lg:flex"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-container bg-gold text-navy-deep">
            <Sparkles aria-hidden className="size-5" />
          </span>
          <span>
            <span className="block font-bold">Not sure who to pick?</span>
            <span className="mt-1 block text-small text-on-dark-muted">Answer 6 quick questions and we rank tutors for you.</span>
            <span className="mt-2 block text-small font-semibold text-gold">Match me in 60 seconds →</span>
          </span>
        </Link>
      </div>

      {/* Results */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lead font-bold" aria-live="polite">
            {results.length} {results.length === 1 ? "tutor" : "tutors"}
            {active.length ? " match your filters" : ""}
          </h2>
          <p className="text-label text-muted-foreground">Sorted by {SORTS.find((s) => s.value === sort)?.label.toLowerCase()}</p>
        </div>

        {active.length ? (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Active filters">
            {active.map((f) => (
              <li key={f}>
                <button
                  type="button"
                  onClick={() => set(f, "")}
                  className="inline-flex items-center gap-1.5 rounded-pill bg-gold-tint px-3 py-1 text-label font-semibold text-navy hover:bg-gold/30 focus-visible:outline-2 focus-visible:outline-focus"
                >
                  {FACET_LABEL[f]}: {labelFor(f, filters[f]!)}
                  <X aria-hidden className="size-3.5" />
                  <span className="sr-only">(remove)</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {results.length ? (
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {results.map((t, i) => (
              <li key={t.slug}>
                <TutorProfileCard t={t} i={i} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-panel border border-dashed border-border bg-surface p-8 text-center">
            <h3 className="text-h3">Tell us what you need and we&apos;ll match you</h3>
            <p className="mx-auto mt-2 max-w-measure text-muted-foreground">
              No listed profile matches those filters yet, but that doesn&apos;t mean we can&apos;t help. Most tutors are matched by our team. Send us
              the subject and syllabus and we&apos;ll suggest a tutor, usually within a day.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href={bookQs.size ? `/book?${bookQs}` : "/book"}>Book a free trial</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/match">Try Smart Match</Link>
              </Button>
              {active.length ? (
                <Button type="button" variant="ghost" onClick={clear}>
                  Clear filters
                </Button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
