"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Award, ChevronLeft, ChevronRight, GraduationCap, MapPin, Pause, Play, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, Stars } from "./parts";

export type CarouselTutor = {
  slug: string;
  name: string;
  initials: string;
  title: string;
  place: string;
  subjects: string[];
  rating: number;
  reviews: number;
  experienceYears: number;
  highlight: string;
};

const INTERVAL = 5000;

/** Featured-tutor carousel: auto-advances every 5s, pauses on hover/focus, never autoplays with reduced motion. */
export function HeroCarousel({ tutors }: { tutors: CarouselTutor[] }) {
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const total = tutors.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const playing = !hovered && !stopped && !reducedMotion && total > 1;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % total), INTERVAL);
    return () => window.clearInterval(id);
  }, [playing, total]);

  if (total === 0) return null;
  const t = tutors[idx];
  const go = (n: number) => setIdx((n + total) % total);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured tutors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovered(false);
      }}
      className="relative rounded-panel border border-border bg-background p-5 text-foreground shadow-lift sm:p-7"
    >
      <div className="flex items-center justify-between gap-3 border-b border-rule pb-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-pill bg-sky-tint text-navy-soft">
            <ShieldCheck aria-hidden className="size-4.5" />
          </span>
          <div>
            <p className="text-small font-bold">Verified expert tutors</p>
            <p className="text-label text-muted-foreground">Hand-picked, background-checked</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-gold-tint px-2.5 py-1 text-label font-semibold text-gold-deep">
          <Star aria-hidden className="size-3.5" fill="currentColor" /> Top-rated
        </span>
      </div>

      <div aria-live={playing ? "off" : "polite"} aria-atomic="true">
        <div
          key={t.slug}
          role="group"
          aria-roledescription="slide"
          aria-label={`${idx + 1} of ${total}: ${t.name}`}
          className="mt-5 transition-[opacity,translate] duration-500 starting:translate-y-1 starting:opacity-0"
        >
          <div className="flex items-start gap-4">
            <Avatar initials={t.initials} i={idx} size="lg" />
            <div className="min-w-0 flex-1">
              <p className="text-lead font-bold">{t.name}</p>
              <p className="text-small font-medium text-navy-soft">{t.title}</p>
              <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-label text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin aria-hidden className="size-3.5" />{t.place}</span>
                <span className="inline-flex items-center gap-1"><GraduationCap aria-hidden className="size-3.5" />{t.experienceYears}+ yrs teaching</span>
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-container bg-surface p-4">
            <p className="inline-flex items-center gap-1.5 text-label font-semibold text-muted-foreground">
              <Award aria-hidden className="size-3.5 text-gold-deep" /> Signature win
            </p>
            <p className="mt-1 font-semibold">{t.highlight}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {t.subjects.map((s) => (
                <li key={s} className="rounded-pill border border-border bg-background px-2.5 py-0.5 text-label font-medium">{s}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2">
              <Stars rating={t.rating} />
              <span className="text-small font-bold tabular-nums">{t.rating.toFixed(2)}</span>
              <span className="text-label text-muted-foreground">{t.reviews} reviews</span>
            </span>
            <Link href={`/tutors/${t.slug}`} className="shrink-0 text-small font-semibold text-navy-soft underline-offset-4 hover:underline">
              View profile<span className="sr-only">: {t.name}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-rule pt-4">
        <div className="flex items-center gap-1">
          {tutors.map((x, i) => (
            <button
              key={x.slug}
              type="button"
              aria-label={`Show ${x.name}`}
              aria-current={i === idx}
              onClick={() => go(i)}
              className="grid h-6 place-items-center px-0.5"
            >
              <span className={cn("block h-1.5 rounded-pill transition-all", i === idx ? "w-6 bg-navy" : "w-1.5 bg-border")} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {!reducedMotion ? (
            <button
              type="button"
              onClick={() => setStopped((s) => !s)}
              aria-label={stopped ? "Start rotating tutors" : "Stop rotating tutors"}
              className="grid size-9 place-items-center rounded-pill border border-border text-muted-foreground transition-colors hover:border-navy/40 hover:text-foreground"
            >
              {stopped ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
            </button>
          ) : null}
          <button type="button" onClick={() => go(idx - 1)} aria-label="Previous tutor" className="grid size-9 place-items-center rounded-pill border border-border text-muted-foreground transition-colors hover:border-navy/40 hover:text-foreground">
            <ChevronLeft aria-hidden className="size-4" />
          </button>
          <button type="button" onClick={() => go(idx + 1)} aria-label="Next tutor" className="grid size-9 place-items-center rounded-pill border border-border text-muted-foreground transition-colors hover:border-navy/40 hover:text-foreground">
            <ChevronRight aria-hidden className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
