import Link from "next/link";
import { LegalList, LegalPage, LegalSection } from "@/components/sections/legal-page";
import { site, whatsappLink } from "@/data/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Refund policy",
  description: `How payments, cancellations and refund requests work at ${site.name}. The first lesson is free, so you only pay once you've chosen to continue.`,
  path: "/legal/refunds",
});

/*
 * DRAFT for the client's legal adviser.
 * IMPORTANT: the old site advertised "100% money-back on first package". That is NOT confirmed, so this draft
 * does not promise a money-back guarantee. TODO(client): decide the actual refund terms (e.g. unused prepaid
 * lessons, first-month guarantee or none) and replace the "case by case" wording below.
 */
export default function RefundsPage() {
  return (
    <LegalPage
      title="Refund policy"
      lead="The first lesson is free, so you only pay once you've seen the tutor teach and decided to continue. This page explains what happens if things change after that."
      status="Draft prepared October 2026"
    >
      <LegalSection id="trial" title="The free trial">
        <p>The trial lesson is free and needs no payment details, so there is nothing to refund.</p>
      </LegalSection>

      <LegalSection id="not-right" title="If the tutor isn't right">
        <p>
          Tell us first. We&apos;ll match another tutor at no extra cost, and the lessons you&apos;ve paid for carry over to the new tutor.
        </p>
      </LegalSection>

      <LegalSection id="stopping" title="Stopping a monthly plan">
        <LegalList
          items={[
            "Plans run month to month. To stop, tell us before your next month starts and you won't be charged again.",
            "Lessons already paid for can still be taken during that month.",
          ]}
        />
      </LegalSection>

      <LegalSection id="requests" title="Asking for a refund">
        <p>
          If you&apos;d like a refund for lessons you&apos;ve paid for but not taken, contact us with your name, the student&apos;s name and the
          plan. We look at each request individually and will explain our decision. If a refund is agreed, we return it using the same
          method you paid with, where possible.
        </p>
        <p>
          If we cancel lessons and can&apos;t offer a replacement time or tutor, we will refund the lessons that couldn&apos;t go ahead.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="How to contact us">
        <p>
          Email{" "}
          <a href={`mailto:${site.email}`} className="text-foreground underline underline-offset-4">
            {site.email}
          </a>{" "}
          or{" "}
          <a
            href={whatsappLink("Hi Tutoring Galaxy, I have a question about a payment or refund.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            message us on WhatsApp
          </a>
          . See also our{" "}
          <Link href="/legal/terms" className="text-foreground underline underline-offset-4">
            terms of service
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
