-- ==========================================================
-- Lavazza QR Menü - Veritabanı Şeması + Başlangıç Verisi
-- Bu dosyayı Supabase Dashboard > SQL Editor içine yapıştırıp
-- "Run" butonuna basarak BİR KEZ çalıştırman yeterli.
-- ==========================================================

create extension if not exists "pgcrypto";

-- ---------- TABLOLAR ----------

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists menu_item_sizes (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references menu_items(id) on delete cascade,
  label text not null,
  price numeric(10, 2) not null,
  sort_order integer not null default 0
);

-- ---------- GÜVENLİK (RLS) ----------
-- Herkes (müşteri menüsü) sadece okuyabilir.
-- Sadece giriş yapmış admin kullanıcı ekleme/güncelleme/silme yapabilir.

alter table categories enable row level security;
alter table menu_items enable row level security;
alter table menu_item_sizes enable row level security;

drop policy if exists "public_read_categories" on categories;
create policy "public_read_categories" on categories for select using (true);

drop policy if exists "public_read_menu_items" on menu_items;
create policy "public_read_menu_items" on menu_items for select using (true);

drop policy if exists "public_read_menu_item_sizes" on menu_item_sizes;
create policy "public_read_menu_item_sizes" on menu_item_sizes for select using (true);

drop policy if exists "auth_write_categories" on categories;
create policy "auth_write_categories" on categories for all to authenticated using (true) with check (true);

drop policy if exists "auth_write_menu_items" on menu_items;
create policy "auth_write_menu_items" on menu_items for all to authenticated using (true) with check (true);

drop policy if exists "auth_write_menu_item_sizes" on menu_item_sizes;
create policy "auth_write_menu_item_sizes" on menu_item_sizes for all to authenticated using (true) with check (true);

-- ---------- BAŞLANGIÇ VERİSİ (Lavazza menüsü) ----------
-- Not: Bu script'i yanlışlıkla iki kez çalıştırırsan veriler duplicate olur.
-- Tekrar çalıştırmadan önce aşağıdaki temizleme satırının yorumunu kaldırabilirsin:
-- truncate table menu_item_sizes, menu_items, categories cascade;

do $$
declare
  cat_id uuid;
  item_id uuid;
