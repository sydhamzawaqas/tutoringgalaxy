/** Page title block for app and admin screens. */
export function PageHeader({ title, lead, children }: { title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 border-b border-rule pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-measure">
        <h1 className="text-h2-sm sm:text-h2">{title}</h1>
        {lead ? <p className="mt-2 text-muted-foreground">{lead}</p> : null}
      </div>
      {children ? <div className="flex shrink-0 flex-wrap gap-2">{children}</div> : null}
    </div>
  );
}

/** Skeleton lines used as Suspense fallbacks (static shell). */
export function LoadingLines({ label = "Loading…", lines = 3 }: { label?: string; lines?: number }) {
  return (
    <div role="status" aria-label={label} className="flex flex-col gap-3 py-6">
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="answer-line h-6" />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}
