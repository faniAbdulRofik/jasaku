import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "JasaKu - Platform Booking Jasa Lokal",
  description: "Platform terpercaya untuk menemukan dan memesan berbagai jasa profesional di Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/next-parity.css" />
        <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico" />
        <style>
          {`
            .underline-custom {
              position: relative;
              text-decoration: none;
            }

            html,
            body,
            button,
            input,
            optgroup,
            select,
            textarea {
              font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
            }

            body {
              font-size: 16px !important;
              line-height: 1.5 !important;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p {
              margin-top: 0 !important;
              margin-bottom: 0 !important;
              font-size: inherit;
              font-weight: inherit;
              line-height: inherit;
            }

            a,
            a:visited,
            a:hover,
            a:focus,
            a:active,
            a *,
            a:hover *,
            a:focus *,
            a:active * {
              color: inherit;
              text-decoration: none !important;
            }

            .text-xs { font-size: 0.75rem !important; line-height: 1rem !important; }
            .text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
            .text-base { font-size: 1rem !important; line-height: 1.5rem !important; }
            .text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
            .text-xl { font-size: 1.25rem !important; line-height: 1.75rem !important; }
            .text-2xl { font-size: 1.5rem !important; line-height: 2rem !important; }
            .text-3xl { font-size: 1.875rem !important; line-height: 2.25rem !important; }
            .text-4xl { font-size: 2.25rem !important; line-height: 2.5rem !important; }
            .text-5xl { font-size: 3rem !important; line-height: 1 !important; }
            .text-6xl { font-size: 3.75rem !important; line-height: 1 !important; }
            .text-7xl { font-size: 4.5rem !important; line-height: 1 !important; }
            .font-medium { font-weight: 500 !important; }
            .font-semibold { font-weight: 600 !important; }
            .font-bold { font-weight: 700 !important; }
            .leading-tight { line-height: 1.25 !important; }
            .text-white { color: #ffffff !important; }
            .text-black { color: #000000 !important; }
            .text-gray-300 { color: #d1d5db !important; }
            .text-gray-400 { color: #9ca3af !important; }
            .text-gray-500 { color: #6b7280 !important; }
            .text-gray-600 { color: #4b5563 !important; }
            .text-gray-700 { color: #374151 !important; }
            .text-gray-900 { color: #111827 !important; }
            .text-blue-100 { color: #dbeafe !important; }
            .text-blue-400 { color: #60a5fa !important; }
            .text-blue-600 { color: #2563eb !important; }
            .text-green-600 { color: #16a34a !important; }
            .text-red-600 { color: #dc2626 !important; }
            .text-yellow-400 { color: #facc15 !important; }
            .hover\\:text-white:hover { color: #ffffff !important; }
            .hover\\:text-blue-400:hover { color: #60a5fa !important; }
            .hover\\:text-blue-600:hover { color: #2563eb !important; }
            .hover\\:text-pink-400:hover { color: #f472b6 !important; }

            @media (min-width: 768px) {
              .md\\:text-base { font-size: 1rem !important; line-height: 1.5rem !important; }
              .md\\:text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
              .md\\:text-xl { font-size: 1.25rem !important; line-height: 1.75rem !important; }
              .md\\:text-2xl { font-size: 1.5rem !important; line-height: 2rem !important; }
              .md\\:text-3xl { font-size: 1.875rem !important; line-height: 2.25rem !important; }
              .md\\:text-4xl { font-size: 2.25rem !important; line-height: 2.5rem !important; }
              .md\\:text-6xl { font-size: 3.75rem !important; line-height: 1 !important; }
            }

            @media (min-width: 1024px) {
              .lg\\:text-3xl { font-size: 1.875rem !important; line-height: 2.25rem !important; }
              .lg\\:text-4xl { font-size: 2.25rem !important; line-height: 2.5rem !important; }
              .lg\\:text-7xl { font-size: 4.5rem !important; line-height: 1 !important; }
            }

            .underline-custom::after {
              content: none !important;
              display: none !important;
            }

            .underline-custom:hover,
            .underline-custom:focus,
            .underline-custom:active,
            .underline-custom:hover::after {
              text-decoration: none !important;
              content: none !important;
              display: none !important;
            }

            .dropdown-menu {
              display: none;
            }

            .dropdown-menu.show {
              display: block;
            }
          `}
        </style>
      </head>
      <body className="min-h-full bg-gray-50">
        {children}
        <Script src="https://code.jquery.com/jquery-3.7.0.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/flatpickr" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/id.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="afterInteractive" />
        <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="afterInteractive" />
        <Script src="/assets/js/script.js" strategy="afterInteractive" />
        <Script id="jasaku-global-init" strategy="afterInteractive">
          {`
            function initJasakuAOS() {
              if (window.AOS) {
                try {
                  AOS.init({ duration: 800, easing: 'ease-in-out-quad', once: true, mirror: false, offset: 120 });
                  if (typeof AOS.refreshHard === 'function') AOS.refreshHard();
                  document.documentElement.classList.add('aos-ready');
                } catch (error) {
                  document.documentElement.classList.remove('aos-ready');
                }
              } else {
                document.documentElement.classList.remove('aos-ready');
              }
            }

            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', initJasakuAOS);
            } else {
              initJasakuAOS();
            }
            window.addEventListener('load', initJasakuAOS);
            setTimeout(initJasakuAOS, 800);

            const jasakuTitles = {
              '/': 'Beranda - JasaKu',
              '/': 'Beranda - JasaKu',
              '/search': 'Cari Layanan - JasaKu',
              '/login': 'Login - JasaKu',
              '/register': 'Registrasi - JasaKu',
              '/forgot_password': 'Lupa Password - JasaKu',
              '/reset_password': 'Reset Password - JasaKu',
              '/customer/dashboard': 'Customer Dashboard - JasaKu',
              '/provider/dashboard': 'Dashboard Provider - JasaKu',
              '/admin/dashboard': 'Dashboard Admin - JasaKu'
            };
            if (jasakuTitles[window.location.pathname]) {
              document.title = jasakuTitles[window.location.pathname];
            }

            window.toggleMobileMenu = function() {
              const mobileMenu = document.getElementById('mobileMenu');
              if (mobileMenu) mobileMenu.classList.toggle('hidden');
            };

            document.addEventListener('click', function(event) {
              const target = event.target;
              if (!(target instanceof Element)) return;

              if (target.closest('#mobileMenuButton')) {
                window.toggleMobileMenu();
                return;
              }

              if (target.closest('#togglePasswordButton')) {
                const password = document.getElementById('password');
                const eyeIcon = document.getElementById('eyeIcon');
                if (!password || !eyeIcon) return;
                if (password.type === 'password') {
                  password.type = 'text';
                  eyeIcon.classList.remove('fa-eye');
                  eyeIcon.classList.add('fa-eye-slash');
                } else {
                  password.type = 'password';
                  eyeIcon.classList.remove('fa-eye-slash');
                  eyeIcon.classList.add('fa-eye');
                }
                return;
              }

              if (target.closest('#toggleConfirmPasswordButton')) {
                const password = document.getElementById('confirm_password');
                const eyeIcon = document.getElementById('confirmEyeIcon');
                if (!password || !eyeIcon) return;
                if (password.type === 'password') {
                  password.type = 'text';
                  eyeIcon.classList.remove('fa-eye');
                  eyeIcon.classList.add('fa-eye-slash');
                } else {
                  password.type = 'password';
                  eyeIcon.classList.remove('fa-eye-slash');
                  eyeIcon.classList.add('fa-eye');
                }
                return;
              }

              const serviceTabs = {
                'description-tab': 'description-content',
                'reviews-tab': 'reviews-content',
                'provider-services-tab': 'provider-services-content',
                'provider-ratings-tab': 'provider-ratings-content'
              };
              const serviceTab = target.closest('#description-tab, #reviews-tab, #provider-services-tab, #provider-ratings-tab');
              if (serviceTab && serviceTabs[serviceTab.id]) {
                Object.values(serviceTabs).forEach(function(contentId) {
                  document.getElementById(contentId)?.classList.add('hidden');
                });
                Object.keys(serviceTabs).forEach(function(tabId) {
                  const item = document.getElementById(tabId);
                  if (!item) return;
                  item.classList.remove('border-blue-500', 'text-blue-600');
                  item.classList.add('border-transparent', 'text-gray-500');
                });
                document.getElementById(serviceTabs[serviceTab.id])?.classList.remove('hidden');
                serviceTab.classList.remove('border-transparent', 'text-gray-500');
                serviceTab.classList.add('border-blue-500', 'text-blue-600');
                return;
              }

              if (target.closest('#sidebarToggle')) {
                const mobileSidebar = document.getElementById('mobileSidebar');
                const sidebarOverlay = document.getElementById('sidebarOverlay');
                if (mobileSidebar) mobileSidebar.classList.toggle('-translate-x-full');
                if (sidebarOverlay) sidebarOverlay.classList.toggle('hidden');
                document.body.classList.toggle('overflow-hidden');
                return;
              }

              if (target.closest('#sidebarOverlay')) {
                const mobileSidebar = document.getElementById('mobileSidebar');
                const sidebarOverlay = document.getElementById('sidebarOverlay');
                if (mobileSidebar) mobileSidebar.classList.add('-translate-x-full');
                if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
                return;
              }

              const toggle = target.closest('.dropdown-toggle');
              if (toggle) {
                event.preventDefault();
                event.stopPropagation();
                document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
                  if (menu !== toggle.nextElementSibling) menu.classList.remove('show');
                });
                if (toggle.nextElementSibling) toggle.nextElementSibling.classList.toggle('show');
                return;
              }

              if (!target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
                  menu.classList.remove('show');
                });
              }
            });

            document.addEventListener('change', function(event) {
              const target = event.target;
              if (!(target instanceof Element)) return;
              const sortSelect = target.closest('#sortSelect');
              if (sortSelect && sortSelect.form) {
                sortSelect.form.submit();
              }
            });

            document.addEventListener('input', function(event) {
              const input = event.target;
              if (!(input instanceof HTMLInputElement)) return;
              if (input.id === 'confirm_password') {
                const password = document.getElementById('password')?.value || '';
                input.setCustomValidity(password !== input.value ? 'Password tidak sama' : '');
              }

              if (input.id === 'username') {
                const regex = /^[a-zA-Z0-9_]+$/;
                input.setCustomValidity(input.value && !regex.test(input.value) ? 'Username hanya boleh mengandung huruf, angka, dan underscore' : '');
              }
            });

            if (window.location.pathname.endsWith('/login')) {
              document.getElementById('email')?.focus();
            }
          `}
        </Script>
      </body>
    </html>
  );
}
