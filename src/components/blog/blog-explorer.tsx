"use client";

import Link from "next/link";
import { useDeferredValue, useId, useState } from "react";
import { Search, X } from "lucide-react";
import type { BlogSummary } from "@/data/content/blog";
import { cn } from "@/lib/utils";
import { PostCard } from "./post-card";

type Category = { name: string; slug: string; count: number };

/** Category chips (links, so each category has a crawlable page) plus an instant search over the list. */
export function BlogExplorer({
  posts,
  categories,
  total,
  active,
}: {
  posts: BlogSummary[];
  categories: Category[];
  /** Number of posts across all categories, for the "All" chip. */
  total: number;
  /** Active category slug, or undefined on /blog. */
  active?: string;
}) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const searchId = useId();
  const words = deferred.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const shown = words.length
    ? posts.filter((p) => {
        const hay = `${p.title} ${p.excerpt} ${p.category} ${p.tags.join(" ")}`.toLowerCase();
        return words.every((w) => hay.includes(w));
      })
    : posts;

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <nav aria-label="Blog categories" className="-mx-4 min-w-0 lg:mx-0 lg:flex-1">
          <ul className="flex gap-2 overflow-x-auto px-4 pb-2 lg:flex-wrap lg:overflow-visible lg:px-0">
            <li className="shrink-0">
              <Chip href="/blog" active={!active}>
                All <span className="tabular-nums opacity-70">{total}</span>
              </Chip>
            </li>
            {categories.map((c) => (
              <li key={c.slug} className="shrink-0">
                <Chip href={`/blog/category/${c.slug}`} active={active === c.slug}>
                  {c.name} <span className="tabular-nums opacity-70">{c.count}</span>
                </Chip>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative w-full lg:w-80 lg:shrink-0">
          <label htmlFor={searchId} className="sr-only">
            Search articles
          </label>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-muted-foreground" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="h-11 w-full rounded-pill border border-border bg-background pr-10 pl-10 text-body shadow-card placeholder:text-muted-foreground focus-visible:border-navy"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-pill text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              <X aria-hidden className="size-4" />
              <span className="sr-only">Clear search</span>
            </button>
          ) : null}
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-small text-muted-foreground">
        {words.length ? `${shown.length} of ${posts.length} articles match “${deferred.trim()}”` : `${posts.length} articles`}
      </p>

      {shown.length ? (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} headingLevel="h3" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-panel border border-dashed border-border bg-surface p-10 text-center">
          <p className="font-semibold">No articles match that search.</p>
          <p className="mt-1 text-small text-muted-foreground">Try a curriculum (IGCSE, IB), a subject or a word like &ldquo;revision&rdquo;.</p>
          <button type="button" onClick={() => setQuery("")} className="mt-4 text-small font-semibold text-navy-soft underline underline-offset-4">
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-pill border px-3.5 text-label font-semibold transition-colors",
        active ? "border-navy bg-navy text-on-dark" : "border-border bg-background text-muted-foreground hover:border-navy/40 hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
