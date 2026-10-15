import Link from "next/link";
import { LegalList, LegalPage, LegalSection } from "@/components/sections/legal-page";
import { site } from "@/data/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects personal information, including booking details, WhatsApp messages and AI practice data.`,
  path: "/legal/privacy",
});

/*
 * DRAFT for the client's legal adviser. Points that need a decision are marked TODO.
 * TODO(client/legal): confirm the legal entity name and registered address to name as the data controller.
 * TODO(client/legal): confirm retention periods (proposed below) and the AI provider and its data settings.
 * TODO(client/legal): check obligations for families in the UK/EU (UK GDPR / GDPR) and the Gulf, and Pakistan's
 * data protection law status at launch.
 */
export default function PrivacyPage() {
  const email = (
    <a href={`mailto:${site.email}`} className="text-foreground underline underline-offset-4">
      {site.email}
    </a>
  );

  return (
    <LegalPage
      title="Privacy policy"
      lead={`This policy explains what personal information ${site.name} collects, why, who we share it with and how long we keep it. It is written for parents first, because most of our students are children.`}
      status="Draft prepared October 2026"
    >
      <LegalSection id="who" title="Who we are">
        <p>
          {site.name} provides one-to-one tutoring online and at home. We are based in {site.city}, {site.country}, and teach families in
          several countries. In this policy, &ldquo;we&rdquo; and &ldquo;us&rdquo; means {site.name}. You can contact us about privacy at {email}.
        </p>
      </LegalSection>

      <LegalSection id="collect" title="What we collect">
        <p>We only ask for what we need to arrange and run lessons.</p>
        <LegalList
          items={[
            <>
              <strong className="text-foreground">Enquiries and bookings:</strong> the parent&apos;s name, WhatsApp number, email, country and
              city, and the student&apos;s first name, school year, curriculum, exam board, subjects and the topics they find hard.
            </>,
            <>
              <strong className="text-foreground">Lessons:</strong> lesson times, the tutor&apos;s notes after lessons and monthly progress
              reports.
            </>,
            <>
              <strong className="text-foreground">Payments:</strong> what was paid, when and for which plan. We don&apos;t store full card
              details.
            </>,
            <>
              <strong className="text-foreground">AI practice:</strong> the questions a student attempts, their answers and working, the
              feedback given and their scores. See the section on AI practice below.
            </>,
            <>
              <strong className="text-foreground">Tutor applications:</strong> name, contact details, qualifications, experience and the
              answers given in the application form.
            </>,
            <>
              <strong className="text-foreground">Website use:</strong> basic technical information such as pages visited and device type,
              used to keep the site working and secure.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection id="use" title="How we use it">
        <LegalList
          items={[
            "To match a student with a suitable tutor and arrange the free trial",
            "To run lessons, share progress with parents and plan what comes next",
            "To take payments and keep records we are required to keep",
            "To reply to questions and send messages about lessons you have booked",
            "To review tutor applications",
            "To keep the website and the practice area secure and working properly",
          ]}
        />
        <p>We don&apos;t sell personal information, and we don&apos;t use it for third-party advertising.</p>
      </LegalSection>

      <LegalSection id="whatsapp" title="WhatsApp and other messages">
        <p>
          Many families prefer to talk to us on WhatsApp. When you message us there, your messages and number are handled by WhatsApp
          (part of Meta) under its own privacy policy, as well as by us. We use WhatsApp to arrange lessons, share tutor profiles and send
          progress notes.
        </p>
        <p>
          Please don&apos;t send sensitive information, such as medical details or identity documents, on WhatsApp unless we ask for it and
          explain why. If you&apos;d rather we contacted you by email, tell us and we&apos;ll do that instead.
        </p>
      </LegalSection>

      <LegalSection id="children" title="Children and AI practice">
        <p>
          Most of our students are under 18. We collect a child&apos;s information only with the consent of a parent or guardian, who
          books lessons and manages the account on the child&apos;s behalf.
        </p>
        <p>
          AI practice lets students try exam-style questions and get step-by-step feedback. To give that feedback, the student&apos;s
          answers and working are processed by our software and by an AI service provider acting on our instructions. {/* TODO(client): name the AI provider once confirmed. */}
          We ask parents to agree before a child under 18 uses AI practice, and parents can ask us to stop it at any time.
        </p>
        <LegalList
          items={[
            "Students should not type their full name, address or other personal details into practice answers.",
            "The student's tutor and parent can see practice history and results. Other families cannot.",
            "We use practice data to give feedback, show progress and improve our questions, not for advertising.",
            "Parents can ask to see or delete their child's practice data by emailing us.",
          ]}
        />
      </LegalSection>

      <LegalSection id="sharing" title="Who we share it with">
        <LegalList
          items={[
            "The tutor matched with your child, who sees what they need to teach (not your payment details)",
            "Service providers who host our website and data, send messages, process payments or provide AI feedback, under contracts that limit what they can do with it",
            "Authorities, if the law requires it, or to protect a child's safety",
          ]}
        />
        <p>
          Some of these providers store data outside your country, including outside {site.country}. Where that happens we use providers
          with appropriate safeguards.
        </p>
      </LegalSection>

      <LegalSection id="retention" title="How long we keep it">
        {/* TODO(client/legal): confirm these proposed periods. */}
        <LegalList
          items={[
            "Enquiries that don't lead to lessons: up to 12 months after the last contact",
            "Student records, lesson notes, reports and practice data: while lessons continue, then up to 2 years after the last lesson",
            "Payment records: as long as tax and accounting law requires",
            "Tutor applications that don't go ahead: up to 12 months",
          ]}
        />
        <p>After that, we delete the information or make it anonymous.</p>
      </LegalSection>

      <LegalSection id="rights" title="Your choices and rights">
        <p>You can ask us to:</p>
        <LegalList
          items={[
            "show you the information we hold about you or your child",
            "correct anything that's wrong",
            "delete information we don't need to keep",
            "stop sending you messages that aren't about lessons you've booked",
          ]}
        />
        <p>
          Email {email} and we&apos;ll reply as soon as we can. Depending on where you live, for example in the UK or the European Union,
          you may have further rights under local law, including the right to complain to your data protection authority.
        </p>
      </LegalSection>

      <LegalSection id="security" title="Keeping it safe">
        <p>
          We limit who can see personal information to the people who need it, use providers with recognised security practices, and keep
          access to student data behind logins. No system is perfectly secure, so if something goes wrong we will tell affected families
          and fix it.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="Changes to this policy">
        <p>
          If we change this policy in a way that matters, we&apos;ll update this page and tell families with active lessons. See also our{" "}
          <Link href="/legal/terms" className="text-foreground underline underline-offset-4">
            terms of service
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
