import Form from "next/form";
import { BookOpen, Globe2, GraduationCap, Layers, Search } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/marks";
import { Select } from "@/components/ui/form";
import { finderGrades } from "@/data/content/home";
import { whatsappLink } from "@/data/content/site";
import { CURRICULA, REGIONS, SUBJECTS } from "@/data/legacy/seo";

const fields = [
  { id: "finder-subject", name: "subject", label: "Subject", icon: BookOpen, placeholder: "Any subject", options: SUBJECTS.map((s) => ({ v: s.slug, l: s.name })) },
  { id: "finder-curriculum", name: "curriculum", label: "Curriculum", icon: Layers, placeholder: "Any curriculum", options: CURRICULA.map((c) => ({ v: c.slug, l: c.name })) },
  { id: "finder-grade", name: "grade", label: "Grade or level", icon: GraduationCap, placeholder: "Any level", options: finderGrades.map((g) => ({ v: g, l: g })) },
  { id: "finder-country", name: "country", label: "Country", icon: Globe2, placeholder: "Any country", options: REGIONS.map((r) => ({ v: r.slug, l: r.name })) },
] as const;

/** Tutor finder (old TutorFinderForm). Plain GET to /tutors, so it works without JavaScript. */
export function TutorFinder() {
  return (
    <div className="relative rounded-panel border border-border bg-background p-5 shadow-lift sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-label font-semibold text-gold-deep">Find the perfect tutor</p>
          <h2 className="mt-1 text-h3">Tell us what you need</h2>
        </div>
        <p className="text-small text-muted-foreground">Search our vetted tutors by subject, level and country.</p>
      </div>
      <Form action="/tutors" className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-end">
        {fields.map((f) => (
          <div key={f.id} className="flex flex-col gap-1.5">
            <label htmlFor={f.id} className="inline-flex items-center gap-1.5 text-small font-semibold">
              <f.icon aria-hidden className="size-4 text-navy-soft" />
              {f.label}
            </label>
            <Select id={f.id} name={f.name} defaultValue="" className="bg-surface">
              <option value="">{f.placeholder}</option>
              {f.options.map((o) => (
                <option key={o.v} value={o.v}>
                  {o.l}
                </option>
              ))}
            </Select>
          </div>
        ))}
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-control bg-navy px-6 font-semibold text-on-dark transition-colors hover:bg-navy-soft sm:col-span-2 lg:col-span-1"
        >
          <Search aria-hidden className="size-4.5" />
          Find my tutor
        </button>
      </Form>
      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-muted-foreground">
        Can&apos;t find your subject?
        <a
          href={whatsappLink("Hi! I need help finding a tutor. Can you assist me?")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-success underline-offset-4 hover:underline"
        >
          <WhatsAppIcon />
          Ask us on WhatsApp
        </a>
      </p>
    </div>
  );
}
