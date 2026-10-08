import { Panel } from "@/components/ui/primitives";

/** Shown when Supabase or Gemini env vars are missing, instead of crashing. */
export function NotConfigured({
  title = "Sign-in isn't configured yet",
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <Panel role="status" className="max-w-measure">
      <h2 className="text-h3">{title}</h2>
      <p className="mt-2 text-muted-foreground">
        {children ??
          "Student, parent and tutor accounts will be available here soon. In the meantime, book a free trial or WhatsApp us and we'll help you directly."}
      </p>
    </Panel>
  );
}
