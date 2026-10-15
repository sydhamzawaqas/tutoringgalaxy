import Link from "next/link";
import { Check, Clock, MailCheck, ShieldCheck, Star, Users, Video, Wallet, Rocket, UserRoundCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, PaperLayout, SheetCard } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/brand/marks";
import { Heading, tint } from "@/components/home/parts";
import { TutorsHero } from "@/components/tutors/sections";
import { TutorApplicationForm } from "@/components/forms/tutor-application-form";
import { curricula } from "@/data/content/curricula";
import { site, whatsappLink } from "@/data/content/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Become a tutor: teach with Tutoring Galaxy",
  description:
    "Apply to join Tutoring Galaxy's vetted tutor network. Teach O Level, A Level, IGCSE, IB, Matric, FSc, MDCAT or SAT students online, or at home in Islamabad and Rawalpindi.",
  path: "/join-as-tutor",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Become a tutor", path: "/join-as-tutor" },
];

// From the old /join-as-tutor page.
// CONFIRM: pay ranges, weekly payouts and "we handle payments" must match how tutors are really paid
// before launch (old site: PKR 1,500–5,000/hr locally, USD 15–60/hr internationally).
const benefits = [
  { icon: Wallet, title: "Competitive earnings", body: "PKR 1,500–5,000/hr locally · USD 15–60/hr internationally. Weekly payouts." },
  { icon: Clock, title: "Flexible schedule", body: "Choose your own hours and subjects. Teach online, at home, or both." },
  { icon: Users, title: "Serious students", body: "Pre-qualified families ready to commit to regular lessons." },
  { icon: ShieldCheck, title: "Backed by our brand", body: "We handle marketing, scheduling and payments. You focus on teaching." },
];

// CONFIRM: each step and the "first student within 7 days" timing match what really happens.
const process = [
  { icon: MailCheck, title: "Apply online", body: "Complete this short form with your qualifications and preferred subjects." },
  { icon: Video, title: "Verification interview", body: "Video call with our academic team, plus a 30-minute demo lesson." },
  { icon: UserRoundCog, title: "Onboarding", body: "Set up your profile, rates and availability with our team." },
  { icon: Rocket, title: "Start teaching", body: "Get matched with your first student, usually within 7 days." },
];

const mustHave = [
  "Bachelor's degree or higher (or in your final year)",
  "1+ year of teaching or tutoring experience",
  "Fluent English communication",
  "Reliable internet and a laptop for online sessions",
  "Right to work or freelance in your country",
];

const niceToHave = [
  "Cambridge, Edexcel or IB examiner background",
  "MSc, PhD or a professional qualification (CFA, ACCA, MBBS)",
  "Experience on another tutoring platform",
  "Digital whiteboard or iPad workflow",
];

const demoLooksFor = [
  "You have taught a specific syllabus before, and know its papers and mark schemes",
  "You can explain an idea simply, then check the student really understood it",
  "You are reliable: on time, prepared and in touch with parents",
];

