import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { requireRole } from "@/lib/auth/dal";
import { listUsers } from "@/lib/auth/admin-data";
import { roleLabel } from "@/lib/auth/roles";
import { SheetCard } from "@/components/ui/primitives";
import { LoadingLines, PageHeader } from "@/components/app/page-header";
import { InviteForm, LinkForm, RoleForm, UnlinkButton } from "@/components/app/admin-forms";
import { formatDate } from "@/components/app/progress-report";

export const metadata = pageMetadata({ title: "Users", description: "Accounts, roles and links.", path: "/admin/users", noindex: true });

export default function UsersPage() {
  return (
    <>
      <PageHeader title="Users" lead="Invite people, set their role, and link parents and tutors to students." />
      <Suspense fallback={<LoadingLines label="Loading users" />}>
        <Users />
      </Suspense>
    </>
  );
}

async function Users() {
  const me = await requireRole("admin");
  const { users, links } = await listUsers();
  const label = (u: { fullName: string; email: string }) => (u.fullName ? `${u.fullName} (${u.email})` : u.email);
  const byId = new Map(users.map((u) => [u.id, u]));
  const people = (role: string) => users.filter((u) => u.role === role).map((u) => ({ id: u.id, label: label(u) }));

  return (
    <div className="mt-8 flex flex-col gap-10">
      <section aria-labelledby="invite">
        <SheetCard>
          <h2 id="invite" className="text-h3">
            Invite someone
          </h2>
          <p className="mt-1 text-small text-muted-foreground">
            They get an email to choose a password. Accounts are invite-only; there&apos;s no public sign-up.
          </p>
          <div className="mt-4">
            <InviteForm />
          </div>
        </SheetCard>
      </section>

      <section aria-labelledby="links">
        <h2 id="links" className="text-h3">
          Parent and tutor links
        </h2>
        <p className="mt-1 text-small text-muted-foreground">Parents see linked children&apos;s reports; tutors see assigned students.</p>
        <div className="mt-4">
          <LinkForm parents={people("parent")} tutors={people("tutor")} students={people("student")} />
        </div>
        {links.length > 0 ? (
          <ul className="mt-4 flex flex-col divide-y divide-rule">
            {links.map((l) => {
              const adult = byId.get(l.adultId);
              const student = byId.get(l.studentId);
              const text = `${adult ? label(adult) : l.adultId} ${l.kind === "guardian" ? "is the parent of" : "tutors"} ${student ? label(student) : l.studentId}`;
              return (
                <li key={`${l.kind}-${l.adultId}-${l.studentId}`} className="flex items-center justify-between gap-4 py-2 text-small">
                  <span>{text}</span>
                  <UnlinkButton kind={l.kind} adultId={l.adultId} studentId={l.studentId} label={text} />
                </li>
              );
            })}
          </ul>
        ) : null}
      </section>

      <section aria-labelledby="accounts">
        <h2 id="accounts" className="text-h3">
          Accounts
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-2xl text-left text-small">
            <caption className="sr-only">Accounts and roles</caption>
            <thead className="text-muted-foreground">
              <tr className="border-b border-rule">
                <th scope="col" className="py-2 pr-4 font-semibold">Name</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Email</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Joined</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Last sign-in</th>
                <th scope="col" className="py-2 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-rule align-middle">
                  <td className="py-2 pr-4">{u.fullName || "Not set"}</td>
                  <td className="py-2 pr-4 break-all">{u.email}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{formatDate(u.createdAt)}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{formatDate(u.lastSignIn)}</td>
                  <td className="py-2">
                    {u.id === me.id ? (
                      <span>{roleLabel[u.role]} (you)</span>
                    ) : (
                      <RoleForm userId={u.id} role={u.role} name={u.fullName || u.email} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
