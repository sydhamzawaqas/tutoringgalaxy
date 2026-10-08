"use client";

import { Suspense, useActionState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { bookTrial, type BookTrialField, type BookTrialState } from "@/lib/actions/book-trial";
import { Button } from "@/components/ui/button";
import { Field, Input, Label, Select, Textarea } from "@/components/ui/form";
import { QNum } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/brand/marks";
import { curricula } from "@/data/content/curricula";
import { subjects } from "@/data/content/subjects";
import { tutors } from "@/data/content/tutors";
import { plans } from "@/data/content/pricing";
import { countries } from "@/data/content/countries";
import { whatsappLink } from "@/data/content/site";
import { cn } from "@/lib/utils";

const initialState: BookTrialState = { status: "idle" };

const homeCities = countries.flatMap((c) => [...c.homeCities]);

/** Control ids, in the order the fields appear (used by the error summary). */
const ids: Record<BookTrialField, string> = {
  curriculum: "bt-curriculum",
  subject: "bt-subject",
  level: "bt-level",
  challenge: "bt-challenge",
  mode: "bt-mode-online",
  city: "bt-city",
  preferredTimes: "bt-times",
  parentName: "bt-name",
  whatsapp: "bt-whatsapp",
  email: "bt-email",
  consent: "bt-consent",
};

const fieldOrder = Object.keys(ids) as BookTrialField[];

/** aria props for a control: invalid state and the error or help text it describes. */
function describe(id: string, error?: string, hasHelp = false) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : hasHelp ? `${id}-help` : undefined,
  };
}

