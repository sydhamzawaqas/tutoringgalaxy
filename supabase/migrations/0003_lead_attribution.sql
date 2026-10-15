-- Tutoring Galaxy: first-touch marketing attribution on trial requests.
--
-- Written by src/lib/leads.ts from the booking form's hidden `attribution` field, which the browser
-- fills from localStorage (src/lib/attribution.ts). Keys: utm_source, utm_medium, utm_campaign,
-- utm_term, utm_content, gclid, fbclid, referrer (hostname or "direct"), landing_page (path),
-- ts (ISO time of first visit). Values are validated and capped at 200-300 characters server-side.
--
-- The leads table stays service-role only (RLS on, no policies); nothing here changes access.

alter table public.leads
  add column if not exists attribution jsonb;

alter table public.leads
  drop constraint if exists leads_attribution_shape;

alter table public.leads
  add constraint leads_attribution_shape
  check (
    attribution is null
    or (jsonb_typeof(attribution) = 'object' and pg_column_size(attribution) <= 4096)
  );

comment on column public.leads.attribution is
  'First-touch attribution JSON: utm_*, gclid, fbclid, referrer host, landing_page, ts. Set by the booking form.';

-- Reporting by source / campaign.
create index if not exists leads_attribution_source_idx on public.leads ((attribution ->> 'utm_source'));
create index if not exists leads_attribution_campaign_idx on public.leads ((attribution ->> 'utm_campaign'));
