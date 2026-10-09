import Link from "next/link";
import { Award, BookOpen, CalendarClock, Check, Clock, Globe2, GraduationCap, NotebookPen, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/brand/marks";
import { FaqList, PricingCards } from "@/components/sections/blocks";
import { Avatar, Eyebrow, GradeJump, Heading, Stars, tint } from "./parts";
import { founder, hero, howItWorks, vetting, whyChooseUs } from "@/data/content/home";
import { TESTIMONIALS } from "@/data/legacy/testimonials";
import { TEACHERS } from "@/data/legacy/teachers";
import { curricula } from "@/data/content/curricula";
import { plans } from "@/data/content/pricing";
import { faqs } from "@/data/content/faqs";
import { whatsappLink } from "@/data/content/site";
import { withBase } from "@/lib/base-path";
import { cn } from "@/lib/utils";

const ICONS = { sparkles: Sparkles, award: Award, notebook: NotebookPen, calendar: CalendarClock, book: BookOpen, shield: ShieldCheck } as const;

const featuredTutors = [...TEACHERS].sort((a, b) => b.rating * b.reviews - a.rating * a.reviews).slice(0, 4);
const featuredStories = TESTIMONIALS.slice(0, 6);

export function HomeGalaxy({ yearsTeaching, variant = "galaxy" }: { yearsTeaching: number; variant?: "galaxy" | "bright" }) {
  const dark = variant === "galaxy";
  const stats = [
    { icon: Clock, v: `${yearsTeaching}+`, l: "Years tutoring families" },
    { icon: Globe2, v: "11", l: "Countries served" },
    { icon: Users, v: `${TEACHERS.length}+`, l: "Vetted tutors" },
    { icon: GraduationCap, v: `${curricula.length}`, l: "Curricula and exam boards" },
  ];
  return (
    <>
      {/* HERO */}
      <section className={cn("relative overflow-hidden", dark ? "starfield text-on-dark" : "bg-sky-tint")}>
        {!dark ? <><span aria-hidden className="absolute -top-24 -right-24 size-96 rounded-pill bg-gold/25 blur-3xl" /><span aria-hidden className="absolute -bottom-32 left-1/3 size-96 rounded-pill bg-lilac-tint blur-3xl" /></> : null}
        <Container className="relative grid items-center gap-12 pt-14 pb-28 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:pt-20 lg:pb-36">
          <div>
            <Eyebrow dark={dark}>{hero.pill}</Eyebrow>
            <h1 className={cn("mt-6 text-h1-sm sm:text-h1 lg:text-display", dark && "text-on-dark")}>
              {hero.title} <span className={dark ? "text-gold" : "text-navy-soft underline decoration-gold decoration-[6px] underline-offset-8"}>{hero.titleAccent}</span>
            </h1>
            <p className={cn("mt-6 max-w-xl text-lead", dark ? "text-on-dark-muted" : "text-muted-foreground")}>{hero.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className={dark ? "bg-gold text-navy-deep shadow-lift hover:bg-gold/90" : "shadow-lift"}>
                <Link href="/book">Book a free trial</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className={dark ? "border-on-dark/40 bg-transparent text-on-dark hover:bg-on-dark/10" : undefined}>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
            <ul className={cn("mt-7 flex flex-wrap gap-x-6 gap-y-2 text-small", dark ? "text-on-dark-muted" : "text-muted-foreground")}>
              {hero.checks.map((c) => (
                <li key={c} className="flex items-center gap-1.5">
                  <Check aria-hidden className={cn("size-4", dark ? "text-gold" : "text-success")} strokeWidth={2.5} />
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className={cn("text-label font-semibold", dark ? "text-on-dark-muted" : "text-muted-foreground")}>We tutor for</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {hero.curricula.map((c) => (
                  <li key={c} className={cn("rounded-pill border px-3 py-1 text-label font-medium", dark ? "border-on-dark/15 bg-on-dark/5 text-on-dark" : "border-border bg-background text-navy")}>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Photo with floating proof cards */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden className="absolute -inset-6 rounded-pill bg-gold/20 blur-3xl" />
            <div className={cn("relative overflow-hidden border shadow-lift", dark ? "rounded-panel border-on-dark/15 bg-navy-soft" : "arch-top rounded-b-panel border-background bg-navy")}>
              {/* eslint-disable-next-line @next/next/no-img-element -- static asset, also used in the static preview */}
              <img src={withBase("/images/hero-student.webp")} alt="A smiling secondary-school student holding his notes" width={900} height={1350} className="aspect-[4/5] w-full object-cover object-top" />
            </div>
            <div className="absolute -left-4 top-8 flex items-center gap-3 rounded-container bg-background p-3 pr-4 text-foreground shadow-lift sm:-left-10">
              <span className="grid size-10 place-items-center rounded-pill bg-mint-tint text-success"><Clock aria-hidden className="size-5" /></span>
              <div>
                <p className="text-small font-bold">Matched in 24 hours</p>
                <p className="text-label text-muted-foreground">2–3 hand-checked tutors</p>
              </div>
            </div>
            <div className="absolute -right-3 bottom-24 rounded-container bg-background p-3 text-foreground shadow-lift sm:-right-8">
              <p className="text-label text-muted-foreground">O-Level Mathematics, 8 weeks</p>
              <div className="mt-1.5"><GradeJump before="D" after="A*" /></div>
            </div>
            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-container bg-background px-4 py-3 text-foreground shadow-lift">
              <div className="flex -space-x-2">
                {featuredStories.slice(0, 4).map((t, i) => <Avatar key={t.name} initials={t.initial} i={i} size="sm" />)}
              </div>
              <div>
                <Stars rating={5} />
                <p className="text-label text-muted-foreground">Rated 5.0 by parents</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS (overlaps hero) */}
      <Container className="relative z-10 -mt-16">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-panel bg-border shadow-card lg:grid-cols-4">
          {stats.map((s, i) => (
            <li key={s.l} className="flex items-center gap-4 bg-background p-6">
              <span className={cn("grid size-12 shrink-0 place-items-center rounded-container", tint(i))}><s.icon aria-hidden className="size-6" /></span>
              <div>
                <p className="text-h3 font-bold tabular-nums">{s.v}</p>
                <p className="text-small text-muted-foreground">{s.l}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      {/* WHY CHOOSE US */}
      <section className="py-20 lg:py-28">
        <Container>
          <Heading eyebrow="Why Tutoring Galaxy" title="Built for results, written by hand" lead="Most platforms hand you a list. We hand you a mentor who keeps notes." center />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((f, i) => {
              const Icon = ICONS[f.icon];
              return (
                <li key={f.t} className="group rounded-panel border border-border bg-background p-7 shadow-card transition-transform duration-200 hover:-translate-y-1">
                  <span className={cn("grid size-12 place-items-center rounded-container", tint(i))}><Icon aria-hidden className="size-6" /></span>
                  <h3 className="mt-5 text-lead font-bold">{f.t}</h3>
                  <p className="mt-2 text-muted-foreground">{f.d}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-sky-tint py-20 lg:py-28">
        <Container>
          <Heading eyebrow="How it works" title="From first enquiry to academic success" lead="Five simple steps. Your first class is free, and you only continue if it's the right tutor." center />
          <ol className="relative mt-14 grid gap-6 lg:grid-cols-5">
            <span aria-hidden className="absolute top-7 right-[10%] left-[10%] hidden h-0.5 bg-gold/40 lg:block" />
            {howItWorks.map((s, i) => (
              <li key={s.t} className="relative rounded-panel bg-background p-6 shadow-card lg:text-center">
                <span className="relative z-10 grid size-14 place-items-center rounded-pill bg-navy text-h3 font-bold text-on-dark ring-4 ring-sky-tint lg:mx-auto">{i + 1}</span>
                <h3 className="mt-5 font-bold">{s.t}</h3>
                <p className="mt-2 text-small text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Button asChild size="lg"><Link href="/book">Start with step 1</Link></Button>
          </div>
        </Container>
      </section>

      {/* CURRICULA */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading eyebrow="Every major board" title="Tutoring for every curriculum" lead="Cambridge, Edexcel, IB, AQA, Pakistani boards and US admissions tests, taught by subject specialists." />
            <Button asChild variant="secondary"><Link href="/curricula">All curricula</Link></Button>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {curricula.filter((c) => c.page).slice(0, 8).map((c, i) => (
              <li key={c.slug}>
                <Link href={`/curricula/${c.slug}`} className="group flex h-full flex-col rounded-panel border border-border p-6 transition-shadow hover:shadow-card">
                  <span className={cn("grid size-11 place-items-center rounded-container text-small font-bold", tint(i))}>{c.short.slice(0, 2)}</span>
                  <h3 className="mt-4 text-lead font-bold">{c.short}</h3>
                  <p className="mt-1 text-small text-muted-foreground">{c.board}</p>
                  <p className="mt-auto pt-4 text-label font-semibold text-navy-soft group-hover:underline">Explore {c.short}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* TUTORS */}
      <section className="bg-surface py-20 lg:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading eyebrow="Meet our tutors" title="Hand-picked experts, worldwide" lead="Subject specialists from leading universities, rated by the families they teach." />
            <Button asChild variant="secondary"><Link href="/tutors">Browse all tutors</Link></Button>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTutors.map((t, i) => (
              <li key={t.slug} className="flex flex-col rounded-panel border border-border bg-background p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <Avatar initials={t.initials} i={i} size="lg" />
                  <div className="min-w-0">
                    <h3 className="truncate font-bold">{t.name}</h3>
                    <p className="truncate text-small text-muted-foreground">{t.title}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Stars rating={t.rating} />
                  <span className="text-small font-semibold tabular-nums">{t.rating.toFixed(2)}</span>
                  <span className="text-small text-muted-foreground">({t.reviews} reviews)</span>
                </div>
                <p className="mt-3 text-small text-muted-foreground">{t.bio}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {t.highlights.slice(0, 3).map((h) => <li key={h} className="rounded-pill bg-sky-tint px-2.5 py-0.5 text-label font-medium text-navy-soft">{h}</li>)}
                </ul>
                <div className="mt-auto flex items-center justify-between border-t border-rule pt-4">
                  <span className="text-small font-bold tabular-nums">{t.hourlyRate}</span>
                  <span className="text-label text-muted-foreground">{t.experienceYears}+ yrs</span>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* RESULTS */}
      <section className={cn("py-20 lg:py-28", dark ? "starfield text-on-dark" : "bg-gold-tint")}>
        <Container>
          <Heading eyebrow="Real results" title="What parents and students say" lead="Grade jumps from families across Pakistan, the Gulf, the UK and beyond." dark={dark} center />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredStories.map((t, i) => (
              <li key={t.name} className={cn("flex flex-col rounded-panel border p-6", dark ? "border-on-dark/10 bg-on-dark/5 backdrop-blur" : "border-border bg-background shadow-card")}>
                <div className="flex items-center justify-between gap-3">
                  {t.before && t.after ? <GradeJump before={t.before} after={t.after} dark={dark} /> : <span />}
                  <Stars rating={t.rating} />
                </div>
                <p className={cn("mt-3 text-label font-semibold", dark ? "text-gold" : "text-gold-deep")}>{t.subject}{t.duration ? `, ${t.duration}` : ""}</p>
                <blockquote className={cn("mt-3 flex-1", dark && "text-on-dark")}>&ldquo;{t.quote}&rdquo;</blockquote>
                <div className={cn("mt-5 flex items-center gap-3 border-t pt-4", dark ? "border-on-dark/10" : "border-rule")}>
                  <Avatar initials={t.initial} i={i} size="sm" />
                  <div>
                    <p className="text-small font-bold">{t.name}</p>
                    <p className={cn("text-label", dark ? "text-on-dark-muted" : "text-muted-foreground")}>{t.role}, {t.location}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* VETTING */}
      <section className="py-20 lg:py-28">
        <Container>
          <Heading eyebrow="Tutor verification" title="The rigorous 3-step tutor verification" lead={vetting.intro} center />
          <ol className="mt-14 grid gap-5 lg:grid-cols-3">
            {vetting.steps.map((s, i) => (
              <li key={s.t} className={cn("rounded-panel p-7", i === 0 ? "bg-gold-tint" : i === 1 ? "bg-sky-tint" : "bg-mint-tint")}>
                <span className="text-display font-bold leading-none text-navy/15 tabular-nums">0{i + 1}</span>
                <h3 className="mt-2 text-h3">{s.t}</h3>
                <p className="mt-1 font-semibold text-navy-soft">{s.sub}</p>
                <p className="mt-3 text-small text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* FOUNDER */}
      <section className={cn("overflow-x-clip py-20 lg:py-28", dark ? "bg-gold-tint" : "bg-sky-tint")}>
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="relative mx-auto w-full max-w-sm">
            <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-panel bg-gold/30" />
            {/* eslint-disable-next-line @next/next/no-img-element -- static asset */}
            <img src={withBase("/images/founder-waqas.webp")} alt="Syed Waqas Ahmad, founder and CEO of Tutoring Galaxy" width={640} height={640} className="relative aspect-square w-full rounded-panel object-cover shadow-lift" />
          </div>
          <div>
            <Eyebrow>Mission and leadership</Eyebrow>
            <blockquote className="mt-5 text-h3 font-bold sm:text-h2-sm">&ldquo;{founder.quote}&rdquo;</blockquote>
            {founder.body.map((p) => <p key={p.slice(0, 20)} className="mt-4 text-muted-foreground">{p}</p>)}
            <p className="mt-6 font-bold">Syed Waqas Ahmad</p>
            <p className="text-small text-muted-foreground">Founder & CEO, Tutoring Galaxy</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild><Link href="/about">Read our story</Link></Button>
              <Button asChild variant="secondary"><Link href="/join-as-tutor">Apply to teach with us</Link></Button>
            </div>
          </div>
        </Container>
      </section>

      {/* PRICING + FAQ */}
      <section className="py-20 lg:py-28">
        <Container>
          <Heading eyebrow="Pricing" title="Simple, transparent monthly plans" lead="Start with a free lesson. No long contracts." center />
          <div className="mt-12"><PricingCards plans={plans} /></div>
          <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <Heading eyebrow="FAQ" title="Questions parents ask" lead="Can't find your answer? Message us on WhatsApp and we'll reply in minutes." />
            <FaqList faqs={faqs.slice(0, 6)} />
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="pb-20 lg:pb-28">
        <Container>
          <div className={cn("relative overflow-hidden rounded-panel px-8 py-14 text-center sm:px-14", dark ? "starfield text-on-dark" : "bg-navy text-on-dark")}>
            <h2 className="mx-auto max-w-2xl text-h2-sm text-on-dark sm:text-h2">Every student has the potential to shine.</h2>
            <p className="mx-auto mt-4 max-w-xl text-lead text-on-dark-muted">Start your free trial today and meet a tutor matched to your child&apos;s syllabus within 24 hours.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-gold text-navy-deep hover:bg-gold/90"><Link href="/book">Book a free trial</Link></Button>
              <Button asChild size="lg" variant="secondary" className="border-on-dark/40 bg-transparent text-on-dark hover:bg-on-dark/10">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />WhatsApp us</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