export function BookTrialForm() {
  const [state, formAction, pending] = useActionState(bookTrial, initialState);
  const summaryRef = useRef<HTMLDivElement>(null);
  const errors = state.errors ?? {};
  const values = state.values ?? {};
  const errorFields = fieldOrder.filter((f) => errors[f]);
  const hasProblem = state.status === "invalid" || state.status === "error";

  // Move focus to the summary after every failed submission (each response is a new object).
  // Without JS, `autoFocus` on the server-rendered summary does the same job.
  useEffect(() => {
    if (state.status === "invalid" || state.status === "error") summaryRef.current?.focus();
  }, [state]);

  return (
    <form action={formAction} noValidate className="mt-10" aria-describedby="bt-required-note">
      {hasProblem ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          autoFocus
          aria-labelledby="bt-summary-title"
          className="mb-10 rounded-container border border-destructive p-6 outline-offset-4"
        >
          {state.status === "invalid" ? (
            <>
              <h2 id="bt-summary-title" className="text-lead font-bold">
                {errorFields.length === 1 ? "One answer needs a change" : `${errorFields.length} answers need a change`}
              </h2>
              <ul className="mt-3 space-y-1.5">
                {errorFields.map((f) => (
                  <li key={f}>
                    <a
                      href={`#${ids[f]}`}
                      className="text-destructive underline underline-offset-4"
                      onClick={(e) => {
                        const el = document.getElementById(ids[f]);
                        if (!el) return;
                        e.preventDefault();
                        el.focus();
                        el.scrollIntoView({ block: "center" });
                      }}
                    >
                      {errors[f]}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h2 id="bt-summary-title" className="text-lead font-bold">
                Your request wasn&apos;t sent
              </h2>
              <p className="mt-2 text-destructive">{state.message}</p>
              <Button asChild variant="secondary" className="mt-4">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  WhatsApp us
                </a>
              </Button>
            </>
          )}
        </div>
      ) : null}

      <p id="bt-required-note" className="text-small text-muted-foreground">
        Every question is needed unless it says optional. It takes about two minutes.
      </p>

      {/* Honeypot: hidden from people and assistive tech; bots that fill it are dropped. */}
      <div className="sr-only" aria-hidden>
        <label htmlFor="bt-website">Leave this empty</label>
        <input id="bt-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {/* 1 About the student */}
      <Part n={1} title="About the student">
        <Suspense fallback={null}>
          <PrefillFromQuery submitted={values} />
        </Suspense>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={ids.curriculum} label="Curriculum or exam board" error={errors.curriculum}>
            <Select
              id={ids.curriculum}
              name="curriculum"
              required
              defaultValue={values.curriculum ?? ""}
              {...describe(ids.curriculum, errors.curriculum)}
            >
              <option value="">Choose a curriculum</option>
              {curricula.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field id={ids.subject} label="Subject" error={errors.subject}>
            <Select id={ids.subject} name="subject" required defaultValue={values.subject ?? ""} {...describe(ids.subject, errors.subject)}>
              <option value="">Choose a subject</option>
              {subjects.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <Field id={ids.level} label="Year or grade" help="For example Year 10, Grade 9 or AS Level" error={errors.level} className="sm:max-w-sm">
          <Input
            id={ids.level}
            name="level"
            required
            maxLength={60}
            autoComplete="off"
            defaultValue={values.level ?? ""}
            {...describe(ids.level, errors.level, true)}
          />
        </Field>
        <Field
          id={ids.challenge}
          label="What would help most (optional)"
          help="For example: losing marks on long answers, or aiming for an A* in May"
          error={errors.challenge}
        >
          <Textarea
            id={ids.challenge}
            name="challenge"
            maxLength={1000}
            defaultValue={values.challenge ?? ""}
            {...describe(ids.challenge, errors.challenge, true)}
          />
        </Field>
      </Part>

      {/* 2 Lessons. `group` lets CSS show the city only for home lessons, with or without JS. */}
      <Part n={2} title="Lessons" className="group">
        <fieldset aria-describedby={errors.mode ? "bt-mode-error" : undefined}>
          <legend className="text-button font-semibold">Online or at home</legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["online", "Online", "Video lessons with a shared whiteboard, wherever you live"],
                ["home", "At home", `A tutor visits you. Available in ${homeCities.join(" and ")}`],
              ] as const
            ).map(([value, title, body]) => (
              <label
                key={value}
                htmlFor={`bt-mode-${value}`}
                className="flex cursor-pointer items-start gap-3 rounded-control border border-border p-4 transition-colors duration-150 has-checked:border-foreground has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus"
              >
                <input
                  id={`bt-mode-${value}`}
                  type="radio"
                  name="mode"
                  value={value}
                  required
                  defaultChecked={(values.mode ?? "online") === value}
                  className="mt-1 size-4 shrink-0 accent-primary focus-visible:outline-none"
                />
                <span>
                  <span className="block font-semibold">{title}</span>
                  <span className="block text-small text-muted-foreground">{body}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.mode ? (
            <p id="bt-mode-error" className="mt-1.5 text-small text-destructive">
              {errors.mode}
            </p>
          ) : null}
        </fieldset>

        <div className="hidden group-has-[#bt-mode-home:checked]:block">
          <Field id={ids.city} label="City" help="If your city isn't listed, choose Other and we'll suggest the best option" error={errors.city} className="sm:max-w-sm">
            <Select id={ids.city} name="city" defaultValue={values.city ?? ""} {...describe(ids.city, errors.city, true)}>
              <option value="">Choose a city</option>
              {homeCities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value="Other">Other</option>
            </Select>
          </Field>
        </div>

        <Field
          id={ids.preferredTimes}
          label="Preferred days and times (optional)"
          help="For example weekday evenings after 6pm, Pakistan time"
          error={errors.preferredTimes}
        >
          <Input
            id={ids.preferredTimes}
            name="preferredTimes"
            maxLength={200}
            defaultValue={values.preferredTimes ?? ""}
            {...describe(ids.preferredTimes, errors.preferredTimes, true)}
          />
        </Field>
      </Part>

      {/* 3 Contact */}
      <Part n={3} title="Contact">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={ids.parentName} label="Your name" help="Parent or guardian" error={errors.parentName}>
            <Input
              id={ids.parentName}
              name="parentName"
              required
              maxLength={80}
              autoComplete="name"
              defaultValue={values.parentName ?? ""}
              {...describe(ids.parentName, errors.parentName, true)}
            />
          </Field>
          <Field id={ids.whatsapp} label="WhatsApp number" help="With country code, e.g. +92 300 1234567" error={errors.whatsapp}>
            <Input
              id={ids.whatsapp}
              name="whatsapp"
              type="tel"
              inputMode="tel"
              required
              maxLength={30}
              autoComplete="tel"
              defaultValue={values.whatsapp ?? ""}
              {...describe(ids.whatsapp, errors.whatsapp, true)}
            />
          </Field>
        </div>
        <Field id={ids.email} label="Email (optional)" help="Only if you'd like the monthly report by email too" error={errors.email} className="sm:max-w-md">
          <Input
            id={ids.email}
            name="email"
            type="email"
            maxLength={254}
            autoComplete="email"
            spellCheck={false}
            defaultValue={values.email ?? ""}
            {...describe(ids.email, errors.email, true)}
          />
        </Field>
        <div>
          <div className="flex items-start gap-3">
            <input
              id={ids.consent}
              name="consent"
              type="checkbox"
              value="yes"
              required
              defaultChecked={values.consent === "yes"}
              {...describe(ids.consent, errors.consent, true)}
              className="mt-1 size-4 shrink-0 accent-primary"
            />
            <Label htmlFor={ids.consent} className="font-normal text-body">
              You can contact me on WhatsApp about this trial
            </Label>
          </div>
          {errors.consent ? (
            <p id={`${ids.consent}-error`} className="mt-1.5 pl-7 text-small text-destructive">
              {errors.consent}
            </p>
          ) : (
            <p id={`${ids.consent}-help`} className="mt-1.5 pl-7 text-small text-muted-foreground">
              We only use your number to arrange lessons, and never share it.
            </p>
          )}
        </div>
      </Part>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button type="submit" size="lg" disabled={pending} aria-disabled={pending}>
          {pending ? "Sending request…" : "Request free trial"}
        </Button>
        <p className="text-small text-muted-foreground">Free, and no payment details needed.</p>
      </div>
      <p aria-live="polite" className="sr-only">
        {pending ? "Sending your request" : ""}
      </p>
    </form>
  );
}

/** A numbered part of the form: a real sequence, so it gets a question number. */
function Part({ n, title, className, children }: { n: number; title: string; className?: string; children: React.ReactNode }) {
  return (
    // The rule sits on a wrapper so the legend doesn't cut through the fieldset's border.
    <div className="mt-10 border-t border-rule pt-8">
      <fieldset className={className}>
        <legend className="flex items-baseline gap-3">
          <QNum>{n}</QNum>
          <span className="text-h3 font-bold">{title}</span>
        </legend>
        <div className="mt-6 flex flex-col gap-6">{children}</div>
      </fieldset>
    </div>
  );
}

/**
 * Prefill from /book?curriculum=&subject=&tutor=&plan= (progressive enhancement; needs JS).
 * Only values that exist in our data are used; anything else is ignored.
 */
function PrefillFromQuery({ submitted }: { submitted: BookTrialState["values"] }) {
  const params = useSearchParams();
  const curriculum = curricula.find((c) => c.slug === params.get("curriculum"));
  const subject = subjects.find((s) => s.slug === params.get("subject"));
  const tutor = tutors.find((t) => t.slug === (submitted?.tutor || params.get("tutor")));
  const plan = plans.find((p) => p.slug === (submitted?.plan || params.get("plan")));

  useEffect(() => {
    // Fill only empty selects, so we never overwrite a parent's own choice.
    const fill = (id: string, value?: string) => {
      const el = document.getElementById(id);
      if (value && el instanceof HTMLSelectElement && !el.value) el.value = value;
    };
    fill(ids.curriculum, curriculum?.slug);
    fill(ids.subject, subject?.slug);
  }, [curriculum, subject]);

  if (!tutor && !plan) return null;
  return (
    <div className="rounded-container bg-surface p-4 text-small">
      {tutor ? <input type="hidden" name="tutor" value={tutor.slug} /> : null}
      {plan ? <input type="hidden" name="plan" value={plan.slug} /> : null}
      {tutor ? (
        <p>
          You asked about <span className="font-semibold">{tutor.name}</span>. We&apos;ll check their availability first.
        </p>
      ) : null}
      {plan ? (
        <p className={cn(tutor && "mt-1")}>
          Plan you&apos;re considering: <span className="font-semibold">{plan.name}</span>. The trial is free either way.
        </p>
      ) : null}
    </div>
  );
}
