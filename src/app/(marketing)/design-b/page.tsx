import { HomeGalaxy } from "@/components/home/home-galaxy";
import { site } from "@/data/content/site";
import { currentYear } from "@/lib/dates";
import { pageMetadata } from "@/lib/seo";

// Temporary: design option B for the client to compare. Remove once a direction is chosen.
export const metadata = pageMetadata({ title: "Homepage design option B", description: site.description, path: "/design-b", noindex: true });

export default async function DesignBPage() {
  const yearsTeaching = (await currentYear()) - site.foundedYear;
  return <HomeGalaxy yearsTeaching={yearsTeaching} variant="bright" />;
}
