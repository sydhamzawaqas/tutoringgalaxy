import { LogOut } from "lucide-react";
import { signOut } from "@/lib/actions/auth";
import { roleLabel } from "@/lib/auth/roles";
import type { SessionUser } from "@/lib/auth/dal";
import { Button } from "@/components/ui/button";

/** Who is signed in, plus sign-out (a POST Server Action, not a GET link). */
export function AccountBox({ user }: { user: SessionUser }) {
  return (
    <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start">
      <div className="min-w-0">
        <p className="truncate font-semibold">{user.fullName || user.email}</p>
        <p className="text-small text-muted-foreground">{roleLabel[user.role]}</p>
      </div>
      <form action={signOut}>
        <Button type="submit" variant="ghost" size="sm">
          <LogOut aria-hidden strokeWidth={1.5} />
          Sign out
        </Button>
      </form>
    </div>
  );
}
