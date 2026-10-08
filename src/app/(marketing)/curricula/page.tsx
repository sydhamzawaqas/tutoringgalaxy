import Link from "next/link";
import { Container, PaperLayout, Section, SectionHeading } from "@/components/ui/primitives";
import { ClosingCta, CurriculumCard, PageIntro, PrimaryActions } from "@/components/sections/blocks";
import { curricula, type Curriculum } from "@/data/content/curricula";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Curricula and exam boards we teach",
  description:
    "One-to-one tutoring for Cambridge O Level, IGCSE and A Level, GCSE, IB, Matric, FSc, MDCAT, ECAT and SAT, matched to your exact syllabus. First lesson free.",
  path: "/curricula",
});

const groups: { title: string; lead: string; slugs: string[] }[] = [
  {
    title: "International",
    lead: "Cambridge, Edexcel and IB programmes taught in schools around the world.",
    slugs: ["o-level", "igcse", "a-level", "ib"],
  },
  { title: "UK", lead: "GCSEs with AQA, Edexcel and OCR, taught online at UK-friendly times.", slugs: ["gcse"] },
  { title: "Pakistan", lead: "Federal and provincial board exams, in English or Urdu.", slugs: ["matric", "fsc"] },
  {
    title: "Entry tests and US",
    lead: "Admissions tests for medical, engineering and US universities.",
    slugs: ["mdcat", "ecat", "sat", "ap", "ged"],
  },
];

const bySlug = (slugs: string[]) => slugs.map((s) => curricula.find((c) => c.slug === s)).filter((c): c is Curriculum => Boolean(c));

export default function CurriculaPage() {
  return (
    <>
      <PageIntro
        title="Curricula and exam boards we teach"
        lead="Every curriculum has its own syllabus, papers and mark schemes. We match your child with a tutor who has taught theirs."
        aside={<p>Not sure which syllabus your child follows? Tell us the school and year group and we&apos;ll work it out with you.</p>}
      >
        <PrimaryActions />
      </PageIntro>

      {groups.map((g, i) => {
        const items = bySlug(g.slugs);
        const withPages = items.filter((c) => c.page);
        const withoutPages = items.filter((c) => !c.page);
        return (
          <Section key={g.title} className={i === 0 ? "border-t-0" : undefined}>
            <Container>
              <PaperLayout
                margin={
                  withoutPages.length ? (
                    <p>
                      We also tutor {withoutPages.map((c) => c.name).join(" and ")}.{" "}
                      <Link href="/book" className="text-foreground underline underline-offset-4">
                        Ask us
                      </Link>{" "}
                      about a tutor.
                    </p>
                  ) : undefined
                }
              >
                <SectionHeading title={g.title} lead={g.lead} />
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {withPages.map((c) => (
                    <CurriculumCard key={c.slug} c={c} />
                  ))}
                </div>
              </PaperLayout>
            </Container>
          </Section>
        );
      })}

      <ClosingCta />
    </>
  );
}
