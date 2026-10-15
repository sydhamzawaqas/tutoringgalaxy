import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Wordmark, WhatsAppIcon } from "@/components/brand/marks";
import { site, whatsappLink } from "@/data/content/site";
import { currentYear } from "@/lib/dates";
import { FooterRegion } from "./footer-region";
import { SocialLinks } from "./social-icons";
import { footerNav, legalNav } from "./nav";

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="mt-auto bg-navy-deep text-on-dark-muted">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <Wordmark reversed className="h-6" />
            <p className="mt-4 text-small">
              One-to-one tutoring, online and at home, since {site.foundedYear}. Based in {site.city}, teaching families in 11 countries.
            </p>
            <ul className="mt-5 space-y-2 text-small">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" data-track="footer_whatsapp" className="inline-flex items-center gap-2 text-on-dark underline-offset-4 hover:underline">
                  <WhatsAppIcon className="size-4" />
                  WhatsApp {site.phone.display}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.e164}`} className="inline-flex items-center gap-2 text-on-dark underline-offset-4 hover:underline">
                  <Phone aria-hidden className="size-4" />
                  Call {site.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-on-dark underline-offset-4 hover:underline">
                  <Mail aria-hidden className="size-4" />
                  {site.email}
                </a>
              </li>
            </ul>
            <SocialLinks className="mt-5 -ml-1.5" itemClassName="size-9 bg-on-dark/5 hover:bg-on-dark/15 hover:text-on-dark" iconClassName="size-4" />
          </div>
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-small font-bold text-on-dark">{group.title}</h2>
              <ul className="mt-3 space-y-2 text-small">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-on-dark">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <FooterRegion />
      </Container>
      {/* Extra bottom space on sm+ so the floating WhatsApp button never covers the last row. */}
      <Container className="flex flex-col gap-3 border-t border-on-dark/10 py-6 text-small sm:flex-row sm:items-center sm:justify-between sm:pb-24">
        <p>
          © {year} {site.name}
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {legalNav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-on-dark">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
