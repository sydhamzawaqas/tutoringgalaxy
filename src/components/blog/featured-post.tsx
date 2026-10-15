import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, UserRound } from "lucide-react";
import type { BlogSummary } from "@/data/content/blog";
import { formatPostDate } from "./format";

/** Large white card for the newest post, shown in the dark blog hero. */
export function FeaturedPost({ post }: { post: Omit<BlogSummary, "categorySlug"> }) {
  return (
    <article className="group relative overflow-hidden rounded-panel bg-background p-6 text-foreground shadow-lift sm:p-8">
      <span aria-hidden className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-pill bg-gold/20 blur-3xl" />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-pill bg-navy px-2.5 py-0.5 text-label font-semibold text-gold">Latest article</span>
          <span className="rounded-pill bg-gold-tint px-2.5 py-0.5 text-label font-semibold text-gold-deep">{post.category}</span>
        </div>
        <h2 className="mt-5 text-h3">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:rounded-panel focus-visible:outline-none">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-4 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-label text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <UserRound aria-hidden className="size-3.5" />
            {post.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden className="size-3.5" />
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden className="size-3.5" />
            {post.readTime}
          </span>
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-navy-soft group-hover:text-gold-deep">
          Read article <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
