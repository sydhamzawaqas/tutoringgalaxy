import { HomeGalaxy } from "@/components/home/home-galaxy";
import { faqs } from "@/data/content/faqs";
import { site } from "@/data/content/site";
import { currentYear } from "@/lib/dates";
import { JsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Premium home & online tutoring for O Level, A Level, IGCSE and IB",
  description: site.description,
  path: "/",
});

export default async function HomePage() {
  const yearsTeaching = (await currentYear()) - site.foundedYear;
  return (
    <>
      <JsonLd data={faqJsonLd(faqs.slice(0, 6))} />
      <HomeGalaxy yearsTeaching={yearsTeaching} />
    </>
  );
}
