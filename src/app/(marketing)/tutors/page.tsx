import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Select } from "@/components/ui/form";
import { Container, Panel, Section, SheetCard } from "@/components/ui/primitives";
import { ClosingCta, PageIntro, PrimaryActions, TutorCard } from "@/components/sections/blocks";
import { curricula, getCurriculum } from "@/data/content/curricula";
import { getSubject, subjects } from "@/data/content/subjects";
import { tutors, type Tutor } from "@/data/content/tutors";
import { pageMetadata } from "@/lib/seo";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
type Props = { searchParams: SearchParams };

type Filters = { curriculum?: string; subject?: string; mode?: Tutor["modes"][number] };

const modes: { value: Tutor["modes"][number]; label: string }[] = [
  { value: "online", label: "Online" },
  { value: "home", label: "At home (Islamabad and Rawalpindi)" },
];

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

/** Read filters from the URL, ignoring anything that isn't a known value. */
async function readFilters(searchParams: SearchParams): Promise<Filters> {
  const sp = await searchParams;
  const curriculum = one(sp.curriculum);
  const subject = one(sp.subject);
  const mode = one(sp.mode);
  return {
    curriculum: curriculum && getCurriculum(curriculum) ? curriculum : undefined,
    subject: subject && getSubject(subject) ? subject : undefined,
    mode: modes.some((m) => m.value === mode) ? (mode as Filters["mode"]) : undefined,
  };
}

const description =
  "Browse tutors for O Level, A Level, IGCSE, IB, Matric, FSc, MDCAT and SAT. Filter by curriculum, subject and online or home lessons. First lesson free.";

// Filtered views share the /tutors canonical and are kept out of the index, so they never become thin pages.
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const filtered = ["curriculum", "subject", "mode"].some((k) => one(sp[k]));
  return pageMetadata({ title: "Find a tutor", description, path: "/tutors", noindex: filtered });
}

export default function TutorsPage({ searchParams }: Props) {
  return (
    <>
      <PageIntro
        title="Find a tutor"
        lead="Choose the curriculum, subject and how you'd like lessons. We'll share a tutor's profile with you before the free trial."
        aside={<p>Can&apos;t see the right tutor? Most matches are made by our team, not the list. Tell us what you need.</p>}
      >
        <PrimaryActions />
      </PageIntro>

      <Section className="border-t-0 pt-10 lg:pt-12">
        <Container>
          <Panel className="flex gap-3" role="note">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
            <p>
              <strong className="font-semibold">These are example profiles.</strong>{" "}
              <span className="text-muted-foreground">
                They show what a tutor profile will look like. Real tutors, with qualifications checked, will be added here before launch.
              </span>
            </p>
          </Panel>

          <Suspense fallback={<FilterForm filters={{}} />}>
            <Directory searchParams={searchParams} />
          </Suspense>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}

async function Directory({ searchParams }: Props) {
  const filters = await readFilters(searchParams);
  const results = tutors.filter(
    (t) =>
      (!filters.curriculum || t.curricula.includes(filters.curriculum)) &&
      (!filters.subject || t.subjects.includes(filters.subject)) &&
      (!filters.mode || t.modes.includes(filters.mode)),
  );
  const active = Boolean(filters.curriculum || filters.subject || filters.mode);
  const bookParams = new URLSearchParams();
  if (filters.curriculum) bookParams.set("curriculum", filters.curriculum);
  if (filters.subject) bookParams.set("subject", filters.subject);
  if (filters.mode) bookParams.set("mode", filters.mode);
  const bookHref = bookParams.size ? `/book?${bookParams}` : "/book";

  return (
    <>
      <FilterForm filters={filters} />

      <h2 className="sr-only">Results</h2>
      <p className="mt-8 text-small text-muted-foreground" aria-live="polite">
        {results.length === 1 ? "1 example profile" : `${results.length} example profiles`}
        {active ? " match your filters" : ""}
      </p>

      {results.length ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {results.map((t) => (
            <TutorCard key={t.slug} t={t} />
          ))}
        </div>
      ) : (
        <SheetCard className="mt-4 max-w-measure">
          <h3 className="text-h3">Tell us what you need and we&apos;ll match you</h3>
          <p className="mt-2 text-muted-foreground">
            No profiles here match those filters yet, but that doesn&apos;t mean we can&apos;t help. Most tutors are matched by our team. Send us the subject
            and syllabus and we&apos;ll suggest a tutor, usually within a day.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={bookHref}>Book a free trial</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/tutors">Clear filters</Link>
            </Button>
          </div>
        </SheetCard>
      )}
    </>
  );
}

/** GET form: works without JavaScript and keeps filters in the URL. */
function FilterForm({ filters }: { filters: Filters }) {
  return (
    <form action="/tutors" method="get" role="search" aria-label="Filter tutors" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto]">
      <Field id="filter-curriculum" label="Curriculum">
        <Select id="filter-curriculum" name="curriculum" defaultValue={filters.curriculum ?? ""}>
          <option value="">Any curriculum</option>
          {curricula.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.short}
            </option>
          ))}
        </Select>
      </Field>
      <Field id="filter-subject" label="Subject">
        <Select id="filter-subject" name="subject" defaultValue={filters.subject ?? ""}>
          <option value="">Any subject</option>
          {subjects.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </Select>
      </Field>
      <Field id="filter-mode" label="Lessons">
        <Select id="filter-mode" name="mode" defaultValue={filters.mode ?? ""}>
          <option value="">Online or at home</option>
          {modes.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </Select>
      </Field>
      <div className="flex items-end gap-3">
        <Button type="submit">Show tutors</Button>
        <Button asChild variant="ghost">
          <Link href="/tutors">Clear</Link>
        </Button>
      </div>
    </form>
  );
}
