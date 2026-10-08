import { Mark, Note, SheetCard } from "@/components/ui/primitives";
import { Star, Tick } from "@/components/brand/marks";

/**
 * The hero visual: a piece of marked work, which is what families actually pay for.
 * Static illustration of the product, not a real student's work.
 */
export function MarkedWork() {
  return (
    <figure className="relative">
      <SheetCard className="shadow-float sm:p-7">
        <Star className="absolute -top-4 -right-3 size-10" />
        <div className="flex justify-between border-b border-rule pb-3 text-label text-muted-foreground">
          <span>IGCSE Mathematics 0580</span>
          <span>Lesson 6</span>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <p>
            <span className="font-bold tabular-nums">3 (b)</span>
            <span className="ml-2">
              Solve <span className="font-note text-lead italic">x² − 5x + 6 = 0</span>.
            </span>
          </p>
          <Mark>3</Mark>
        </div>
        <div className="mt-2" aria-label="Student working">
          {[
            ["(x − 2)(x − 3) = 0", "M1"],
            ["x = 2 or x = 3", "A1 A1"],
          ].map(([work, mark]) => (
            <div key={work} className="answer-line flex min-h-11 items-end justify-between gap-3 px-1 pb-1.5">
              <span className="font-note text-lead">{work}</span>
              <span className="font-note text-small italic text-annotation">{mark}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-3">
          <Tick animate className="mt-0.5 shrink-0" />
          <Note>Full marks. Factorising first is exactly what the mark scheme rewards.</Note>
        </div>
      </SheetCard>
      <figcaption className="sr-only">Example of a student&apos;s answer marked by a tutor, with full marks and a short note.</figcaption>
    </figure>
  );
}
