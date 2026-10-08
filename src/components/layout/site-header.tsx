import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { Wordmark } from "@/components/brand/marks";
import { MobileMenu } from "./mobile-menu";
import { mainNav } from "./nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <Container className="flex h-16 items-center gap-6">
        <Link href="/" className="shrink-0 rounded-control" aria-label="Tutoring Galaxy home">
          <Wordmark className="h-6 sm:h-7" />
        </Link>
        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-control px-3 py-2 text-button font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Link href="/login" className="hidden rounded-control px-3 py-2 text-button font-medium text-muted-foreground hover:text-foreground sm:block">
            Log in
          </Link>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/book">Book a free trial</Link>
          </Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
