import { Award, Gem, Medal, Trophy } from "lucide-react";
import type { StarTier } from "@/data/content/growing-stars";
import { cn } from "@/lib/utils";

/** Star tier colour language: quiet to premium as the tier rises. Tokens only. */
export const TIER_STYLE: Record<StarTier, { chip: string; icon: typeof Award }> = {
  Diamond: { chip: "bg-navy text-on-dark", icon: Gem },
  Gold: { chip: "bg-gold text-navy-deep", icon: Trophy },
  Silver: { chip: "bg-sky-tint text-navy-soft", icon: Award },
  Bronze: { chip: "bg-coral-tint text-annotation", icon: Medal },
};

export function TierBadge({ tier, className }: { tier: StarTier; className?: string }) {
  const { chip, icon: Icon } = TIER_STYLE[tier];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-pill px-2.5 py-0.5 text-label font-semibold", chip, className)}>
      <Icon aria-hidden className="size-3.5" />
      {tier} Star
    </span>
  );
}

export function TierIcon({ tier, className }: { tier: StarTier; className?: string }) {
  const { chip, icon: Icon } = TIER_STYLE[tier];
  return (
    <span className={cn("grid size-12 shrink-0 place-items-center rounded-pill", chip, className)}>
      <Icon aria-hidden className="size-6" />
    </span>
  );
}
