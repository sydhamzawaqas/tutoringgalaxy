-- 0002_app.sql: logged-in app (profiles, roles, family/tutor links, AI practice, AI quota).
--
-- Security model
--   * RLS is enabled on every table. Default is deny; policies below only open reads.
--   * Roles live in public.profiles.role. New users always start as 'student'; the role is
--     never read from user-controlled sign-up metadata. Only admins (through the server,
--     using the service-role key after requireRole('admin')) can change roles.
--   * practice_attempts and ai_usage are written only by the server with the service-role
--     key, so a student can't grade their own work or reset their AI quota through the
--     public API. Users can read their own rows; parents and tutors can read linked students.
--   * Security-definer helpers pin search_path = '' and use fully-qualified names.
--
-- Bootstrap the first admin from the SQL editor (direct DB connections carry no JWT):
--   update public.profiles set role = 'admin' where id = '<auth user id>';

-- ---------------------------------------------------------------------------
-- Types and tables
-- ---------------------------------------------------------------------------

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role' and typnamespace = 'public'::regnamespace) then
    create type public.app_role as enum ('student', 'parent', 'tutor', 'admin');
  end if;
end
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.app_role not null default 'student',
  full_name text not null default '' check (char_length(full_name) <= 120),
  created_at timestamptz not null default now()
);

create table if not exists public.guardianships (
  parent_id uuid not null references public.profiles (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (parent_id, student_id),
  check (parent_id <> student_id)
);
create index if not exists guardianships_student_idx on public.guardianships (student_id);

create table if not exists public.tutor_students (
  tutor_id uuid not null references public.profiles (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (tutor_id, student_id),
  check (tutor_id <> student_id)
);
create index if not exists tutor_students_student_idx on public.tutor_students (student_id);

create table if not exists public.practice_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles (id) on delete cascade,
  curriculum text not null check (char_length(curriculum) <= 40),
  subject text not null check (char_length(subject) <= 60),
  topic text not null check (char_length(topic) <= 120),
  question jsonb not null,
  answer text check (char_length(answer) <= 5000),
  feedback jsonb,
  correct boolean,
  created_at timestamptz not null default now()
);
create index if not exists practice_attempts_student_created_idx
  on public.practice_attempts (student_id, created_at desc);

create table if not exists public.ai_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  count integer not null default 0 check (count >= 0),
  primary key (user_id, day)
);

-- ---------------------------------------------------------------------------
-- Helper functions (security definer, fixed search_path)
-- ---------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'admin'
  );
$$;

-- True when the current user is the student, a linked parent, an assigned tutor or an admin.
create or replace function public.can_view_student(p_student uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    (select auth.uid()) = p_student
    or exists (
      select 1 from public.guardianships g
      where g.parent_id = (select auth.uid()) and g.student_id = p_student
    )
    or exists (
      select 1 from public.tutor_students t
      where t.tutor_id = (select auth.uid()) and t.student_id = p_student
    )
    or public.is_admin();
$$;

-- Profiles a user may see: anyone they can view as a student, plus their own parents/tutors.
create or replace function public.can_view_profile(p_profile uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    public.can_view_student(p_profile)
    or exists (
      select 1 from public.guardianships g
      where g.student_id = (select auth.uid()) and g.parent_id = p_profile
    )
    or exists (
      select 1 from public.tutor_students t
      where t.student_id = (select auth.uid()) and t.tutor_id = p_profile
    );
$$;

revoke execute on function public.is_admin() from public, anon;
revoke execute on function public.can_view_student(uuid) from public, anon;
revoke execute on function public.can_view_profile(uuid) from public, anon;
grant execute on function public.is_admin() to authenticated, service_role;
grant execute on function public.can_view_student(uuid) to authenticated, service_role;
grant execute on function public.can_view_profile(uuid) to authenticated, service_role;

-- Atomic per-user daily AI quota. Returns true if this call is within the limit.
-- Called only by the server (service role); the limit comes from server config, never the client.
create or replace function public.increment_ai_usage(p_user_id uuid, p_day date, p_limit integer)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  if p_user_id is null or p_day is null or p_limit is null or p_limit < 1 then
    return false;
  end if;

  insert into public.ai_usage as u (user_id, day, count)
  values (p_user_id, p_day, 1)
  on conflict (user_id, day) do update
    set count = u.count + 1
    where u.count < p_limit
  returning u.count into v_count;

  return v_count is not null;
end;
$$;

revoke execute on function public.increment_ai_usage(uuid, date, integer) from public, anon, authenticated;
grant execute on function public.increment_ai_usage(uuid, date, integer) to service_role;

-- ---------------------------------------------------------------------------
-- New users get a 'student' profile. Role is never taken from sign-up metadata.
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'full_name', ''), 120))
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Belt and braces: block role or id changes unless the caller is an admin, the service role,
-- or a direct database connection (no JWT, e.g. the SQL editor or migrations).
create or replace function public.guard_profile_update()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_jwt_role text := nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role';
begin
  if new.id is distinct from old.id then
    raise exception 'profile id cannot change' using errcode = '42501';
  end if;
  if new.role is distinct from old.role
     and v_jwt_role is not null
     and v_jwt_role <> 'service_role'
     and not public.is_admin() then
    raise exception 'only admins can change roles' using errcode = '42501';
  end if;
  return new;
