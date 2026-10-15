import { Breadcrumbs } from "@/components/sections/directory";
import { Band, CatalogHero, CtaBand } from "@/components/catalog/hero";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { FeaturedPost } from "@/components/blog/featured-post";
import { blogCategories, posts, toSummary } from "@/data/content/blog";
import { site } from "@/data/content/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog: exam tips and study guides",
  description: "Expert tips, revision strategies and exam guides for IGCSE, GCSE, O Level, A Level, IB, GED, SAT and ACT students worldwide.",
  path: "/blog",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default function BlogIndexPage() {
  const summaries = posts.map(toSummary);
  const featured = summaries[0];
  const blog = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} blog`,
    url: `${site.url}/blog`,
    publisher: { "@type": "EducationalOrganization", name: site.name, url: site.url },
    blogPost: summaries.slice(0, 20).map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.url}/blog/${p.slug}`, datePublished: p.date })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={blog} />
      <Breadcrumbs items={crumbs} />

      <CatalogHero
        eyebrow="Blog"
        title="Tutoring Galaxy"
        accent="insights"
        lead="Exam tips, revision strategies and curriculum guides from our tutors."
        checks={[`${posts.length} articles`, `${blogCategories.length} topics`, "IGCSE, A Level, IB, SAT and more"]}
        aside={featured ? <FeaturedPost post={featured} /> : undefined}
      />

      <Band>
        <h2 className="sr-only">All articles</h2>
        <BlogExplorer posts={summaries} categories={blogCategories} total={posts.length} />
      </Band>

      <CtaBand title="Want personalised study tips?" lead="Book a free trial with a tutor who specialises in your exam board." />
    </>
  );
}
