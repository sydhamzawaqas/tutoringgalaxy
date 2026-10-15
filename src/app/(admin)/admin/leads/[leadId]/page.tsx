import { Suspense } from "react";
import { RequestTime } from "@/components/app/request-time";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getLead } from "@/lib/auth/admin-data";
import { statusLabel } from "@/lib/auth/admin-constants";
import { Badge, SheetCard } from "@/components/ui/primitives";
import { LoadingLines, PageHeader } from "@/components/app/page-header";
import { LeadForm } from "@/components/app/admin-forms";
import { formatDate } from "@/components/app/progress-report";

export const metadata = pageMetadata({ title: "Lead", description: "Lead details.", path: "/admin/leads", noindex: true });

export default function LeadPage({ params }: { params: Promise<{ leadId: string }> }) {
  return (
    <>
      <Suspense>
        <RequestTime />
      </Suspense>
      <p className="mb-4 text-small">
        <Link href="/admin/leads" className="font-semibold underline underline-offset-4">
          All leads
        </Link>
      </p>
      <Suspense fallback={<LoadingLines label="Loading lead" />}>
        <Lead params={params} />
      </Suspense>
    </>
  );
}

function display(value: unknown): string {
  if (value === null || value === undefined || value === "") return "Not given";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.map((v) => String(v)).join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

async function Lead({ params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = await params;
  const lead = await getLead(leadId);
  if (!lead) notFound();

  const whatsappDigits = (lead.whatsapp ?? "").replace(/\D/g, "");
  const rows: [string, unknown][] = [
    ["Received", formatDate(lead.created_at)],
    ["Curriculum", lead.curriculum],
    ["Subject", lead.subject],
    ["Level", lead.level],
    ["Main challenge", lead.challenge],
    ["Mode", lead.mode],
    ["City", lead.city],
    ["Preferred times", lead.preferred_times],
    ["Plan", lead.plan],
    ["Tutor requested", lead.tutor_slug],
    ["Email", lead.email],
    ["WhatsApp", lead.whatsapp],
    ["Consent to contact", lead.consent],
    ["Booked from", lead.source_path],
  ];

  return (
    <>
      <PageHeader title={lead.parent_name || "Unnamed lead"}>
        <Badge>{statusLabel(lead.status ?? "new")}</Badge>
      </PageHeader>
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <SheetCard>
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[12rem_1fr]">
            {rows.map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-small text-muted-foreground">{label}</dt>
                <dd className="break-words whitespace-pre-line">{display(value)}</dd>
              </div>
            ))}
          </dl>
          {whatsappDigits.length >= 8 ? (
            <p className="mt-6">
              <a
                href={`https://wa.me/${whatsappDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-4"
              >
                Open WhatsApp chat
              </a>
            </p>
          ) : null}
        </SheetCard>
        <SheetCard>
          <h2 className="text-h3">Update</h2>
          <div className="mt-4">
            <LeadForm leadId={lead.id} status={lead.status ?? "new"} notes={lead.notes ?? ""} />
          </div>
        </SheetCard>
      </div>
    </>
  );
}
