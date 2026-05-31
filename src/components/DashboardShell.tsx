import type { UserRole } from "@/lib/types";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const navItems: Record<UserRole, NavItem[]> = {
  customer: [
    { href: "/customer/dashboard.php", label: "Dashboard", icon: "fa-tachometer-alt" },
    { href: "/customer/bookings.php", label: "My Bookings", icon: "fa-calendar" },
    { href: "/customer/reviews.php", label: "My Reviews", icon: "fa-star" },
    { href: "/customer/settings.php", label: "Settings", icon: "fa-cog" },
  ],
  provider: [
    { href: "/provider/dashboard.php", label: "Dashboard", icon: "fa-tachometer-alt" },
    { href: "/provider/bookings.php", label: "Bookings", icon: "fa-calendar" },
    { href: "/provider/services.php", label: "Layanan Saya", icon: "fa-concierge-bell" },
    { href: "/provider/earnings.php", label: "Penghasilan", icon: "fa-money-bill" },
    { href: "/provider/reviews.php", label: "Ulasan", icon: "fa-star" },
    { href: "/provider/settings.php", label: "Pengaturan", icon: "fa-cog" },
  ],
  admin: [
    { href: "/admin/dashboard.php", label: "Dashboard", icon: "fa-tachometer-alt" },
    { href: "/admin/users.php", label: "Manage Users", icon: "fa-users" },
    { href: "/admin/services.php", label: "Manage Services", icon: "fa-concierge-bell" },
    { href: "/admin/bookings.php", label: "Manage Bookings", icon: "fa-calendar" },
    { href: "/admin/categories.php", label: "Kategori", icon: "fa-list" },
    { href: "/admin/reports.php", label: "Laporan", icon: "fa-chart-bar" },
    { href: "/admin/settings.php", label: "Settings", icon: "fa-cog" },
  ],
};

type DashboardShellProps = {
  role: UserRole;
  active: string;
  title: string;
  children: React.ReactNode;
};

export function DashboardShell({ role, active, title, children }: DashboardShellProps) {
  const items = navItems[role];
  const homeLabel = role === "provider" ? "Kembali ke Beranda" : "Back to Home";
  const logoutLabel = role === "provider" ? "Keluar" : "Logout";

  const links = (
    <>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = active === item.href;
          return (
            <li key={item.href}>
              <a href={item.href} className={`flex items-center p-3 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-700"}`}>
                <i className={`fas ${item.icon} w-5 text-center mr-3`} />
                <span className="font-medium">{item.label}</span>
                {isActive && <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />}
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="mt-8 border-t border-gray-100 pt-4 space-y-1">
        <li>
          <a href="/index.php" className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 text-gray-700">
            <i className="fas fa-home w-5 text-center mr-3" />
            <span className="font-medium">{homeLabel}</span>
          </a>
        </li>
        <li>
          <a href="/logout.php" className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-red-50 text-red-600">
            <i className="fas fa-sign-out-alt w-5 text-center mr-3" />
            <span className="font-medium">{logoutLabel}</span>
          </a>
        </li>
      </ul>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        <div
          className="hidden md:flex md:flex-shrink-0"
          style={{ position: "sticky", top: "4rem", alignSelf: "flex-start", height: "calc(100vh - 4rem)" }}
        >
          <div className="flex flex-col w-64 h-full border-r border-gray-200 bg-white text-gray-700 shadow-sm">
            <div className="p-5 border-b border-gray-100 flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <i className={`fas ${role === "admin" ? "fa-user-shield" : "fa-calendar-check"} text-lg`} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">BookingJasa</h2>
                <p className="text-xs text-gray-500">{title}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3">{links}</div>

            <div className="p-4 border-t border-gray-100 text-center text-xs text-gray-500">
              <p>&copy; {new Date().getFullYear()} BookingJasa</p>
              <p className="mt-1">v1.0.0</p>
            </div>
          </div>
        </div>

        <div id="sidebarOverlay" className="fixed inset-0 bg-black bg-opacity-50 z-20 hidden" />
        <div id="mobileSidebar" className="fixed inset-y-0 left-0 z-30 w-64 bg-white text-gray-700 transform -translate-x-full transition-transform duration-300 ease-in-out shadow-xl md:hidden">
          <div className="flex flex-col h-full pt-16">
            <div className="flex-1 overflow-y-auto py-4 px-3">{links}</div>
          </div>
        </div>

        <div className="flex-1 min-w-0 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button id="sidebarToggle" className="p-3 bg-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors">
          <i className="fas fa-bars text-xl" />
        </button>
      </div>
    </div>
  );
}
