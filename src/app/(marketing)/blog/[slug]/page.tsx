import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, ListTree, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { Eyebrow, Heading } from "@/components/home/parts";
import { Breadcrumbs, trialMessage } from "@/components/sections/directory";
import { Band, CtaBand, DarkActions } from "@/components/catalog/hero";
import { Markdown, tableOfContents } from "@/components/blog/markdown";
import { PostCard } from "@/components/blog/post-card";
import { categorySlug, formatPostDate, getPost, posts, relatedPosts } from "@/data/content/blog";
import { getCurriculum } from "@/data/content/curricula";
import { site } from "@/data/content/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const meta = pageMetadata({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}` });
  return {
    ...meta,
    authors: [{ name: p.author }],
    keywords: p.tags,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: p.date, section: p.category, tags: p.tags },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const p = getPost((await params).slug);
  if (!p) notFound();

  const toc = tableOfContents(p.body);
  const related = relatedPosts(p, 3);
  const curriculum = p.curriculumSlug ? getCurriculum(p.curriculumSlug) : undefined;
  const catSlug = categorySlug(p.category);
  const url = `${site.url}/blog/${p.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: p.category, path: `/blog/category/${catSlug}` },
    { name: p.title, path: `/blog/${p.slug}` },
  ];
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    dateModified: p.date,
    articleSection: p.category,
    keywords: p.tags.join(", "),
    wordCount: p.body.split(/\s+/).filter(Boolean).length,
    author: { "@type": "Organization", name: p.author, url: site.url },
    publisher: { "@type": "EducationalOrganization", name: site.name, url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/brand/app-icon-512.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
  const trialHref = curriculum ? `/book?curriculum=${curriculum.slug}` : "/book";
  const message = trialMessage(curriculum ? curriculum.short : p.category);

  return (
    <>
      <JsonLd data={article} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <header className="starfield relative overflow-hidden text-on-dark">
        <Container className="py-14 lg:py-20">
          <div className="max-w-3xl">
            <Link href={`/blog/category/${catSlug}`} className="inline-block rounded-pill focus-visible:outline-gold">
              <Eyebrow dark>{p.category}</Eyebrow>
            </Link>
            <h1 className="mt-6 text-h1-sm text-on-dark sm:text-h1">{p.title}</h1>
            <p className="mt-5 text-lead text-on-dark-muted">{p.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-small text-on-dark-muted">
              <span className="flex items-center gap-2.5">
                <span aria-hidden className="grid size-9 place-items-center rounded-pill bg-gold text-label font-bold text-navy-deep">
                  TG
                </span>
                <span className="font-semibold text-on-dark">{p.author}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays aria-hidden className="size-4 text-gold" />
                <time dateTime={p.date}>{formatPostDate(p.date)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden className="size-4 text-gold" />
                {p.readTime}
              </span>
            </div>
          </div>
        </Container>
      </header>

      <Container className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14 lg:py-16">
        <div className="min-w-0">
          {toc.length > 1 ? (
            <details className="mb-8 rounded-panel border border-border bg-surface p-5 lg:hidden">
              <summary className="flex cursor-pointer items-center gap-2 font-semibold">
                <ListTree aria-hidden className="size-4.5 text-gold-deep" />
                On this page
              </summary>
              <TocList toc={toc} />
            </details>
          ) : null}

          <article className="max-w-measure">
            <Markdown source={p.body} />

            {p.tags.length ? (
              <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-rule pt-6">
                <Tag aria-hidden className="size-4 text-muted-foreground" />
                <span className="sr-only">Tags:</span>
                <ul className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded-pill bg-sky-tint px-3 py-1 text-label font-medium text-navy-soft">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-8 flex gap-4 rounded-panel border border-border bg-background p-6 shadow-card">
              <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-pill bg-navy text-small font-bold text-gold">
                TG
              </span>
              <div>
                <p className="text-label text-muted-foreground">Written by</p>
                <p className="font-bold">{p.author}</p>
                <p className="mt-1 text-small text-muted-foreground">Exam tips, revision strategies and curriculum guides from the tutors at {site.name}.</p>
              </div>
            </div>

            {curriculum?.page ? (
              <Link
                href={`/curricula/${curriculum.slug}`}
                className="group mt-6 flex items-center justify-between gap-4 rounded-panel bg-gold-tint p-6 transition-shadow hover:shadow-card"
              >
                <span>
                  <span className="block text-label font-semibold text-gold-deep">Want a tutor who specialises in {p.category}?</span>
                  <span className="mt-1 block text-lead font-bold">Explore {curriculum.short} tutors</span>
                </span>
                <ArrowRight aria-hidden className="size-5 shrink-0 text-navy transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : null}

            <Button asChild variant="link" className="mt-8 px-0">
              <Link href="/blog">
                <ArrowLeft aria-hidden />
                All articles
              </Link>
            </Button>
          </article>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {toc.length > 1 ? (
              <nav aria-label="On this page" className="rounded-panel border border-border bg-surface p-5">
                <p className="flex items-center gap-2 font-semibold">
                  <ListTree aria-hidden className="size-4.5 text-gold-deep" />
                  On this page
                </p>
                <TocList toc={toc} />
              </nav>
            ) : null}
            <div className="starfield rounded-panel p-6 text-on-dark">
              <p className="text-lead font-bold">Need help with {curriculum?.short ?? p.category}?</p>
              <p className="mt-2 text-small text-on-dark-muted">Book a free trial with a tutor who knows your exam board.</p>
              <DarkActions trialHref={trialHref} message={message} className="mt-5 flex-col [&>*]:w-full" />
            </div>
          </div>
        </aside>
      </Container>

      {related.length ? (
        <Band tone="surface">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading eyebrow="Keep reading" title={`More ${p.category} articles`} />
            <Button asChild variant="secondary">
              <Link href={`/blog/category/${catSlug}`}>All {p.category} articles</Link>
            </Button>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <PostCard post={r} />
              </li>
            ))}
          </ul>
        </Band>
      ) : null}

      <CtaBand title="Book a free trial with a specialist tutor" lead="A personalised study plan from a verified tutor who knows your syllabus." trialHref={trialHref} message={message} />
    </>
  );
}

function TocList({ toc }: { toc: { id: string; text: string; level: 2 | 3 }[] }) {
  return (
    <ol className="mt-3 space-y-1 border-l border-border">
      {toc.map((t) => (
        <li key={t.id}>
          <a
            href={`#${t.id}`}
            className={
              t.level === 3
                ? "-ml-px block border-l border-transparent py-1 pl-7 text-label text-muted-foreground hover:border-navy hover:text-foreground"
                : "-ml-px block border-l border-transparent py-1 pl-4 text-small text-muted-foreground hover:border-navy hover:text-foreground"
            }
          >
            {t.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
