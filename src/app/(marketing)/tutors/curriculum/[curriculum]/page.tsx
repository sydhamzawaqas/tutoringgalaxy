import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TutorHub } from "@/components/tutors/hub";
import { TUTOR_CURRICULA, getTutorCurriculum, tutorsByCurriculum } from "@/data/content/tutors";
import { getCurriculum } from "@/data/content/curricula";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return TUTOR_CURRICULA.map((c) => ({ curriculum: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tutors/curriculum/[curriculum]">): Promise<Metadata> {
  const c = getTutorCurriculum((await params).curriculum);
  if (!c) notFound();
  const n = tutorsByCurriculum(c.slug).length;
  return pageMetadata({
    title: `${c.name} tutors: curriculum specialists`,
    description: `Browse ${c.name} tutors who know the syllabus and its papers. ${c.blurb} Filter by subject, country and certification. First trial lesson free.`,
    path: `/tutors/curriculum/${c.slug}`,
    noindex: n === 0,
  });
}

export default async function CurriculumTutorsPage({ params }: PageProps<"/tutors/curriculum/[curriculum]">) {
  const c = getTutorCurriculum((await params).curriculum);
  if (!c) notFound();
  const list = tutorsByCurriculum(c.slug);
  const known = getCurriculum(c.slug);
  return (
    <TutorHub
      noun={c.name}
      name={`${c.name} tutors`}
      path={`/tutors/curriculum/${c.slug}`}
      eyebrow={known ? known.board : "Curriculum specialists"}
      title={`${c.name} tutors`}
      lead={`${known?.summary ?? c.blurb} Every tutor here has taught ${c.name} and works from your exact syllabus and past papers.`}
      list={list}
      lock={{ curriculum: c.slug }}
      trialHref={known ? `/book?curriculum=${c.slug}` : "/book"}
      message={`Hi Tutoring Galaxy, I'd like a free trial lesson with a ${c.name} tutor.`}
    />
  );
}
