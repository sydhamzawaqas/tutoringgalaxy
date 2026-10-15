"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, Clock, GraduationCap, MapPin, RotateCcw, Sparkles, Target, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/brand/marks";
import { TUTOR_COUNTRIES, TUTOR_CURRICULA, TUTOR_SUBJECTS, curriculumName, filterTutors, subjectName, tutors } from "@/data/content/tutors";
import { getCurriculum } from "@/data/content/curricula";
import { getSubject } from "@/data/content/subjects";
import { whatsappLink } from "@/data/content/site";
import { DEFAULT_PREFS, loadPrefs, rankTutors, savePrefs, type MatchPrefs, type ScoredTutor } from "@/lib/match";
import { cn } from "@/lib/utils";
import { TutorProfileCard } from "./tutor-card";

const STEPS = [
  { name: "Subject", icon: BookOpen },
  { name: "Curriculum", icon: GraduationCap },
  { name: "Goal", icon: Target },
  { name: "Budget", icon: Wallet },
  { name: "Schedule", icon: Clock },
  { name: "Location", icon: MapPin },
] as const;

type Opt = { value: string; label: string };

const GOALS: Opt[] = [
  { value: "grades", label: "Boost grades" },
  { value: "exam", label: "Ace an exam" },
  { value: "concepts", label: "Master concepts" },
  { value: "confidence", label: "Build confidence" },
  { value: "any", label: "Not sure yet" },
];
const BUDGETS: Opt[] = [
  { value: "0", label: "No limit" },
  { value: "15", label: "Up to $15" },
  { value: "30", label: "Up to $30" },
  { value: "50", label: "Up to $50" },
  { value: "80", label: "Up to $80" },
];
const WHEN: Opt[] = [
  { value: "weekday-evening", label: "Weekday evenings" },
  { value: "weekend", label: "Weekends" },
  { value: "any", label: "Flexible" },
];
const MODES: Opt[] = [
  { value: "online", label: "Online" },
  { value: "home", label: "Home visits (Islamabad, Rawalpindi)" },
  { value: "any", label: "Either" },
];

const label = (opts: Opt[], v: string) => opts.find((o) => o.value === v)?.label ?? v;
const countryName = (slug: string) => TUTOR_COUNTRIES.find((c) => c.slug === slug)?.name ?? slug;

/** Radio group styled as chips: native radios give arrow-key navigation and form semantics. */
function ChipRadios({ name, value, options, onChange }: { name: string; value: string; options: Opt[]; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label key={o.value} className="cursor-pointer">
          <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="peer sr-only" />
          <span className="inline-flex min-h-10 items-center gap-1.5 rounded-pill border border-border bg-background px-4 py-2 text-small font-medium text-navy transition-colors hover:border-navy-soft peer-checked:border-navy peer-checked:bg-navy peer-checked:text-on-dark peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus">
            {value === o.value ? <Check aria-hidden className="size-4 text-gold" strokeWidth={3} /> : null}
            {o.label}
          </span>
        </label>
      ))}
    </div>
  );
}

function summary(p: MatchPrefs) {
  return [
    p.subject !== "any" ? `Subject: ${subjectName(p.subject)}` : null,
    p.curriculum !== "any" ? `Curriculum: ${curriculumName(p.curriculum)}` : null,
    p.goal !== "any" ? `Goal: ${label(GOALS, p.goal)}` : null,
    p.budget > 0 ? `Budget: up to $${p.budget}/hr` : null,
    p.when !== "any" ? `When: ${label(WHEN, p.when)}` : null,
    p.mode !== "any" ? `Lessons: ${p.mode === "home" ? "home visits" : "online"}` : null,
    p.country !== "any" ? `Country: ${countryName(p.country)}` : null,
  ].filter((x): x is string => Boolean(x));
}

