import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { BookingTable } from "@/components/BookingTable";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getBookingStats, getBookingsForUser } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function CustomerDashboard({ searchParams }: PageProps) {
  const params = await searchParams;
  const user = await getSessionUser();
  if (!user || user.role !== "customer") redirect("/login.php?error=Anda harus login sebagai customer");

  const [stats, recentBookings] = await Promise.all([
    getBookingStats(user.id, "customer"),
    getBookingsForUser(user.id, "customer", "", 1, 5),
  ]);

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="customer" active="/customer/dashboard.php" title="Customer Dashboard">
        <div className="mb-6" data-aos="fade-up">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 md:p-5">
              <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Welcome back, {user.full_name}!</h1>
                  <p className="text-sm text-gray-500 mt-1">Here&apos;s your booking overview today</p>
                </div>
                <div className="flex-shrink-0">
                  <a href="/search.php" className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:to-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-150 shadow hover:shadow-md active:scale-[0.98]">
                    <i className="fas fa-search text-xs w-4 text-center mr-2" />
                    Find Services
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" data-aos="fade-up" data-aos-delay="100">
          {[
            ["Total Bookings", stats.total_bookings, "from-blue-500 to-blue-600", "fa-calendar-check"],
            ["Pending", stats.pending, "from-yellow-500 to-yellow-600", "fa-clock"],
            ["Confirmed", stats.confirmed, "from-green-500 to-green-600", "fa-check-circle"],
            ["Completed", stats.completed, "from-purple-500 to-purple-600", "fa-check-double"],
          ].map(([label, value, gradient, icon]) => (
            <div key={String(label)} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center mr-4 text-white shadow-md`}>
                    <i className={`fas ${icon} text-lg`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <h3 className="text-xl font-bold text-gray-800">{value}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6" data-aos="fade-up" data-aos-delay="150">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-md font-semibold text-gray-800">Quick Actions</h2>
            </div>
            <div className="p-3 bg-white">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  ["/search.php", "Find Services", "fa-search", "from-blue-500 to-blue-600"],
                  ["/customer/bookings.php", "My Bookings", "fa-calendar", "from-green-500 to-green-600"],
                  ["/customer/reviews.php", "My Reviews", "fa-star", "from-yellow-500 to-yellow-600"],
                  ["/customer/settings.php", "Settings", "fa-cog", "from-purple-500 to-purple-600"],
                ].map(([href, label, icon, gradient]) => (
                  <a key={href} href={href} className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group">
                    <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center mb-2 text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <i className={`fas ${icon} text-sm`} />
                    </div>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
              <a href="/customer/bookings.php" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                View All <i className="fas fa-chevron-right ml-1 text-xs" />
              </a>
            </div>
            <BookingTable bookings={recentBookings} role="customer" returnTo="/customer/dashboard.php" compact />
          </div>
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
