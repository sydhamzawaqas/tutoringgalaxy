import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/brand/marks";
import { Eyebrow, Heading, tint } from "@/components/home/parts";
import {
  TIERS,
  TUTOR_COUNTRIES,
  TUTOR_CURRICULA,
  TUTOR_SUBJECTS,
  tutors,
  tutorsByCountry,
  tutorsByCurriculum,
  tutorsBySubject,
} from "@/data/content/tutors";
import { whatsappLink } from "@/data/content/site";
import { cn } from "@/lib/utils";
import { TierBadge } from "./badges";

type Crumb = { name: string; path: string };

/** Dark starfield intro band used by /tutors, the hubs and /match. Breadcrumbs sit inside it. */
export function TutorsHero({
  eyebrow,
  title,
  lead,
  crumbs,
  stats,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  crumbs?: Crumb[];
  stats?: { v: string; l: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="starfield relative overflow-hidden text-on-dark">
      <span aria-hidden className="absolute -top-32 -right-24 size-96 rounded-pill bg-gold/15 blur-3xl" />
      <Container className="relative pt-6 pb-14 lg:pb-20">
        {crumbs ? (
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-small text-on-dark-muted">
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <li key={c.path} className="flex items-center gap-1.5">
                    {last ? (
                      <span aria-current="page" className="text-on-dark">
                        {c.name}
                      </span>
                    ) : (
                      <>
                        <Link href={c.path} className="underline-offset-4 hover:text-on-dark hover:underline">
                          {c.name}
                        </Link>
                        <ChevronRight aria-hidden className="size-3.5" />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}
        <div className="mt-10 max-w-3xl lg:mt-14">
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-h1-sm text-on-dark sm:text-h1">{title}</h1>
          <p className="mt-5 text-lead text-on-dark-muted">{lead}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
        {stats?.length ? (
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-panel bg-on-dark/10 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="bg-navy-deep/60 p-5">
                <dt className="text-small text-on-dark-muted">{s.l}</dt>
                <dd className="mt-1 text-h3 font-bold text-gold tabular-nums">{s.v}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>
    </section>
  );
}

/** Gold "match me" + WhatsApp buttons for dark bands. */
export function DarkActions({ message, trialHref = "/book" }: { message?: string; trialHref?: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild size="lg" className="bg-gold text-navy-deep shadow-lift hover:bg-gold/90">
        <Link href="/match">
          <Sparkles aria-hidden />
          Match me in 60 seconds
        </Link>
      </Button>
      <Button asChild size="lg" variant="secondary" className="border-on-dark/40 bg-transparent text-on-dark hover:bg-on-dark/10">
        <Link href={trialHref}>Book a free trial</Link>
      </Button>
      <Button asChild size="lg" variant="ghost" className="text-on-dark hover:bg-on-dark/10">
        <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          WhatsApp us
        </a>
      </Button>
    </div>
  );
}

const chip =
  "inline-flex items-center gap-1.5 rounded-pill border border-border bg-background px-3 py-1.5 text-small font-medium text-navy transition-colors hover:border-gold hover:bg-gold-tint focus-visible:outline-2 focus-visible:outline-focus";

/** Links to the country, curriculum and subject hubs. */
export function BrowseHubs({ exclude }: { exclude?: { country?: string; curriculum?: string; subject?: string } }) {
  const countries = TUTOR_COUNTRIES.map((c) => ({ ...c, n: tutorsByCountry(c.slug).length })).filter((c) => c.n > 0 && c.slug !== exclude?.country);
  const curricula = TUTOR_CURRICULA.map((c) => ({ ...c, n: tutorsByCurriculum(c.slug).length })).filter((c) => c.n > 0 && c.slug !== exclude?.curriculum);
  const subjects = TUTOR_SUBJECTS.map((s) => ({ ...s, n: tutorsBySubject(s.slug).length })).filter((s) => s.n > 0 && s.slug !== exclude?.subject);
  return (
    <section className="bg-surface py-16 lg:py-24">
      <Container>
        <Heading eyebrow="Browse" title="Find tutors by country, curriculum or subject" />
        <h3 className="mt-10 text-label font-semibold text-muted-foreground">By country</h3>
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {countries.map((c, i) => (
            <li key={c.slug}>
              <Link
                href={`/tutors/country/${c.slug}`}
                className="flex h-full items-center gap-3 rounded-panel border border-border bg-background p-3 shadow-card transition-shadow hover:shadow-lift focus-visible:outline-2 focus-visible:outline-focus"
              >
                <span aria-hidden className={cn("grid size-10 shrink-0 place-items-center rounded-container text-lead", tint(i))}>
                  {c.flag}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-small font-bold">{c.name}</span>
                  <span className="block text-label text-muted-foreground">{c.n} tutors</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="mt-10 text-label font-semibold text-muted-foreground">By curriculum</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {curricula.map((c) => (
            <li key={c.slug}>
              <Link href={`/tutors/curriculum/${c.slug}`} className={chip}>
                {c.name} <span className="text-label text-muted-foreground">{c.n}</span>
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="mt-10 text-label font-semibold text-muted-foreground">By subject</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {subjects.map((s) => (
            <li key={s.slug}>
              <Link href={`/tutors/subject/${s.slug}`} className={chip}>
                {s.name} <span className="text-label text-muted-foreground">{s.n}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** The old site's four verification levels. */
export function TierExplainer() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <Heading
          eyebrow="Verification levels"
          title="What the badges mean"
          lead="Every tutor is checked before they teach. The level shows how much teaching experience and which certifications we have on file."
        />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t) => (
            <li key={t.level} className="rounded-panel border border-border bg-background p-6 shadow-card">
              <TierBadge tier={t} size="md" />
              <p className="mt-4 text-small text-muted-foreground">{t.blurb}</p>
              <p className="mt-3 text-label font-semibold text-navy-soft">{tutors.filter((x) => x.tier.level === t.level).length} tutors at this level</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Dark closing band with the match + trial + WhatsApp actions. */
export function TutorsClosingCta({ title, lead, message, trialHref }: { title: string; lead: string; message?: string; trialHref?: string }) {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="starfield relative overflow-hidden rounded-panel p-8 text-on-dark shadow-lift sm:p-12">
          <div className="max-w-2xl">
            <h2 className="text-h2-sm text-on-dark sm:text-h2">{title}</h2>
            <p className="mt-4 text-lead text-on-dark-muted">{lead}</p>
          </div>
          <div className="mt-8">
            <DarkActions message={message} trialHref={trialHref} />
          </div>
        </div>
      </Container>
    </section>
  );
}
