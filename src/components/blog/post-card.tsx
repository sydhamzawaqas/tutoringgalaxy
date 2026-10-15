import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { BlogSummary } from "@/data/content/blog";
import { formatPostDate } from "./format";
import { cn } from "@/lib/utils";
import { categoryTint } from "./category-tint";

/** Article card used on /blog, category pages, related posts and subject/curriculum pages. */
export function PostCard({ post, headingLevel = "h3", className }: { post: Omit<BlogSummary, "categorySlug">; headingLevel?: "h2" | "h3"; className?: string }) {
  const H = headingLevel;
  return (
    <article className={cn("group relative flex h-full flex-col rounded-panel border border-border bg-background p-6 shadow-card transition-shadow duration-200 hover:shadow-lift", className)}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-label text-muted-foreground">
        <span className={cn("rounded-pill px-2.5 py-0.5 font-semibold", categoryTint(post.category))}>{post.category}</span>
        <span className="inline-flex items-center gap-1">
          <Clock aria-hidden className="size-3.5" />
          {post.readTime}
        </span>
      </div>
      <H className="mt-4 text-lead font-bold">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:rounded-panel focus-visible:outline-none">
          {post.title}
        </Link>
      </H>
      <p className="mt-2 line-clamp-3 flex-1 text-small text-muted-foreground">{post.excerpt}</p>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-rule pt-4 text-label text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays aria-hidden className="size-3.5" />
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-navy-soft group-hover:text-gold-deep">
          Read <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
