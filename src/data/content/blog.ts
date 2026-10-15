/**
 * Blog: the old site's 64 posts (data/legacy/blog.ts), unchanged, with helpers for the /blog pages.
 * Bodies are Markdown and are rendered by components/blog/markdown.tsx (no raw HTML).
 */
import { BLOG_POSTS, type BlogPost } from "@/data/legacy/blog";
import { categorySlug, formatPostDate } from "@/components/blog/format";

export { categorySlug, formatPostDate };

export type { BlogPost };
export type BlogCategory = BlogPost["category"];

/** Post fields the list and search need (no body), small enough to pass to a client component. */
export type BlogSummary = Omit<BlogPost, "body"> & { categorySlug: string };

/** Newest first. Dates are ISO strings, so string order is date order; slug breaks ties. */
export const posts: BlogPost[] = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export function toSummary(p: BlogPost): BlogSummary {
  const { slug, title, excerpt, category, curriculumSlug, tags, author, date, readTime } = p;
  return { slug, title, excerpt, category, curriculumSlug, tags, author, date, readTime, categorySlug: categorySlug(category) };
}

/** All 27 categories with post counts, largest first. */
export const blogCategories: { name: BlogCategory; slug: string; count: number }[] = (() => {
  const counts = new Map<BlogCategory, number>();
  for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: categorySlug(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
})();

export const getCategory = (slug: string) => blogCategories.find((c) => c.slug === slug);
export const postsInCategory = (name: BlogCategory) => posts.filter((p) => p.category === name);

/** Same category first, then posts sharing the most tags. */
export function relatedPosts(post: BlogPost, limit = 3) {
  const tags = new Set(post.tags.map((t) => t.toLowerCase()));
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: (p.category === post.category ? 10 : 0) + p.tags.filter((t) => tags.has(t.toLowerCase())).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map((x) => x.p);
}

export const postsForCurriculum = (slug: string, limit = 3) => posts.filter((p) => p.curriculumSlug === slug).slice(0, limit);

/** Posts whose tags or title mention the subject name. */
export function postsForSubject(name: string, limit = 3) {
  const n = name.toLowerCase();
  return posts.filter((p) => p.tags.some((t) => t.toLowerCase() === n) || p.title.toLowerCase().includes(n)).slice(0, limit);
}

/** "10 min read" → 10. */
export const readMinutes = (readTime: string) => Number(/\d+/.exec(readTime)?.[0] ?? 0);
