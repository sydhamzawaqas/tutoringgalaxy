import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TutorHub } from "@/components/tutors/hub";
import { TUTOR_SUBJECTS, getTutorSubject, tutorsBySubject } from "@/data/content/tutors";
import { getSubject } from "@/data/content/subjects";
import { pageMetadata } from "@/lib/seo";

// All 21 subjects from the old site. Unknown slugs render notFound() (no `dynamicParams` with Cache Components).
export function generateStaticParams() {
  return TUTOR_SUBJECTS.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tutors/subject/[subject]">): Promise<Metadata> {
  const s = getTutorSubject((await params).subject);
  if (!s) notFound();
  const n = tutorsBySubject(s.slug).length;
  return pageMetadata({
    title: `${s.name} tutors: verified experts, online and at home`,
    description: `Browse verified ${s.name} tutors with qualifications, availability and ratings. ${s.blurb} First trial lesson free.`,
    path: `/tutors/subject/${s.slug}`,
    // Empty hubs are thin pages: keep them out of the index until a tutor is listed.
    noindex: n === 0,
  });
}

export default async function SubjectTutorsPage({ params }: PageProps<"/tutors/subject/[subject]">) {
  const s = getTutorSubject((await params).subject);
  if (!s) notFound();
  const list = tutorsBySubject(s.slug);
  const known = getSubject(s.slug);
  return (
    <TutorHub
      noun={s.name}
      name={`${s.name} tutors`}
      path={`/tutors/subject/${s.slug}`}
      eyebrow={`${s.name} tutors`}
      title={`Verified ${s.name} tutors`}
      lead={`${known?.summary ?? s.blurb} Hand-picked, qualification-checked ${s.name} tutors, online worldwide or at home in Islamabad and Rawalpindi. The first trial lesson is free.`}
      list={list}
      lock={{ subject: s.slug }}
      trialHref={known ? `/book?subject=${s.slug}` : "/book"}
      message={`Hi Tutoring Galaxy, I'd like a free trial lesson with a ${s.name} tutor.`}
    />
  );
}