end;
$$;

revoke execute on function public.guard_profile_update() from public, anon, authenticated;

drop trigger if exists profiles_guard_update on public.profiles;
create trigger profiles_guard_update
  before update on public.profiles
  for each row execute function public.guard_profile_update();

-- ---------------------------------------------------------------------------
-- Privileges: anon gets nothing; authenticated can only read (RLS-filtered) and edit
-- their own display name. Everything else goes through the server.
-- ---------------------------------------------------------------------------

revoke all on table public.profiles, public.guardianships, public.tutor_students,
  public.practice_attempts, public.ai_usage from anon;
revoke insert, update, delete, truncate on table public.profiles, public.guardianships,
  public.tutor_students, public.practice_attempts, public.ai_usage from authenticated;
grant select on table public.profiles, public.guardianships, public.tutor_students,
  public.practice_attempts, public.ai_usage to authenticated;
grant update (full_name) on table public.profiles to authenticated;

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.guardianships enable row level security;
alter table public.tutor_students enable row level security;
alter table public.practice_attempts enable row level security;
alter table public.ai_usage enable row level security;

-- profiles
drop policy if exists "profiles: read own, linked, or as admin" on public.profiles;
create policy "profiles: read own, linked, or as admin" on public.profiles
  for select to authenticated
  using (public.can_view_profile(id));

drop policy if exists "profiles: update own name" on public.profiles;
create policy "profiles: update own name" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- guardianships (writes: admins via the server only)
drop policy if exists "guardianships: read own links" on public.guardianships;
create policy "guardianships: read own links" on public.guardianships
  for select to authenticated
  using (parent_id = (select auth.uid()) or student_id = (select auth.uid()) or public.is_admin());

-- tutor_students (writes: admins via the server only)
drop policy if exists "tutor_students: read own links" on public.tutor_students;
create policy "tutor_students: read own links" on public.tutor_students
  for select to authenticated
  using (tutor_id = (select auth.uid()) or student_id = (select auth.uid()) or public.is_admin());

-- practice_attempts: the student, linked parents, assigned tutors and admins can read.
-- Writes happen on the server with the service role after the session is verified.
drop policy if exists "practice_attempts: read own or linked" on public.practice_attempts;
create policy "practice_attempts: read own or linked" on public.practice_attempts
  for select to authenticated
  using (public.can_view_student(student_id));

-- ai_usage: a user can see their own usage; only increment_ai_usage() writes.
drop policy if exists "ai_usage: read own" on public.ai_usage;
create policy "ai_usage: read own" on public.ai_usage
  for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());
