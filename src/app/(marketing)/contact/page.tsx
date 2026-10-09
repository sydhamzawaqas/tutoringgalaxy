import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Panel, Section, SectionHeading, SheetCard } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/brand/marks";
import { PageIntro, PrimaryActions } from "@/components/sections/blocks";
import { site, whatsappLink } from "@/data/content/site";
import { countries } from "@/data/content/countries";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact us",
  description: `Contact ${site.name} on WhatsApp, by phone or by email. Based in ${site.city}, ${site.country}, teaching families online and at home.`,
  path: "/contact",
});

// TODO(client): confirm office/response hours before stating them anywhere. None are shown on purpose.
// TODO(client): confirm whether a street address should be published (only the city is shown now).
const channels = [
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    body: "The quickest way to reach us. Send the subject, exam board and level, and we'll reply with a tutor suggestion.",
    href: whatsappLink(),
    label: `Message ${site.phone.display}`,
    external: true,
  },
  {
    icon: Phone,
    title: "Phone",
    body: "Call us if you'd rather talk it through.",
    href: `tel:${site.phone.e164}`,
    label: `Call ${site.phone.display}`,
    external: false,
  },
  {
    icon: Mail,
    title: "Email",
    body: "For longer questions, invoices or anything you'd like in writing.",
    href: `mailto:${site.email}`,
    label: site.email,
    external: false,
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageIntro
        title="Contact us"
        lead="The fastest way to start is to book a free trial. If you'd like to ask something first, message us on WhatsApp, call or email."
        aside={
          <p className="flex gap-2">
            <MapPin aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
            <span>
              Based in {site.city}, {site.country}. Teaching online in {countries.length} countries.
            </span>
          </p>
        }
      >
        <PrimaryActions />
      </PageIntro>

      <Section className="border-t-0">
        <Container>
          <SectionHeading title="Ways to reach us" />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {channels.map(({ icon: Icon, title, body, href, label, external }) => (
              <li key={title}>
                <SheetCard className="flex h-full flex-col">
                  <Icon aria-hidden className="size-5 text-muted-foreground" strokeWidth={1.5} />
                  <h3 className="mt-3 text-h3">{title}</h3>
                  <p className="mt-2 text-small text-muted-foreground">{body}</p>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-auto flex min-h-11 items-center break-all pt-4 font-semibold underline underline-offset-4 hover:text-muted-foreground"
                  >
                    {label}
                  </a>
                </SheetCard>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-4 md:grid-cols-2">
          <Panel>
            <h2 className="text-h3">Booking a trial lesson?</h2>
            <p className="mt-2 text-muted-foreground">
              The booking form asks for everything we need to match a tutor, so you won&apos;t need to explain twice.
            </p>
            <Button asChild className="mt-4">
              <Link href="/book">Book a free trial</Link>
            </Button>
          </Panel>
          <Panel>
            <h2 className="text-h3">Want to teach with us?</h2>
            <p className="mt-2 text-muted-foreground">Tutors can apply online. Tell us what you teach and we&apos;ll be in touch.</p>
            <Button asChild variant="secondary" className="mt-4">
              <Link href="/join-as-tutor">Apply as a tutor</Link>
            </Button>
          </Panel>
        </Container>
      </Section>
    </>
  );
}
