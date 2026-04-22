-- Búsqueda sin tildes
create extension if not exists unaccent;

create or replace function immutable_unaccent(text)
  returns text
  language sql immutable strict parallel safe as
$$ select unaccent($1) $$;

alter table products
  add column if not exists name_normalized text
  generated always as (lower(immutable_unaccent(name))) stored;

-- Newsletter
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

alter table newsletter_subscribers enable row level security;

create policy "public insert newsletter" on newsletter_subscribers
  for insert with check (true);

create policy "auth read newsletter" on newsletter_subscribers
  for select using (auth.role() = 'authenticated');
