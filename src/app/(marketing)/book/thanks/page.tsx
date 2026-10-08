import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Container, Mark, PaperLayout } from "@/components/ui/primitives";
import { Steps } from "@/components/sections/blocks";
import { Tick, WhatsAppIcon } from "@/components/brand/marks";
import { whatsappLink } from "@/data/content/site";
import { LEAD_SUMMARY_COOKIE, createLeadNotificationLink, decodeLeadSummary, leadRefPattern } from "@/lib/leads";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trial request received",
  description: "We've received your free trial request and will WhatsApp you within one working day.",
  path: "/book/thanks",
  noindex: true,
});

const steps = [
  { title: "We WhatsApp you", body: "To confirm the details and answer any questions.", mark: "within 1 working day" },
  { title: "We share a tutor profile", body: "A tutor who has taught that syllabus, with their qualifications and approach.", mark: "before the lesson" },
  { title: "We confirm a time", body: "The first lesson is free. Continue only if it's the right tutor.", mark: "free" },
];

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default function BookThanksPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Container className="py-14 lg:py-20">
      <PaperLayout
        margin={
          <>
            <p>Questions before we reach you? Message us any time on WhatsApp.</p>
            <p className="mt-4">
              Want to look around meanwhile?{" "}
              <Link href="/tutors" className="font-semibold text-foreground underline underline-offset-4">
                Browse tutors
              </Link>
            </p>
          </>
        }
      >
        <div className="flex items-center gap-4">
          {/* The one signature motion: the examiner's tick draws itself on confirmation. */}
          <Tick animate className="size-12 shrink-0" />
          <h1 className="text-h1-sm sm:text-h1">Trial request received</h1>
        </div>
        <p className="mt-5 max-w-measure text-lead text-muted-foreground">
          Thank you. A member of our team will WhatsApp you within one working day to match a tutor and arrange the free lesson.
        </p>

        {/* Reads the ref and a short-lived cookie at request time; the fallback is a complete, generic version. */}
        <Suspense fallback={<SendOnWhatsApp href={whatsappLink("Hi Tutoring Galaxy, I've just requested a free trial lesson on your website.")} />}>
          <RequestDetails searchParams={searchParams} />
        </Suspense>

        <h2 className="mt-14 text-h2-sm sm:text-h2">What happens next</h2>
        <Steps steps={steps} />
      </PaperLayout>
    </Container>
  );
}

async function RequestDetails({ searchParams }: { searchParams: SearchParams }) {
  const { ref: rawRef } = await searchParams;
  // Only a well-formed ref is shown; anything else in the URL is ignored.
  const ref = typeof rawRef === "string" && leadRefPattern.test(rawRef) ? rawRef : null;

  const summary = decodeLeadSummary((await cookies()).get(LEAD_SUMMARY_COOKIE)?.value);
  const href =
    summary && summary.ref === ref
      ? createLeadNotificationLink(summary)
      : whatsappLink(`Hi Tutoring Galaxy, I've just requested a free trial lesson on your website${ref ? ` (ref ${ref})` : ""}.`);

  return <SendOnWhatsApp href={href} reference={ref} />;
}

function SendOnWhatsApp({ href, reference }: { href: string; reference?: string | null }) {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {reference ? (
        <p className="text-small text-muted-foreground">
          Your reference <Mark className="font-semibold text-foreground">{reference}</Mark>
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button asChild size="lg">
          <a href={href} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            Send it on WhatsApp too
          </a>
        </Button>
        <p className="text-small text-muted-foreground">Optional. It opens WhatsApp with your request summarised.</p>
      </div>
    </div>
  );
}
