# JasaKu PHP Native to Next.js Mapping

## Folder
- PHP Native source: `../bookingjasa`
- Next.js target: `./`
- Static assets copied to: `public/assets` and `public/uploads`
- Supabase/Postgres schema: `supabase/schema.sql`

## Route Mapping
- `index` -> `/` and `/`
- `login` -> `/login`
- `register` -> `/register`
- `forgot_password` -> `/forgot_password`
- `reset_password` -> `/reset_password`
- `search` -> `/search`
- `service_detail?id=...` -> `/service_detail?id=...`
- `customer/dashboard` -> `/customer/dashboard`
- `customer/bookings` -> `/customer/bookings`
- `customer/reviews` -> `/customer/reviews`
- `customer/settings` -> `/customer/settings`
- `provider/dashboard` -> `/provider/dashboard`
- `provider/bookings` -> `/provider/bookings`
- `provider/services` -> `/provider/services`
- `provider/add_service` -> `/provider/add_service`
- `provider/edit_service?id=...` -> `/provider/edit_service?id=...`
- `provider/earnings` -> `/provider/earnings`
- `provider/reviews` -> `/provider/reviews`
- `provider/settings` -> `/provider/settings`
- `admin/dashboard` -> `/admin/dashboard`
- `admin/users` -> `/admin/users`
- `admin/user_add` -> `/admin/user_add`
- `admin/user_edit?id=...` -> `/admin/user_edit?id=...`
- `admin/categories` -> `/admin/categories`
- `admin/services` -> `/admin/services`
- `admin/service_add` -> `/admin/service_add`
- `admin/service_edit?id=...` -> `/admin/service_edit?id=...`
- `admin/bookings` -> `/admin/bookings`
- `admin/reports` -> `/admin/reports`
- `admin/settings` -> `/admin/settings`

## Preserved Feature Surface
- Public landing page, search, filters, view mode, pagination, service detail, reviews, booking form.
- Login/register/logout/session role guard.
- Customer dashboard, bookings, cancel booking, reviews, settings/profile upload.
- Provider dashboard, booking status updates, services CRUD/upload, earnings, reviews, settings.
- Admin dashboard, users CRUD, categories CRUD, services CRUD, bookings, reports, settings.
- Compatibility AJAX endpoints for legacy JavaScript: `ajax/search_services`, notifications, and time slots.
