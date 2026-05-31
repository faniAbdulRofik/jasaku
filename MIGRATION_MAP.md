# JasaKu PHP Native to Next.js Mapping

## Folder
- PHP Native source: `../bookingjasa`
- Next.js target: `./`
- Static assets copied to: `public/assets` and `public/uploads`
- Supabase/Postgres schema: `supabase/schema.sql`

## Route Mapping
- `index.php` -> `/` and `/index.php`
- `login.php` -> `/login.php`
- `register.php` -> `/register.php`
- `forgot_password.php` -> `/forgot_password.php`
- `reset_password.php` -> `/reset_password.php`
- `search.php` -> `/search.php`
- `service_detail.php?id=...` -> `/service_detail.php?id=...`
- `customer/dashboard.php` -> `/customer/dashboard.php`
- `customer/bookings.php` -> `/customer/bookings.php`
- `customer/reviews.php` -> `/customer/reviews.php`
- `customer/settings.php` -> `/customer/settings.php`
- `provider/dashboard.php` -> `/provider/dashboard.php`
- `provider/bookings.php` -> `/provider/bookings.php`
- `provider/services.php` -> `/provider/services.php`
- `provider/add_service.php` -> `/provider/add_service.php`
- `provider/edit_service.php?id=...` -> `/provider/edit_service.php?id=...`
- `provider/earnings.php` -> `/provider/earnings.php`
- `provider/reviews.php` -> `/provider/reviews.php`
- `provider/settings.php` -> `/provider/settings.php`
- `admin/dashboard.php` -> `/admin/dashboard.php`
- `admin/users.php` -> `/admin/users.php`
- `admin/user_add.php` -> `/admin/user_add.php`
- `admin/user_edit.php?id=...` -> `/admin/user_edit.php?id=...`
- `admin/categories.php` -> `/admin/categories.php`
- `admin/services.php` -> `/admin/services.php`
- `admin/service_add.php` -> `/admin/service_add.php`
- `admin/service_edit.php?id=...` -> `/admin/service_edit.php?id=...`
- `admin/bookings.php` -> `/admin/bookings.php`
- `admin/reports.php` -> `/admin/reports.php`
- `admin/settings.php` -> `/admin/settings.php`

## Preserved Feature Surface
- Public landing page, search, filters, view mode, pagination, service detail, reviews, booking form.
- Login/register/logout/session role guard.
- Customer dashboard, bookings, cancel booking, reviews, settings/profile upload.
- Provider dashboard, booking status updates, services CRUD/upload, earnings, reviews, settings.
- Admin dashboard, users CRUD, categories CRUD, services CRUD, bookings, reports, settings.
- Compatibility AJAX endpoints for legacy JavaScript: `ajax/search_services.php`, notifications, and time slots.
