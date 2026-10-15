import Link from "next/link";
import { Check, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, Stars } from "@/components/home/parts";
import { curriculumName, subjectName, type Tutor } from "@/data/content/tutors";
import { countryFlag } from "@/data/legacy/teachers";
import { cn } from "@/lib/utils";
import { ModeChips, TierBadge, VerificationBadges } from "./badges";

/** Rich tutor card used by the directory, hubs, match results and older pages (via TutorCard). */
export function TutorProfileCard({
  t,
  i = 0,
  headingLevel = "h3",
  footer,
  className,
}: {
  t: Tutor;
  i?: number;
  headingLevel?: "h2" | "h3";
  footer?: React.ReactNode;
  className?: string;
}) {
  const H = headingLevel;
  return (
    <article className={cn("flex h-full flex-col rounded-panel border border-border bg-background p-5 shadow-card transition-shadow duration-200 hover:shadow-lift sm:p-6", className)}>
      <div className="flex items-start gap-3.5">
        <Avatar initials={t.initials} i={i} size="lg" />
        <div className="min-w-0 flex-1">
          <H className="text-lead font-bold leading-snug">
            <Link href={`/tutors/${t.slug}`} className="rounded-control hover:underline focus-visible:outline-2 focus-visible:outline-focus">
              {t.name}
            </Link>
          </H>
          <p className="text-small text-muted-foreground">{t.title}</p>
          <p className="mt-1 flex items-center gap-1 text-label text-muted-foreground">
            <MapPin aria-hidden className="size-3.5 shrink-0" />
            <span className="truncate">
              <span aria-hidden>{countryFlag(t.countrySlug)} </span>
              {t.city}, {t.country}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <TierBadge tier={t.tier} />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <p className="flex items-center gap-1.5">
          <Stars rating={t.rating} />
          <span className="text-small font-semibold tabular-nums">{t.rating.toFixed(2)}</span>
          <span className="text-label text-muted-foreground">({t.reviews} reviews)</span>
        </p>
        <p className="text-small font-bold text-navy tabular-nums">{t.rate.display}</p>
      </div>

      <p className="mt-3 text-small text-muted-foreground">{t.bio}</p>

      {t.highlights.length ? (
        <ul className="mt-3 space-y-1">
          {t.highlights.slice(0, 2).map((h) => (
            <li key={h} className="flex items-center gap-1.5 text-label font-medium">
              <Check aria-hidden className="size-3.5 shrink-0 text-success" strokeWidth={2.5} />
              {h}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4">
        <VerificationBadges ids={t.certifications} limit={3} />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {t.subjects.map((s) => (
          <span key={s} className="rounded-pill bg-sky-tint px-2.5 py-0.5 text-label font-medium text-navy-soft">
            {subjectName(s)}
          </span>
        ))}
        {t.curricula.slice(0, 4).map((c) => (
          <span key={c} className="rounded-pill border border-border px-2.5 py-0.5 text-label text-muted-foreground">
            {curriculumName(c)}
          </span>
        ))}
        {t.curricula.length > 4 ? <span className="px-1 text-label text-muted-foreground">+{t.curricula.length - 4}</span> : null}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <ModeChips modes={t.modes} city={t.city} />
        {t.availability[0] ? (
          <span className="inline-flex items-center gap-1 text-label text-muted-foreground">
            <Clock aria-hidden className="size-3.5" />
            {t.availability[0]}
          </span>
        ) : null}
      </div>

      {footer ?? (
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Button asChild variant="secondary" size="sm">
            <Link href={`/tutors/${t.slug}`}>
              View profile<span className="sr-only">: {t.name}</span>
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`/book?tutor=${t.slug}`}>
              Book free trial<span className="sr-only"> with {t.name}</span>
            </Link>
          </Button>
        </div>
      )}
    </article>
  );
}
