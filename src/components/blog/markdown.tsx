/**
 * A small Markdown → React renderer for the blog bodies (data/legacy/blog.ts).
 *
 * It supports exactly what the posts use: ## / ### headings, paragraphs, - and 1. lists, > quotes,
 * | tables |, **bold**, *italic*, `code` and [links](url). Everything becomes React elements, so text
 * is always escaped: there is no dangerouslySetInnerHTML and raw HTML in a post is shown as text.
 */
import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

type Block =
  | { type: "heading"; level: 2 | 3; text: string; id: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[]; start: number }
  | { type: "quote"; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type TocItem = { id: string; text: string; level: 2 | 3 };

const HEADING = /^(#{1,6})\s+(.+?)\s*#*$/;
const QUOTE = /^>\s?(.*)$/;
const UL = /^[-*+]\s+(.*)$/;
const OL = /^(\d+)[.)]\s+(.*)$/;
const TABLE = /^\|.*\|\s*$/;
const TABLE_RULE = /^\|?(\s*:?-{2,}:?\s*\|)+\s*:?-*:?\s*\|?\s*$/;

/** Plain text of an inline Markdown string (for ids, the table of contents and JSON-LD). */
export function plainText(md: string) {
  return md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/(^|[\s(])\*(\S[^*]*?)\*/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1");
}

function slugify(text: string) {
  return (
    plainText(text)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 64) || "section"
  );
}

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

export function parseMarkdown(md: string): Block[] {
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  const used = new Map<string, number>();
  const isStart = (l: string) => HEADING.test(l) || QUOTE.test(l) || UL.test(l) || OL.test(l) || TABLE.test(l);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    const h = HEADING.exec(line);
    if (h) {
      const level = h[1].length <= 2 ? 2 : 3;
      const base = slugify(h[2]);
      const n = used.get(base) ?? 0;
      used.set(base, n + 1);
      blocks.push({ type: "heading", level, text: h[2], id: n ? `${base}-${n + 1}` : base });
      i++;
      continue;
    }

    if (QUOTE.test(line)) {
      const parts: string[] = [];
      while (i < lines.length && QUOTE.test(lines[i].trim())) parts.push(QUOTE.exec(lines[i++].trim())![1]);
      blocks.push({ type: "quote", text: parts.join(" ").trim() });
      continue;
    }

    if (TABLE.test(line)) {
      const rows: string[] = [];
      while (i < lines.length && TABLE.test(lines[i].trim())) rows.push(lines[i++].trim());
      const hasHead = rows.length > 1 && TABLE_RULE.test(rows[1]);
      const body = rows.filter((_, k) => !(hasHead && k === 1));
      blocks.push({ type: "table", head: hasHead ? cells(body[0]) : [], rows: (hasHead ? body.slice(1) : body).map(cells) });
      continue;
    }

    if (UL.test(line)) {
      const items: string[] = [];
      while (i < lines.length && UL.test(lines[i].trim())) items.push(UL.exec(lines[i++].trim())![1]);
      blocks.push({ type: "ul", items });
      continue;
    }

    const ol = OL.exec(line);
    if (ol) {
      const items: string[] = [];
      while (i < lines.length && OL.test(lines[i].trim())) items.push(OL.exec(lines[i++].trim())![2]);
      blocks.push({ type: "ol", items, start: Number(ol[1]) || 1 });
      continue;
    }

    const parts: string[] = [];
    while (i < lines.length && lines[i].trim() && (parts.length === 0 || !isStart(lines[i].trim()))) parts.push(lines[i++].trim());
    blocks.push({ type: "p", text: parts.join(" ") });
  }
  return blocks;
}

export function tableOfContents(md: string): TocItem[] {
  return parseMarkdown(md)
    .filter((b): b is Extract<Block, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ id: b.id, text: plainText(b.text), level: b.level }));
}

/* ---------------------------------------------------------------------------------------------- */
/* Inline                                                                                         */
/* ---------------------------------------------------------------------------------------------- */

