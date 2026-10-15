"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { checkAnswer, startQuestion } from "@/lib/actions/practice";
import type { StoredFeedback } from "@/lib/ai/schemas";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/form";
import { Mark, Note, Panel, QNum, SheetCard } from "@/components/ui/primitives";
import { Tick } from "@/components/brand/marks";
import { MathText } from "./math-text";

type Selection = { curriculum: string; subject: string; topic: string; difficulty: string };
type Question = { attemptId: string; question: string; marks: number; number: number };
type Marked = { feedback: StoredFeedback; correct: boolean };

const MAX_ANSWER = 4000;
const LINES = 8;

/**
 * One question at a time. The browser only ever holds the attempt id, the question text and the
 * marks; the mark scheme and worked answer stay on the server and are looked up by attempt id
 * (owned by the signed-in student) when marking.
 */
export function PracticeSession({ selection }: { selection: Selection }) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [marked, setMarked] = useState<Marked | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [isLoading, startLoading] = useTransition();
  const [isChecking, startChecking] = useTransition();
  const count = useRef(0);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const feedbackHeading = useRef<HTMLHeadingElement>(null);
  const answerId = useId();

  useEffect(() => {
    if (question && !marked) questionHeading.current?.focus();
  }, [question, marked]);
  useEffect(() => {
    if (marked) feedbackHeading.current?.focus();
  }, [marked]);

  function newQuestion() {
    setError(null);
    setStatus("Writing a question…");
    startLoading(async () => {
      const result = await startQuestion(selection);
      if (!result.ok) {
        setError(result.error);
        setStatus("");
        return;
      }
      count.current += 1;
      setQuestion({ attemptId: result.attemptId, question: result.question, marks: result.marks, number: count.current });
      setAnswer("");
      setMarked(null);
      setStatus("Question ready.");
    });
  }

  function submitAnswer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!question) return;
    if (answer.trim().length === 0) {
      setError("Write your answer and working first.");
      return;
    }
    setError(null);
    setStatus("Marking your answer…");
    startChecking(async () => {
      const result = await checkAnswer({ attemptId: question.attemptId, answer });
      if (!result.ok) {
        setError(result.error);
        setStatus("");
        return;
      }
      setMarked({ feedback: result.feedback, correct: result.correct });
      setStatus(`Marked: ${result.feedback.marksAwarded} out of ${result.feedback.marksAvailable}.`);
    });
  }

  const busy = isLoading || isChecking;

  return (
    <div className="graph-paper -mx-4 rounded-container px-4 py-8 sm:mx-0 sm:px-8">
      <p className="sr-only" aria-live="polite">
        {status}
      </p>

      {!question ? (
        <SheetCard className="max-w-measure">
          <h2 className="text-h3">Ready when you are</h2>
          <p className="mt-2 text-muted-foreground">
            You&apos;ll get one exam-style question. Write your working as you would in the exam, then check your answer.
          </p>
          <div className="mt-6">
            <Button onClick={newQuestion} disabled={busy}>
              {isLoading ? "Writing a question…" : "Give me a question"}
            </Button>
          </div>
        </SheetCard>
      ) : (
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <SheetCard>
            <div className="flex items-start gap-4">
              <QNum aria-hidden>{question.number}</QNum>
              <div className="min-w-0 flex-1">
                <h2 ref={questionHeading} tabIndex={-1} className="sr-only">
                  Question {question.number}, {question.marks} {question.marks === 1 ? "mark" : "marks"}
                </h2>
                <p className="text-body">
                  <MathText text={question.question} />
                </p>
              </div>
              <Mark aria-hidden>{question.marks}</Mark>
            </div>

            <form onSubmit={submitAnswer} className="mt-6 flex flex-col gap-3">
              <Label htmlFor={answerId}>Your answer and working</Label>
              <div className="relative">
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0">
                  {Array.from({ length: LINES }, (_, i) => (
                    <div key={i} className="answer-line h-8" />
                  ))}
                </div>
                <textarea
                  id={answerId}
                  name="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  readOnly={Boolean(marked)}
                  maxLength={MAX_ANSWER}
                  rows={LINES}
                  spellCheck
                  aria-describedby={`${answerId}-help`}
                  className="relative block h-64 w-full resize-none bg-transparent px-1 py-0 font-note text-note leading-8 text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                />
              </div>
              <p id={`${answerId}-help`} className="text-small text-muted-foreground">
                Show each step. Type maths plainly, e.g. x^2 + 3x = 10 or sqrt(2). {answer.length}/{MAX_ANSWER}
              </p>
              {!marked ? (
                <div>
                  <Button type="submit" disabled={busy}>
                    {isChecking ? "Marking…" : "Check my answer"}
                  </Button>
                </div>
              ) : null}
            </form>
          </SheetCard>

          {marked ? <Feedback marked={marked} headingRef={feedbackHeading} /> : null}

          {marked ? (
            <div className="flex flex-wrap gap-3">
              <Button onClick={newQuestion} disabled={busy}>
                {isLoading ? "Writing a question…" : "Next question"}
              </Button>
            </div>
          ) : null}
        </div>
      )}

      {error ? (
        <p role="alert" className="mx-auto mt-6 max-w-3xl rounded-control bg-background px-4 py-3 text-small text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Feedback({ marked, headingRef }: { marked: Marked; headingRef: React.RefObject<HTMLHeadingElement | null> }) {
  const { feedback, correct } = marked;
  return (
    <Panel className="bg-background">
      <div className="flex items-start justify-between gap-4">
        <h2 ref={headingRef} tabIndex={-1} className="text-h3">
          Examiner&apos;s notes
        </h2>
        <div className="flex items-center gap-1">
          {correct ? <Tick animate /> : null}
          <Mark className="text-annotation">
            {feedback.marksAwarded}/{feedback.marksAvailable}
          </Mark>
        </div>
      </div>
      {feedback.marks.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-2">
          {feedback.marks.map((m, i) => (
            <li key={`${m.code}-${i}`} className="flex items-baseline gap-3">
              <span className="w-8 shrink-0 font-bold text-annotation tabular-nums">
                {m.code}
                <span className="sr-only">{m.awarded ? " awarded" : " not awarded"}</span>
              </span>
              <span aria-hidden className="w-5 shrink-0">
                {m.awarded ? <Tick className="size-5" /> : <span className="text-annotation">✗</span>}
              </span>
              <Note className="text-body">
                <MathText text={m.comment} />
              </Note>
            </li>
          ))}
        </ul>
      ) : null}
      <Note className="mt-4">
        <MathText text={feedback.feedback} />
      </Note>
      {feedback.nextStep ? (
        <div className="mt-4 border-t border-rule pt-4">
          <p className="text-small font-semibold">Next step</p>
          <Note className="mt-1">
            <MathText text={feedback.nextStep} />
          </Note>
        </div>
      ) : null}
      <p className="mt-4 text-micro text-muted-foreground">
        Marked by AI. It can make mistakes, so check anything surprising with your tutor.
      </p>
    </Panel>
  );
}
