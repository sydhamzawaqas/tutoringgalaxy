import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Avatar, GradeJump, Stars } from "@/components/home/parts";
import { tutors } from "@/data/content/tutors";
import { getSubject, type Subject } from "@/data/content/subjects";
import type { Curriculum } from "@/data/content/curricula";
import type { Testimonial } from "@/data/legacy/testimonials";
import { cn } from "@/lib/utils";
import { SubjectIcon } from "./subject-icon";

const TINTS = ["bg-gold-tint text-gold-deep", "bg-sky-tint text-navy-soft", "bg-mint-tint text-success", "bg-lilac-tint text-navy-soft", "bg-coral-tint text-annotation"];

/* ── Subjects ─────────────────────────────────────────────────────────── */

export function SubjectCard({ s, i = 0, note }: { s: Subject; i?: number; note?: string }) {
  return (
    <Link
      href={`/subjects/${s.slug}`}
      className="group flex h-full flex-col rounded-panel border border-border bg-background p-6 shadow-card transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lift"
    >
      <SubjectIcon icon={s.icon} i={i} />
      <h3 className="mt-4 text-lead font-bold">{s.name}</h3>
      <p className="mt-1 flex-1 text-small text-muted-foreground">{s.summary}</p>
      {note ? <p className="mt-3 text-label text-muted-foreground">{note}</p> : null}
      <span className="mt-4 inline-flex items-center gap-1 text-label font-semibold text-navy-soft group-hover:text-gold-deep">
        {s.name} tutors <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/** Compact subject link with icon, for lists inside curriculum pages. */
export function SubjectPill({ slug, i = 0, prefix }: { slug: string; i?: number; prefix?: string }) {
  const s = getSubject(slug);
  if (!s) return null;
  const body = (
    <>
      <SubjectIcon icon={s.icon} i={i} size="sm" />
      <span className="min-w-0 font-semibold">
        {prefix ? <span className="text-muted-foreground">{prefix} </span> : null}
        {s.name}
      </span>
    </>
  );
  const cls = "flex items-center gap-3 rounded-container border border-border bg-background p-3 pr-4 transition-shadow hover:shadow-card";
  return s.page ? (
    <Link href={`/subjects/${s.slug}`} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/* ── Curricula ────────────────────────────────────────────────────────── */

export function CurriculumTile({ c, i = 0, subjectName }: { c: Curriculum; i?: number; subjectName?: string }) {
  return (
    <Link
      href={`/curricula/${c.slug}`}
      className="group flex h-full flex-col rounded-panel border border-border bg-background p-6 shadow-card transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lift"
    >
      <span aria-hidden className={cn("grid size-12 place-items-center rounded-container text-small font-bold", TINTS[i % TINTS.length])}>
        {c.short.replace(/[^A-Za-z0-9]/g, "").slice(0, 3)}
      </span>
      <h3 className="mt-4 text-lead font-bold">{subjectName ? `${c.short} ${subjectName}` : c.short}</h3>
      <p className="mt-1 text-small text-muted-foreground">{c.board}</p>
      <p className="mt-1 flex-1 text-label text-muted-foreground">{c.ages}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-label font-semibold text-navy-soft group-hover:text-gold-deep">
        Explore {c.short} <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/* ── Tutors ───────────────────────────────────────────────────────────── */

type TutorLite = { slug: string; name: string; subjects: string[]; line?: string; initials: string };

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v : undefined);
const strs = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

/**
 * Tutors read defensively: tutors.ts is owned elsewhere and may change shape, so only name, slug
 * and subjects are required; curricula and a headline are used when present.
 */
function liteTutors(): (TutorLite & { curricula: string[] })[] {
  const list: unknown[] = Array.isArray(tutors) ? tutors : [];
  return list.flatMap((raw) => {
    if (!raw || typeof raw !== "object") return [];
    const t = raw as Record<string, unknown>;
    const slug = str(t.slug);
    const name = str(t.name);
    if (!slug || !name) return [];
    const initials =
      str(t.initials) ??
      name
        .split(/\s+/)
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    return [{ slug, name, initials, subjects: strs(t.subjects), curricula: strs(t.curricula), line: str(t.headline) ?? str(t.title) }];
  });
}

export const tutorsForSubject = (slug: string, limit = 6) => liteTutors().filter((t) => t.subjects.includes(slug)).slice(0, limit);
export const tutorsForCurriculum = (slug: string, limit = 6) => liteTutors().filter((t) => t.curricula.includes(slug)).slice(0, limit);

export function TutorMiniCard({ t, i = 0 }: { t: TutorLite; i?: number }) {
  const names = t.subjects
    .map((s) => getSubject(s)?.name)
    .filter((n): n is string => Boolean(n))
    .slice(0, 3);
  return (
    <article className="group relative flex h-full flex-col rounded-panel border border-border bg-background p-6 shadow-card transition-shadow hover:shadow-lift">
      <div className="flex items-center gap-3">
        <Avatar initials={t.initials} i={i} size="lg" />
        <div className="min-w-0">
          <h3 className="font-bold">
            <Link href={`/tutors/${t.slug}`} className="after:absolute after:inset-0 after:rounded-panel focus-visible:outline-none">
              {t.name}
            </Link>
          </h3>
          {t.line ? <p className="line-clamp-2 text-small text-muted-foreground">{t.line}</p> : null}
        </div>
      </div>
      {names.length ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {names.map((n) => (
            <li key={n} className="rounded-pill bg-sky-tint px-2.5 py-0.5 text-label font-medium text-navy-soft">
              {n}
            </li>
          ))}
        </ul>
      ) : null}
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-label font-semibold text-navy-soft group-hover:text-gold-deep">
        View profile <ArrowRight aria-hidden className="size-3.5" />
      </span>
    </article>
  );
}

/* ── Testimonials ─────────────────────────────────────────────────────── */

export function TestimonialCard({ t, i = 0 }: { t: Testimonial; i?: number }) {
  return (
    <figure className="flex h-full flex-col rounded-panel border border-on-dark/10 bg-on-dark/5 p-6 text-on-dark">
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
      <blockquote className="mt-3 flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-on-dark/10 pt-4">
        <Avatar initials={t.initial} i={i} size="sm" />
        <div>
          <p className="text-small font-bold">{t.name}</p>
          <p className="text-label text-on-dark-muted">
            {t.role}, {t.location}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

/* ── Link chips (cities, related curricula) ───────────────────────────── */

export function LinkChips({ items, icon = false }: { items: { href: string; label: string; key?: string }[]; icon?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((it) => (
        <li key={it.key ?? it.href + it.label}>
          <Link
            href={it.href}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-pill border border-border bg-background px-3.5 py-1.5 text-small font-medium text-navy transition-colors hover:border-navy/40 hover:bg-surface"
          >
            {icon ? <MapPin aria-hidden className="size-3.5 text-gold-deep" /> : null}
            {it.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ── Fact card (hero aside) ───────────────────────────────────────────── */

export function FactCard({ title, facts, footer }: { title: string; facts: { icon: React.ReactNode; label: string; value: React.ReactNode }[]; footer?: React.ReactNode }) {
  return (
    <div className="rounded-panel bg-background p-6 text-foreground shadow-lift sm:p-7">
      <p className="text-label font-semibold tracking-wide text-muted-foreground uppercase">{title}</p>
      <dl className="mt-4 divide-y divide-rule">
        {facts.map((f) => (
          <div key={f.label} className="flex gap-3 py-3 first:pt-0 last:pb-0">
            <span aria-hidden className="mt-0.5 shrink-0">{f.icon}</span>
            <div className="min-w-0">
              <dt className="text-label text-muted-foreground">{f.label}</dt>
              <dd className="font-semibold">{f.value}</dd>
            </div>
          </div>
        ))}
      </dl>
      {footer ? <div className="mt-5 border-t border-rule pt-4">{footer}</div> : null}
    </div>
  );
}

/** Small tinted icon square for fact rows and feature cards. */
export function TintIcon({ children, i = 0, size = "sm" }: { children: React.ReactNode; i?: number; size?: "sm" | "md" }) {
  return (
    <span className={cn("grid place-items-center", size === "md" ? "size-12 rounded-container [&_svg]:size-6" : "size-9 rounded-control [&_svg]:size-4.5", TINTS[i % TINTS.length])}>
      {children}
    </span>
  );
}
