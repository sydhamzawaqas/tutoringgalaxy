import { Suspense } from "react";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { getAdminOverview } from "@/lib/auth/admin-data";
import { roleLabel, ROLES } from "@/lib/auth/roles";
import { SheetCard } from "@/components/ui/primitives";
import { LoadingLines, PageHeader } from "@/components/app/page-header";

export const metadata = pageMetadata({ title: "Admin", description: "Admin overview.", path: "/admin", noindex: true });

export default function AdminPage() {
  return (
    <>
      <PageHeader title="Overview" lead="New leads first, then tutor applications and accounts." />
      <Suspense fallback={<LoadingLines label="Loading overview" />}>
        <Overview />
      </Suspense>
    </>
  );
}

function n(value: number | null) {
  return value === null ? "Unavailable" : value.toLocaleString("en-GB");
}

async function Overview() {
  const o = await getAdminOverview();
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card title="New leads" value={n(o.leadsNew)} detail={`${n(o.leadsTotal)} total, ${n(o.leadsLast7Days)} this week`} href="/admin/leads?status=new" cta="Open new leads" />
      <Card
        title="New tutor applications"
        value={n(o.tutorApplicationsNew)}
        detail={`${n(o.tutorApplicationsTotal)} total`}
        href="/admin/tutors"
        cta="Review applications"
      />
      <Card
        title="Accounts"
        value={n(ROLES.reduce((sum, r) => sum + (o.users[r] ?? 0), 0))}
        detail={ROLES.map((r) => `${roleLabel[r]}s: ${n(o.users[r])}`).join(", ")}
        href="/admin/users"
        cta="Manage users"
      />
    </div>
  );
}

function Card({ title, value, detail, href, cta }: { title: string; value: string; detail: string; href: string; cta: string }) {
  return (
    <SheetCard className="flex flex-col gap-2">
      <h2 className="text-small font-semibold text-muted-foreground">{title}</h2>
      <p className="text-h2-sm font-bold tabular-nums">{value}</p>
      <p className="text-small text-muted-foreground">{detail}</p>
      <Link href={href} className="mt-auto pt-2 text-small font-semibold underline underline-offset-4">
        {cta}
      </Link>
    </SheetCard>
  );
}
