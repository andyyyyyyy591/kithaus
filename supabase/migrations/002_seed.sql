-- Seed: 4 colecciones iniciales
insert into collections (name, slug, description, "order", active) values
  ('Selecciones', 'selecciones', 'Las camisetas más icónicas de selecciones nacionales.', 1, true),
  ('Clubes', 'clubes', 'Equipos que marcaron una era. Los kits que nunca se olvidan.', 2, true),
  ('Retros', 'retros', 'Ediciones limitadas de colección. Piezas para los que conocen la historia.', 3, true),
  ('Mundiales', 'mundiales', 'Cada Copa del Mundo tiene su camiseta. Esta es la tuya.', 4, true)
on conflict (slug) do nothing;

-- Seed: 1 producto de ejemplo (Argentina 1986)
insert into products (name, slug, description, price, collection_id, sizes_available, featured, active, "order")
select
  'Argentina 1986',
  'argentina-1986',
  'La camiseta que vistió el mejor jugador de todos los tiempos en el mejor Mundial de la historia. Rayas diagonales celeste y blanco. Le Coq Sportif. México 86.',
  89.00,
  c.id,
  array['XS','S','M','L','XL','XXL','3XL'],
  true,
  true,
  1
from collections c where c.slug = 'selecciones'
on conflict (slug) do nothing;

-- Settings iniciales
insert into site_settings (key, value) values
  ('hero_titulo', 'La camiseta que cambió la historia.'),
  ('hero_subtitulo', 'México · 1986'),
  ('pull_quote', 'Algunas camisetas cargan la historia en la espalda.'),
  ('whatsapp_numero', '13053705703'),
  ('instagram', '@kithaus'),
  ('email_contacto', 'hola@kithaus.com')
on conflict (key) do nothing;
