import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  CalendarClock,
  CalendarDays,
  Check,
  ClipboardList,
  Clock,
  Compass,
  FileCheck2,
  Globe2,
  GraduationCap,
  Home,
  LineChart,
  MapPin,
  NotebookPen,
  Presentation,
  Route,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/brand/marks";
import { FaqList, PricingCards } from "@/components/sections/blocks";
import { Avatar, Eyebrow, Glow, GradeJump, Heading, tint } from "./parts";
import { HeroCarousel, type CarouselTutor } from "./hero-carousel";
import { TutorFinder } from "./tutor-finder";
import { RegionFinder, type RegionCard } from "./region-finder";
import { ProcessTabs } from "./process-tabs";
import { TutorExplorer, type ExplorerTutor } from "./tutor-explorer";
import { TestimonialWall, type WallTestimonial } from "./testimonial-wall";
import { comparison, founder, hero, howItWorks, journey, outcomeNotes, regionCards, services, vetting, whyChooseUs } from "@/data/content/home";
import { TESTIMONIALS } from "@/data/legacy/testimonials";
import { TEACHERS, countryFlag } from "@/data/legacy/teachers";
import { TUTOR_BY_SLUG } from "@/data/legacy/tutors";
import { AREAS, CITIES, CITY_BY_SLUG, CURRICULUM_BY_SLUG, REGIONS, SUBJECT_BY_SLUG } from "@/data/legacy/seo";
import { curricula, getCurriculum } from "@/data/content/curricula";
import { plans } from "@/data/content/pricing";
import { faqs } from "@/data/content/faqs";
import { whatsappLink } from "@/data/content/site";
import { withBase } from "@/lib/base-path";
import { cn } from "@/lib/utils";

/* ---------- data shaping (server only; client parts receive plain props) ---------- */

const WHY_ICONS = { sparkles: Sparkles, award: Award, notebook: NotebookPen, calendar: CalendarClock, book: BookOpen, shield: ShieldCheck } as const;
const SERVICE_ICONS = { brain: Brain, compass: Compass, book: BookOpen, trophy: Trophy, sparkles: Sparkles, users: Users } as const;
const JOURNEY_ICONS = [ClipboardList, Route, CalendarDays, LineChart, Trophy];
const VETTING_ICONS = [FileCheck2, GraduationCap, Presentation];

const subjectName = (s: string) => SUBJECT_BY_SLUG[s]?.name ?? s.replace(/-/g, " ");
const curriculumName = (c: string) => CURRICULUM_BY_SLUG[c]?.name ?? c.toUpperCase();

// CONFIRM: tutor profiles, ratings and review counts come from the old site's tutor list.
const carouselTutors: CarouselTutor[] = hero.featuredTutorSlugs
  .map((s) => TUTOR_BY_SLUG[s])
  .filter(Boolean)
  .map((t) => ({
    slug: t.slug,
    name: t.name,
    initials: t.initials,
    title: t.title,
    place: `${t.city}, ${t.country}`,
    subjects: t.subjects.map(subjectName),
    rating: t.rating,
    reviews: t.reviews,
    experienceYears: t.experienceYears,
    highlight: t.highlights[0],
  }));

const explorerTutors: ExplorerTutor[] = [...TEACHERS]
  .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
  .map((t) => {
    const onlineOnly = [...t.availability, ...t.highlights].some((x) => /online only/i.test(x));
    return {
      slug: t.slug,
      name: t.name,
      initials: t.initials,
      title: t.title,
      place: `${t.city}, ${t.country}`,
      flag: countryFlag(t.countrySlug),
      university: t.university,
      subjects: t.subjects,
      subjectNames: t.subjects.map(subjectName),
      curricula: t.curricula,
      curriculumNames: t.curricula.map(curriculumName),
      online: t.mode.includes("online") || t.mode.includes("hybrid"),
      home: !onlineOnly && (t.mode.includes("in-home") || t.mode.includes("hybrid")),
      rating: t.rating,
      reviews: t.reviews,
      experienceYears: t.experienceYears,
      hourlyRate: t.hourlyRate,
      bio: t.bio,
    };
  });

