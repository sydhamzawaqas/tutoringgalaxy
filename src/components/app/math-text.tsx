import katex from "katex";
import { cn } from "@/lib/utils";

/**
 * Renders model-generated text with inline ($...$, \(...\)) and display ($$...$$, \[...\]) maths.
 *
 * Safety (OWASP LLM10, improper output handling): plain text is rendered as React text, so it is
 * escaped. Only KaTeX output is injected as HTML, with trust:false (no \href, \url, \includegraphics,
 * \htmlClass...), throwOnError:false, and size/expansion caps. MathML output needs no extra CSS.
 */
const MATH_RE = /(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$[^$\n]+?\$)/g;

function renderTex(tex: string, displayMode: boolean): string | null {
  if (tex.length > 600) return null;
  try {
    return katex.renderToString(tex, {
      displayMode,
      output: "mathml",
      throwOnError: false,
      trust: false,
      strict: "ignore",
      maxSize: 20,
      maxExpand: 200,
    });
  } catch {
    return null;
  }
}

export function MathText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(MATH_RE);
  return (
    <span className={cn("whitespace-pre-line", className)}>
      {parts.map((part, i) => {
        if (i % 2 === 0) return part ? <span key={i}>{part}</span> : null;
        const display = part.startsWith("$$") || part.startsWith("\\[");
        const tex = display ? part.slice(2, -2) : part.startsWith("\\(") ? part.slice(2, -2) : part.slice(1, -1);
        const html = renderTex(tex.trim(), display);
        if (html === null) return <span key={i}>{part}</span>;
        return (
          <span
            key={i}
            className={display ? "my-2 block overflow-x-auto" : undefined}
            // KaTeX output with trust:false; see the note above.
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </span>
  );
}
