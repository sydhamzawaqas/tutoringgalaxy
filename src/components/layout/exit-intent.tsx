"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CalendarCheck, ClipboardCheck, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/brand/marks";
import { whatsappLink } from "@/data/content/site";
import { track } from "@/lib/analytics";

const SEEN_KEY = "tg_exit_intent_seen_v1";
const ARM_AFTER_MS = 8000;
/** Never interrupt sign-in, the dashboards or the booking form itself. */
const EXCLUDED = /^\/(app|admin|login|signup|auth|reset-password|book)(\/|$)/;

/**
 * Exit-intent offer (desktop only): armed 8 seconds after landing, shown once per browser session
 * when the pointer leaves through the top of the window. Touch devices are skipped; there is no
 * reliable exit signal there and hijacking "back" is hostile.
 */
export function ExitIntent() {
  const pathname = usePathname() ?? "/";
  const excluded = EXCLUDED.test(pathname);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (excluded) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    try {
      if (window.sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      return;
    }

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, ARM_AFTER_MS);

    function onLeave(e: MouseEvent) {
      if (!armed || e.clientY > 0 || e.relatedTarget) return;
      try {
        if (window.sessionStorage.getItem(SEEN_KEY)) return;
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        return;
      }
      setOpen(true);
      track("exit_intent_shown", { page_path: window.location.pathname });
      cleanup();
    }
    function cleanup() {
      window.clearTimeout(armTimer);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    }
    document.documentElement.addEventListener("mouseleave", onLeave);
    return cleanup;
  }, [excluded]);

  if (excluded) return null;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-navy-deep/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-panel bg-background shadow-lift focus:outline-none">
          <div className="starfield px-6 pt-8 pb-6 text-center text-on-dark">
            <span aria-hidden className="mx-auto grid size-12 place-items-center rounded-pill bg-gold text-navy-deep">
              <Sparkles className="size-6" />
            </span>
            <Dialog.Title className="mt-4 text-h3">Before you go, try us free</Dialog.Title>
            <Dialog.Description className="mx-auto mt-2 max-w-sm text-small text-on-dark-muted">
              Book a free 30-minute trial lesson, or take our free assessment to see exactly where your child stands.
            </Dialog.Description>
          </div>

          <div className="grid gap-3 p-6 sm:grid-cols-2">
            <Link
              href="/book"
              data-track="exit_intent_book_trial"
              onClick={() => setOpen(false)}
              className="group flex flex-col rounded-container border border-border p-4 transition-shadow hover:shadow-card"
            >
              <span aria-hidden className="grid size-10 place-items-center rounded-control bg-gold-tint text-gold-deep">
                <CalendarCheck className="size-5" />
              </span>
              <span className="mt-3 font-semibold">Book a free trial</span>
              <span className="mt-1 text-small text-muted-foreground">30-minute live lesson, no card needed.</span>
              <ArrowRight aria-hidden className="mt-3 size-4 text-gold-deep transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/assessments"
              data-track="exit_intent_assessment"
              onClick={() => setOpen(false)}
              className="group flex flex-col rounded-container border border-border p-4 transition-shadow hover:shadow-card"
            >
              <span aria-hidden className="grid size-10 place-items-center rounded-control bg-sky-tint text-navy-soft">
                <ClipboardCheck className="size-5" />
              </span>
              <span className="mt-3 font-semibold">Take the free assessment</span>
              <span className="mt-1 text-small text-muted-foreground">Find strengths and gaps in a few minutes.</span>
              <ArrowRight aria-hidden className="mt-3 size-4 text-navy-soft transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 border-t border-rule px-6 py-4 text-small text-muted-foreground">
            Prefer WhatsApp?
            <a
              href={whatsappLink("Hi! I saw your website and want to know more about tutoring.")}
              target="_blank"
              rel="noopener noreferrer"
              data-track="exit_intent_whatsapp"
              className="inline-flex items-center gap-1.5 font-semibold text-foreground underline-offset-4 hover:underline"
            >
              <WhatsAppIcon className="size-4" />
              Chat with us
            </a>
          </div>

          <Dialog.Close
            aria-label="Close"
            className="absolute top-3 right-3 grid size-9 place-items-center rounded-pill text-on-dark-muted transition-colors hover:bg-on-dark/10 hover:text-on-dark"
          >
            <X aria-hidden className="size-4.5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