const regions: RegionCard[] = regionCards.map((r) => {
  const cities = CITIES.filter((c) => c.region === r.slug);
  const legacy = REGIONS.find((x) => x.slug === r.slug);
  const keywords = [r.name, r.slug, legacy?.name, ...r.curricula, ...(legacy?.curricula ?? []).map(curriculumName), ...cities.map((c) => c.name)]
    .join(" ")
    .toLowerCase();
  return { ...r, cities: cities.length, keywords };
});

// CONFIRM: reviews carried over from the old site; client to confirm each family agreed to be quoted.
const wall: WallTestimonial[] = TESTIMONIALS.map((t) => ({
  name: t.name,
  initials: t.name.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase(),
  role: t.role,
  location: t.location,
  flag: t.flag,
  city: t.citySlug,
  cityName: CITY_BY_SLUG[t.citySlug]?.name ?? t.location.split(",").at(-2)?.trim() ?? t.citySlug,
  subject: t.subject,
  subjectSlug: t.subjectSlug,
  subjectName: t.subjectSlug ? subjectName(t.subjectSlug) : undefined,
  quote: t.quote,
  rating: t.rating,
  before: t.before,
  after: t.after,
  duration: t.duration,
}));

/** "Recent result" pill: the first real testimonial with a grade jump. */
const recent = TESTIMONIALS.find((t) => t.before && t.after)!;
const recentName = `${recent.name.split(" ")[0]} ${recent.name.split(" ")[1]?.[0] ?? ""}.`;
const recentCity = CITY_BY_SLUG[recent.citySlug]?.name ?? recent.location;

const heroChips = hero.curricula.map((c) => ({ ...c, href: getCurriculum(c.slug)?.page ? `/curricula/${c.slug}` : "/curricula" }));

const AREA_CITIES = [
  { slug: "islamabad", name: "Islamabad" },
  { slug: "rawalpindi", name: "Rawalpindi" },
] as const;
const isGuide = (slug: string) => slug.endsWith("-islamabad");
const areaGuides = AREAS.filter((a) => a.city === "islamabad" && isGuide(a.slug));

const avgRating = (TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length).toFixed(1);
const reviewCities = new Set(TESTIMONIALS.map((t) => t.citySlug)).size;

/** FAQs shown on the homepage (old homepage showed 8). Also used for the FAQPage JSON-LD. */
export const HOME_FAQS = faqs.slice(0, 8);

/* ---------- page ---------- */

