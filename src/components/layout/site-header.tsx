import Link from "next/link";
import { LogIn, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { Wordmark } from "@/components/brand/marks";
import { site } from "@/data/content/site";
import { MegaMenu } from "./mega-menu";
import { MobileMenu } from "./mobile-menu";
import { RegionSelector } from "./region-selector";
import { SocialLinks } from "./social-icons";
import { utilityNav } from "./nav";

/** Dark strip above the header (desktop only; the same links sit at the foot of the mobile menu). */
function UtilityBar() {
  return (
    <div className="hidden bg-navy-deep text-on-dark-muted lg:block">
      <Container className="flex h-10 items-center gap-4 text-label whitespace-nowrap">
        <RegionSelector tone="dark" align="start" />
        <nav aria-label="Utility" className="ml-auto">
          <ul className="flex items-center gap-1">
            {utilityNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded-control px-2 py-1 font-medium transition-colors hover:text-on-dark">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" className="ml-1 inline-flex items-center gap-1.5 rounded-control px-2 py-1 font-semibold text-on-dark transition-colors hover:text-gold">
                <LogIn aria-hidden className="size-3.5" />
                Sign in
              </Link>
            </li>
          </ul>
        </nav>
        <SocialLinks className="border-l border-on-dark/15 pl-3" itemClassName="hover:bg-on-dark/10 hover:text-on-dark" />
      </Container>
    </div>
  );
}

export function SiteHeader() {
  return (
    <>
      <UtilityBar />
      <header className="sticky top-0 z-40 border-b border-rule bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <Container className="flex h-16 items-center gap-4">
          <Link href="/" className="shrink-0 rounded-control" aria-label="Tutoring Galaxy home">
            <Wordmark className="h-6 sm:h-7" />
          </Link>
          <div className="ml-auto lg:ml-2">
            <MegaMenu />
          </div>
          <div className="flex items-center gap-2 lg:ml-auto">
            <a
              href={`tel:${site.phone.e164}`}
              className="hidden items-center gap-1.5 rounded-control px-2 py-2 text-small font-semibold whitespace-nowrap text-foreground transition-colors hover:bg-surface xl:inline-flex"
            >
              <Phone aria-hidden className="size-4 text-gold-deep" />
              <span className="sr-only">Call </span>
              {site.phone.display}
            </a>
            <a
              href={`tel:${site.phone.e164}`}
              aria-label={`Call ${site.phone.display}`}
              className="hidden size-10 place-items-center rounded-pill bg-gold-tint text-gold-deep sm:grid lg:hidden"
            >
              <Phone aria-hidden className="size-4" />
            </a>
            <RegionSelector compact className="lg:hidden" />
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/book" data-track="header_book_trial">
                Book a free trial
              </Link>
            </Button>
            <MobileMenu />
          </div>
        </Container>
      </header>
    </>
  );
}
