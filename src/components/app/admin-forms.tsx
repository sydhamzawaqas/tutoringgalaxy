"use client";

import { useActionState, useId } from "react";
import {
  changeUserRole,
  inviteUser,
  linkStudent,
  unlinkStudent,
  updateLead,
  updateTutorApplication,
  type AdminFormState,
} from "@/lib/actions/admin";
import { LEAD_STATUSES, TUTOR_APPLICATION_STATUSES, statusLabel } from "@/lib/auth/admin-constants";
import { ROLES, roleLabel, type Role } from "@/lib/auth/roles";
import { Field, Input, Label, Select, Textarea } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormMessage, SubmitButton } from "./form-bits";

const idle: AdminFormState = { status: "idle" };

export function LeadForm({ leadId, status, notes }: { leadId: string; status: string; notes: string }) {
  const [state, action] = useActionState(updateLead, idle);
  const known = (LEAD_STATUSES as readonly string[]).includes(status);
  return (
    <form action={action} className="flex flex-col gap-5">
      <input type="hidden" name="leadId" value={leadId} />
      <Field id="lead-status" label="Status">
        <Select id="lead-status" name="status" defaultValue={known ? status : "new"}>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {statusLabel(s)}
            </option>
          ))}
        </Select>
      </Field>
      <Field id="lead-notes" label="Notes" help="Internal only. Never shown to the family.">
        <Textarea id="lead-notes" name="notes" defaultValue={notes} maxLength={4000} aria-describedby="lead-notes-help" />
      </Field>
      <FormMessage status={state.status} message={state.message} />
      <div>
        <SubmitButton pendingLabel="Saving…">Save lead</SubmitButton>
      </div>
    </form>
  );
}

export function TutorApplicationStatusForm({ applicationId, status, name }: { applicationId: string; status: string; name: string }) {
  const [state, action] = useActionState(updateTutorApplication, idle);
  const id = useId();
  const known = (TUTOR_APPLICATION_STATUSES as readonly string[]).includes(status);
  return (
    <form action={action} className="flex flex-wrap items-end gap-2">
      <input type="hidden" name="applicationId" value={applicationId} />
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={id}>
          Status<span className="sr-only"> for {name}</span>
        </Label>
        <Select id={id} name="status" defaultValue={known ? status : "new"} className="h-9 w-40">
          {TUTOR_APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {statusLabel(s)}
            </option>
          ))}
        </Select>
      </div>
      <SubmitButton size="sm" variant="secondary" pendingLabel="Saving…">
        Save
      </SubmitButton>
      <FormMessage status={state.status} message={state.message} />
    </form>
  );
}

export function RoleForm({ userId, role, name, disabled }: { userId: string; role: Role; name: string; disabled?: boolean }) {
  const [state, action] = useActionState(changeUserRole, idle);
  const id = useId();
  return (
    <form action={action} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="userId" value={userId} />
      <label htmlFor={id} className="sr-only">
        Role for {name}
      </label>
      <Select id={id} name="role" defaultValue={role} disabled={disabled} className="h-9 w-32">
        {ROLES.map((r) => (
          <option key={r} value={r}>
            {roleLabel[r]}
          </option>
        ))}
      </Select>
      {disabled ? null : (
        <SubmitButton size="sm" variant="secondary" pendingLabel="Saving…">
          Save
        </SubmitButton>
      )}
      <FormMessage status={state.status} message={state.message} />
    </form>
  );
}

export function InviteForm() {
  const [state, action] = useActionState(inviteUser, idle);
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <Field id="invite-name" label="Full name">
        <Input id="invite-name" name="fullName" required maxLength={120} autoComplete="off" />
      </Field>
      <Field id="invite-email" label="Email">
        <Input id="invite-email" name="email" type="email" required maxLength={254} autoComplete="off" />
      </Field>
      <Field id="invite-role" label="Role">
        <Select id="invite-role" name="role" defaultValue="student">
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {roleLabel[r]}
            </option>
          ))}
        </Select>
      </Field>
      <div className="flex items-end">
        <SubmitButton pendingLabel="Sending…">Send invite</SubmitButton>
      </div>
      <div className="sm:col-span-2">
        <FormMessage status={state.status} message={state.message} />
      </div>
    </form>
  );
}

type Person = { id: string; label: string };

export function LinkForm({ parents, tutors, students }: { parents: Person[]; tutors: Person[]; students: Person[] }) {
  const [state, action] = useActionState(linkStudent, idle);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <LinkFields action={action} kind="guardian" adults={parents} adultLabel="Parent" students={students} />
      <LinkFields action={action} kind="tutor" adults={tutors} adultLabel="Tutor" students={students} />
      <div className="lg:col-span-2">
        <FormMessage status={state.status} message={state.message} />
      </div>
    </div>
  );
}

function LinkFields({
  action,
  kind,
  adults,
  adultLabel,
  students,
}: {
  action: (formData: FormData) => void;
  kind: "guardian" | "tutor";
  adults: Person[];
  adultLabel: string;
  students: Person[];
}) {
  const id = useId();
  return (
    <form action={action} className="flex flex-col gap-4 rounded-container border border-border p-4">
      <input type="hidden" name="kind" value={kind} />
      <Field id={`${id}-adult`} label={adultLabel}>
        <Select id={`${id}-adult`} name="adultId" required defaultValue="">
          <option value="" disabled>
            Choose a {adultLabel.toLowerCase()}
          </option>
          {adults.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field id={`${id}-student`} label="Student">
        <Select id={`${id}-student`} name="studentId" required defaultValue="">
          <option value="" disabled>
            Choose a student
          </option>
          {students.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </Select>
      </Field>
      <div>
        <SubmitButton variant="secondary" pendingLabel="Linking…">
          Link {adultLabel.toLowerCase()} to student
        </SubmitButton>
      </div>
    </form>
  );
}

export function UnlinkButton({ kind, adultId, studentId, label }: { kind: "guardian" | "tutor"; adultId: string; studentId: string; label: string }) {
  const [state, action] = useActionState(unlinkStudent, idle);
  return (
    <form action={action} className="inline-flex items-center gap-2">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="adultId" value={adultId} />
      <input type="hidden" name="studentId" value={studentId} />
      <Button type="submit" variant="ghost" size="sm" aria-label={`Remove link: ${label}`}>
        Remove
      </Button>
      {state.status === "error" ? <FormMessage status={state.status} message={state.message} /> : null}
    </form>
  );
}
