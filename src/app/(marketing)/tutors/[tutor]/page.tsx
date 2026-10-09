import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, Container, Mark, Panel, PaperLayout, Section } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/brand/marks";
import { Breadcrumbs, ContextClosingCta, MarginFacts } from "@/components/sections/directory";
import { getCurriculum } from "@/data/content/curricula";
import { getSubject } from "@/data/content/subjects";
import { getTutor, tutors } from "@/data/content/tutors";
import { whatsappLink } from "@/data/content/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// `dynamicParams` isn't available with Cache Components; unknown slugs render notFound() below.
export function generateStaticParams() {
  return tutors.map((t) => ({ tutor: t.slug }));
}

type Props = { params: Promise<{ tutor: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getTutor((await params).tutor);
  if (!t) notFound();
  return pageMetadata({
    title: `${t.name}, ${t.headline}`,
    description: `${t.headline}. ${t.qualifications.join(", ")}, ${t.experienceYears} years teaching. ${t.bio}`,
    path: `/tutors/${t.slug}`,
    // Example profiles must never be indexed.
    noindex: t.example,
  });
}

export default async function TutorPage({ params }: Props) {
  const t = getTutor((await params).tutor);
  if (!t) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Tutors", path: "/tutors" },
    { name: t.name, path: `/tutors/${t.slug}` },
  ];
  const tutorCurricula = t.curricula.map((c) => getCurriculum(c)).filter((c) => c !== undefined);
  const tutorSubjects = t.subjects.map((s) => getSubject(s)).filter((s) => s !== undefined);
  const firstName = t.name.split(" ")[0];
  const trialLabel = t.example ? "Book a free trial with a tutor like this" : `Book a free trial with ${firstName}`;
  const message = t.example
    ? `Hi Tutoring Galaxy, I'd like a free trial with a tutor like ${t.name} (${t.headline}).`
    : `Hi Tutoring Galaxy, I'd like a free trial lesson with ${t.name}.`;

  return (
    <>
      {/* Breadcrumb data only for real profiles; example profiles are noindex. */}
      {t.example ? null : <JsonLd data={breadcrumbJsonLd(crumbs)} />}
      <Breadcrumbs items={crumbs} />

      <Container className="py-14 lg:py-20">
        {t.example ? (
          <Panel className="mb-10 flex gap-3" role="note">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
            <p>
              <strong className="font-semibold">Example profile.</strong>{" "}
              <span className="text-muted-foreground">
                This shows the format of a tutor profile. It isn&apos;t a real tutor. We&apos;ll match you with a real tutor who teaches the same subjects.
              </span>
            </p>
          </Panel>
        ) : null}

        <PaperLayout
          margin={
            <MarginFacts
              facts={[
                { label: "Qualifications", value: t.qualifications.join(", ") },
                { label: "Experience", value: <Mark>{t.experienceYears} years</Mark> },
                {
                  label: "Lessons",
                  value: t.modes.includes("home") && t.city ? `Online, or at home in ${t.city}` : "Online",
                },
              ]}
            />
          }
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div
              aria-hidden
              className="grid size-24 shrink-0 place-items-center rounded-container border border-border bg-surface text-h2-sm font-bold"
            >
              {t.initials}
            </div>
            <div className="min-w-0">
              {t.example ? <Badge className="mb-3">Example profile</Badge> : null}
              <h1 className="text-h1-sm sm:text-h1">{t.name}</h1>
              <p className="mt-3 text-lead text-muted-foreground">{t.headline}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={`/book?tutor=${t.slug}`}>{trialLabel}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp us
              </a>
            </Button>
          </div>

          <Section className="mt-12 py-10 lg:py-12">
            <h2 className="text-h3">About</h2>
            <p className="mt-3 max-w-measure">{t.bio}</p>

            <h2 className="mt-10 text-h3">Teaching approach</h2>
            <p className="mt-3 max-w-measure">{t.approach}</p>

            <h2 className="mt-10 text-h3">Curricula</h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {tutorCurricula.map((c) => (
                <li key={c.slug}>
                  {c.page ? (
                    <Link href={`/curricula/${c.slug}`} className="underline underline-offset-4 hover:text-muted-foreground">
                      {c.name}
                    </Link>
                  ) : (
                    c.name
                  )}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-h3">Subjects</h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {tutorSubjects.map((s) => (
                <li key={s.slug}>
                  {s.page ? (
                    <Link href={`/subjects/${s.slug}`} className="underline underline-offset-4 hover:text-muted-foreground">
                      {s.name}
                    </Link>
                  ) : (
                    s.name
                  )}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-h3">Lessons</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {t.modes.map((m) => (
                <Badge key={m}>{m === "online" ? "Online" : `At home${t.city ? `: ${t.city}` : ""}`}</Badge>
              ))}
            </div>
          </Section>
        </PaperLayout>
      </Container>

      <ContextClosingCta
        title="Not quite the right fit?"
        lead="Tell us the subject, syllabus and times that suit you. We'll suggest a tutor within a day, and the first lesson is free."
        message={message}
        trialHref={`/book?tutor=${t.slug}`}
      />
    </>
  );
}
