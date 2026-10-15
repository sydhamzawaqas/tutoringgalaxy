import Link from "next/link";
import { Container, Panel } from "@/components/ui/primitives";
import { site } from "@/data/content/site";

/** Layout for /legal/* pages: draft notice, title, readable measure, contact footer. */
export function LegalPage({
  title,
  lead,
  status,
  children,
}: {
  title: string;
  lead: string;
  /** e.g. "Draft prepared October 2026". Static text: no dates computed at render. */
  status: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-14 lg:py-20">
      <article className="max-w-measure">
        <Panel role="note" aria-label="Draft notice" className="mb-10 p-4">
          <p className="font-semibold">Draft — to be reviewed by the client&apos;s legal adviser</p>
          <p className="mt-1 text-small text-muted-foreground">
            This page is a plain-English draft and is not yet final. {status}.
          </p>
        </Panel>
        <h1 className="text-h1-sm sm:text-h1">{title}</h1>
        <p className="mt-4 text-lead text-muted-foreground">{lead}</p>
        <div className="mt-10 space-y-10">{children}</div>
        <div className="mt-12 border-t border-rule pt-6 text-small text-muted-foreground">
          <p>
            Questions about this page? Email{" "}
            <a href={`mailto:${site.email}`} className="text-foreground underline underline-offset-4">
              {site.email}
            </a>{" "}
            or see our{" "}
            <Link href="/contact" className="text-foreground underline underline-offset-4">
              contact page
            </Link>
            .
          </p>
        </div>
      </article>
    </Container>
  );
}

export function LegalSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2 id={id} className="text-h3">
        {title}
      </h2>
      <div className="space-y-3 text-muted-foreground">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 marker:text-muted-foreground">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}
