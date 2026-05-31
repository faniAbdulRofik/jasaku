create table if not exists public.users (
  id bigserial primary key,
  username varchar(255),
  full_name varchar(255) not null,
  email varchar(255) not null unique,
  email_verified boolean not null default false,
  email_verified_at timestamptz,
  password varchar(255) not null,
  remember_token varchar(100),
  verification_token varchar(255),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  role varchar(20) not null default 'customer' check (role in ('customer','provider','admin')),
  status varchar(20) not null default 'active' check (status in ('active','inactive')),
  phone varchar(255),
  address text,
  profile_image varchar(255)
);

create table if not exists public.categories (
  id bigserial primary key,
  name varchar(255) not null,
  slug varchar(255) not null unique,
  description text,
  icon varchar(255),
  status varchar(20) not null default 'active' check (status in ('active','inactive')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.services (
  id bigserial primary key,
  provider_id bigint not null references public.users(id) on delete cascade,
  category_id bigint not null references public.categories(id) on delete cascade,
  title varchar(255) not null,
  slug varchar(255) unique,
  description text not null,
  price numeric(10,2) not null,
  duration varchar(255),
  price_type varchar(255) not null default 'fixed',
  location varchar(255) not null,
  image varchar(255),
  status varchar(20) not null default 'active' check (status in ('active','inactive')),
  rating numeric(2,1) not null default 0.0,
  total_reviews integer not null default 0,
  total_bookings integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.bookings (
  id bigserial primary key,
  booking_code varchar(255) not null unique,
  customer_id bigint not null references public.users(id) on delete cascade,
  provider_id bigint not null references public.users(id) on delete cascade,
  service_id bigint not null references public.services(id) on delete cascade,
  booking_date date not null,
  booking_time time not null,
  notes text,
  total_price numeric(10,2) not null,
  status varchar(20) not null default 'pending' check (status in ('pending','confirmed','in_progress','completed','cancelled')),
  payment_status varchar(20) not null default 'pending' check (payment_status in ('pending','paid','refunded')),
  payment_method varchar(255),
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.reviews (
  id bigserial primary key,
  booking_id bigint not null references public.bookings(id) on delete cascade,
  customer_id bigint not null references public.users(id) on delete cascade,
  provider_id bigint not null references public.users(id) on delete cascade,
  service_id bigint not null references public.services(id) on delete cascade,
  rating integer not null,
  comment text,
  status varchar(20) not null default 'active' check (status in ('active','inactive')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.password_reset_tokens (
  email varchar(255) primary key,
  token varchar(255) not null,
  created_at timestamptz default now()
);

create table if not exists public.settings (
  setting_key varchar(255) primary key,
  setting_value text,
  updated_at timestamptz default now()
);

create index if not exists bookings_customer_id_idx on public.bookings(customer_id);
create index if not exists bookings_provider_id_idx on public.bookings(provider_id);
create index if not exists bookings_service_id_idx on public.bookings(service_id);
create index if not exists services_provider_id_idx on public.services(provider_id);
create index if not exists services_category_id_idx on public.services(category_id);
create index if not exists reviews_service_id_idx on public.reviews(service_id);

delete from public.reviews
where not exists (select 1 from public.bookings where bookings.id = reviews.booking_id)
   or not exists (select 1 from public.users where users.id = reviews.customer_id)
   or not exists (select 1 from public.users where users.id = reviews.provider_id)
   or not exists (select 1 from public.services where services.id = reviews.service_id);

delete from public.bookings
where not exists (select 1 from public.users where users.id = bookings.customer_id)
   or not exists (select 1 from public.users where users.id = bookings.provider_id)
   or not exists (select 1 from public.services where services.id = bookings.service_id);

delete from public.services
where not exists (select 1 from public.users where users.id = services.provider_id)
   or not exists (select 1 from public.categories where categories.id = services.category_id);

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'services_provider_id_fkey') then
    alter table public.services
      add constraint services_provider_id_fkey
      foreign key (provider_id) references public.users(id) on delete cascade;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'services_category_id_fkey') then
    alter table public.services
      add constraint services_category_id_fkey
      foreign key (category_id) references public.categories(id) on delete cascade;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'bookings_customer_id_fkey') then
    alter table public.bookings
      add constraint bookings_customer_id_fkey
      foreign key (customer_id) references public.users(id) on delete cascade;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'bookings_provider_id_fkey') then
    alter table public.bookings
      add constraint bookings_provider_id_fkey
      foreign key (provider_id) references public.users(id) on delete cascade;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'bookings_service_id_fkey') then
    alter table public.bookings
      add constraint bookings_service_id_fkey
      foreign key (service_id) references public.services(id) on delete cascade;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'reviews_booking_id_fkey') then
    alter table public.reviews
      add constraint reviews_booking_id_fkey
      foreign key (booking_id) references public.bookings(id) on delete cascade;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'reviews_customer_id_fkey') then
    alter table public.reviews
      add constraint reviews_customer_id_fkey
      foreign key (customer_id) references public.users(id) on delete cascade;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'reviews_provider_id_fkey') then
    alter table public.reviews
      add constraint reviews_provider_id_fkey
      foreign key (provider_id) references public.users(id) on delete cascade;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'reviews_service_id_fkey') then
    alter table public.reviews
      add constraint reviews_service_id_fkey
      foreign key (service_id) references public.services(id) on delete cascade;
  end if;
