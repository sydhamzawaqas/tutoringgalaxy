import Link from "next/link";
import { Wordmark } from "@/components/brand/marks";

/**
 * Logged-in shell: sidebar (top bar on mobile) plus main content.
 * `nav` and `account` usually read the session, so pass them wrapped in <Suspense>.
 */
export function AppShell({
  nav,
  account,
  children,
  homeHref = "/app",
}: {
  nav: React.ReactNode;
  account?: React.ReactNode;
  children: React.ReactNode;
  homeHref?: string;
}) {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <aside className="border-b border-rule bg-surface lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64 lg:shrink-0 lg:flex-col lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between px-4 py-4 lg:px-6 lg:py-6">
          <Link href={homeHref} className="rounded-control">
            <Wordmark className="h-6" />
          </Link>
        </div>
        <div className="lg:flex-1">{nav}</div>
        {account ? <div className="hidden border-t border-rule px-6 py-4 lg:block">{account}</div> : null}
      </aside>
      <main id="main" className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-page">{children}</div>
        {account ? <div className="mt-12 border-t border-rule pt-4 lg:hidden">{account}</div> : null}
      </main>
    </div>
  );
}