export function MatchWizard() {
  const id = useId();
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState<MatchPrefs>(DEFAULT_PREFS);
  const [done, setDone] = useState(false);
  const [restored, setRestored] = useState(false);
  const stepRef = useRef<HTMLLegendElement>(null);
  const resultsRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  // Restore last answers (client only).
  useEffect(() => {
    const saved = loadPrefs();
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
      setPrefs(saved);
      setRestored(true);
    }
  }, []);

  // Move focus to the new question (not on first render).
  useEffect(() => {
    if (!moved.current) return;
    if (done) resultsRef.current?.focus();
    else stepRef.current?.focus();
  }, [step, done]);

  const set = <K extends keyof MatchPrefs>(k: K, v: MatchPrefs[K]) => setPrefs((p) => ({ ...p, [k]: v }));
  const go = (n: number) => {
    moved.current = true;
    setStep(n);
  };
  const ranked = useMemo(() => rankTutors(prefs).slice(0, 6), [prefs]);
  const teaching = useMemo(
    () =>
      filterTutors(tutors, {
        subject: prefs.subject === "any" ? undefined : prefs.subject,
        curriculum: prefs.curriculum === "any" ? undefined : prefs.curriculum,
      }).length,
    [prefs.subject, prefs.curriculum],
  );

  function finish() {
    savePrefs(prefs);
    moved.current = true;
    setDone(true);
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  if (done) {
    return (
      <Results
        ranked={ranked}
        prefs={prefs}
        headingRef={resultsRef}
        onEdit={() => {
          moved.current = true;
          setDone(false);
          setStep(0);
        }}
      />
    );
  }

  const Step = STEPS[step];
  const pct = Math.round(((step + 1) / STEPS.length) * 100);
  const last = step === STEPS.length - 1;

  return (
    <div className="mx-auto max-w-3xl">
      {restored ? (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-panel bg-gold-tint px-5 py-3 text-small" role="status">
          <span>We&apos;ve filled in your answers from last time.</span>
          <span className="flex gap-2">
            <Button type="button" size="sm" onClick={finish}>
              See my matches
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setPrefs(DEFAULT_PREFS);
                setRestored(false);
                go(0);
              }}
            >
              Start fresh
            </Button>
          </span>
        </div>
      ) : null}

      {/* Progress */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between gap-3 text-label font-semibold text-muted-foreground">
          <span>
            Step {step + 1} of {STEPS.length} · {Step.name}
          </span>
          <span aria-live="polite">{teaching} tutors teach this</span>
        </div>
        <div role="progressbar" aria-label="Match progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} className="h-2 overflow-hidden rounded-pill bg-surface">
          <div className="h-full rounded-pill bg-gold transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
        <ol className="mt-3 hidden grid-cols-6 gap-2 sm:grid">
          {STEPS.map((s, i) => (
            <li key={s.name}>
              <button
                type="button"
                disabled={i > step}
                onClick={() => go(i)}
                aria-current={i === step ? "step" : undefined}
                className={cn(
                  "flex w-full items-center gap-1.5 rounded-control px-1 py-1 text-label font-medium focus-visible:outline-2 focus-visible:outline-focus",
                  i === step ? "text-navy" : i < step ? "text-navy-soft hover:underline" : "text-muted-foreground",
                )}
              >
                <s.icon aria-hidden className={cn("size-4", i <= step ? "text-gold-deep" : "")} />
                {s.name}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (last) finish();
          else go(step + 1);
        }}
        className="rounded-panel border border-border bg-background p-6 shadow-card sm:p-8"
      >
        <fieldset>
          <legend ref={stepRef} tabIndex={-1} className="flex items-center gap-3 text-h3 outline-none">
            <span className="grid size-11 shrink-0 place-items-center rounded-container bg-gold-tint text-gold-deep">
              <Step.icon aria-hidden className="size-5" />
            </span>
            {
              [
                "Which subject do you need help with?",
                "Which curriculum?",
                "What's your number one goal?",
                "Budget per hour",
                "When do lessons work best?",
                "Where are you based?",
              ][step]
            }
          </legend>

          <div className="mt-6">
            {step === 0 ? (
              <ChipRadios
                name={`${id}-subject`}
                value={prefs.subject}
                onChange={(v) => set("subject", v)}
                options={[{ value: "any", label: "Any subject" }, ...TUTOR_SUBJECTS.map((s) => ({ value: s.slug, label: s.name }))]}
              />
            ) : null}
            {step === 1 ? (
              <ChipRadios
                name={`${id}-curriculum`}
                value={prefs.curriculum}
                onChange={(v) => set("curriculum", v)}
                options={[{ value: "any", label: "Any curriculum" }, ...TUTOR_CURRICULA.map((c) => ({ value: c.slug, label: c.name }))]}
              />
            ) : null}
            {step === 2 ? <ChipRadios name={`${id}-goal`} value={prefs.goal} onChange={(v) => set("goal", v as MatchPrefs["goal"])} options={GOALS} /> : null}
            {step === 3 ? (
              <>
                <ChipRadios name={`${id}-budget`} value={String(prefs.budget)} onChange={(v) => set("budget", Number(v))} options={BUDGETS} />
                <p className="mt-3 text-small text-muted-foreground">
                  In US dollars per hour. We convert each tutor&apos;s rate (PKR, AED, GBP and so on) so the comparison is fair.
                </p>
              </>
            ) : null}
            {step === 4 ? (
              <div className="space-y-6">
                <ChipRadios name={`${id}-when`} value={prefs.when} onChange={(v) => set("when", v as MatchPrefs["when"])} options={WHEN} />
                <fieldset>
                  <legend className="mb-3 text-small font-bold">Preferred lessons</legend>
                  <ChipRadios name={`${id}-mode`} value={prefs.mode} onChange={(v) => set("mode", v as MatchPrefs["mode"])} options={MODES} />
                </fieldset>
              </div>
            ) : null}
            {step === 5 ? (
              <ChipRadios
                name={`${id}-country`}
                value={prefs.country}
                onChange={(v) => set("country", v)}
                options={[{ value: "any", label: "Any country" }, ...TUTOR_COUNTRIES.map((c) => ({ value: c.slug, label: `${c.flag} ${c.name}` }))]}
              />
            ) : null}
          </div>
        </fieldset>

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-dashed border-rule pt-6">
          <Button type="button" variant="secondary" onClick={() => go(Math.max(0, step - 1))} disabled={step === 0}>
            <ArrowLeft aria-hidden />
            Back
          </Button>
          {last ? (
            <Button type="submit" size="lg" className="bg-gold text-navy-deep hover:bg-gold/90">
              <Sparkles aria-hidden />
              Show my matches
            </Button>
          ) : (
            <Button type="submit" size="lg">
              Next
              <ArrowRight aria-hidden />
            </Button>
          )}
        </div>
      </form>

      <p className="mt-4 text-center text-small text-muted-foreground">Free · No sign-up · Results in under a minute</p>
    </div>
  );
}

