import { Star as StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TINTS = ["bg-gold-tint text-gold-deep", "bg-sky-tint text-navy-soft", "bg-mint-tint text-success", "bg-lilac-tint text-navy-soft", "bg-coral-tint text-annotation"];

/** Rotating soft colour for icons/avatars so repeated cards don't look identical. */
export const tint = (i: number) => TINTS[i % TINTS.length];

export function Avatar({ initials, i = 0, size = "md" }: { initials: string; i?: number; size?: "sm" | "md" | "lg" }) {
  const s = size === "lg" ? "size-16 text-lead" : size === "sm" ? "size-9 text-label" : "size-12 text-body";
  return (
    <span aria-hidden className={cn("inline-grid shrink-0 place-items-center rounded-pill font-bold ring-2 ring-background", s, tint(i))}>
      {initials}
    </span>
  );
}

export function Stars({ rating = 5, className }: { rating?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-gold", className)} aria-label={`${rating.toFixed(1)} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} aria-hidden className="size-4" fill={i < Math.round(rating) ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </span>
  );
}

/** "D → A*" grade jump. */
export function GradeJump({ before, after, dark = false }: { before: string; after: string; dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 font-bold tabular-nums">
      <span className={cn("rounded-control px-2 py-0.5 text-small", dark ? "bg-on-dark/10 text-on-dark-muted" : "bg-surface text-muted-foreground")}>{before}</span>
      <svg aria-hidden viewBox="0 0 24 24" className={cn("size-4", dark ? "text-gold" : "text-gold-deep")}><path d="M4 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span className={cn("rounded-control px-2 py-0.5 text-lead", dark ? "bg-gold text-navy-deep" : "bg-gold-tint text-gold-deep")}>{after}</span>
      <span className="sr-only">improved from {before} to {after}</span>
    </span>
  );
}

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={cn("inline-flex items-center gap-2 rounded-pill px-3 py-1 text-label font-semibold", dark ? "bg-on-dark/10 text-on-dark" : "bg-gold-tint text-gold-deep")}>
      <span aria-hidden className="size-1.5 rounded-pill bg-gold" />
      {children}
    </p>
  );
}

export function Heading({ eyebrow, title, lead, dark = false, center = false }: { eyebrow?: string; title: string; lead?: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
      <h2 className={cn("mt-4 text-h2-sm sm:text-h2", dark && "text-on-dark")}>{title}</h2>
      {lead ? <p className={cn("mt-4 text-lead", dark ? "text-on-dark-muted" : "text-muted-foreground")}>{lead}</p> : null}
    </div>
  );
}
