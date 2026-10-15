"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { ArrowRight, LogIn, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/brand/marks";
import { site, whatsappLink } from "@/data/content/site";
import { tint } from "@/components/home/parts";
import { cn } from "@/lib/utils";
import { megaNav, utilityNav } from "./nav";
import { navIcons } from "./nav-icons";
import { RegionSelector } from "./region-selector";
import { SocialLinks } from "./social-icons";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
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
          <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-rule px-4">
            <Dialog.Title className="text-button font-semibold">Menu</Dialog.Title>
            <div className="flex items-center gap-2">
              <RegionSelector compact />
              <Dialog.Close asChild>
                <Button variant="ghost" size="icon" aria-label="Close menu">
                  <X strokeWidth={1.5} />
                </Button>
              </Dialog.Close>
            </div>
          </div>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>

          <div className="flex-1 overflow-y-auto">
            <nav aria-label="Mobile" className="px-4">
              <Accordion type="single" collapsible>
                {megaNav.map((group) => (
                  <AccordionItem key={group.id} value={group.id}>
                    <AccordionTrigger className="py-3.5 text-body">{group.label}</AccordionTrigger>
                    <AccordionContent className="max-w-none pb-4 text-foreground">
                      <div className="grid gap-4">
                        {group.columns.map((col) => (
                          <div key={col.title}>
                            <p className="text-micro font-semibold text-muted-foreground uppercase">{col.title}</p>
                            <ul className={cn("mt-2 grid gap-1", !col.links.some((l) => l.description) && "grid-cols-2")}>
                              {col.links.map((link, i) => {
                                const Icon = navIcons[link.href];
                                return (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      onClick={close}
                                      className="flex min-h-11 items-center gap-3 rounded-control px-2 py-1.5 text-small font-semibold hover:bg-surface"
                                    >
                                      {Icon ? (
                                        <span aria-hidden className={cn("grid size-8 shrink-0 place-items-center rounded-control", tint(i))}>
                                          <Icon className="size-4" strokeWidth={1.75} />
                                        </span>
                                      ) : null}
                                      {link.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                            {col.all ? (
                              <Link
                                href={col.all.href}
                                onClick={close}
                                className="mt-1 inline-flex min-h-11 items-center gap-1.5 px-2 text-small font-semibold text-navy-soft"
                              >
                                {col.all.label}
                                <ArrowRight aria-hidden className="size-3.5" />
                              </Link>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </nav>

            <ul className="grid grid-cols-2 gap-1 px-4 py-4 text-small">
              {utilityNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={close} className="flex min-h-11 items-center rounded-control px-2 font-medium text-muted-foreground hover:bg-surface hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/login" onClick={close} className="flex min-h-11 items-center gap-1.5 rounded-control px-2 font-semibold hover:bg-surface">
                  <LogIn aria-hidden className="size-4" />
                  Sign in
                </Link>
              </li>
              <li>
                <a href={`tel:${site.phone.e164}`} className="flex min-h-11 items-center gap-1.5 rounded-control px-2 font-semibold hover:bg-surface">
                  <Phone aria-hidden className="size-4" />
                  Call us
                </a>
              </li>
            </ul>
          </div>

          <div className="grid shrink-0 gap-2 border-t border-rule p-4">
            <Button asChild>
              <Link href="/book" onClick={close} data-track="mobile_menu_book_trial">
                Book a free trial
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" data-track="mobile_menu_whatsapp">
                <WhatsAppIcon />
                WhatsApp us
              </a>
            </Button>
            <SocialLinks className="justify-center pt-1" itemClassName="text-muted-foreground hover:bg-surface hover:text-foreground" iconClassName="size-4" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
