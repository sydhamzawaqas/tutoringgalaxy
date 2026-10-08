import Link from "next/link";
import { LegalList, LegalPage, LegalSection } from "@/components/sections/legal-page";
import { site } from "@/data/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of service",
  description: `The terms that apply when you book tutoring with ${site.name}: trial lessons, plans, payments, rescheduling and conduct.`,
  path: "/legal/terms",
});

/*
 * DRAFT for the client's legal adviser. Points that need a decision are marked TODO.
 * TODO(client/legal): legal entity name, registered address and governing law/jurisdiction.
 * TODO(client): the rescheduling notice period and missed-lesson rule (proposed: 24 hours).
 * TODO(client/legal): whether tutors are employees or independent contractors, and how that is described.
 * TODO(client): whether online lessons are ever recorded; if so, add consent wording here and in the privacy policy.
 */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      lead={`These terms apply when you book a trial lesson or a plan with ${site.name}. They're written to be read, so please do.`}
      status="Draft prepared October 2026"
    >
      <LegalSection id="service" title="Our service">
        <p>
          We match students with tutors and arrange one-to-one lessons online or, in some cities, at home. We also provide practice tools
          and progress reports on some plans. What each plan includes is shown on our{" "}
          <Link href="/pricing" className="text-foreground underline underline-offset-4">
            pricing page
          </Link>{" "}
          at the time you book.
        </p>
        <p>
          A parent or guardian must book for any student under 18 and agrees to these terms on the student&apos;s behalf.
        </p>
      </LegalSection>

      <LegalSection id="trial" title="The free trial lesson">
        <p>
          The first lesson is free and needs no payment details. After it, you decide whether to continue. There&apos;s no obligation to
          buy a plan.
        </p>
      </LegalSection>

      <LegalSection id="plans" title="Plans and payment">
        <LegalList
          items={[
            "Monthly plans are paid in advance for the month ahead.",
            "Prices are in Pakistani rupees. Families abroad are quoted in local currency before they pay.",
            "Exam programmes and hourly lessons are quoted individually, in writing, before you pay.",
            "Plans continue month to month until you tell us to stop. There's no long contract.",
            "If prices change, we'll tell you before your next month starts.",
          ]}
        />
      </LegalSection>

      <LegalSection id="rescheduling" title="Rescheduling and missed lessons">
        <LegalList
          items={[
            "If you need to move a lesson, tell us or the tutor at least 24 hours before it starts and we'll find another time.",
            "Lessons missed without notice may count as taken.",
            "If a tutor cancels or misses a lesson, we'll rearrange it at no extra cost.",
          ]}
        />
      </LegalSection>

      <LegalSection id="tutors" title="Tutors">
        <p>
          We choose tutors carefully and match them to the syllabus and level your child is studying. If the tutor isn&apos;t the right fit,
          tell us and we&apos;ll match someone else at no extra cost.
        </p>
        <p>
          Please arrange all lessons and payments through us, not privately with the tutor, so that our support, records and these terms
          continue to apply.
        </p>
      </LegalSection>

      <LegalSection id="conduct" title="Safe and respectful lessons">
        <LegalList
          items={[
            "For home lessons, a parent or another adult should be at home while the lesson takes place.",
            "For online lessons, students should join from a shared or open space where possible.",
            "Everyone, including students, parents and tutors, should treat each other with respect. We may end lessons if someone doesn't.",
            "If you're worried about a child's safety or a tutor's behaviour, contact us straight away.",
          ]}
        />
      </LegalSection>

      <LegalSection id="results" title="Results">
        <p>
          Tutoring helps, but exam results depend on many things, including the student&apos;s own work. We don&apos;t promise any
          particular grade or result.
        </p>
      </LegalSection>

      <LegalSection id="practice" title="AI practice and online tools">
        <p>
          Practice tools give feedback to help students learn. Feedback is generated automatically and can occasionally be wrong; tutors
          remain responsible for teaching. Students must not use our tools to complete graded coursework or assessments on their behalf.
        </p>
      </LegalSection>

      <LegalSection id="refunds" title="Refunds">
        <p>
          How refunds work is explained in our{" "}
          <Link href="/legal/refunds" className="text-foreground underline underline-offset-4">
            refund policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="liability" title="Our responsibility to you">
        <p>
          We provide our service with reasonable care and skill. Nothing in these terms limits rights you have by law that can&apos;t be
          limited. Beyond that, our total responsibility for any claim is limited to the amount you paid us in the three months before
          it arose.
        </p>
      </LegalSection>

      <LegalSection id="law" title="Changes and governing law">
        <p>
          We may update these terms. If a change affects your current plan, we&apos;ll tell you before it applies. These terms are governed
          by the laws of {site.country}, and disputes will be handled by the courts of {site.city}, unless the law where you live gives you
          a different right.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