end $$;

-- Seed data untuk testing awal.
-- Semua akun memakai password: password

insert into public.categories (name, slug, description, icon, status, created_at, updated_at) values
('Cleaning Service', 'cleaning-service', 'Jasa pembersihan rumah dan kantor', 'fas fa-broom', 'active', now(), now()),
('Repair & Maintenance', 'repair-maintenance', 'Jasa perbaikan dan maintenance', 'fas fa-tools', 'active', now(), now()),
('Beauty & Wellness', 'beauty-wellness', 'Jasa kecantikan dan kesehatan', 'fas fa-spa', 'active', now(), now()),
('Photography', 'photography', 'Jasa fotografi dan videografi', 'fas fa-camera', 'active', now(), now()),
('Tutoring', 'tutoring', 'Jasa les privat dan bimbingan belajar', 'fas fa-graduation-cap', 'active', now(), now())
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  status = excluded.status,
  updated_at = now();

insert into public.users (
  username,
  full_name,
  email,
  email_verified,
  email_verified_at,
  password,
  role,
  status,
  phone,
  address,
  profile_image,
  created_at,
  updated_at
) values
('admin', 'Admin JasaKu', 'admin@jasaku.test', true, now(), '$2b$12$neJuAXh5Gs4HO6zqznU14.IJiBPD1EOCeJ6XLJXae45DsXO8H0Np.', 'admin', 'active', '081234567890', 'Jakarta Pusat', 'default-profile.jpg', now(), now()),
('provider', 'Provider JasaKu', 'provider@jasaku.test', true, now(), '$2b$12$neJuAXh5Gs4HO6zqznU14.IJiBPD1EOCeJ6XLJXae45DsXO8H0Np.', 'provider', 'active', '081234567891', 'Jakarta Selatan', 'default-profile.jpg', now(), now()),
('user', 'User JasaKu', 'user@jasaku.test', true, now(), '$2b$12$neJuAXh5Gs4HO6zqznU14.IJiBPD1EOCeJ6XLJXae45DsXO8H0Np.', 'customer', 'active', '081234567892', 'Jakarta Barat', 'default-profile.jpg', now(), now())
on conflict (email) do update set
  username = excluded.username,
  full_name = excluded.full_name,
  email_verified = excluded.email_verified,
  email_verified_at = excluded.email_verified_at,
  password = excluded.password,
  role = excluded.role,
  status = excluded.status,
  phone = excluded.phone,
  address = excluded.address,
  profile_image = excluded.profile_image,
  updated_at = now();

insert into public.services (
  provider_id,
  category_id,
  title,
  slug,
  description,
  price,
  duration,
  price_type,
  location,
  image,
  status,
  rating,
  total_reviews,
  total_bookings,
  created_at,
  updated_at
)
select
  users.id,
  categories.id,
  seed.title,
  seed.slug,
  seed.description,
  seed.price,
  seed.duration,
  seed.price_type,
  seed.location,
  seed.image,
  'active',
  seed.rating,
  seed.total_reviews,
  seed.total_bookings,
  now(),
  now()
from (
  values
    ('cleaning-service', 'Pembersihan Rumah Lengkap', 'pembersihan-rumah-lengkap', 'Jasa pembersihan rumah menyeluruh termasuk kamar mandi, dapur, ruang tamu, dan area keluarga.', 150000.00, '120', 'fixed', 'Jakarta Selatan', 'service_1750676272.jpg', 4.8, 1, 8),
    ('repair-maintenance', 'Service AC dan Elektronik', 'service-ac-dan-elektronik', 'Perbaikan dan maintenance AC, kulkas, mesin cuci, serta perangkat elektronik rumah tangga.', 100000.00, '90', 'hourly', 'Jakarta', 'service_1750676372.jpg', 4.7, 1, 5),
    ('beauty-wellness', 'Makeup Wedding Profesional', 'makeup-wedding-profesional', 'Jasa makeup pengantin dan acara formal dengan hasil natural, rapi, dan tahan lama.', 500000.00, '180', 'fixed', 'Jakarta', 'service_1750676385.jpg', 4.9, 0, 3),
    ('photography', 'Fotografi Event dan Produk', 'fotografi-event-dan-produk', 'Dokumentasi acara, foto produk, dan kebutuhan konten bisnis dengan editing profesional.', 350000.00, '120', 'fixed', 'Jakarta Timur', 'service_1750676410.jpg', 4.6, 0, 2),
    ('tutoring', 'Les Privat Matematika', 'les-privat-matematika', 'Bimbingan belajar matematika SD sampai SMA dengan metode yang mudah dipahami.', 75000.00, '60', 'hourly', 'Jakarta Barat', 'service_1750676619.jpg', 4.8, 0, 4)
) as seed(category_slug, title, slug, description, price, duration, price_type, location, image, rating, total_reviews, total_bookings)
join public.users on users.email = 'provider@jasaku.test'
join public.categories on categories.slug = seed.category_slug
on conflict (slug) do update set
  provider_id = excluded.provider_id,
  category_id = excluded.category_id,
  title = excluded.title,
  description = excluded.description,
  price = excluded.price,
  duration = excluded.duration,
  price_type = excluded.price_type,
  location = excluded.location,
  image = excluded.image,
  status = excluded.status,
  rating = excluded.rating,
  total_reviews = excluded.total_reviews,
  total_bookings = excluded.total_bookings,
  updated_at = now();

