import { Suspense } from "react";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { listLeads } from "@/lib/auth/admin-data";
import { LEAD_STATUSES, statusLabel } from "@/lib/auth/admin-constants";
import { Badge, Panel } from "@/components/ui/primitives";
import { LoadingLines, PageHeader } from "@/components/app/page-header";
import { formatDate } from "@/components/app/progress-report";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({ title: "Leads", description: "Trial bookings and enquiries.", path: "/admin/leads", noindex: true });

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default function LeadsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <PageHeader title="Leads" lead="Free-trial bookings and enquiries, newest first." />
      <Suspense fallback={<LoadingLines label="Loading leads" />}>
        <Leads searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Leads({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const raw = typeof params.status === "string" ? params.status : undefined;
  const status = raw && (LEAD_STATUSES as readonly string[]).includes(raw) ? raw : undefined;
  const leads = await listLeads(status);

  return (
    <>
      <nav aria-label="Filter by status" className="mt-6">
        <ul className="flex flex-wrap gap-2">
          {[undefined, ...LEAD_STATUSES].map((s) => {
            const active = s === status;
            return (
              <li key={s ?? "all"}>
                <Link
                  href={s ? `/admin/leads?status=${s}` : "/admin/leads"}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center rounded-control border px-3 text-small font-semibold",
                    active ? "border-foreground bg-primary text-primary-foreground" : "border-border hover:bg-surface",
                  )}
                >
                  {s ? statusLabel(s) : "All"}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {leads === null ? (
        <Panel className="mt-6">
          <p className="text-muted-foreground">The leads table isn&apos;t available yet. Run the 0001_leads.sql migration.</p>
        </Panel>
      ) : leads.length === 0 ? (
        <Panel className="mt-6">
          <p className="text-muted-foreground">No leads{status ? ` with status “${statusLabel(status)}”` : ""} yet.</p>
        </Panel>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-2xl text-left text-small">
            <caption className="sr-only">Leads</caption>
            <thead className="text-muted-foreground">
              <tr className="border-b border-rule">
                <th scope="col" className="py-2 pr-4 font-semibold">Received</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Parent</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Curriculum</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Subject</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Mode</th>
                <th scope="col" className="py-2 pr-4 font-semibold">City</th>
                <th scope="col" className="py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-rule">
                  <td className="py-2.5 pr-4 whitespace-nowrap tabular-nums">
                    <time dateTime={lead.created_at}>{formatDate(lead.created_at)}</time>
                  </td>
                  <td className="py-2.5 pr-4">
                    <Link href={`/admin/leads/${lead.id}`} className="font-semibold underline underline-offset-4">
                      {lead.parent_name || "Unnamed"}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-4">{lead.curriculum ?? ""}</td>
                  <td className="py-2.5 pr-4">{lead.subject ?? ""}</td>
                  <td className="py-2.5 pr-4">{lead.mode ?? ""}</td>
                  <td className="py-2.5 pr-4">{lead.city ?? ""}</td>
                  <td className="py-2.5">
                    <Badge>{statusLabel(lead.status ?? "new")}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
