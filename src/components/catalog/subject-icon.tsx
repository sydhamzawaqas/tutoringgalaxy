import {
  Atom,
  BookMarked,
  BookOpen,
  Brain,
  Building2,
  Calculator,
  ChartColumn,
  Diff,
  Dna,
  FlaskConical,
  Globe2,
  Landmark,
  Languages,
  Laptop,
  Leaf,
  Map,
  Monitor,
  PenLine,
  Receipt,
  Sigma,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { SubjectIconKey } from "@/data/content/subjects";
import { cn } from "@/lib/utils";

const ICONS: Record<SubjectIconKey, LucideIcon> = {
  calculator: Calculator,
  "plus-minus": Diff,
  sigma: Sigma,
  chart: ChartColumn,
  atom: Atom,
  flask: FlaskConical,
  dna: Dna,
  leaf: Leaf,
  book: BookOpen,
  pen: PenLine,
  languages: Languages,
  trend: TrendingUp,
  receipt: Receipt,
  building: Building2,
  laptop: Laptop,
  monitor: Monitor,
  brain: Brain,
  users: Users,
  landmark: Landmark,
  globe: Globe2,
  "book-marked": BookMarked,
  map: Map,
};

const TINTS = ["bg-gold-tint text-gold-deep", "bg-sky-tint text-navy-soft", "bg-mint-tint text-success", "bg-lilac-tint text-navy-soft", "bg-coral-tint text-annotation"];

/** Subject icon in a soft tinted chip. `i` rotates the tint so neighbouring cards differ. */
export function SubjectIcon({ icon, i = 0, size = "md", className }: { icon: SubjectIconKey; i?: number; size?: "sm" | "md" | "lg"; className?: string }) {
  const Icon = ICONS[icon] ?? BookOpen;
  const box = size === "lg" ? "size-16 rounded-panel" : size === "sm" ? "size-9 rounded-control" : "size-12 rounded-container";
  const glyph = size === "lg" ? "size-8" : size === "sm" ? "size-4.5" : "size-6";
  return (
    <span aria-hidden className={cn("grid shrink-0 place-items-center", box, TINTS[i % TINTS.length], className)}>
      <Icon className={glyph} strokeWidth={1.75} />
    </span>
  );
}
