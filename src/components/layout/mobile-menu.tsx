"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/brand/marks";
import { whatsappLink } from "@/data/content/site";
import { mainNav } from "./nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu strokeWidth={1.5} />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/30" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-background shadow-float focus:outline-none">
          <div className="flex h-16 items-center justify-between border-b border-rule px-4">
            <Dialog.Title className="text-button font-semibold">Menu</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close menu">
                <X strokeWidth={1.5} />
              </Button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
          <nav aria-label="Mobile" className="flex flex-col p-2">
            {[...mainNav, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }, { href: "/login", label: "Log in" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-control px-3 py-3 text-body font-medium hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto grid gap-2 border-t border-rule p-4">
            <Button asChild>
              <Link href="/book" onClick={() => setOpen(false)}>
                Book a free trial
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp us
              </a>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
