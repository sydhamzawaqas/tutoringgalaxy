const TINTS = ["bg-gold-tint text-gold-deep", "bg-sky-tint text-navy-soft", "bg-mint-tint text-success", "bg-lilac-tint text-navy-soft", "bg-coral-tint text-annotation"];

/** Stable soft colour per category name, so the same category always looks the same. */
export function categoryTint(category: string) {
  let h = 0;
  for (const ch of category) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TINTS[h % TINTS.length];
}
