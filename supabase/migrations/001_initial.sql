-- Colecciones
create table if not exists collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  cover_image text,
  "order" int default 0,
  active boolean default true,
  created_at timestamptz default now()
);

-- Productos
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null,
  collection_id uuid references collections(id) on delete set null,
  sizes_available text[] default array['XS','S','M','L','XL','XXL','3XL'],
  featured boolean default false,
  active boolean default true,
  "order" int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Imágenes de productos
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  alt text,
  is_primary boolean default false,
  "order" int default 0
);

-- Configuración del sitio
create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

-- RLS
alter table products enable row level security;
alter table collections enable row level security;
alter table product_images enable row level security;
alter table site_settings enable row level security;

-- Políticas de lectura pública
create policy "public read active products" on products
  for select using (active = true);

create policy "public read active collections" on collections
  for select using (active = true);

create policy "public read product images" on product_images
  for select using (true);

create policy "public read settings" on site_settings
  for select using (true);

-- Políticas de escritura para admins autenticados
create policy "auth write products" on products
  for all using (auth.role() = 'authenticated');

create policy "auth write collections" on collections
  for all using (auth.role() = 'authenticated');

create policy "auth write images" on product_images
  for all using (auth.role() = 'authenticated');

create policy "auth write settings" on site_settings
  for all using (auth.role() = 'authenticated');

-- Storage bucket products (crearlo en Supabase Dashboard como público para lectura)