export default function JoinAsTutorPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <TutorsHero
        crumbs={crumbs}
        eyebrow="Careers · Educators"
        title="Become a Tutoring Galaxy tutor"
        lead="Join our vetted network of expert tutors. Teach students across Pakistan, the UAE, the UK, Saudi Arabia, the USA and beyond, on your schedule. We match you with students on the exact syllabus you've taught."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-gold text-navy-deep shadow-lift hover:bg-gold/90">
            <Link href="#apply">Apply now</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="border-on-dark/40 bg-transparent text-on-dark hover:bg-on-dark/10">
            <a href={whatsappLink("Hi Tutoring Galaxy, I'd like to ask about teaching with you.")} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Ask on WhatsApp
            </a>
          </Button>
        </div>
      </TutorsHero>

      {/* Benefits */}
      <Container className="relative z-10 -mt-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <li key={b.title} className="rounded-panel border border-border bg-background p-6 shadow-card">
              <span className={cn("grid size-12 place-items-center rounded-container", tint(i))}>
                <b.icon aria-hidden className="size-6" />
              </span>
              <h2 className="mt-4 text-lead font-bold">{b.title}</h2>
              <p className="mt-1.5 text-small text-muted-foreground">{b.body}</p>
            </li>
          ))}
        </ul>
      </Container>

      {/* Hiring process */}
      <section className="py-16 lg:py-24">
        <Container>
          <Heading eyebrow="Hiring process" title="From application to first student in 7 days" center />
          <ol className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <span aria-hidden className="absolute top-7 right-[12%] left-[12%] hidden h-0.5 bg-gold/40 lg:block" />
            {process.map((s, i) => (
              <li key={s.title} className="relative rounded-panel border border-border bg-background p-6 shadow-card lg:text-center">
                <span className="relative z-10 grid size-14 place-items-center rounded-pill bg-navy text-h3 font-bold text-on-dark ring-4 ring-background lg:mx-auto">
                  {i + 1}
                </span>
                <h3 className="mt-5 flex items-center gap-2 font-bold lg:justify-center">
                  <s.icon aria-hidden className="size-4.5 text-gold-deep" />
                  {s.title}
                </h3>
                <p className="mt-2 text-small text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Requirements */}
      <section className="bg-surface py-16 lg:py-24">
        <Container>
          <Heading eyebrow="Requirements" title="Who we're looking for" lead="Specialists who know their syllabus, explain clearly and turn up prepared." />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <div className="rounded-panel border border-border bg-background p-6 shadow-card sm:p-7">
              <h3 className="flex items-center gap-2 text-lead font-bold">
                <span className="grid size-9 place-items-center rounded-container bg-mint-tint text-success">
                  <Check aria-hidden className="size-5" strokeWidth={2.5} />
                </span>
                Must-have
              </h3>
              <ul className="mt-5 space-y-3">
                {mustHave.map((x) => (
                  <li key={x} className="flex gap-2.5 text-small">
                    <Check aria-hidden className="mt-0.5 size-4.5 shrink-0 text-success" strokeWidth={2} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-panel border border-border bg-background p-6 shadow-card sm:p-7">
              <h3 className="flex items-center gap-2 text-lead font-bold">
                <span className="grid size-9 place-items-center rounded-container bg-gold-tint text-gold-deep">
                  <Star aria-hidden className="size-5" />
                </span>
                Nice-to-have
              </h3>
              <ul className="mt-5 space-y-3">
                {niceToHave.map((x) => (
                  <li key={x} className="flex gap-2.5 text-small">
                    <Star aria-hidden className="mt-0.5 size-4.5 shrink-0 text-gold-deep" strokeWidth={1.75} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="starfield rounded-panel p-6 text-on-dark shadow-card sm:p-7">
              <h3 className="flex items-center gap-2 text-lead font-bold text-on-dark">
                <span className="grid size-9 place-items-center rounded-container bg-gold text-navy-deep">
                  <Video aria-hidden className="size-5" />
                </span>
                In your demo lesson
              </h3>
              <ul className="mt-5 space-y-3">
                {demoLooksFor.map((x) => (
                  <li key={x} className="flex gap-2.5 text-small text-on-dark-muted">
                    <Check aria-hidden className="mt-0.5 size-4.5 shrink-0 text-gold" strokeWidth={2} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Application form */}
      <section id="apply" className="scroll-mt-24 py-16 lg:py-24">
        <Container>
          <PaperLayout
            margin={
              <>
                <p>
                  We use these details only to review your application and contact you about it. See the privacy policy for how long we keep them.
                </p>
                <p className="mt-4">
                  Questions before you apply?{" "}
                  <a
                    href={whatsappLink("Hi Tutoring Galaxy, I'd like to ask about teaching with you.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline underline-offset-4"
                  >
                    WhatsApp us
                  </a>{" "}
                  or email{" "}
                  <a href={`mailto:${site.email}`} className="break-all text-foreground underline underline-offset-4">
                    {site.email}
                  </a>
                  .
                </p>
              </>
            }
          >
            <Heading eyebrow="Apply now" title="Tutor application" lead="All fields are required. It takes about 10 minutes." />
            <SheetCard className="mt-8 rounded-panel p-6 shadow-card sm:p-8">
              <TutorApplicationForm curricula={curricula.map((c) => ({ slug: c.slug, short: c.short }))} />
            </SheetCard>
          </PaperLayout>
        </Container>
      </section>
    </>
  );
}