function Results({
  ranked,
  prefs,
  onEdit,
  headingRef,
}: {
  ranked: ScoredTutor[];
  prefs: MatchPrefs;
  onEdit: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const top = ranked[0];
  const chips = summary(prefs);
  const base = new URLSearchParams();
  // The booking form only knows its own curricula/subjects; others are left for the team to ask about.
  if (prefs.subject !== "any" && getSubject(prefs.subject)) base.set("subject", prefs.subject);
  if (prefs.curriculum !== "any" && getCurriculum(prefs.curriculum)) base.set("curriculum", prefs.curriculum);

  const wa = (name?: string) =>
    [
      "Hi Tutoring Galaxy, I used Smart Match on your website.",
      ...chips,
      name ? `I'd like a free trial lesson with ${name}.` : "Please suggest a tutor for a free trial lesson.",
    ].join("\n");

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label font-semibold text-gold-deep">Your matches</p>
          <h2 ref={headingRef} tabIndex={-1} className="mt-1 text-h2-sm outline-none sm:text-h2">
            {top ? `${top.tutor.name} is your top match` : "Personalised for you"}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Ranked by subject, curriculum, budget, schedule, location and ratings. Book a free trial with any tutor below.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={onEdit}>
            <RotateCcw aria-hidden />
            Edit answers
          </Button>
          <Button asChild variant="ghost">
            <a href={whatsappLink(wa())} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Send my answers
            </a>
          </Button>
        </div>
      </div>

      {chips.length ? (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Your answers">
          {chips.map((c) => (
            <li key={c} className="rounded-pill bg-sky-tint px-3 py-1 text-label font-medium text-navy-soft">
              {c}
            </li>
          ))}
        </ul>
      ) : null}

      <ol className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ranked.map((r, i) => {
          const qs = new URLSearchParams(base);
          qs.set("tutor", r.tutor.slug);
          return (
            <li key={r.tutor.slug} className="relative pt-3">
              <span
                className={cn(
                  "absolute top-0 left-5 z-10 rounded-pill px-3 py-0.5 text-label font-bold shadow-card",
                  i === 0 ? "bg-gold text-navy-deep" : "bg-navy text-on-dark",
                )}
              >
                {i === 0 ? "Top match · " : `#${i + 1} · `}
                {r.pct}% match
              </span>
              <TutorProfileCard
                t={r.tutor}
                i={i}
                className={i === 0 ? "border-gold" : undefined}
                footer={
                  <div className="mt-auto pt-5">
                    {r.reasons.length ? (
                      <div className="rounded-container bg-mint-tint p-3">
                        <p className="text-label font-bold text-success">Why this match</p>
                        <ul className="mt-1.5 space-y-1">
                          {r.reasons.map((reason) => (
                            <li key={reason} className="flex items-center gap-1.5 text-small">
                              <CheckCircle2 aria-hidden className="size-4 shrink-0 text-success" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Button asChild size="sm">
                        <Link href={`/book?${qs}`}>
                          Book free trial<span className="sr-only"> with {r.tutor.name}</span>
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="secondary">
                        <a href={whatsappLink(wa(r.tutor.name))} target="_blank" rel="noopener noreferrer">
                          <WhatsAppIcon />
                          WhatsApp<span className="sr-only"> about {r.tutor.name}</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                }
              />
            </li>
          );
        })}
      </ol>

      <div className="mt-10 rounded-panel border border-dashed border-border bg-surface p-6 text-center">
        <p className="font-bold">Not sure yet?</p>
        <p className="mx-auto mt-1 max-w-measure text-small text-muted-foreground">
          Our team matches most families by hand. Send us your answers and we&apos;ll suggest a tutor within a day.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link href={base.size ? `/book?${base}` : "/book"}>Book a free trial</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/tutors">Browse all tutors</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
