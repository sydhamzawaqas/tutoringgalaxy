import "server-only";
import { getCurriculum } from "@/data/content/curricula";
import { getSubject } from "@/data/content/subjects";
import { createClient } from "@/lib/supabase/server";
import { storedFeedbackSchema, type StoredFeedback } from "@/lib/ai/schemas";
import { requireStudentAccess, verifySession, type SessionUser } from "./dal";

/**
 * Per-user reads for /app. Each exported function authorizes itself (DAL) before touching data,
 * and uses the user's own Supabase client so Row Level Security applies as a second check.
 * Never "use cache" these: results are per-user.
 */

export type AttemptDTO = {
  id: string;
  createdAt: string;
  curriculum: string;
  subject: string;
  topic: string;
  question: string;
  answer: string;
  correct: boolean;
  feedback: StoredFeedback | null;
};

export type TopicStat = { key: string; curriculum: string; subject: string; topic: string; attempts: number; marksAwarded: number; marksAvailable: number };

export type StudentReport = {
  student: { id: string; fullName: string };
  totals: { attempts: number; correct: number; marksAwarded: number; marksAvailable: number; last7Days: number };
  topics: TopicStat[];
  recent: AttemptDTO[];
};

export type LinkedStudent = { id: string; fullName: string; attempts: number; marksAwarded: number; marksAvailable: number; lastActive: string | null };

export function curriculumName(slug: string) {
  return getCurriculum(slug)?.short ?? slug;
}
export function subjectName(slug: string) {
  return getSubject(slug)?.name ?? slug;
}

type AttemptRow = {
  id: string;
  created_at: string;
  student_id?: string;
  curriculum: string;
  subject: string;
  topic: string;
  question: unknown;
  answer: string | null;
  feedback: unknown;
  correct: boolean | null;
};

function toDTO(row: AttemptRow): AttemptDTO {
  const q = row.question as { question?: unknown } | null;
  const feedback = storedFeedbackSchema.safeParse(row.feedback);
  return {
    id: row.id,
    createdAt: row.created_at,
    curriculum: row.curriculum,
    subject: row.subject,
    topic: row.topic,
    question: typeof q?.question === "string" ? q.question : "",
    answer: row.answer ?? "",
    correct: row.correct === true,
    feedback: feedback.success ? feedback.data : null,
  };
}

/** Full practice report for one student. 404s unless the viewer may see this student. */
export async function getStudentReport(studentId: string): Promise<StudentReport> {
  await requireStudentAccess(studentId);
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase is not configured");

  const [{ data: profile }, { data: rows, error }] = await Promise.all([
    supabase.from("profiles").select("id, full_name").eq("id", studentId).maybeSingle(),
    supabase
      .from("practice_attempts")
      .select("id, created_at, curriculum, subject, topic, question, answer, feedback, correct")
      .eq("student_id", studentId)
      .not("answer", "is", null)
      .order("created_at", { ascending: false })
      .limit(300),
  ]);
  if (error) throw new Error("Could not load practice attempts");

  const attempts = ((rows ?? []) as AttemptRow[]).map(toDTO);
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const topicMap = new Map<string, TopicStat>();
  let marksAwarded = 0;
  let marksAvailable = 0;
  for (const a of attempts) {
    const got = a.feedback?.marksAwarded ?? 0;
    const max = a.feedback?.marksAvailable ?? 0;
    marksAwarded += got;
    marksAvailable += max;
    const key = `${a.curriculum}|${a.subject}|${a.topic}`;
    const stat = topicMap.get(key) ?? { key, curriculum: a.curriculum, subject: a.subject, topic: a.topic, attempts: 0, marksAwarded: 0, marksAvailable: 0 };
    stat.attempts += 1;
    stat.marksAwarded += got;
    stat.marksAvailable += max;
    topicMap.set(key, stat);
  }

  return {
    student: { id: studentId, fullName: typeof profile?.full_name === "string" && profile.full_name ? profile.full_name : "Student" },
    totals: {
      attempts: attempts.length,
      correct: attempts.filter((a) => a.correct).length,
      marksAwarded,
      marksAvailable,
      last7Days: attempts.filter((a) => Date.parse(a.createdAt) >= weekAgo).length,
    },
    topics: [...topicMap.values()].sort((a, b) => b.attempts - a.attempts),
    recent: attempts.slice(0, 20),
  };
}

/** The current user's own report (students). */
export async function getMyReport(): Promise<{ user: SessionUser; report: StudentReport }> {
  const user = await verifySession();
  return { user, report: await getStudentReport(user.id) };
}

/**
 * Students linked to the current user: a parent's children, a tutor's students, or every
 * student for admins. Students get an empty list.
 */
export async function getLinkedStudents(): Promise<LinkedStudent[]> {
  const user = await verifySession();
  const supabase = await createClient();
  if (!supabase) return [];

  let ids: string[] = [];
  if (user.role === "parent") {
    const { data } = await supabase.from("guardianships").select("student_id").eq("parent_id", user.id).limit(50);
    ids = (data ?? []).map((r) => r.student_id as string);
  } else if (user.role === "tutor") {
    const { data } = await supabase.from("tutor_students").select("student_id").eq("tutor_id", user.id).limit(200);
    ids = (data ?? []).map((r) => r.student_id as string);
  } else if (user.role === "admin") {
    const { data } = await supabase.from("profiles").select("id").eq("role", "student").order("created_at", { ascending: false }).limit(200);
    ids = (data ?? []).map((r) => r.id as string);
  }
  if (ids.length === 0) return [];

  const [{ data: profiles }, { data: attempts }] = await Promise.all([
    supabase.from("profiles").select("id, full_name").in("id", ids),
    supabase
      .from("practice_attempts")
      .select("student_id, created_at, feedback")
      .in("student_id", ids)
      .not("answer", "is", null)
      .order("created_at", { ascending: false })
      .limit(2000),
  ]);

  const stats = new Map<string, { attempts: number; got: number; max: number; last: string | null }>();
  for (const row of (attempts ?? []) as { student_id: string; created_at: string; feedback: unknown }[]) {
    const s = stats.get(row.student_id) ?? { attempts: 0, got: 0, max: 0, last: null };
    const fb = storedFeedbackSchema.safeParse(row.feedback);
    s.attempts += 1;
    if (fb.success) {
      s.got += fb.data.marksAwarded;
      s.max += fb.data.marksAvailable;
    }
    s.last ??= row.created_at;
    stats.set(row.student_id, s);
  }

  return ((profiles ?? []) as { id: string; full_name: string | null }[])
    .map((p) => {
      const s = stats.get(p.id);
      return {
        id: p.id,
        fullName: p.full_name || "Unnamed student",
        attempts: s?.attempts ?? 0,
        marksAwarded: s?.got ?? 0,
        marksAvailable: s?.max ?? 0,
        lastActive: s?.last ?? null,
      };
    })
    .sort((a, b) => a.fullName.localeCompare(b.fullName));
}
