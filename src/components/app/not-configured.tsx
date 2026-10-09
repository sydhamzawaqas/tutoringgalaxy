import { Panel } from "@/components/ui/primitives";

/** Shown when Supabase or Gemini env vars are missing, instead of crashing. */
export function NotConfigured({
  title = "Sign-in isn't configured yet",
  as: Heading = "h2",
  children,
}: {
  title?: string;
  /** Use "h1" when this panel is the only content of the page. */
  as?: "h1" | "h2";
  children?: React.ReactNode;
}) {
  return (
    <Panel role="status" className="max-w-measure">
      <Heading className="text-h3">{title}</Heading>
      <p className="mt-2 text-muted-foreground">
        {children ??
          "Student, parent and tutor accounts will be available here soon. In the meantime, book a free trial or WhatsApp us and we'll help you directly."}
      </p>
    </Panel>
  );
}
