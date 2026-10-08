import Link from "next/link";
import { Container, PaperLayout, Section, SectionHeading } from "@/components/ui/primitives";
import { ClosingCta, PageIntro, PrimaryActions } from "@/components/sections/blocks";
import { subjects } from "@/data/content/subjects";
import { curricula } from "@/data/content/curricula";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Subjects we teach",
  description:
    "One-to-one tutoring in Mathematics, Physics, Chemistry, Biology, English, Economics, Accounting, Computer Science and more, for every major curriculum. First lesson free.",
  path: "/subjects",
});

const curriculaFor = (slug: string) => curricula.filter((c) => c.subjects.includes(slug)).map((c) => c.short);

export default function SubjectsPage() {
  const main = subjects.filter((s) => s.page);
  const more = subjects.filter((s) => !s.page);
  return (
    <>
      <PageIntro
        title="Subjects we teach"
        lead="Subject specialists for school exams and entry tests. Each tutor teaches to your child's exact syllabus."
        aside={<p>Tutors focus on one or two subjects, so they know the topics, the papers and the common mistakes.</p>}
      >
        <PrimaryActions />
      </PageIntro>

      <Section className="border-t-0">
        <Container>
          <SectionHeading title="Main subjects" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {main.map((s) => (
              <Link
                key={s.slug}
                href={`/subjects/${s.slug}`}
                className="group block rounded-container border border-border p-5 transition-colors hover:border-foreground"
              >
                <h3 className="text-lead font-bold">{s.name}</h3>
                <p className="mt-1 text-small text-muted-foreground">{s.summary}</p>
                <p className="mt-2 text-label text-muted-foreground">{curriculaFor(s.slug).join(", ")}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <PaperLayout margin={<p>Need a subject that isn&apos;t listed? Ask us and we&apos;ll check whether we have a tutor.</p>}>
            <SectionHeading title="Also taught" />
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {more.map((s) => (
                <li key={s.slug} className="border-b border-dashed border-rule py-3">
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-small text-muted-foreground">{s.summary}</p>
                </li>
              ))}
            </ul>
          </PaperLayout>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
