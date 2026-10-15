import Link from "next/link";
import { Wordmark } from "@/components/brand/marks";

/** Sign-in pages: a single sheet of paper, centred. No marketing chrome, not indexed (see each page). */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col bg-surface">
      <header className="mx-auto flex w-full max-w-page items-center px-4 py-6 sm:px-6">
        <Link href="/" className="rounded-control">
          <Wordmark />
        </Link>
      </header>
      <main id="main" className="flex flex-1 items-start justify-center px-4 pb-16 sm:px-6 sm:pt-8">
        <div className="w-full max-w-md rounded-container border border-border bg-background p-6 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