insert into public.bookings (
  booking_code,
  customer_id,
  provider_id,
  service_id,
  booking_date,
  booking_time,
  notes,
  total_price,
  status,
  payment_status,
  payment_method,
  completed_at,
  created_at,
  updated_at
)
select
  seed.booking_code,
  customer.id,
  provider.id,
  services.id,
  seed.booking_date::date,
  seed.booking_time::time,
  seed.notes,
  seed.total_price,
  seed.status,
  seed.payment_status,
  seed.payment_method,
  seed.completed_at,
  now(),
  now()
from (
  values
    ('BK-TEST-001', 'pembersihan-rumah-lengkap', '2026-05-20', '09:00', 'Rumah 2 lantai, fokus area dapur dan kamar mandi.', 150000.00, 'completed', 'paid', 'cash', '2026-05-20 12:00:00+00'::timestamptz),
    ('BK-TEST-002', 'service-ac-dan-elektronik', '2026-06-05', '13:30', 'AC kamar kurang dingin dan perlu pengecekan rutin.', 100000.00, 'confirmed', 'pending', 'cash', null::timestamptz),
    ('BK-TEST-003', 'les-privat-matematika', '2026-06-10', '16:00', 'Les matematika kelas 10 untuk persiapan ujian.', 75000.00, 'pending', 'pending', 'cash', null::timestamptz)
) as seed(booking_code, service_slug, booking_date, booking_time, notes, total_price, status, payment_status, payment_method, completed_at)
join public.users customer on customer.email = 'user@jasaku.test'
join public.users provider on provider.email = 'provider@jasaku.test'
join public.services on services.slug = seed.service_slug
on conflict (booking_code) do update set
  customer_id = excluded.customer_id,
  provider_id = excluded.provider_id,
  service_id = excluded.service_id,
  booking_date = excluded.booking_date,
  booking_time = excluded.booking_time,
  notes = excluded.notes,
  total_price = excluded.total_price,
  status = excluded.status,
  payment_status = excluded.payment_status,
  payment_method = excluded.payment_method,
  completed_at = excluded.completed_at,
  updated_at = now();

insert into public.reviews (
  booking_id,
  customer_id,
  provider_id,
  service_id,
  rating,
  comment,
  status,
  created_at,
  updated_at
)
select
  bookings.id,
  bookings.customer_id,
  bookings.provider_id,
  bookings.service_id,
  5,
  'Pelayanan sangat memuaskan, provider datang tepat waktu dan hasilnya rapi.',
  'active',
  now(),
  now()
from public.bookings
where bookings.booking_code = 'BK-TEST-001'
  and not exists (
    select 1 from public.reviews
    where reviews.booking_id = bookings.id
      and reviews.customer_id = bookings.customer_id
  );

insert into public.settings (setting_key, setting_value, updated_at) values
('site_name', 'JasaKu', now()),
('site_email', 'info@jasaku.com', now()),
('site_phone', '+62 812-3456-7890', now()),
('site_address', 'Jakarta, Indonesia', now())
on conflict (setting_key) do update set
  setting_value = excluded.setting_value,
  updated_at = now();

select setval('public.users_id_seq', greatest((select coalesce(max(id), 1) from public.users), 1), true);
select setval('public.categories_id_seq', greatest((select coalesce(max(id), 1) from public.categories), 1), true);
select setval('public.services_id_seq', greatest((select coalesce(max(id), 1) from public.services), 1), true);
select setval('public.bookings_id_seq', greatest((select coalesce(max(id), 1) from public.bookings), 1), true);
select setval('public.reviews_id_seq', greatest((select coalesce(max(id), 1) from public.reviews), 1), true);
