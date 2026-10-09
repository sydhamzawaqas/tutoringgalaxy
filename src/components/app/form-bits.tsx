"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "@/components/ui/button";

/** Submit button that disables itself and announces progress while its form is pending. */
export function SubmitButton({ children, pendingLabel, ...props }: ButtonProps & { pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || props.disabled} aria-disabled={pending || props.disabled} {...props}>
      {pending ? (pendingLabel ?? "Working…") : children}
    </Button>
  );
}

/** Form-level message, announced to screen readers. */
export function FormMessage({ status, message }: { status: "idle" | "error" | "success"; message?: string }) {
  return (
    <div aria-live="polite" role={status === "error" ? "alert" : undefined}>
      {message ? (
        <p className={status === "error" ? "text-small text-destructive" : "text-small text-success"}>{message}</p>
      ) : null}
    </div>
  );
}