export function HomeGalaxy({ yearsTeaching }: { yearsTeaching: number }) {
  const stats = [
    { icon: Clock, v: `${yearsTeaching}+`, l: "Years tutoring families", n: outcomeNotes.years },
    { icon: Globe2, v: `${REGIONS.length}`, l: "Countries served", n: outcomeNotes.countries },
    { icon: MapPin, v: `${CITIES.length}`, l: "Cities covered", n: outcomeNotes.cities },
    { icon: Sparkles, v: "<24h", l: "Tutor match commitment", n: outcomeNotes.match },
  ];

  return (
    <>
      {/* 1. HERO */}
      <section className="starfield relative overflow-hidden text-on-dark">
        <Glow className="-top-40 -left-40 size-96 bg-navy-soft/60" />
        <Container className="relative grid items-center gap-12 pt-14 pb-36 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:pt-20 lg:pb-44">
          <div>
            <Eyebrow dark>{hero.pill}</Eyebrow>
            <h1 className="mt-6 text-h1-sm text-on-dark sm:text-h1 lg:text-display">
              {hero.title} <span className="text-gold">{hero.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lead text-on-dark-muted">{hero.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-navy-deep shadow-lift hover:bg-gold/90">
                <Link href="/book">
                  Book a free trial
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="border-on-dark/40 bg-transparent text-on-dark hover:bg-on-dark/10">
                <a href={whatsappLink("Hi! I'd like to book a free trial lesson with Tutoring Galaxy.")} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
            {/* Guarantee strip */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {[...hero.checks, hero.guarantee].map((c, i) => (
                <li key={c} className="inline-flex items-center gap-1.5 rounded-pill border border-on-dark/10 bg-on-dark/5 px-3 py-1 text-small text-on-dark">
                  {i === hero.checks.length ? <ShieldCheck aria-hidden className="size-4 text-gold" /> : <Check aria-hidden className="size-4 text-gold" strokeWidth={2.5} />}
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="text-label font-semibold text-on-dark-muted">We tutor for</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {heroChips.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={c.href}
                      className="inline-flex rounded-pill border border-on-dark/15 bg-on-dark/5 px-3 py-1 text-label font-semibold text-on-dark transition-colors hover:border-gold hover:text-gold"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Photo + rotating featured-tutor card */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <Glow className="-inset-8 bg-gold/15" />
            <div className="relative hidden overflow-hidden rounded-panel border border-on-dark/15 bg-navy-soft shadow-lift sm:ml-auto sm:block sm:w-3/5">
              {/* eslint-disable-next-line @next/next/no-img-element -- static asset, also used in the static preview */}
              <img src={withBase("/images/hero-student.webp")} alt="A smiling secondary-school student holding his notes" width={900} height={1350} className="aspect-[4/5] w-full object-cover object-top" />
            </div>
            <div className="relative sm:-mt-56 sm:w-4/5">
              <HeroCarousel tutors={carouselTutors} />
            </div>
            {/* Recent result, from a real testimonial */}
            <div className="relative mt-4 flex items-center gap-3 rounded-container bg-background p-3 pr-4 text-foreground shadow-lift sm:absolute sm:top-10 sm:left-0 sm:mt-0">
              <span className="grid size-10 shrink-0 place-items-center rounded-pill bg-gold-tint text-gold-deep"><Trophy aria-hidden className="size-5" /></span>
              <div className="min-w-0">
                <p className="text-label font-semibold text-muted-foreground">Recent result</p>
                <p className="text-small font-bold">{recentName}, {recentCity}</p>
                <p className="text-label text-muted-foreground">{recent.subject}</p>
              </div>
              <GradeJump before={recent.before!} after={recent.after!} />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. TUTOR FINDER (overlaps hero) + OUTCOMES */}
      <section className="relative pb-16 lg:pb-20">
        <Container className="relative z-10 -mt-24">
          <TutorFinder />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <li key={s.l} className={cn("flex gap-4", i > 0 && "lg:border-l lg:border-dashed lg:border-border lg:pl-6")}>
                <span className={cn("grid size-12 shrink-0 place-items-center rounded-container", tint(i))}><s.icon aria-hidden className="size-6" /></span>
                <div>
                  <p className="text-h2-sm font-bold tabular-nums">{s.v}</p>
                  <p className="text-small font-semibold">{s.l}</p>
                  <p className="mt-1 font-note text-small italic text-muted-foreground">{s.n}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3. FIND YOUR REGION */}
      <section className="relative overflow-hidden bg-surface py-20 lg:py-28">
        <Glow className="-top-24 right-0 size-96 bg-sky-tint" />
        <Glow className="bottom-0 -left-24 size-80 bg-gold-tint" />
        <Container className="relative">
          <Heading eyebrow="Find your region" title="Tutoring for every region and curriculum" lead="Pick your country to see local curricula, cities we cover and the tutors who teach there." center />
          <div className="mt-10">
            <RegionFinder regions={regions} />
          </div>
          <p className="mt-10 text-center text-small text-muted-foreground">Lessons are tailored to your curriculum and local learning standards. Online everywhere, at home in major cities.</p>
        </Container>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-20 lg:py-28">
        <Container>
          <Heading eyebrow="Why Tutoring Galaxy" title="Built for results, written by hand" lead="Most platforms hand you a list. We hand you a mentor who keeps notes." center />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((f, i) => {
              const Icon = WHY_ICONS[f.icon];
              return (
                <li key={f.t} className="group relative rounded-panel border border-border bg-background p-7 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift">
                  <span aria-hidden className="absolute top-6 right-6 text-label font-semibold text-muted-foreground tabular-nums">0{i + 1}</span>
                  <span className={cn("grid size-12 place-items-center rounded-container transition-transform group-hover:scale-110", tint(i))}><Icon aria-hidden className="size-6" /></span>
                  <h3 className="mt-5 text-lead font-bold">{f.t}</h3>
                  <p className="mt-2 text-muted-foreground">{f.d}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* 5. HOW IT WORKS + LEARNING JOURNEY */}
      <section className="relative overflow-hidden bg-sky-tint py-20 lg:py-28">
        <Glow className="-right-32 -bottom-32 size-96 bg-lilac-tint" />
        <Container className="relative">
          <Heading eyebrow="How it works" title="From first enquiry to academic success" lead="A structured educational journey, not hourly tuition. Your first class is free, and you only continue if it's the right tutor." center />
          <div className="mt-10">
            <ProcessTabs
              tabs={[
                {
                  id: "steps",
                  label: "Getting started",
                  hint: "5 simple steps",
                  content: (
                    <ol className="relative grid gap-6 lg:grid-cols-5">
                      <span aria-hidden className="absolute top-7 right-[10%] left-[10%] hidden h-0.5 bg-gold/40 lg:block" />
                      {howItWorks.map((s, i) => (
                        <li key={s.t} className="relative rounded-panel bg-background p-6 shadow-card transition duration-200 hover:-translate-y-1 lg:text-center">
                          <span className="relative z-10 grid size-14 place-items-center rounded-pill bg-navy text-h3 font-bold text-on-dark ring-4 ring-sky-tint lg:mx-auto">{i + 1}</span>
                          <h3 className="mt-5 font-bold">{s.t}</h3>
                          <p className="mt-2 text-small text-muted-foreground">{s.d}</p>
                        </li>
                      ))}
                    </ol>
                  ),
                },
                {
                  id: "journey",
                  label: "The learning journey",
                  hint: "5 stages each term",
                  content: (
                    <>
                      <ol className="grid gap-4 lg:grid-cols-5">
                        {journey.map((s, i) => {
                          const Icon = JOURNEY_ICONS[i];
                          return (
                            <li key={s.t} className="relative flex gap-4 rounded-panel border border-border bg-background p-5 shadow-card lg:flex-col">
                              <span className={cn("grid size-12 shrink-0 place-items-center rounded-container", tint(i))}><Icon aria-hidden className="size-6" /></span>
                              <div>
                                <p className="text-label font-semibold text-muted-foreground">Stage 0{i + 1}</p>
                                <h3 className="mt-1 font-bold">{s.t}</h3>
                                <p className="mt-1.5 text-small text-muted-foreground">{s.d}</p>
                              </div>
                              {i < journey.length - 1 ? (
                                <ArrowRight aria-hidden className="absolute top-9 -right-3.5 z-10 hidden size-5 rounded-pill bg-gold text-navy-deep lg:block" />
                              ) : null}
                            </li>
                          );
                        })}
                      </ol>
                      <p className="mt-6 text-center font-note text-note italic text-annotation">Parents receive the plan in writing before the first paid session.</p>
                    </>
                  ),
                },
              ]}
            />
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg"><Link href="/book">Book your free trial</Link></Button>
            <Button asChild size="lg" variant="secondary">
              <a href={whatsappLink("Hi! I'd like to know how Tutoring Galaxy works.")} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />Ask on WhatsApp</a>
            </Button>
          </div>
        </Container>
      </section>

      {/* 6. SERVICES */}
      <section className="starfield relative overflow-hidden py-20 text-on-dark lg:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading eyebrow="What we offer" title="Comprehensive solutions for every student" lead="Tutoring is the heart of it. Assessments, a learning plan and recognition keep students moving." dark />
            <Button asChild variant="secondary" className="border-on-dark/40 bg-transparent text-on-dark hover:bg-on-dark/10">
              <Link href="/services">View all tutoring services<ArrowRight aria-hidden /></Link>
            </Button>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon];
              return (
                <li key={s.t} className="group relative overflow-hidden rounded-panel border border-on-dark/10 bg-on-dark/5 p-7 backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-gold/40 hover:bg-on-dark/10">
                  <Glow className="-top-16 -right-16 size-40 bg-gold/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className={cn("relative grid size-12 place-items-center rounded-container", tint(i))}><Icon aria-hidden className="size-6" /></span>
                  <h3 className="relative mt-5 text-lead font-bold text-on-dark">{s.t}</h3>
                  <p className="relative mt-2 text-on-dark-muted">{s.d}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* 7. CURRICULA */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading eyebrow="Popular curricula" title="Tutoring for every major exam board" lead="Cambridge, Edexcel, AQA, OCR, IB, College Board and ACT, covered end to end by subject specialists." />
            <Button asChild variant="secondary"><Link href="/curricula">All curricula</Link></Button>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {curricula.filter((c) => c.page).slice(0, 8).map((c, i) => (
              <li key={c.slug}>
                <Link href={`/curricula/${c.slug}`} className="group flex h-full flex-col rounded-panel border border-border bg-background p-6 transition duration-200 hover:-translate-y-1 hover:shadow-card">
                  <span className={cn("flex items-center justify-between rounded-container px-4 py-3", tint(i))}>
                    <h3 className="text-lead font-bold">{c.short}</h3>
                    <GraduationCap aria-hidden className="size-5 transition-transform group-hover:-rotate-12" />
                  </span>
                  <p className="mt-4 text-small font-semibold">{c.board}</p>
                  <p className="mt-0.5 text-label text-muted-foreground">{c.ages}</p>
                  <p className="mt-auto inline-flex items-center gap-1 pt-4 text-label font-semibold text-navy-soft">
                    Explore {c.short}
                    <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 8. TUTORS (filterable) */}
      <section className="relative overflow-hidden bg-surface py-20 lg:py-28">
        <Glow className="-top-32 -left-32 size-96 bg-gold-tint" />
        <Container className="relative">
          <Heading eyebrow="Meet our tutors" title="Hand-picked experts, worldwide" lead="Subject specialists from leading universities, rated by the families they teach. Filter by subject, curriculum and how you'd like lessons." />
          <div className="mt-10">
            {/* CONFIRM: "NUST, FAST, GIKI, LUMS, LSE, Oxford & Cambridge" line is from the old site. */}
            <TutorExplorer tutors={explorerTutors} />
          </div>
        </Container>
      </section>

      {/* 9. VETTING */}
      <section className="py-20 lg:py-28">
        <Container>
          <Heading eyebrow="Tutor verification" title="The rigorous 3-step tutor verification" lead={vetting.intro} center />
          <ol className="mt-14 grid gap-5 lg:grid-cols-3">
            {vetting.steps.map((s, i) => {
              const Icon = VETTING_ICONS[i];
              return (
                <li key={s.t} className={cn("relative overflow-hidden rounded-panel p-7", i === 0 ? "bg-gold-tint" : i === 1 ? "bg-sky-tint" : "bg-mint-tint")}>
                  <span aria-hidden className="absolute top-3 right-5 text-display leading-none font-bold text-navy/10 tabular-nums">0{i + 1}</span>
                  <span className="relative grid size-12 place-items-center rounded-container bg-background text-navy-soft shadow-card"><Icon aria-hidden className="size-6" /></span>
                  <p className="relative mt-5 text-label font-semibold text-muted-foreground">Step 0{i + 1}</p>
                  <h3 className="relative mt-1 text-h3">{s.t}</h3>
                  <p className="relative mt-1 font-semibold text-navy-soft">{s.sub}</p>
                  <p className="relative mt-3 text-small text-muted-foreground">{s.body}</p>
                </li>
              );
            })}
          </ol>
          <p className="mt-8 text-center font-note text-note italic text-annotation">Only a small share of applicants make the panel, and students never see the rest.</p>
        </Container>
      </section>

      {/* 10. COMPARISON */}
      <section className="relative overflow-hidden bg-gold-tint py-20 lg:py-28">
        <Glow className="-right-24 -top-24 size-96 bg-background/70" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <Heading eyebrow="The difference" title="Why parents switch to Tutoring Galaxy" lead="A mentor-led experience, without the boutique price tag." />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg"><Link href="/book">Book your free trial</Link></Button>
              <Link href="/pricing" className="inline-flex items-center gap-1 font-semibold text-navy-soft underline-offset-4 hover:underline">
                See pricing <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-panel border border-border bg-background shadow-lift">
            <table className="w-full text-left text-small">
              <caption className="sr-only">Tutoring Galaxy compared with typical tutoring agencies</caption>
              <thead>
                <tr className="bg-navy text-on-dark">
                  <th scope="col" className="p-4 font-semibold">Feature</th>
                  <th scope="col" className="w-1/4 p-4 text-center font-bold text-gold">Tutoring Galaxy</th>
                  <th scope="col" className="w-1/4 p-4 text-center font-semibold text-on-dark-muted">Typical agencies</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([label, us, them]) => (
                  <tr key={label} className="border-t border-dashed border-rule transition-colors hover:bg-surface">
                    <th scope="row" className="p-4 font-medium">{label}</th>
                    <td className="bg-gold-tint/50 p-4 text-center">
                      {us ? <Check aria-label="Yes" className="mx-auto size-5 text-success" strokeWidth={2.5} /> : <X aria-label="No" className="mx-auto size-5 text-muted-foreground" />}
                    </td>
                    <td className="p-4 text-center">
                      {them ? <Check aria-label="Yes" className="mx-auto size-5 text-muted-foreground" /> : <X aria-label="No" className="mx-auto size-5 text-annotation/60" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 11. TESTIMONIALS */}
      <section className="starfield relative overflow-hidden py-20 text-on-dark lg:py-28">
        <Container>
          <Heading eyebrow="Real results" title="What parents and students say" lead="Reviews shared with us by families across Pakistan, the UAE, the UK, Australia and the Gulf." dark center />
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-panel border border-on-dark/10 bg-on-dark/5 p-5">
            <span className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-container bg-gold text-navy-deep"><Trophy aria-hidden className="size-6" /></span>
              <span>
                <span className="block text-h3 font-bold tabular-nums">{avgRating} / 5</span>
                <span className="block text-label text-on-dark-muted">Average across these reviews</span>
              </span>
            </span>
            <span className="text-small text-on-dark-muted"><b className="text-lead text-on-dark tabular-nums">{TESTIMONIALS.length}</b> family reviews</span>
            <span className="text-small text-on-dark-muted"><b className="text-lead text-on-dark tabular-nums">{reviewCities}</b> cities</span>
            <div className="flex -space-x-2">
              {wall.slice(0, 5).map((t, i) => <Avatar key={t.name + i} initials={t.initials} i={i} size="sm" />)}
            </div>
          </div>
          <div className="mt-12">
            <TestimonialWall items={wall} />
          </div>
        </Container>
      </section>

      {/* 12. HOME TUTORING NEAR YOU */}
      <section className="relative overflow-hidden bg-mint-tint py-20 lg:py-28">
        <Glow className="-left-24 -bottom-24 size-96 bg-background/70" />
        <Container className="relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading eyebrow="Islamabad & Rawalpindi" title="Home tutoring near you" lead="We cover all major areas. Your tutor comes to your home, on your schedule." />
            <Button asChild className="bg-success text-on-dark hover:bg-success/90">
              <a href={whatsappLink("Hi! I need a home tutor near me. Can you help?")} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />WhatsApp us now</a>
            </Button>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {AREA_CITIES.map((c, ci) => {
              const areas = AREAS.filter((a) => a.city === c.slug && !isGuide(a.slug));
              return (
                <div key={c.slug} className="rounded-panel border border-border bg-background p-6 shadow-card sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className={cn("grid size-12 place-items-center rounded-container", tint(ci + 1))}><Home aria-hidden className="size-6" /></span>
                    <div>
                      <h3 className="text-h3">{c.name}</h3>
                      <p className="text-small text-muted-foreground">{areas.length} areas with home tutors</p>
                    </div>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {areas.map((a) => (
                      <li key={a.slug}>
                        <Link
                          href={`/areas/${a.slug}`}
                          title={a.blurb}
                          className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface px-3 py-1.5 text-small font-medium transition hover:-translate-y-0.5 hover:border-success hover:bg-mint-tint"
                        >
                          <MapPin aria-hidden className="size-4 text-success" />
                          {a.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-panel border border-dashed border-success/40 bg-background/60 p-6">
            <p className="text-small font-semibold">Islamabad area guides</p>
            <ul className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-5">
              {areaGuides.map((a) => (
                <li key={a.slug}>
                  <Link href={`/areas/${a.slug}`} className="group flex h-full flex-col rounded-container bg-background p-4 shadow-card transition hover:shadow-lift">
                    <span className="font-bold">{a.name}</span>
                    <span className="mt-1 hidden text-label text-muted-foreground sm:block">{a.blurb}</span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-label font-semibold text-success">
                      Read the guide <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-small text-muted-foreground">Can&apos;t find your area? WhatsApp us and we&apos;ll match you within minutes.</p>
        </Container>
      </section>

      {/* 13. FOUNDER */}
      <section className="overflow-x-clip py-20 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="relative mx-auto w-full max-w-sm">
            <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-panel bg-gold/30" />
            {/* eslint-disable-next-line @next/next/no-img-element -- static asset */}
            <img src={withBase("/images/founder-waqas.webp")} alt="Syed Waqas Ahmad, founder and CEO of Tutoring Galaxy" width={640} height={640} className="relative aspect-square w-full rounded-panel object-cover shadow-lift" />
            <div className="absolute right-3 bottom-3 left-3 rounded-container bg-background/90 px-4 py-2.5 backdrop-blur">
              <p className="text-small font-bold">Syed Waqas Ahmad</p>
              <p className="text-label text-muted-foreground">Founder & CEO, Tutoring Galaxy</p>
            </div>
          </div>
          <div>
            <Eyebrow>Mission and leadership</Eyebrow>
            <blockquote className="mt-5 text-h3 font-bold sm:text-h2-sm">&ldquo;{founder.quote}&rdquo;</blockquote>
            {founder.body.map((p) => <p key={p.slice(0, 20)} className="mt-4 text-muted-foreground">{p}</p>)}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild><Link href="/about">Read our story</Link></Button>
              <Button asChild variant="secondary"><Link href="/join-as-tutor">Apply to teach with us</Link></Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 14. PRICING + FAQ */}
      <section className="bg-surface py-20 lg:py-28">
        <Container>
          <Heading eyebrow="Pricing" title="Simple, transparent monthly plans" lead="Start with a free lesson. No long contracts." center />
          <div className="mt-12"><PricingCards plans={plans} /></div>
          <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <Heading eyebrow="FAQ" title="Questions parents ask" lead="Everything you need to know about our home and online tutors." />
              <Button asChild variant="secondary" className="mt-6">
                <a href={whatsappLink("Hi! I have a question about your tutoring services.")} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />Ask us on WhatsApp</a>
              </Button>
            </div>
            <div className="rounded-panel bg-background px-6 pb-2 shadow-card">
              <FaqList faqs={HOME_FAQS} />
            </div>
          </div>
        </Container>
      </section>

      {/* 15. FINAL CTA */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="starfield relative overflow-hidden rounded-panel px-6 py-14 text-center text-on-dark sm:px-14">
            <Glow className="-top-24 left-1/2 size-80 -translate-x-1/2 bg-gold/20" />
            <div className="relative">
              <div className="flex justify-center -space-x-2">
                {carouselTutors.map((t, i) => <Avatar key={t.slug} initials={t.initials} i={i} />)}
              </div>
              <h2 className="mx-auto mt-6 max-w-2xl text-h2-sm text-on-dark sm:text-h2">Every student has the potential to shine.</h2>
              <p className="mx-auto mt-4 max-w-xl text-lead text-on-dark-muted">Start your free trial today and meet a tutor matched to your child&apos;s syllabus within 24 hours.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-gold text-navy-deep hover:bg-gold/90"><Link href="/book">Book a free trial</Link></Button>
                <Button asChild size="lg" variant="secondary" className="border-on-dark/40 bg-transparent text-on-dark hover:bg-on-dark/10">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />WhatsApp us</a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
