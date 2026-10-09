import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { Wordmark } from "@/components/brand/marks";

export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 items-center">
      <Container className="py-24">
        <Link href="/" aria-label="Tutoring Galaxy home">
          <Wordmark className="h-6" />
        </Link>
        <h1 className="mt-10 text-h1-sm sm:text-h1">We couldn&apos;t find that page</h1>
        <p className="mt-4 max-w-measure text-lead text-muted-foreground">
          The link may be old or mistyped. Our site has moved to a new structure, so try the homepage or browse tutors.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/">Go to the homepage</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/tutors">Browse tutors</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