begin

  -- 1) Espresso Coffee's
  insert into categories (name, sort_order) values ('Espresso Coffee''s', 1) returning id into cat_id;

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Espresso', 1) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 120, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Espresso Macchiato', 2) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 140, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Espresso Conpana', 3) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 150, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Cortado', 4) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 150, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Lungo', 5) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 150, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Americano', 6) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 130, 1), (item_id, 'M', 150, 2), (item_id, 'L', 170, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Long Black', 7) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 130, 1), (item_id, 'M', 150, 2), (item_id, 'L', 170, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Caffe Latte', 8) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 150, 1), (item_id, 'M', 170, 2), (item_id, 'L', 190, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Cappuccino', 9) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 150, 1), (item_id, 'M', 170, 2), (item_id, 'L', 190, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Flat White', 10) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 150, 1), (item_id, 'M', 170, 2), (item_id, 'L', 190, 3);

  -- 2) Sıcak İçecekler
  insert into categories (name, sort_order) values ('Sıcak İçecekler', 2) returning id into cat_id;

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Sıcak Çikolata', 1) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 170, 1), (item_id, 'M', 180, 2), (item_id, 'L', 190, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Beyaz Çikolata', 2) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 170, 1), (item_id, 'M', 180, 2), (item_id, 'L', 190, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Chai Tea Latte', 3) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 170, 1), (item_id, 'M', 180, 2), (item_id, 'L', 190, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Türk Kahvesi', 4) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 100, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Çay', 5) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 140, 1);

  -- 3) Cold Bar
  insert into categories (name, sort_order) values ('Cold Bar', 3) returning id into cat_id;

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Summer Lime', 1) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 230, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Hibiscus Brezze', 2) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 230, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Orange Mango', 3) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 230, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Pink Pattaya', 4) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 230, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Cucumber Lime', 5) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 230, 1);

  -- 4) Brew Coffee
  insert into categories (name, sort_order) values ('Brew Coffee', 4) returning id into cat_id;

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Filtre Kahve', 1) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 130, 1), (item_id, 'M', 150, 2), (item_id, 'L', 170, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'V60 Demleme', 2) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 130, 1), (item_id, 'M', 150, 2), (item_id, 'L', 170, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Chemex', 3) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 130, 1), (item_id, 'M', 150, 2), (item_id, 'L', 170, 3);

  -- 5) Cold Coffee's
  insert into categories (name, sort_order) values ('Cold Coffee''s', 5) returning id into cat_id;

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Cold Brew', 1) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'M', 190, 1), (item_id, 'L', 200, 2);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Iced Americano', 2) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'M', 170, 1), (item_id, 'L', 190, 2);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Iced Latte', 3) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'M', 170, 1), (item_id, 'L', 190, 2);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Iced Caramel Latte', 4) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'M', 200, 1), (item_id, 'L', 220, 2);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Iced Vanilla Latte', 5) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'M', 200, 1), (item_id, 'L', 220, 2);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Iced Salded Caramel Latte', 6) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'M', 200, 1), (item_id, 'L', 220, 2);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Iced Cookie Latte', 7) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'M', 200, 1), (item_id, 'L', 220, 2);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Iced Pumpkin Spice Latte', 8) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'M', 200, 1), (item_id, 'L', 220, 2);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Iced Toffe Nut Latte', 9) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'M', 200, 1), (item_id, 'L', 220, 2);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Iced Spanish Latte', 10) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'M', 200, 1), (item_id, 'L', 220, 2);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Iced Mocha', 11) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'M', 210, 1), (item_id, 'L', 230, 2);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Iced White Mocha', 12) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'M', 210, 1), (item_id, 'L', 230, 2);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Iced Golden Mocha', 13) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'M', 210, 1), (item_id, 'L', 230, 2);

  -- 6) Frozen's
  insert into categories (name, sort_order) values ('Frozen''s', 6) returning id into cat_id;

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Strawberry Frozen', 1) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 230, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Mango Frozen', 2) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 230, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Black Mulbery Frozen', 3) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 230, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Red Bery Frozen', 4) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 230, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Lemon Fruit', 5) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 230, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Pashion Fruit', 6) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 230, 1);

  -- 7) Hot Matcha Bar
  insert into categories (name, sort_order) values ('Hot Matcha Bar', 7) returning id into cat_id;

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Matcha Latte', 1) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 250, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Vanilla Matcha Latte', 2) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 250, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Mango Matcha Latte', 3) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 250, 1);

  -- 8) Special Coffee's
  insert into categories (name, sort_order) values ('Special Coffee''s', 8) returning id into cat_id;

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Vanillia Latte', 1) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 180, 1), (item_id, 'M', 200, 2), (item_id, 'L', 220, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Caramel Latte', 2) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 180, 1), (item_id, 'M', 200, 2), (item_id, 'L', 220, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Fındık Latte', 3) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 180, 1), (item_id, 'M', 200, 2), (item_id, 'L', 220, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Salted Caramel Latte', 4) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 180, 1), (item_id, 'M', 200, 2), (item_id, 'L', 220, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Toffe Nut Latte', 5) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 180, 1), (item_id, 'M', 200, 2), (item_id, 'L', 220, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Pumpkin Spice Latte', 6) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 180, 1), (item_id, 'M', 200, 2), (item_id, 'L', 220, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Cookie Latte', 7) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 180, 1), (item_id, 'M', 200, 2), (item_id, 'L', 220, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Lotus Latte', 8) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 180, 1), (item_id, 'M', 200, 2), (item_id, 'L', 220, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Pistachio Latte', 9) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 180, 1), (item_id, 'M', 200, 2), (item_id, 'L', 220, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Spanish Latte', 10) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 180, 1), (item_id, 'M', 200, 2), (item_id, 'L', 220, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Cinnamon Vanilla Latte', 11) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 180, 1), (item_id, 'M', 200, 2), (item_id, 'L', 220, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Honey Dry Latte', 12) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 190, 1), (item_id, 'M', 210, 2), (item_id, 'L', 230, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Mocha', 13) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 190, 1), (item_id, 'M', 210, 2), (item_id, 'L', 230, 3);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'White Mocha', 14) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values
    (item_id, 'S', 190, 1), (item_id, 'M', 210, 2), (item_id, 'L', 230, 3);

  -- 9) Milkshake
  insert into categories (name, sort_order) values ('Milkshake', 9) returning id into cat_id;

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Chocolate Milkshake', 1) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 220, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Vanillia Milkshake', 2) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 220, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Strawberry Milkshake', 3) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 220, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Oreo Milkshake', 4) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 220, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Smoothies Milkshake', 5) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 220, 1);

  -- 10) Fresh İçeçekler
  insert into categories (name, sort_order) values ('Fresh İçeçekler', 10) returning id into cat_id;

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Soda', 1) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 45, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Meyveli Soda', 2) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 65, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Lemonade', 3) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 150, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Bubble Tea', 4) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 250, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Mojito', 5) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 250, 1);

  insert into menu_items (category_id, name, sort_order) values (cat_id, 'Pineaple Mojito', 6) returning id into item_id;
  insert into menu_item_sizes (item_id, label, price, sort_order) values (item_id, 'Standart', 250, 1);

end $$;
