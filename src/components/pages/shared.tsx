import Link from "next/link";
import {
  Award, BookOpen, Brain, CalendarClock, CalendarDays, ChevronRight, Compass, FileText, Globe2, GraduationCap, Home,
  Library, MapPin, Monitor, Sparkles, Target, Trophy, UserRoundCheck, Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/brand/marks";
import { FaqList } from "@/components/sections/blocks";
import { Eyebrow, Heading, tint } from "@/components/home/parts";
import { whatsappLink } from "@/data/content/site";
import type { QA } from "@/data/content/exam-prep";
import { cn } from "@/lib/utils";

/**
 * Building blocks for the ported marketing pages (services, results, growing stars, leaderboard,
 * exam prep, academy). Same visual language as the homepage (components/home).
 */

export const ICONS: Record<string, LucideIcon> = {
  home: Home, monitor: Monitor, brain: Brain, target: Target, compass: Compass, award: Award, book: BookOpen,
  trophy: Trophy, sparkles: Sparkles, users: Users, calendar: CalendarClock, user: UserRoundCheck, file: FileText,
  library: Library, cap: GraduationCap, globe: Globe2, pin: MapPin, days: CalendarDays,
};

export type Crumb = { name: string; path: string };

/** Breadcrumb trail styled for the dark hero. Pair with breadcrumbJsonLd() using the same items. */
function HeroCrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-small text-on-dark-muted">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-on-dark">{it.name}</span>
              ) : (
                <>
                  <Link href={it.path} className="rounded-control underline-offset-4 hover:text-on-dark hover:underline">{it.name}</Link>
                  <ChevronRight aria-hidden className="size-3.5" strokeWidth={1.5} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Dark starfield hero used at the top of every ported page. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  accent,
  lead,
  children,
  aside,
  chips,
  chipsLabel,
  overlap = false,
}: {
  overlap?: boolean;
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  accent?: string;
  lead: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  chips?: string[];
  chipsLabel?: string;
}) {
  return (
    <section className="starfield relative overflow-hidden text-on-dark">
      <span aria-hidden className="absolute -top-32 -right-24 size-96 rounded-pill bg-gold/10 blur-3xl" />
      <Container className={cn("relative pt-6", overlap ? "pb-24 lg:pb-32" : "pb-16 lg:pb-24")}>
        <HeroCrumbs items={crumbs} />
        <div className={cn("mt-10 grid items-center gap-12", aside && "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]")}>
          <div className="min-w-0">
            <Eyebrow dark>{eyebrow}</Eyebrow>
            <h1 className="mt-6 text-h1-sm text-on-dark sm:text-h1">
              {title}
              {accent ? <> <span className="text-gold">{accent}</span></> : null}
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-on-dark-muted">{lead}</p>
            {children ? <div className="mt-8">{children}</div> : null}
            {chips?.length ? (
              <div className="mt-8">
                {chipsLabel ? <p className="text-label font-semibold text-on-dark-muted">{chipsLabel}</p> : null}
                <ul className="mt-3 flex flex-wrap gap-2">
                  {chips.map((c) => (
                    <li key={c} className="rounded-pill border border-on-dark/15 bg-on-dark/5 px-3 py-1 text-label font-medium text-on-dark">{c}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          {aside ? <div className="min-w-0">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}

/** Gold trial button + WhatsApp, for dark backgrounds. Optional third link. */
export function HeroActions({
  trialHref = "/book",
  trialLabel = "Book a free trial",
  message,
  extra,
  className,
}: {
  trialHref?: string;
  trialLabel?: string;
  message?: string;
  extra?: { href: string; label: string; icon?: LucideIcon };
  className?: string;
}) {
  const Extra = extra?.icon;
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <Button asChild size="lg" className="bg-gold text-navy-deep shadow-lift hover:bg-gold/90">
        <Link href={trialHref}>{trialLabel}</Link>
      </Button>
      <Button asChild size="lg" variant="secondary" className="border-on-dark/40 bg-transparent text-on-dark hover:bg-on-dark/10">
        <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          WhatsApp us
        </a>
      </Button>
      {extra ? (
        <Button asChild size="lg" variant="ghost" className="text-on-dark hover:bg-on-dark/10">
          <Link href={extra.href}>
            {Extra ? <Extra aria-hidden /> : null}
            {extra.label}
          </Link>
        </Button>
      ) : null}
    </div>
  );
}

const TONES = {
  white: "",
  sky: "bg-sky-tint",
  surface: "bg-surface",
  gold: "bg-gold-tint",
  dark: "starfield text-on-dark",
} as const;

/** Full-width page band. */
export function Band({
  tone = "white",
  className,
  children,
  ...props
}: { tone?: keyof typeof TONES } & React.ComponentProps<"section">) {
  return (
    <section className={cn("py-20 lg:py-28", TONES[tone], className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}

/** Icon chip in one of the rotating soft tints. */
export function IconChip({ icon, i = 0, className }: { icon: string; i?: number; className?: string }) {
  const Icon = ICONS[icon] ?? Sparkles;
  return (
    <span className={cn("grid size-12 shrink-0 place-items-center rounded-container", tint(i), className)}>
      <Icon aria-hidden className="size-6" />
    </span>
  );
}

/** Grid of white feature cards with tinted icon chips. */
export function FeatureGrid({
  items,
  cols = 3,
  dark = false,
}: {
  items: readonly { icon: string; title: string; body: string; href?: string; cta?: string }[];
  cols?: 2 | 3;
  dark?: boolean;
}) {
  return (
    <ul className={cn("mt-14 grid gap-5 sm:grid-cols-2", cols === 3 && "lg:grid-cols-3")}>
      {items.map((f, i) => (
        <li
          key={f.title}
          className={cn(
            "flex flex-col rounded-panel border p-7 transition-[transform,box-shadow] duration-200 hover:-translate-y-1",
            dark ? "border-on-dark/10 bg-on-dark/5 backdrop-blur" : "border-border bg-background shadow-card hover:shadow-lift",
          )}
        >
          <IconChip icon={f.icon} i={i} className={dark ? "bg-on-dark/10 text-gold" : undefined} />
          <h3 className={cn("mt-5 text-lead font-bold", dark && "text-on-dark")}>{f.title}</h3>
          <p className={cn("mt-2", dark ? "text-on-dark-muted" : "text-muted-foreground")}>{f.body}</p>
          {f.href && f.cta ? (
            <Link href={f.href} className="mt-auto inline-flex items-center gap-1 pt-5 text-small font-semibold text-navy-soft underline-offset-4 hover:underline">
              {f.cta}
              <ChevronRight aria-hidden className="size-4" />
            </Link>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/** FAQ in the homepage two-column layout. Pair with faqJsonLd(asFaqs(items)). */
export function FaqBlock({ title, lead, items }: { title: string; lead?: string; items: QA[] }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <Heading eyebrow="FAQ" title={title} lead={lead ?? "Can't find your answer? Message us on WhatsApp and we'll reply in minutes."} />
      <FaqList faqs={asFaqs(items)} />
    </div>
  );
}

/** Adapt plain q/a pairs to the shared Faq type (topics unused here). */
export const asFaqs = (items: QA[]) => items.map((f) => ({ ...f, topics: [] }));

/** Closing dark call-to-action panel, once per page. */
export function CtaBand({
  title = "Every student has the potential to shine.",
  lead = "Start your free trial today and meet a tutor matched to your goals in under 24 hours.",
  trialHref = "/book",
  message,
  extra,
}: {
  title?: string;
  lead?: string;
  trialHref?: string;
  message?: string;
  extra?: { href: string; label: string; icon?: LucideIcon };
}) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="starfield relative overflow-hidden rounded-panel px-6 py-14 text-center text-on-dark sm:px-14">
          <h2 className="mx-auto max-w-2xl text-h2-sm text-on-dark sm:text-h2">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lead text-on-dark-muted">{lead}</p>
          <HeroActions trialHref={trialHref} message={message} extra={extra} className="mt-8 justify-center" />
        </div>
      </Container>
    </section>
  );
}

/** Stat tiles that overlap the bottom of the hero (homepage pattern). */
export function StatStrip({ stats }: { stats: { icon: string; value: string; label: string }[] }) {
  return (
    <Container className="relative z-10 -mt-10">
      <ul className={cn("grid grid-cols-2 gap-px overflow-hidden rounded-panel bg-border shadow-card", stats.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
        {stats.map((s, i) => (
          <li key={s.label} className="flex items-center gap-4 bg-background p-5 sm:p-6">
            <IconChip icon={s.icon} i={i} className="hidden sm:grid" />
            <div className="min-w-0">
              <p className="text-h3 font-bold tabular-nums">{s.value}</p>
              <p className="text-small text-muted-foreground">{s.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
