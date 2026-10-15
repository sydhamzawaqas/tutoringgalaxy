"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/brand/marks";
import { whatsappLink } from "@/data/content/site";

/** The only sticky element on mobile: two actions, no floating bubbles. */
export function MobileCtaBar() {
  // Not on the booking flow itself, where it would duplicate the form's own button.
  const pathname = usePathname();
  if (pathname?.startsWith("/book")) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-rule bg-background/95 p-3 backdrop-blur sm:hidden">
      <Button asChild size="md">
        <Link href="/book">Book a free trial</Link>
      </Button>
      <Button asChild size="md" variant="secondary">
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          WhatsApp
        </a>
      </Button>
    </div>
  );
}
