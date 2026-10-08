import { cn } from "@/lib/utils";

/** Logo wordmark (Orbit). Outlined in /public/brand; use `reversed` on dark backgrounds. */
export function Wordmark({ className, reversed = false }: { className?: string; reversed?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation needed
    <img
      src={reversed ? "/brand/wordmark-reversed.svg" : "/brand/wordmark.svg"}
      alt="Tutoring Galaxy"
      width={681}
      height={103}
      className={cn("h-7 w-auto", className)}
    />
  );
}

/** Examiner tick: draws itself once (the one signature motion). */
export function Tick({ className, animate = false }: { className?: string; animate?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-7 text-annotation", animate && "tick-draw", className)}>
      <path d="M5 17.5 12.5 25 27 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The gold star: earned achievement only. */
export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-6 text-star", className)}>
      <path d="M12 1.5Q13.4 10.6 22.5 12Q13.4 13.4 12 22.5Q10.6 13.4 1.5 12Q10.6 10.6 12 1.5Z" fill="currentColor" />
    </svg>
  );
}

/** WhatsApp glyph (outline, matches Lucide weight). */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-4.5", className)}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2L9 9.5Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
