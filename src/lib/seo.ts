import type { Metadata } from "next";
import { createElement } from "react";
import { site } from "@/data/content/site";
import type { Faq } from "@/data/content/faqs";

/** Per-page metadata with a canonical URL. `path` must start with "/". */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

/** Render JSON-LD safely (escapes "<" so content can't close the script tag). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  });
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/app-icon-512.png`,
    foundingDate: String(site.foundedYear),
    email: site.email,
    telephone: site.phone.e164,
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "PK" },
    sameAs: Object.values(site.social),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}
