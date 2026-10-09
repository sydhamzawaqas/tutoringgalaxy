import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { Wordmark } from "@/components/brand/marks";
import { site, whatsappLink } from "@/data/content/site";
import { footerNav } from "./nav";
import { currentYear } from "@/lib/dates";

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="mt-auto bg-navy-deep text-on-dark-muted">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Wordmark reversed className="h-6" />
          <p className="mt-4 text-small">
            One-to-one tutoring, online and at home, since {site.foundedYear}. Based in {site.city}, teaching families in 11 countries.
          </p>
          <ul className="mt-5 space-y-1.5 text-small">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-on-dark underline-offset-4 hover:underline">
                WhatsApp {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="text-on-dark underline-offset-4 hover:underline">
                {site.email}
              </a>
            </li>
          </ul>
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
      </Container>
      <Container className="flex flex-col gap-3 border-t border-on-dark/10 py-6 text-small sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {site.name}</p>
        <ul className="flex gap-4">
          <li><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-on-dark">Facebook</a></li>
          <li><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-on-dark">Instagram</a></li>
          <li><a href={site.social.x} target="_blank" rel="noopener noreferrer" className="hover:text-on-dark">X</a></li>
        </ul>
      </Container>
    </footer>
  );
}
