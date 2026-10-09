import { Container, Mark, PaperLayout, SectionHeading } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/brand/marks";
import { BookTrialForm } from "@/components/forms/book-trial-form";
import { whatsappLink } from "@/data/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book a free trial lesson",
  description:
    "Tell us the curriculum, subject and level. We'll WhatsApp you within one working day with a matched tutor, and the first lesson is free.",
  path: "/book",
});

const nextSteps = [
  { title: "We WhatsApp you", body: "To confirm the details and ask anything we need.", mark: "within 1 day" },
  { title: "You see the tutor's profile", body: "Qualifications, experience and how they teach.", mark: "before the lesson" },
  { title: "First lesson", body: "Continue only if it's the right tutor.", mark: "free" },
] as const;

/*
 * The page is static: the form sits in the prerendered shell so it works before (or without) JS,
 * and its no-JS validation response renders in place. Query-string prefill (?curriculum=, ?subject=,
 * ?tutor=, ?plan=) is read on the client inside its own <Suspense> in BookTrialForm.
 */
export default function BookPage() {
  return (
    <Container className="py-14 lg:py-20">
      <PaperLayout
        margin={
          <div className="lg:sticky lg:top-24">
            <h2 className="text-small font-semibold text-foreground">What happens next</h2>
            <ol className="mt-3">
              {nextSteps.map((s) => (
                <li key={s.title} className="border-b border-dashed border-rule py-3 first:pt-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold text-foreground">{s.title}</span>
                    <Mark>{s.mark}</Mark>
                  </div>
                  <p className="mt-1">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4">No payment details needed for the trial.</p>
            <p className="mt-4">
              Prefer to talk it through?{" "}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-foreground underline underline-offset-4"
              >
                <WhatsAppIcon className="size-4" />
                WhatsApp us
              </a>
            </p>
          </div>
        }
      >
        <SectionHeading
          as="h1"
          title="Book a free trial"
          lead="Tell us about the student and when suits you. We match a tutor who has taught that exact syllabus."
        />
        <BookTrialForm />
      </PaperLayout>
    </Container>
  );
}
