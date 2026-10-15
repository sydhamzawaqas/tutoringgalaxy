import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/directory";
import { Band, CatalogHero, CtaBand } from "@/components/catalog/hero";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { FeaturedPost } from "@/components/blog/featured-post";
import { blogCategories, getCategory, posts, postsInCategory, toSummary } from "@/data/content/blog";
import { getCurriculum } from "@/data/content/curricula";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// All 27 categories are prerendered; any other slug renders notFound().
export function generateStaticParams() {
  return blogCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/category/[category]">): Promise<Metadata> {
  const cat = getCategory((await params).category);
  if (!cat) notFound();
  return pageMetadata({
    title: `${cat.name} articles and study guides`,
    description: `${cat.count} ${cat.name} ${cat.count === 1 ? "article" : "articles"} from Tutoring Galaxy: exam tips, revision strategies and guides for students and parents.`,
    path: `/blog/category/${cat.slug}`,
  });
}

export default async function BlogCategoryPage({ params }: PageProps<"/blog/category/[category]">) {
  const cat = getCategory((await params).category);
  if (!cat) notFound();

  const list = postsInCategory(cat.name).map(toSummary);
  const curriculumSlug = list.find((p) => p.curriculumSlug)?.curriculumSlug;
  const curriculum = curriculumSlug ? getCurriculum(curriculumSlug) : undefined;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: cat.name, path: `/blog/category/${cat.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <CatalogHero
        eyebrow="Blog category"
        title={cat.name}
        accent={cat.count === 1 ? "article" : "articles"}
        lead={`${cat.count} ${cat.count === 1 ? "article" : "articles"} on ${cat.name}: exam tips, revision strategies and guides from our tutors.`}
        aside={list[0] ? <FeaturedPost post={list[0]} /> : undefined}
      >
        {curriculum?.page ? (
          <Link href={`/curricula/${curriculum.slug}`} className="inline-flex items-center gap-1.5 rounded-pill border border-on-dark/20 bg-on-dark/5 px-4 py-2 text-small font-semibold text-on-dark hover:border-gold/60">
            Explore {curriculum.short} tutoring <ArrowRight aria-hidden className="size-4 text-gold" />
          </Link>
        ) : null}
      </CatalogHero>

      <Band>
        <h2 className="sr-only">{cat.name} articles</h2>
        <BlogExplorer posts={list} categories={blogCategories} total={posts.length} active={cat.slug} />
      </Band>

      <CtaBand
        title={curriculum ? `Want a ${curriculum.short} specialist?` : "Want personalised study tips?"}
        lead="Book a free trial with a tutor who specialises in your exam board."
        trialHref={curriculum ? `/book?curriculum=${curriculum.slug}` : undefined}
      />
    </>
  );
}
