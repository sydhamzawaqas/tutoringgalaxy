import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Note, PaperLayout, Section, SectionHeading, SheetCard } from "@/components/ui/primitives";
import { Star } from "@/components/brand/marks";
import { MarkedWork } from "@/components/sections/marked-work";
import { ClosingCta, CurriculumCard, FaqList, PricingCards, PrimaryActions, Steps, TutorCard } from "@/components/sections/blocks";
import { trialSteps } from "@/data/content/how-it-works";
import { curricula } from "@/data/content/curricula";
import { tutors } from "@/data/content/tutors";
import { plans } from "@/data/content/pricing";
import { faqs } from "@/data/content/faqs";
import { site } from "@/data/content/site";
import { currentYear } from "@/lib/dates";
import { JsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Expert tutors for O Level, A Level, IGCSE and IB",
  description: site.description,
  path: "/",
});

const homeFaqs = faqs.slice(0, 5);

export default async function HomePage() {
  const yearsTeaching = (await currentYear()) - site.foundedYear;
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />

      {/* 1. Hero */}
      <Container className="grid items-center gap-12 py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:py-24">
        <div>
          <h1 className="text-h1-sm sm:text-h1 lg:text-display">Expert tutors for O Level, A Level, IGCSE and IB</h1>
          <p className="mt-5 max-w-measure text-lead text-muted-foreground">
            Tell us the subject and exam board. We match your child with a tutor who has taught that exact syllabus, online or at home. The first
            lesson is free.
          </p>
          <div className="mt-8">
            <PrimaryActions />
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-small text-muted-foreground">
            {[`Tutoring since ${site.foundedYear}`, "Families in 11 countries", "No payment for the trial"].map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <Check aria-hidden className="size-4 text-success" strokeWidth={2} />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <MarkedWork />
      </Container>

      {/* 2. Trust facts */}
      <div className="border-y border-rule bg-surface">
        <Container className="grid grid-cols-2 gap-6 py-8 text-center md:grid-cols-4">
          {[
            [`${yearsTeaching} years`, "of one-to-one tutoring"],
            ["11 countries", "Pakistan, the Gulf, UK and beyond"],
            [`${curricula.length} curricula`, "from O Level to MDCAT and SAT"],
            ["1 day", "to match a tutor, usually"],
          ].map(([big, small]) => (
            <div key={big}>
              <p className="text-h3 font-bold tabular-nums">{big}</p>
              <p className="text-small text-muted-foreground">{small}</p>
            </div>
          ))}
        </Container>
      </div>

      {/* 3. How a free trial works */}
      <Section className="border-t-0">
        <Container>
          <PaperLayout margin={<p>Most families have their first lesson within two days of getting in touch.</p>}>
            <SectionHeading title="How a free trial works" lead="Three steps, and you only continue if it's the right tutor." />
            <Steps steps={trialSteps} />
            <Button asChild variant="link" className="mt-4 px-0">
              <Link href="/how-it-works">More about how lessons work</Link>
            </Button>
          </PaperLayout>
        </Container>
      </Section>

      {/* 4. Curricula and subjects */}
      <Section>
        <Container>
          <SectionHeading title="Every major curriculum and exam board" lead="Cambridge, Edexcel, IB, Pakistani boards and US admissions tests, taught by subject specialists." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {curricula.filter((c) => c.page).map((c) => (
              <CurriculumCard key={c.slug} c={c} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <Button asChild variant="link" className="px-0">
              <Link href="/curricula">All curricula</Link>
            </Button>
            <Button asChild variant="link" className="px-0">
              <Link href="/subjects">All subjects</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 5. Tutors */}
      <Section>
        <Container>
          <PaperLayout margin={<p>Profiles below are examples of the format. Real tutor profiles, with qualifications checked, replace them before launch.</p>}>
            <SectionHeading title="Tutors who know the syllabus" lead="Every tutor teaches the curricula they know best, and shares their approach before your first lesson." />
          </PaperLayout>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {tutors.map((t) => (
              <TutorCard key={t.slug} t={t} />
            ))}
          </div>
          <Button asChild variant="secondary" className="mt-6">
            <Link href="/tutors">Browse tutors</Link>
          </Button>
        </Container>
      </Section>

      {/* 6. What parents get */}
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="Progress you can actually see"
              lead="After lessons, the tutor sends a short note. Every month you get a report: what was covered, how practice went, and what comes next."
            />
            <ul className="mt-6 space-y-2">
              {["Topic-by-topic scores from practice", "Notes in plain language, not jargon", "A clear plan for the next month"].map((x) => (
                <li key={x} className="flex gap-2.5">
                  <Check aria-hidden className="mt-1 size-4.5 shrink-0 text-success" strokeWidth={1.75} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <SheetCard aria-label="Example monthly report">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lead font-bold">Monthly report</h3>
              <span className="text-label text-muted-foreground">IGCSE Mathematics, example</span>
            </div>
            <table className="mt-4 w-full text-small tabular-nums">
              <thead>
                <tr className="text-left text-label text-muted-foreground">
                  <th className="pb-2 font-semibold">Topic</th>
                  <th className="pb-2 font-semibold">Progress</th>
                  <th className="pb-2 text-right font-semibold">Score</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Quadratics", 88],
                  ["Trigonometry", 64],
                  ["Vectors", 41],
                ].map(([topic, score]) => (
                  <tr key={topic} className="border-t border-rule">
                    <td className="py-2.5">{topic}</td>
                    <td className="py-2.5">
                      <div className="h-2 w-28 overflow-hidden rounded-full bg-rule">
                        <div className="h-full bg-primary" style={{ width: `${score}%` }} />
                      </div>
                    </td>
                    <td className="py-2.5 text-right">{score}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex items-start gap-2.5">
              <Star className="mt-0.5 size-5 shrink-0" />
              <Note>Quadratics mastered. Next month we&apos;ll focus on vectors.</Note>
            </div>
          </SheetCard>
        </Container>
      </Section>

      {/* 7. Pricing teaser and FAQ */}
      <Section>
        <Container>
          <SectionHeading title="Simple monthly plans" lead="Start with a free lesson. Plans are monthly, with no long contract." />
          <div className="mt-8">
            <PricingCards plans={plans} />
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <SectionHeading title="Questions parents ask" />
            <div>
              <FaqList faqs={homeFaqs} />
              <Button asChild variant="link" className="mt-4 px-0">
                <Link href="/faq">All questions</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. Closing CTA */}
      <ClosingCta />
    </>
  );
}
