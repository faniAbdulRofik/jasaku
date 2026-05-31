import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { BookingTable } from "@/components/BookingTable";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getBookingStats, getBookingsForUser, getProviderServices } from "@/lib/data";
import { formatCurrency, imagePath } from "@/lib/format";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ProviderDashboard({ searchParams }: PageProps) {
  const params = await searchParams;
  const user = await getSessionUser();
  if (!user || user.role !== "provider") redirect("/login?error=Anda harus login sebagai provider");

  const [stats, recentBookings, services] = await Promise.all([
    getBookingStats(user.id, "provider"),
    getBookingsForUser(user.id, "provider", "", 1, 5),
    getProviderServices(user.id, 1, 5),
  ]);

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="provider" active="/provider/dashboard" title="Provider Dashboard">
        <div className="mb-6" data-aos="fade-up">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 md:p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-5">
                <div className="space-y-1">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">Selamat Datang, {user.full_name}!</h1>
                  <p className="text-sm text-gray-500 md:text-gray-600">Kelola layanan dan booking Anda di sini</p>
                </div>
                <div className="flex-shrink-0">
                  <a href="/provider/add_service" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                    <i className="fas fa-plus text-xs w-4 mr-2" />Tambah Layanan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6" data-aos="fade-up" data-aos-delay="100">
          {[
            ["Total Layanan", services.length, "from-blue-500 to-blue-600", "fa-concierge-bell"],
            ["Total Booking", stats.total_bookings, "from-purple-500 to-purple-600", "fa-calendar-check"],
            ["Menunggu Konfirmasi", stats.pending, "from-yellow-500 to-yellow-600", "fa-clock"],
            ["Total Penghasilan", formatCurrency(stats.total_earnings), "from-green-500 to-green-600", "fa-money-bill-wave"],
          ].map(([label, value, gradient, icon]) => (
            <div key={String(label)} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 p-4 text-center hover:shadow-md transition-all duration-300">
              <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center mx-auto mb-3 text-white shadow-md`}>
                <i className={`fas ${icon} text-sm`} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{value}</h3>
              <p className="text-xs font-medium text-gray-500 truncate">{label}</p>
            </div>
          ))}
        </div>

        <div className="mb-6" data-aos="fade-up" data-aos-delay="150">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-md font-semibold text-gray-800">Aksi Cepat</h2>
            </div>
            <div className="p-3 bg-white">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  ["/provider/add_service", "Tambah Layanan", "fa-plus", "from-blue-500 to-blue-600"],
                  ["/provider/bookings", "Kelola Booking", "fa-calendar", "from-green-500 to-green-600"],
                  ["/provider/services", "Layanan Saya", "fa-concierge-bell", "from-purple-500 to-purple-600"],
                  ["/provider/earnings", "Penghasilan", "fa-money-bill-wave", "from-yellow-500 to-yellow-600"],
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Booking Terbaru</h2>
                <a href="/provider/bookings" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">Lihat Semua <i className="fas fa-chevron-right ml-1 text-xs" /></a>
              </div>
              <BookingTable bookings={recentBookings} role="provider" returnTo="/provider/dashboard" compact />
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="250">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Layanan Saya</h2>
                <a href="/provider/services" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">Lihat Semua <i className="fas fa-chevron-right ml-1 text-xs" /></a>
              </div>
              <div className="p-4 space-y-4">
                {services.length ? services.map((service) => (
                  <div key={service.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                    <img src={imagePath(service.image)} className="w-12 h-12 rounded-lg object-cover border border-gray-200 mr-3" alt={service.title} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{service.title}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(service.price)}</span>
                        <span className="ml-2 text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full flex items-center"><i className="fas fa-star text-yellow-500 mr-1 text-xs" />{service.avg_rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="p-8 text-center bg-white">
                    <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
                      <i className="fas fa-concierge-bell text-gray-400 text-3xl" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Belum ada layanan</h3>
                    <a href="/provider/add_service" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Tambah Layanan</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
