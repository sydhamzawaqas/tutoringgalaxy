import { BadgeCheck, Globe2, Home, Laptop, ShieldCheck, Star } from "lucide-react";
import { CERTIFICATION_BY_ID } from "@/data/legacy/certifications";
import type { CertificationId, Tier, TutorMode } from "@/data/content/tutors";
import { cn } from "@/lib/utils";

const TIER_ICON = { 1: ShieldCheck, 2: BadgeCheck, 3: Star, 4: Globe2 } as const;

// Quiet → premium as the level rises.
const TIER_STYLE: Record<Tier["level"], string> = {
  1: "bg-mint-tint text-success",
  2: "bg-sky-tint text-navy-soft",
  3: "bg-gold-tint text-gold-deep",
  4: "bg-navy text-on-dark",
};

/** Verification tier chip (Level 1–4). The blurb is in the title and for screen readers. */
export function TierBadge({ tier, size = "sm", className }: { tier: Tier; size?: "sm" | "md"; className?: string }) {
  const Icon = TIER_ICON[tier.level];
  return (
    <span
      title={`Level ${tier.level} · ${tier.label}: ${tier.blurb}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill font-semibold",
        size === "md" ? "px-3 py-1 text-small" : "px-2.5 py-0.5 text-label",
        TIER_STYLE[tier.level],
        className,
      )}
    >
      <Icon aria-hidden className={cn(size === "md" ? "size-4" : "size-3.5", tier.level === 4 && "text-gold")} strokeWidth={2} />
      <span className="opacity-70">L{tier.level}</span>
      <span>{tier.label}</span>
      <span className="sr-only">. {tier.blurb}</span>
    </span>
  );
}

/** Certification chips with an optional "+N" overflow. */
export function VerificationBadges({ ids, limit, size = "sm" }: { ids: CertificationId[]; limit?: number; size?: "sm" | "md" }) {
  const shown = limit ? ids.slice(0, limit) : ids;
  const overflow = limit && ids.length > limit ? ids.length - limit : 0;
  return (
    <ul className="flex flex-wrap items-center gap-1.5" aria-label="Certifications">
      {shown.map((id) => {
        const c = CERTIFICATION_BY_ID[id];
        if (!c) return null;
        const Icon = c.icon;
        return (
          <li
            key={id}
            title={`${c.label}: ${c.tooltip}`}
            className={cn(
              "inline-flex items-center gap-1 rounded-pill border border-gold/40 bg-gold-tint font-medium text-navy",
              size === "md" ? "px-2.5 py-1 text-small" : "px-2 py-0.5 text-micro",
            )}
          >
            <Icon aria-hidden className="size-3.5 text-gold-deep" strokeWidth={2} />
            <span aria-hidden>{size === "md" ? c.label : c.short}</span>
            <span className="sr-only">{c.label}</span>
          </li>
        );
      })}
      {overflow > 0 ? (
        <li className={cn("inline-flex items-center rounded-pill border border-border bg-surface text-muted-foreground", size === "md" ? "px-2.5 py-1 text-small" : "px-2 py-0.5 text-micro")}>
          +{overflow}
          <span className="sr-only"> more</span>
        </li>
      ) : null}
    </ul>
  );
}

export function ModeChips({ modes, city }: { modes: TutorMode[]; city?: string }) {
  return (
    <>
      {modes.map((m) => {
        const Icon = m === "online" ? Laptop : Home;
        return (
          <span key={m} className="inline-flex items-center gap-1 rounded-pill bg-surface px-2.5 py-0.5 text-label font-medium text-navy-soft">
            <Icon aria-hidden className="size-3.5" />
            {m === "online" ? "Online" : `At home${city ? `, ${city}` : ""}`}
          </span>
        );
      })}
    </>
  );
}
