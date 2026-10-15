import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TutorHub } from "@/components/tutors/hub";
import { TUTOR_COUNTRIES, getTutorCountry, tutorsByCountry } from "@/data/content/tutors";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return TUTOR_COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tutors/country/[country]">): Promise<Metadata> {
  const c = getTutorCountry((await params).country);
  if (!c) notFound();
  const n = tutorsByCountry(c.slug).length;
  return pageMetadata({
    title: `Tutors in ${c.name}: online and certified`,
    description: `Browse certified tutors serving families in ${c.name} across IB, IGCSE, GCSE, A Level, SAT and local curricula. Verified and matched fast. First trial lesson free.`,
    path: `/tutors/country/${c.slug}`,
    noindex: n === 0,
  });
}

export default async function CountryTutorsPage({ params }: PageProps<"/tutors/country/[country]">) {
  const c = getTutorCountry((await params).country);
  if (!c) notFound();
  const list = tutorsByCountry(c.slug);
  const home = c.slug === "pakistan";
  return (
    <TutorHub
      name={`Tutors in ${c.name}`}
      path={`/tutors/country/${c.slug}`}
      eyebrow={`${c.flag} ${c.name}`}
      title={`Certified tutors for families in ${c.name}`}
      lead={`${list.length ? `${list.length} verified educators serve ${c.name}` : `We teach families in ${c.name} online`}. Filter by subject, curriculum and certification${home ? ", or choose home lessons in Islamabad and Rawalpindi" : ""}. The first trial lesson is free.`}
      list={list}
      lock={{ country: c.slug }}
      trialHref="/book"
      message={`Hi Tutoring Galaxy, I'm in ${c.name} and I'd like a free trial lesson.`}
    />
  );
}
