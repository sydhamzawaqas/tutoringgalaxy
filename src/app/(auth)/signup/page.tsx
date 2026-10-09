import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/data/content/site";
import { Button } from "@/components/ui/button";
import { QNum } from "@/components/ui/primitives";

export const metadata = pageMetadata({
  title: "Create an account",
  description: "Tutoring Galaxy accounts are created by invitation after a free trial lesson.",
  path: "/signup",
  noindex: true,
});

const steps = [
  "Book a free trial lesson for your child.",
  "After the trial, we set up accounts for you and your child.",
  "You get an email invite. Open it, choose a password, and you're in.",
];

/**
 * Invite-only: there is deliberately no public sign-up form, so nobody can create an account
 * or pick a role for themselves. Admins invite users from /admin/users.
 */
export default function SignupPage() {
  return (
    <>
      <h1 className="text-h2-sm">Accounts are by invitation</h1>
      <p className="mt-2 text-muted-foreground">
        Student, parent and tutor accounts are created by our team, so every account is linked to the right child
        and tutor.
      </p>
      <ol className="mt-6 flex flex-col gap-4">
        {steps.map((step, i) => (
          <li key={step} className="flex gap-4">
            <QNum className="text-body">{i + 1}</QNum>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/book">Book a free trial</Link>
        </Button>
        <Button asChild variant="secondary">
          <a href={whatsappLink("Hi Tutoring Galaxy, I'd like an account for AI practice.")} rel="noopener noreferrer" target="_blank">
            WhatsApp us
          </a>
        </Button>
      </div>
      <p className="mt-6 border-t border-rule pt-4 text-small text-muted-foreground">
        Already invited? Use the link in your email, or{" "}
        <Link href="/login" className="font-semibold text-foreground underline underline-offset-4">
          sign in
        </Link>
        .
      </p>
    </>
  );
}
