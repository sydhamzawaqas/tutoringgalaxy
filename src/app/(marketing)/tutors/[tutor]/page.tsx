import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, Clock, GraduationCap, Home, Languages, Laptop, MapPin, MessageSquareQuote, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/brand/marks";
import { Avatar, Stars, tint } from "@/components/home/parts";
import { TierBadge, VerificationBadges } from "@/components/tutors/badges";
import { TutorProfileCard } from "@/components/tutors/tutor-card";
import { TutorsClosingCta } from "@/components/tutors/sections";
import { CERTIFICATION_BY_ID } from "@/data/legacy/certifications";
import { countryFlag } from "@/data/legacy/teachers";
import { curriculumName, getTutor, getTutorCountry, similarTutors, subjectName, tutors } from "@/data/content/tutors";
import { site, whatsappLink } from "@/data/content/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

// `dynamicParams` isn't available with Cache Components; unknown slugs render notFound() below.
export function generateStaticParams() {
  return tutors.map((t) => ({ tutor: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tutors/[tutor]">): Promise<Metadata> {
  const t = getTutor((await params).tutor);
  if (!t) notFound();
  return pageMetadata({
    title: `${t.name}, ${t.headline}`,
    description: `${t.intro} ${t.title}, ${t.experienceYears}+ years teaching. Book a free trial lesson.`.slice(0, 160),
    path: `/tutors/${t.slug}`,
    // CONFIRM: unconfirmed profiles stay out of search until the client confirms the tutor.
    noindex: !t.confirmed,
  });
}

function personJsonLd(t: NonNullable<ReturnType<typeof getTutor>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t.name,
    jobTitle: t.headline,
    description: t.bio,
    url: `${site.url}/tutors/${t.slug}`,
    address: { "@type": "PostalAddress", addressLocality: t.city, addressCountry: t.country },
    knowsLanguage: t.languages,
    knowsAbout: t.subjects.map(subjectName),
    hasCredential: t.certifications.map((id) => ({ "@type": "EducationalOccupationalCredential", name: CERTIFICATION_BY_ID[id]?.label ?? id })),
    alumniOf: t.university ? { "@type": "CollegeOrUniversity", name: t.university } : undefined,
    worksFor: { "@type": "EducationalOrganization", name: site.name, url: site.url },
  };
}

export default async function TutorPage({ params }: PageProps<"/tutors/[tutor]">) {
  const t = getTutor((await params).tutor);
  if (!t) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Tutors", path: "/tutors" },
    { name: t.name, path: `/tutors/${t.slug}` },
  ];
  const firstName = t.name.split(" ")[0];
  const message = `Hi Tutoring Galaxy, I'd like a free trial lesson with ${t.name} (${t.headline}).`;
  const bookHref = `/book?tutor=${t.slug}`;
  const similar = similarTutors(t, 3);
  const idx = tutors.findIndex((x) => x.slug === t.slug);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {/* Person data only once the client has confirmed the tutor is real and consenting. */}
      {t.confirmed ? <JsonLd data={personJsonLd(t)} /> : null}

      {/* Header */}
      <section className="starfield relative overflow-hidden text-on-dark">
        <span aria-hidden className="absolute -top-32 -right-24 size-96 rounded-pill bg-gold/15 blur-3xl" />
        <Container className="relative pt-6 pb-12 lg:pb-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-1.5 text-small text-on-dark-muted">
              <li>
                <Link href="/" className="hover:text-on-dark hover:underline">Home</Link> /
              </li>
              <li>
                <Link href="/tutors" className="hover:text-on-dark hover:underline">Tutors</Link> /
              </li>
              <li aria-current="page" className="text-on-dark">{t.name}</li>
            </ol>
          </nav>
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-start">
            <span aria-hidden className={cn("grid size-24 shrink-0 place-items-center rounded-panel text-h2-sm font-bold ring-4 ring-on-dark/10", tint(idx))}>
              {t.initials}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <TierBadge tier={t.tier} size="md" />
                {/* CONFIRM: the old site marked every teacher "ID verified"; client to confirm checks were done per tutor. */}
                <span className="inline-flex items-center gap-1 rounded-pill bg-on-dark/10 px-3 py-1 text-small font-semibold text-on-dark">
                  <ShieldCheck aria-hidden className="size-4 text-gold" />
                  ID and qualifications checked
                </span>
              </div>
              <h1 className="mt-4 text-h1-sm text-on-dark sm:text-h1">{t.name}</h1>
              <p className="mt-2 text-lead text-on-dark-muted">{t.headline}</p>
              <p className="mt-4 flex flex-wrap items-center gap-2 text-small">
                <Stars rating={t.rating} />
                <span className="font-bold tabular-nums">{t.rating.toFixed(2)}</span>
                <span className="text-on-dark-muted">({t.reviews} reviews)</span>
                <span aria-hidden className="text-on-dark-muted">·</span>
                <span className="font-semibold text-gold">{t.rate.display}</span>
                <span aria-hidden className="text-on-dark-muted">·</span>
                <span>{t.experienceYears}+ years teaching</span>
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-small text-on-dark-muted">
                <li className="flex items-center gap-1.5">
                  <MapPin aria-hidden className="size-4" />
                  <span aria-hidden>{countryFlag(t.countrySlug)}</span> {t.city}, {t.country}
                </li>
                <li className="flex items-center gap-1.5">
                  <Clock aria-hidden className="size-4" />
                  {t.timezone}
                </li>
                <li className="flex items-center gap-1.5">
                  <Languages aria-hidden className="size-4" />
                  {t.languages.join(", ")}
                </li>
                {t.university ? (
                  <li className="flex items-center gap-1.5">
                    <GraduationCap aria-hidden className="size-4" />
                    {t.university}
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12 lg:py-16">
        <div className="min-w-0 space-y-6">
          {/* About */}
          <section aria-labelledby="about" className="rounded-panel border border-border bg-background p-6 shadow-card sm:p-8">
            <h2 id="about" className="text-h3">About {firstName}</h2>
            <p className="mt-4 text-lead">{t.intro}</p>
            <p className="mt-3 text-muted-foreground">{t.bio}</p>
            <figure className="mt-6 rounded-container border-l-4 border-gold bg-gold-tint p-5">
              <figcaption className="text-label font-semibold text-gold-deep">Teaching philosophy</figcaption>
              <blockquote className="mt-2 font-note text-note italic text-navy">&ldquo;{t.approach}&rdquo;</blockquote>
            </figure>
            {t.highlights.length ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {t.highlights.map((h, i) => (
                  <li key={h} className={cn("rounded-pill px-3 py-1 text-small font-semibold", tint(i))}>
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>

          {/* Qualifications + verification */}
          <section aria-labelledby="qualifications" className="rounded-panel border border-border bg-background p-6 shadow-card sm:p-8">
            <h2 id="qualifications" className="text-h3">Qualifications and verification</h2>
            <ul className="mt-4 space-y-2">
              {t.qualifications.map((q) => (
                <li key={q} className="flex gap-2.5">
                  <GraduationCap aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-deep" />
                  {q}
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-small font-bold">Certifications</h3>
            <div className="mt-3">
              <VerificationBadges ids={t.certifications} size="md" />
            </div>
            <div className="mt-6 flex flex-col gap-3 rounded-container bg-surface p-4 sm:flex-row sm:items-center">
              <TierBadge tier={t.tier} />
              <p className="text-small text-muted-foreground">{t.tier.blurb}</p>
            </div>
          </section>

          {/* Subjects + curricula */}
          <section aria-labelledby="teaches" className="rounded-panel border border-border bg-background p-6 shadow-card sm:p-8">
            <h2 id="teaches" className="text-h3">What {firstName} teaches</h2>
            <h3 className="mt-5 text-small font-bold">Subjects</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {t.subjects.map((s) => (
                <li key={s}>
                  <Link href={`/tutors/subject/${s}`} className="inline-flex rounded-pill bg-sky-tint px-3 py-1 text-small font-semibold text-navy-soft hover:underline">
                    {subjectName(s)}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-5 text-small font-bold">Curricula and exams</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {t.curricula.map((c) => (
                <li key={c}>
                  <Link href={`/tutors/curriculum/${c}`} className="inline-flex rounded-pill border border-border px-3 py-1 text-small font-medium hover:border-gold hover:bg-gold-tint">
                    {curriculumName(c)}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-5 text-small font-bold">Families served in</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {t.countriesServed.map((c) => {
                const country = getTutorCountry(c);
                return country ? (
                  <li key={c}>
                    <Link href={`/tutors/country/${c}`} className="inline-flex items-center gap-1.5 rounded-pill bg-surface px-3 py-1 text-small hover:underline">
                      <span aria-hidden>{country.flag}</span>
                      {country.name}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </section>

          {/* Availability */}
          <section aria-labelledby="availability" className="rounded-panel border border-border bg-background p-6 shadow-card sm:p-8">
            <h2 id="availability" className="text-h3">Availability and lessons</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {t.availability.map((a, i) => (
                <li key={a} className="flex items-center gap-3 rounded-container border border-border p-3">
                  <span className={cn("grid size-9 shrink-0 place-items-center rounded-container", tint(i + 1))}>
                    <CalendarClock aria-hidden className="size-4.5" />
                  </span>
                  <span className="text-small font-medium">{a}</span>
                </li>
              ))}
              <li className="flex items-center gap-3 rounded-container border border-border p-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-container bg-mint-tint text-success">
                  <Laptop aria-hidden className="size-4.5" />
                </span>
                <span className="text-small font-medium">Online lessons, anywhere</span>
              </li>
              {t.modes.includes("home") ? (
                <li className="flex items-center gap-3 rounded-container border border-border p-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-container bg-gold-tint text-gold-deep">
                    <Home aria-hidden className="size-4.5" />
                  </span>
                  <span className="text-small font-medium">Home lessons in {t.city}</span>
                </li>
              ) : null}
            </ul>
            <p className="mt-4 text-small text-muted-foreground">Times are in the tutor&apos;s time zone ({t.timezone}). We confirm a slot that works for you before the trial.</p>
          </section>

          {/* Reviews */}
          {/* CONFIRM: the old site's written reviews were templated, so none are shown. Add real, consented reviews here. */}
          <section aria-labelledby="reviews" className="rounded-panel border border-border bg-background p-6 shadow-card sm:p-8">
            <h2 id="reviews" className="text-h3">Reviews</h2>
            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="rounded-container bg-gold-tint px-6 py-4 text-center">
                <p className="text-h2 font-bold text-navy tabular-nums">{t.rating.toFixed(2)}</p>
                <Stars rating={t.rating} />
                <p className="mt-1 text-label text-muted-foreground">{t.reviews} reviews</p>
              </div>
              <div className="flex gap-3">
                <MessageSquareQuote aria-hidden className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                <p className="text-small text-muted-foreground">
                  Average rating from {t.reviews} family reviews. Written reviews will appear here once they have been checked with the families.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sticky booking card */}
        <aside aria-label={`Book ${firstName}`} className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-panel border border-border bg-background p-6 shadow-lift">
            <div className="flex items-center gap-3">
              <Avatar initials={t.initials} i={idx} />
              <div className="min-w-0">
                <p className="truncate font-bold">{t.name}</p>
                <p className="text-small text-muted-foreground">
                  <span className="font-bold text-navy">{t.rate.display}</span>
                </p>
              </div>
            </div>
            <ul className="mt-5 space-y-2 border-y border-dashed border-rule py-4 text-small">
              <li className="flex justify-between gap-3"><span className="text-muted-foreground">Experience</span><span className="font-semibold">{t.experienceYears}+ years</span></li>
              <li className="flex justify-between gap-3"><span className="text-muted-foreground">Lessons</span><span className="text-right font-semibold">{t.modes.includes("home") ? `Online or at home` : "Online"}</span></li>
              <li className="flex justify-between gap-3"><span className="text-muted-foreground">Level</span><span className="font-semibold">L{t.tier.level} {t.tier.label}</span></li>
              <li className="flex justify-between gap-3"><span className="text-muted-foreground">First lesson</span><span className="font-semibold text-success">Free</span></li>
            </ul>
            <div className="mt-5 grid gap-2">
              <Button asChild size="lg">
                <Link href={bookHref}>Book a free trial with {firstName}</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  WhatsApp us
                </a>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/match">
                  <Sparkles aria-hidden />
                  Compare with Smart Match
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-label text-muted-foreground">We check {firstName}&apos;s availability first and confirm within a day.</p>
          </div>
        </aside>
      </Container>

      {similar.length ? (
        <section className="bg-surface py-16 lg:py-20" aria-labelledby="similar">
          <Container>
            <h2 id="similar" className="text-h2-sm sm:text-h2">Similar tutors</h2>
            <p className="mt-3 text-lead text-muted-foreground">Other tutors who teach {subjectName(t.subjects[0])} and the same curricula.</p>
            <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {similar.map((s, i) => (
                <li key={s.slug}>
                  <TutorProfileCard t={s} i={i + 1} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <TutorsClosingCta
        title="Not quite the right fit?"
        lead="Tell us the subject, syllabus and times that suit you. We'll suggest a tutor within a day, and the first lesson is free."
        message={message}
        trialHref={bookHref}
      />
    </>
  );
}
