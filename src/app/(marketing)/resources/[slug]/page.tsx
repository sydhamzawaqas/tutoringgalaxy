import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Mark, PaperLayout } from "@/components/ui/primitives";
import { Breadcrumbs, ContextClosingCta } from "@/components/sections/directory";
import { getResource, resourceWordCount, resources } from "@/data/content/resources";
import { getCurriculum, type Curriculum } from "@/data/content/curricula";
import { site } from "@/data/content/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// `dynamicParams` isn't available with Cache Components; unknown slugs render notFound() below.
export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = getResource((await params).slug);
  if (!r) notFound();
  return pageMetadata({ title: r.title, description: r.summary, path: `/resources/${r.slug}` });
}

export default async function ResourcePage({ params }: Props) {
  const r = getResource((await params).slug);
  if (!r) notFound();

  const path = `/resources/${r.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides for parents", path: "/resources" },
    { name: r.title, path },
  ];
  const minutes = Math.max(1, Math.round(resourceWordCount(r) / 200));
  const related = r.curricula.map((c) => getCurriculum(c)).filter((c): c is Curriculum => Boolean(c?.page));
  const org = { "@type": "Organization", name: site.name, url: site.url };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: r.title,
          description: r.summary,
          mainEntityOfPage: `${site.url}${path}`,
          url: `${site.url}${path}`,
          inLanguage: "en",
          author: org,
          publisher: { ...org, logo: { "@type": "ImageObject", url: `${site.url}/brand/app-icon-512.png` } },
        }}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <Container className="py-14 lg:py-20">
        <PaperLayout
          margin={
            <nav aria-label="In this guide" className="lg:sticky lg:top-24">
              <p className="text-label font-semibold text-foreground">In this guide</p>
              <ol className="mt-3 space-y-2">
                {r.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="underline-offset-4 hover:text-foreground hover:underline">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
              {related.length ? (
                <>
                  <p className="mt-6 text-label font-semibold text-foreground">Related curricula</p>
                  <ul className="mt-3 space-y-2">
                    {related.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/curricula/${c.slug}`} className="underline-offset-4 hover:text-foreground hover:underline">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </nav>
          }
        >
          <article className="max-w-measure">
            <header>
              <h1 className="text-h1-sm sm:text-h1">{r.title}</h1>
              <p className="mt-5 text-lead text-muted-foreground">{r.summary}</p>
              <p className="mt-4 flex flex-wrap items-center gap-x-3 text-small text-muted-foreground">
                <span>By {site.name}</span>
                <Mark>{minutes} min read</Mark>
              </p>
            </header>

            {r.sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="mt-10 border-t border-rule pt-8">
                <h2 id={`${s.id}-h`} className="text-h2-sm">
                  {s.heading}
                </h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-4">
                    {p}
                  </p>
                ))}
                {s.list ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-muted-foreground">
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
        </PaperLayout>
      </Container>

      <ContextClosingCta
        title="Talk to us about your child"
        lead="Tell us the subject, syllabus and what's hard right now. We'll match a tutor within a day, and the first lesson is free."
        message={r.whatsappMessage}
      />
    </>
  );
}
