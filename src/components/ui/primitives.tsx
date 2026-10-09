import { cn } from "@/lib/utils";

/** Curriculum / mode label. One style only: no rainbow subject colours. */
export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-control border border-border bg-surface px-2 text-label font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

/** Card type 1: the white sheet card (tutors, pricing, articles, questions). */
export function SheetCard({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-container border border-border bg-background p-6", className)} {...props} />;
}

/** Card type 2: the quiet margin panel (side information, summaries). */
export function Panel({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-container bg-surface p-6", className)} {...props} />;
}

/** Margin mark: right-aligned bracketed value, e.g. [3] or [within 1 day]. */
export function Mark({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("whitespace-nowrap text-small text-muted-foreground tabular-nums", className)} {...props}>
      [{children}]
    </span>
  );
}

/** Examiner annotation: marking red, italic serif. Tutor notes, AI feedback, highlights only. */
export function Note({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("font-note text-note italic text-annotation", className)} {...props} />;
}

/** Question-style number, used only for real sequences. */
export function QNum({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("text-h3 font-bold leading-none tabular-nums", className)} {...props} />;
}

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-page px-4 sm:px-6", className)} {...props} />;
}

/**
 * Exam-paper layout: content plus a right-hand margin column on wide screens.
 * On small screens the margin drops below the content.
 */
export function PaperLayout({
  children,
  margin,
  className,
}: {
  children: React.ReactNode;
  margin?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-y-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-x-12", className)}>
      <div className="min-w-0">{children}</div>
      {margin ? (
        <aside className="border-t border-dashed border-rule pt-4 text-small text-muted-foreground lg:border-t-0 lg:border-l lg:border-solid lg:pt-0 lg:pl-5">
          {margin}
        </aside>
      ) : null}
    </div>
  );
}

export function Section({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("border-t border-rule py-16 lg:py-24", className)} {...props} />;
}

export function SectionHeading({ title, lead, as: As = "h2" }: { title: string; lead?: string; as?: "h1" | "h2" }) {
  return (
    <div className="max-w-measure">
      <As className={As === "h1" ? "text-h1-sm sm:text-h1" : "text-h2-sm sm:text-h2"}>
        {title}
      </As>
      {lead ? <p className="mt-4 text-lead text-muted-foreground">{lead}</p> : null}
    </div>
  );
}
