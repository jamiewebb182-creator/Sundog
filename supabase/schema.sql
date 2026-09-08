-- Sundog Stained Glass — Supabase schema
--
-- This was already applied directly to your project (gzvgfqcpyyfslgpfkdah)
-- when it was set up. It's kept here as a record, and so the project can be
-- recreated from scratch if you ever need to (paste this into the Supabase
-- SQL Editor on a fresh project).
--
-- Design: the `orders` table is only ever reachable for INSERT (new
-- enquiries) by the public commission form. Nobody — not even Jamie's own
-- login — can read it back through the app; viewing submissions happens
-- through the Supabase dashboard's own Table Editor, which uses privileged
-- account access rather than this app's API key.

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  product_code text,
  photo_path text,
  drawing_path text,
  notes text,
  tight_width text,
  tight_height text,
  visible_width text,
  visible_height text
);

comment on table public.orders is 'Commission enquiries from the public "Start a commission" form.';

alter table public.orders enable row level security;

create policy "anyone can submit an order" on public.orders
  for insert
  to anon, authenticated
  with check (true);

-- Reference photos/drawings customers attach. Public read (paths are
-- unguessable random ids) so the app needs no privileged key anywhere.
insert into storage.buckets (id, name, public)
values ('order-uploads', 'order-uploads', false)
on conflict (id) do nothing;

update storage.buckets set public = true where id = 'order-uploads';

create policy "anyone can upload a reference file" on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'order-uploads');

create policy "reference files are publicly readable by their exact path" on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'order-uploads');
