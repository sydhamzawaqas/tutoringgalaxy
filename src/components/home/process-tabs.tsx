"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ProcessTab = { id: string; label: string; hint: string; content: React.ReactNode };

/** Accessible tabs (arrow keys, Home/End). Every panel stays in the HTML, so all copy is crawlable. */
export function ProcessTabs({ tabs }: { tabs: ProcessTab[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const focus = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    setActive(n);
    refs.current[n]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="How Tutoring Galaxy works"
        className="mx-auto flex w-full max-w-xl gap-1 rounded-pill border border-border bg-background p-1 shadow-card"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") focus(active + 1);
          else if (e.key === "ArrowLeft") focus(active - 1);
          else if (e.key === "Home") focus(0);
          else if (e.key === "End") focus(tabs.length - 1);
          else return;
          e.preventDefault();
        }}
      >
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`${base}-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "flex flex-1 flex-col items-center rounded-pill px-3 py-2 text-center transition-colors",
              i === active ? "bg-navy text-on-dark" : "text-muted-foreground hover:bg-surface hover:text-foreground",
            )}
          >
            <span className="text-small font-bold">{t.label}</span>
            <span className={cn("text-label", i === active ? "text-on-dark-muted" : "text-muted-foreground")}>{t.hint}</span>
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${base}-panel-${t.id}`}
          aria-labelledby={`${base}-tab-${t.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="mt-10 rounded-panel"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
