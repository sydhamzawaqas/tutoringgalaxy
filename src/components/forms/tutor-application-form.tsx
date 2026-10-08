"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { Tick } from "@/components/brand/marks";
import {
  submitTutorApplication,
  type TutorApplicationField,
  type TutorApplicationState,
} from "@/lib/actions/tutor-application";

const initialState: TutorApplicationState = { status: "idle" };

const experienceOptions = [
  { value: "0-1", label: "Less than 1 year" },
  { value: "1-3", label: "1 to 3 years" },
  { value: "3-5", label: "3 to 5 years" },
  { value: "5-10", label: "5 to 10 years" },
  { value: "10+", label: "More than 10 years" },
];

const checkbox =
  "size-5 shrink-0 rounded-control border-border accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

export function TutorApplicationForm({ curricula }: { curricula: { slug: string; short: string }[] }) {
  const [state, formAction, pending] = useActionState(submitTutorApplication, initialState);
  const statusRef = useRef<HTMLDivElement>(null);

  // Move focus to the result so keyboard and screen reader users hear it.
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-container border border-border p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <Tick animate className="size-8 shrink-0" />
          <div>
            <h3 className="text-h3">Application received</h3>
            <p className="mt-2 text-muted-foreground">
              {state.message ?? "Thank you. We've received your application and will contact you on WhatsApp or email."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const err = (f: TutorApplicationField) => state.errors?.[f]?.[0];
  const val = (f: TutorApplicationField) => {
    const v = state.values?.[f];
    return typeof v === "string" ? v : undefined;
  };
  const has = (f: TutorApplicationField, option: string) => {
    const v = state.values?.[f];
    return Array.isArray(v) ? v.includes(option) : false;
  };
  const describedBy = (id: string, f: TutorApplicationField, help = false) =>
    err(f) ? `${id}-error` : help ? `${id}-help` : undefined;

  return (
    <form action={formAction} noValidate className="space-y-6">
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {state.status === "error" && state.message ? (
          <p className="rounded-control border border-destructive px-4 py-3 text-small text-destructive">{state.message}</p>
        ) : null}
      </div>

      {/* Honeypot: hidden from people and assistive tech. Bots that fill it are ignored. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="ta-website">Website</label>
        <input id="ta-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="ta-name" label="Full name" error={err("fullName")}>
          <Input
            id="ta-name"
            name="fullName"
            autoComplete="name"
            required
            maxLength={100}
            defaultValue={val("fullName")}
            aria-invalid={!!err("fullName")}
            aria-describedby={describedBy("ta-name", "fullName")}
          />
        </Field>
        <Field id="ta-email" label="Email" error={err("email")}>
          <Input
            id="ta-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            defaultValue={val("email")}
            aria-invalid={!!err("email")}
            aria-describedby={describedBy("ta-email", "email")}
          />
        </Field>
        <Field id="ta-whatsapp" label="WhatsApp number" help="With country code, e.g. +92 300 1234567" error={err("whatsapp")}>
          <Input
            id="ta-whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={25}
            defaultValue={val("whatsapp")}
            aria-invalid={!!err("whatsapp")}
            aria-describedby={describedBy("ta-whatsapp", "whatsapp", true)}
          />
        </Field>
        <Field id="ta-qualification" label="Highest qualification" help="e.g. MSc Physics, BS Mathematics" error={err("qualification")}>
          <Input
            id="ta-qualification"
            name="qualification"
            required
            maxLength={150}
            defaultValue={val("qualification")}
            aria-invalid={!!err("qualification")}
            aria-describedby={describedBy("ta-qualification", "qualification", true)}
          />
        </Field>
        <Field id="ta-city" label="City" error={err("city")}>
          <Input
            id="ta-city"
            name="city"
            autoComplete="address-level2"
            required
            maxLength={80}
            defaultValue={val("city")}
            aria-invalid={!!err("city")}
            aria-describedby={describedBy("ta-city", "city")}
          />
        </Field>
        <Field id="ta-country" label="Country" error={err("country")}>
          <Input
            id="ta-country"
            name="country"
            autoComplete="country-name"
            required
            maxLength={80}
            defaultValue={val("country")}
            aria-invalid={!!err("country")}
            aria-describedby={describedBy("ta-country", "country")}
          />
        </Field>
      </div>

      <Field id="ta-experience" label="Teaching experience" error={err("experience")} className="sm:max-w-xs">
        <Select
          id="ta-experience"
          name="experience"
          required
          defaultValue={val("experience") ?? ""}
          aria-invalid={!!err("experience")}
          aria-describedby={describedBy("ta-experience", "experience")}
        >
          <option value="" disabled>
            Choose one
          </option>
          {experienceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </Field>

      <fieldset aria-describedby={err("curricula") ? "ta-curricula-error" : "ta-curricula-help"} aria-invalid={!!err("curricula")}>
        <legend className="text-button font-semibold">Curricula you have taught</legend>
        <p id="ta-curricula-help" className="mt-1 text-small text-muted-foreground">
          Choose all that apply.
        </p>
        <div className="mt-2 grid gap-x-6 sm:grid-cols-3">
          {curricula.map((c) => (
            <label key={c.slug} className="flex min-h-11 items-center gap-3">
              <input type="checkbox" name="curricula" value={c.slug} defaultChecked={has("curricula", c.slug)} className={checkbox} />
              {c.short}
            </label>
          ))}
        </div>
        {err("curricula") ? (
          <p id="ta-curricula-error" className="mt-1 text-small text-destructive">
            {err("curricula")}
          </p>
        ) : null}
      </fieldset>

      <Field id="ta-subjects" label="Subjects you teach" help="e.g. O Level Mathematics 4024, A Level Physics 9702" error={err("subjects")}>
        <Input
          id="ta-subjects"
          name="subjects"
          required
          maxLength={300}
          defaultValue={val("subjects")}
          aria-invalid={!!err("subjects")}
          aria-describedby={describedBy("ta-subjects", "subjects", true)}
        />
      </Field>

      <fieldset aria-describedby={err("modes") ? "ta-modes-error" : undefined} aria-invalid={!!err("modes")}>
        <legend className="text-button font-semibold">How you can teach</legend>
        <div className="mt-2 flex flex-wrap gap-x-8">
          <label className="flex min-h-11 items-center gap-3">
            <input type="checkbox" name="modes" value="online" defaultChecked={has("modes", "online")} className={checkbox} />
            Online
          </label>
          <label className="flex min-h-11 items-center gap-3">
            <input type="checkbox" name="modes" value="home" defaultChecked={has("modes", "home")} className={checkbox} />
            At students&apos; homes
          </label>
        </div>
        {err("modes") ? (
          <p id="ta-modes-error" className="mt-1 text-small text-destructive">
            {err("modes")}
          </p>
        ) : null}
      </fieldset>

      <Field
        id="ta-about"
        label="How do you teach a topic a student finds hard?"
        help="A short paragraph is enough (at least 50 characters)."
        error={err("about")}
      >
        <Textarea
          id="ta-about"
          name="about"
          required
          rows={5}
          maxLength={2000}
          defaultValue={val("about")}
          aria-invalid={!!err("about")}
          aria-describedby={describedBy("ta-about", "about", true)}
        />
      </Field>

      <div>
        <label className="flex min-h-11 items-start gap-3 pt-2.5">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            required
            className={`${checkbox} mt-0.5`}
            aria-invalid={!!err("consent")}
            aria-describedby={err("consent") ? "ta-consent-error" : undefined}
          />
          <span className="text-small">
            I agree that Tutoring Galaxy can store these details and contact me about my application, as described in the{" "}
            <Link href="/legal/privacy" className="underline underline-offset-4">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {err("consent") ? (
          <p id="ta-consent-error" className="mt-1 text-small text-destructive">
            {err("consent")}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 border-t border-dashed border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small text-muted-foreground">We&apos;ll reply on WhatsApp or by email.</p>
        <Button type="submit" size="lg" disabled={pending} aria-disabled={pending}>
          {pending ? "Sending…" : "Send application"}
        </Button>
      </div>
    </form>
  );
}
