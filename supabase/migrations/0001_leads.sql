-- Tutoring Galaxy: lead capture tables.
--
-- Both tables are written ONLY from the server with the service role key (src/lib/leads.ts and the
-- join-as-tutor action). Row Level Security is enabled with NO policies, so the anon and
-- authenticated roles can neither read nor write them; the service role bypasses RLS.
-- Do not add public policies: these rows hold parents' and tutors' contact details.

create extension if not exists pgcrypto; -- gen_random_uuid() (built in on Postgres 13+, kept for safety)

-- ---------------------------------------------------------------------------------------------
-- Trial requests from /book
-- ---------------------------------------------------------------------------------------------
create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  curriculum      text not null check (char_length(curriculum) <= 80),
  subject         text not null check (char_length(subject) <= 80),
  level           text not null check (char_length(level) <= 60),
  challenge       text check (char_length(challenge) <= 1000),
  mode            text not null check (mode in ('online', 'home')),
  city            text check (char_length(city) <= 40),
  preferred_times text check (char_length(preferred_times) <= 200),
  parent_name     text not null check (char_length(parent_name) <= 80),
  whatsapp        text not null check (whatsapp ~ '^\+[1-9][0-9]{7,14}$'),
  email           text check (char_length(email) <= 254),
  consent         boolean not null default false,
  source_path     text check (char_length(source_path) <= 200),
  plan            text check (char_length(plan) <= 80),
  tutor_slug      text check (char_length(tutor_slug) <= 80),
  status          text not null default 'new'
                  check (status in ('new', 'contacted', 'trial_booked', 'enrolled', 'closed')),
  notes           text
);

comment on table public.leads is 'Free trial requests. Service role only (RLS on, no policies). The public ref is TG- plus the first 8 hex characters of id.';

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

alter table public.leads enable row level security;
-- Intentionally no policies.

-- ---------------------------------------------------------------------------------------------
-- Tutor applications from /join-as-tutor
-- Column names are relied on by the join-as-tutor action; keep them exactly as they are.
-- ---------------------------------------------------------------------------------------------
create table if not exists public.tutor_applications (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  name             text not null,
  email            text,
  whatsapp         text,
  subjects         text[] not null default '{}',
  curricula        text[] not null default '{}',
  qualifications   text,
  experience_years int check (experience_years is null or experience_years between 0 and 80),
  city             text,
  modes            text[] not null default '{}',
  about            text,
  status           text not null default 'new'
);

comment on table public.tutor_applications is 'Tutor applications. Service role only (RLS on, no policies).';

create index if not exists tutor_applications_created_at_idx on public.tutor_applications (created_at desc);

alter table public.tutor_applications enable row level security;
-- Intentionally no policies.

-- Belt and braces: make sure the client-facing roles hold no table privileges either.
revoke all on table public.leads from anon, authenticated;
revoke all on table public.tutor_applications from anon, authenticated;
