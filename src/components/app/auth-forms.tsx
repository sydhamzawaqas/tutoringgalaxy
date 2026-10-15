"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  requestPasswordReset,
  sendMagicLink,
  signInWithPassword,
  updatePassword,
  updateProfile,
  type FormState,
} from "@/lib/actions/auth";
import { Field, Input } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormMessage, SubmitButton } from "./form-bits";

const idle: FormState = { status: "idle" };

function describedBy(id: string, error?: string, help?: boolean) {
  if (error) return `${id}-error`;
  return help ? `${id}-help` : undefined;
}

export function LoginForm({ next, linkError = false }: { next: string; linkError?: boolean }) {
  const [mode, setMode] = useState<"password" | "link">("password");
  const [pwState, pwAction] = useActionState(signInWithPassword, idle);
  const [linkState, linkAction] = useActionState(sendMagicLink, idle);

  if (mode === "link") {
    const e = linkState.fieldErrors ?? {};
    return (
      <div className="flex flex-col gap-5">
        <form action={linkAction} className="flex flex-col gap-5" noValidate>
          <input type="hidden" name="next" value={next} />
          <Field id="link-email" label="Email" error={e.email} help="We'll email you a link that signs you in.">
            <Input
              id="link-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={Boolean(e.email)}
              aria-describedby={describedBy("link-email", e.email, true)}
            />
          </Field>
          <FormMessage status={linkState.status} message={linkState.message} />
          <SubmitButton pendingLabel="Sending…">Email me a sign-in link</SubmitButton>
        </form>
        <Button type="button" variant="ghost" size="sm" onClick={() => setMode("password")}>
          Sign in with a password instead
        </Button>
      </div>
    );
  }

  const e = pwState.fieldErrors ?? {};
  return (
    <div className="flex flex-col gap-5">
      {linkError ? (
        <p role="alert" className="text-small text-destructive">
          That link has expired or was already used. Sign in below, or request a new link.
        </p>
      ) : null}
      <form action={pwAction} className="flex flex-col gap-5" noValidate>
        <input type="hidden" name="next" value={next} />
        <Field id="email" label="Email" error={e.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(e.email)}
            aria-describedby={describedBy("email", e.email)}
          />
        </Field>
        <Field id="password" label="Password" error={e.password}>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            aria-invalid={Boolean(e.password)}
            aria-describedby={describedBy("password", e.password)}
          />
        </Field>
        <FormMessage status={pwState.status} message={pwState.message} />
        <SubmitButton pendingLabel="Signing in…">Sign in</SubmitButton>
      </form>
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <Button type="button" variant="ghost" size="sm" onClick={() => setMode("link")}>
          Email me a sign-in link
        </Button>
        <Link href="/reset-password" className="text-small font-semibold underline underline-offset-4">
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}

export function RequestResetForm() {
  const [state, action] = useActionState(requestPasswordReset, idle);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      <Field id="reset-email" label="Email" error={e.email}>
        <Input
          id="reset-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(e.email)}
          aria-describedby={describedBy("reset-email", e.email)}
        />
      </Field>
      <FormMessage status={state.status} message={state.message} />
      <SubmitButton pendingLabel="Sending…">Send reset link</SubmitButton>
    </form>
  );
}

export function UpdatePasswordForm() {
  const [state, action] = useActionState(updatePassword, idle);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      <Field id="new-password" label="New password" error={e.password} help="At least 12 characters.">
        <Input
          id="new-password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={12}
          maxLength={128}
          required
          aria-invalid={Boolean(e.password)}
          aria-describedby={describedBy("new-password", e.password, true)}
        />
      </Field>
      <Field id="confirm-password" label="Type it again" error={e.confirm}>
        <Input
          id="confirm-password"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          aria-invalid={Boolean(e.confirm)}
          aria-describedby={describedBy("confirm-password", e.confirm)}
        />
      </Field>
      <FormMessage status={state.status} message={state.message} />
      <SubmitButton pendingLabel="Saving…">Save password</SubmitButton>
    </form>
  );
}

export function ProfileForm({ fullName }: { fullName: string }) {
  const [state, action] = useActionState(updateProfile, idle);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      <Field id="full-name" label="Your name" error={e.fullName} help="Shown to your tutor and on reports.">
        <Input
          id="full-name"
          name="fullName"
          defaultValue={fullName}
          autoComplete="name"
          maxLength={120}
          required
          aria-invalid={Boolean(e.fullName)}
          aria-describedby={describedBy("full-name", e.fullName, true)}
        />
      </Field>
      <FormMessage status={state.status} message={state.message} />
      <div>
        <SubmitButton pendingLabel="Saving…">Save name</SubmitButton>
      </div>
    </form>
  );
}
