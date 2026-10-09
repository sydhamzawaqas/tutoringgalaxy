// Canonical verification badge catalog for the certified-teacher network.
// Keep IDs stable — used in teacher data, filters and JSON-LD credentials.

import {
  ShieldCheck,
  GraduationCap,
  Award,
  BadgeCheck,
  Globe2,
  Sparkles,
  Sigma,
  Languages,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

export type CertificationId =
  | "certified-teacher"
  | "licensed-educator"
  | "ib-certified"
  | "cambridge-certified"
  | "british-curriculum"
  | "sat-specialist"
  | "naplan-specialist"
  | "stem-expert"
  | "native-english"
  | "exam-prep-specialist";

export type Certification = {
  id: CertificationId;
  label: string;
  short: string;
  tooltip: string;
  icon: LucideIcon;
};

export const CERTIFICATIONS: Certification[] = [
  { id: "certified-teacher", label: "Certified Teacher", short: "Certified", tooltip: "Verified teaching qualification from an accredited institution.", icon: BadgeCheck },
  { id: "licensed-educator", label: "Licensed Educator", short: "Licensed", tooltip: "State- or country-licensed to teach in a school setting.", icon: ScrollText },
  { id: "ib-certified", label: "IB Certified", short: "IB", tooltip: "Certified by the International Baccalaureate Organization.", icon: Award },
  { id: "cambridge-certified", label: "Cambridge Certified", short: "Cambridge", tooltip: "Trained under Cambridge Assessment International Education.", icon: GraduationCap },
  { id: "british-curriculum", label: "British Curriculum Specialist", short: "British", tooltip: "Deep specialism in GCSE, IGCSE and A Level pathways.", icon: ShieldCheck },
  { id: "sat-specialist", label: "SAT Specialist", short: "SAT", tooltip: "Focused SAT preparation with measurable score gains.", icon: Sigma },
  { id: "naplan-specialist", label: "NAPLAN Specialist", short: "NAPLAN", tooltip: "Specialist for Australian NAPLAN preparation.", icon: Sparkles },
  { id: "stem-expert", label: "STEM Expert", short: "STEM", tooltip: "Advanced expertise across science, technology, engineering and maths.", icon: Sigma },
  { id: "native-english", label: "Native English Speaker", short: "Native EN", tooltip: "Native-level English fluency and academic writing.", icon: Languages },
  { id: "exam-prep-specialist", label: "Exam Preparation Specialist", short: "Exam Prep", tooltip: "Track record of exam-technique coaching and grade jumps.", icon: Globe2 },
];

export const CERTIFICATION_BY_ID: Record<CertificationId, Certification> = Object.fromEntries(
  CERTIFICATIONS.map((c) => [c.id, c]),
) as Record<CertificationId, Certification>;
