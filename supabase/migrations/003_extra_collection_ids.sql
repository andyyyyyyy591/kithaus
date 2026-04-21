-- Agregar columna extra_collection_ids a products
alter table products
  add column if not exists extra_collection_ids uuid[] default '{}';
