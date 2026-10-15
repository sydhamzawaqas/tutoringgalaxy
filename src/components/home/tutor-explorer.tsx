"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, GraduationCap, MapPin, RotateCcw, ShieldCheck } from "lucide-react";
import { Avatar, FilterChip, Stars } from "./parts";

export type ExplorerTutor = {
  slug: string;
  name: string;
  initials: string;
  title: string;
  place: string;
  flag: string;
  university?: string;
  subjects: string[];
  subjectNames: string[];
  curricula: string[];
  curriculumNames: string[];
  online: boolean;
  home: boolean;
  rating: number;
  reviews: number;
  experienceYears: number;
  hourlyRate: string;
  bio: string;
};

type Opt = { k: string; l: string };

const SUBJECTS: Opt[] = [
  { k: "all", l: "All subjects" },
  { k: "mathematics", l: "Mathematics" },
  { k: "physics", l: "Physics" },
  { k: "chemistry", l: "Chemistry" },
  { k: "biology", l: "Biology" },
  { k: "english", l: "English" },
  { k: "computer-science", l: "Computer Science" },
];
const CURRICULA: Opt[] = [
  { k: "all", l: "All curricula" },
  { k: "igcse", l: "IGCSE" },
  { k: "gcse", l: "GCSE" },
  { k: "o-level", l: "O-Level" },
  { k: "a-level", l: "A-Level" },
  { k: "ib", l: "IB" },
  { k: "sat", l: "SAT" },
  { k: "mdcat", l: "MDCAT" },
];
const MODES: Opt[] = [
  { k: "all", l: "Online & home" },
  { k: "online", l: "Online" },
  { k: "home", l: "At home" },
];

function ChipRow({ label, opts, value, onChange, accent }: { label: string; opts: Opt[]; value: string; onChange: (v: string) => void; accent?: boolean }) {
  return (
    <div role="group" aria-label={`Filter tutors by ${label.toLowerCase()}`} className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 w-full text-label font-semibold text-muted-foreground sm:w-24">{label}</span>
      {opts.map((o) => (
        <FilterChip key={o.k} active={value === o.k} onClick={() => onChange(o.k)} accent={accent}>
          {o.l}
        </FilterChip>
      ))}
    </div>
  );
}

export function TutorExplorer({ tutors }: { tutors: ExplorerTutor[] }) {
  const [subject, setSubject] = useState("all");
  const [curr, setCurr] = useState("all");
  const [mode, setMode] = useState("all");

  const matches = useMemo(
    () =>
      tutors.filter(
        (t) =>
          (subject === "all" || t.subjects.includes(subject)) &&
          (curr === "all" || t.curricula.includes(curr)) &&
          (mode === "all" || (mode === "online" ? t.online : t.home)),
      ),
    [tutors, subject, curr, mode],
  );
  const shown = matches.slice(0, 6);
  const reset = () => {
    setSubject("all");
    setCurr("all");
    setMode("all");
  };
  const params = new URLSearchParams();
  if (subject !== "all") params.set("subject", subject);
  if (curr !== "all") params.set("curriculum", curr);
  if (mode !== "all") params.set("mode", mode);
  const qs = params.toString();

  return (
    <div>
      <div className="space-y-3 rounded-panel border border-border bg-background p-4 shadow-card sm:p-5">
        <ChipRow label="Subject" opts={SUBJECTS} value={subject} onChange={setSubject} />
        <ChipRow label="Curriculum" opts={CURRICULA} value={curr} onChange={setCurr} accent />
        <ChipRow label="Mode" opts={MODES} value={mode} onChange={setMode} />
      </div>

      <p className="mt-6 text-small text-muted-foreground" aria-live="polite">
        {matches.length === 0 ? "No tutors match those filters yet." : `Showing ${shown.length} of ${matches.length} matching tutors`}
      </p>

      {shown.length === 0 ? (
        <div className="mt-4 rounded-panel border border-dashed border-border bg-background p-10 text-center">
          <p className="text-muted-foreground">Try relaxing one filter, or tell us what you need and we&apos;ll match a tutor by hand.</p>
          <button type="button" onClick={reset} className="mt-4 inline-flex items-center gap-1.5 font-semibold text-navy-soft underline-offset-4 hover:underline">
            <RotateCcw aria-hidden className="size-4" /> Reset filters
          </button>
        </div>
      ) : (
        <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((t, i) => (
            <li key={t.slug}>
              <Link
                href={`/tutors/${t.slug}`}
                className="group flex h-full flex-col rounded-panel border border-border bg-background p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-start gap-4">
                  <Avatar initials={t.initials} i={i} size="lg" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5">
                      <span className="truncate font-bold">{t.name}</span>
                      <ShieldCheck aria-label="Verified tutor" className="size-4 shrink-0 text-success" />
                    </p>
                    <p className="truncate text-small text-muted-foreground">{t.title}</p>
                    <p className="mt-2 flex flex-wrap gap-1.5">
                      {t.university ? (
                        <span className="inline-flex items-center gap-1 rounded-pill bg-sky-tint px-2 py-0.5 text-label font-semibold text-navy-soft">
                          <GraduationCap aria-hidden className="size-3.5" />
                          {t.university}
                        </span>
                      ) : null}
                      <span className="rounded-pill bg-mint-tint px-2 py-0.5 text-label font-semibold text-success">{t.experienceYears}+ yrs</span>
                    </p>
                  </div>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Subjects and curricula">
                  {t.subjectNames.slice(0, 3).map((s) => (
                    <li key={s} className="rounded-control border border-border px-2 py-0.5 text-label font-medium">{s}</li>
                  ))}
                  {t.curriculumNames.slice(0, 3).map((c) => (
                    <li key={c} className="rounded-control bg-gold-tint px-2 py-0.5 text-label font-semibold text-gold-deep">{c}</li>
                  ))}
                </ul>
                <p className="mt-3 line-clamp-2 text-small text-muted-foreground">{t.bio}</p>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-rule pt-4">
                  <span className="inline-flex items-center gap-1.5">
                    <Stars rating={t.rating} />
                    <span className="text-small font-bold tabular-nums">{t.rating.toFixed(2)}</span>
                    <span className="text-label text-muted-foreground">({t.reviews})</span>
                  </span>
                  <span className="inline-flex min-w-0 items-center gap-1 text-label text-muted-foreground">
                    <MapPin aria-hidden className="size-3.5 shrink-0" />
                    <span className="truncate">{t.flag} {t.place}</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href={qs ? `/tutors?${qs}` : "/tutors"}
          className="inline-flex h-12 items-center gap-2 rounded-control bg-navy px-6 font-semibold text-on-dark transition-colors hover:bg-navy-soft"
        >
          {matches.length > 6 ? `See all ${matches.length} matching tutors` : "Browse all tutors"}
          <ArrowRight aria-hidden className="size-4" />
        </Link>
        <p className="text-small text-muted-foreground">Hand-picked from NUST, FAST, GIKI, LUMS, LSE, Oxford and Cambridge.</p>
      </div>
    </div>
  );
}
