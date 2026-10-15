"use client";

import Link from "next/link";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useRegion } from "@/lib/region-context";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Props = {
  /** "dark" for navy bars, "light" for the white header and menus. */
  tone?: "dark" | "light";
  /** Hide the region name and show only the flag. */
  compact?: boolean;
  /** Which way the panel opens. */
  align?: "start" | "end";
  side?: "bottom" | "top";
  className?: string;
};

export function RegionSelector({ tone = "light", compact = false, align = "end", side = "bottom", className }: Props) {
  const { region, regions, setRegion, autoDetected } = useRegion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Region: ${region.name}. Change region`}
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-pill px-2.5 text-label font-semibold transition-colors",
          tone === "dark"
            ? "bg-on-dark/10 text-on-dark hover:bg-on-dark/15"
            : "border border-border bg-background text-foreground hover:bg-surface",
        )}
      >
        <Globe aria-hidden className="size-3.5 opacity-80" strokeWidth={1.75} />
        <span aria-hidden className="text-small leading-none">{region.flag}</span>
        {compact ? null : <span className="max-w-40 truncate">{region.name}</span>}
        <ChevronDown aria-hidden className={cn("size-3.5 opacity-70 transition-transform", open && "rotate-180")} strokeWidth={1.75} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className={cn(
          "absolute z-50 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-container border border-border bg-background text-foreground shadow-lift",
          align === "end" ? "right-0" : "left-0",
          side === "bottom" ? "top-full mt-2" : "bottom-full mb-2",
        )}
      >
        <p className="border-b border-rule bg-surface px-3 py-2 text-micro font-semibold text-muted-foreground uppercase">
          {autoDetected ? "Detected from your device" : "Choose your region"} · {regions.length} regions
        </p>
        <ul className="max-h-80 overflow-y-auto py-1" aria-label="Regions">
          {regions.map((r) => {
            const active = r.slug === region.slug;
            return (
              <li key={r.slug}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setRegion(r.slug);
                    track("region_select", { region_slug: r.slug });
                    setOpen(false);
                    buttonRef.current?.focus();
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-small transition-colors",
                    active ? "bg-gold-tint font-semibold" : "hover:bg-surface",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="text-body leading-none">{r.flag}</span>
                    {r.name}
                  </span>
                  {active ? <Check aria-hidden className="size-4 text-gold-deep" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
        <Link
          href={`/regions/${region.slug}`}
          onClick={() => setOpen(false)}
          className="block border-t border-rule px-3 py-2.5 text-small font-semibold text-navy-soft hover:bg-surface"
        >
          Tutoring in {region.name} →
        </Link>
      </div>
    </div>
  );
}