// Order matters: links, code, bold, then italic. Italic needs a space or start before the opening *
// so grade strings like "A*A*A" stay as text.
const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`|\*\*(.+?)\*\*(?!\*)|(?<=^|[\s(“"'—–-])\*(?![\s*])(.+?)(?<![\s*])\*(?![*\w])/g;

function safeHref(href: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return { href, external: false };
  if (href.startsWith("#")) return { href, external: false };
  if (/^https?:\/\//i.test(href) || /^mailto:/i.test(href)) return { href, external: true };
  return null;
}

export function Inline({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(INLINE)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    if (m[1] !== undefined) {
      const link = safeHref(m[2]);
      if (!link) out.push(m[1]);
      else if (link.external)
        out.push(
          <a key={k++} href={link.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-soft underline underline-offset-4 hover:text-gold-deep">
            <Inline text={m[1]} />
          </a>,
        );
      else
        out.push(
          <Link key={k++} href={link.href} className="font-semibold text-navy-soft underline underline-offset-4 hover:text-gold-deep">
            <Inline text={m[1]} />
          </Link>,
        );
    } else if (m[3] !== undefined) {
      out.push(
        <code key={k++} className="rounded-control bg-surface px-1.5 py-0.5 text-small">
          {m[3]}
        </code>,
      );
    } else if (m[4] !== undefined) {
      out.push(
        <strong key={k++} className="font-bold text-foreground">
          <Inline text={m[4]} />
        </strong>,
      );
    } else if (m[5] !== undefined) {
      out.push(<em key={k++}>{m[5]}</em>);
    }
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out.map((n, i) => (typeof n === "string" ? <Fragment key={`t${i}`}>{n}</Fragment> : n))}</>;
}

/* ---------------------------------------------------------------------------------------------- */
/* Blocks                                                                                         */
/* ---------------------------------------------------------------------------------------------- */

export function Markdown({ source, className }: { source: string; className?: string }) {
  const blocks = parseMarkdown(source);
  return (
    <div className={cn("text-body text-foreground", className)}>
      {blocks.map((b, i) => {
        const first = i === 0;
        switch (b.type) {
          case "heading":
            return b.level === 2 ? (
              <h2 key={i} id={b.id} className={cn("scroll-mt-28 text-h3", first ? "mt-0" : "mt-12")}>
                <Inline text={b.text} />
              </h2>
            ) : (
              <h3 key={i} id={b.id} className={cn("scroll-mt-28 text-lead font-bold", first ? "mt-0" : "mt-8")}>
                <Inline text={b.text} />
              </h3>
            );
          case "p":
            return (
              <p key={i} className={cn("text-muted-foreground", first ? "mt-0 text-lead text-foreground" : "mt-5")}>
                <Inline text={b.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-5 space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-muted-foreground">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-pill bg-gold" />
                    <span className="min-w-0">
                      <Inline text={it} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} start={b.start} className="mt-6 space-y-3">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-4 rounded-container border border-border bg-background p-4 shadow-card">
                    <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-pill bg-navy text-small font-bold text-on-dark tabular-nums">
                      {b.start + j}
                    </span>
                    <span className="min-w-0 pt-1 text-muted-foreground">
                      <Inline text={it} />
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i} className="mt-6 rounded-container border-l-4 border-gold bg-gold-tint px-5 py-4 font-note text-note italic text-navy">
                <Inline text={b.text} />
              </blockquote>
            );
          case "table":
            return (
              <div key={i} className="mt-6 overflow-x-auto rounded-container border border-border shadow-card">
                <table className="w-full min-w-lg border-collapse text-left text-small">
                  {b.head.length ? (
                    <thead className="bg-navy text-on-dark">
                      <tr>
                        {b.head.map((c, j) => (
                          <th key={j} scope="col" className="px-4 py-3 font-semibold">
                            <Inline text={c} />
                          </th>
                        ))}
                      </tr>
                    </thead>
                  ) : null}
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-border even:bg-surface">
                        {r.map((c, n) =>
                          n === 0 && b.head.length ? (
                            <th key={n} scope="row" className="px-4 py-3 font-semibold text-foreground">
                              <Inline text={c} />
                            </th>
                          ) : (
                            <td key={n} className="px-4 py-3 text-muted-foreground">
                              <Inline text={c} />
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
