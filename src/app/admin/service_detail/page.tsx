import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { BookingTable } from "@/components/BookingTable";
import { DashboardShell } from "@/components/DashboardShell";
import { ReviewList } from "@/components/ReviewList";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getBookingsForUser, getServiceDetail } from "@/lib/data";
import { formatCurrency, imagePath, profilePath, statusClass } from "@/lib/format";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
function single(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }

export default async function AdminServiceDetail({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "admin") redirect("/login?error=Anda tidak memiliki akses admin");
  const id = Number(single(params.id) || 0);
  const detail = await getServiceDetail(id);
  if (!detail) redirect("/admin/services?error=Layanan tidak ditemukan");
  const { service, reviews, reviewStats } = detail;
  const bookings = await getBookingsForUser(service.provider_id, "provider", "", 1, 10);
  const serviceBookings = bookings.filter((booking) => booking.service_id === service.id);

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="admin" active="/admin/services" title="Admin Dashboard">
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800"><i className="fas fa-concierge-bell text-blue-500 mr-2" />Detail Layanan</h1>
              <p className="text-sm text-gray-500 mt-1">Detail lengkap layanan</p>
            </div>
            <div className="flex space-x-2">
              <a href={`/admin/service_edit?id=${service.id}`} className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"><i className="fas fa-edit mr-2" />Edit</a>
              <a href="/admin/services" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg bg-white hover:bg-gray-50"><i className="fas fa-arrow-left mr-2" />Kembali</a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <img src={imagePath(service.image)} className="w-full h-64 object-cover" alt={service.title} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{service.title}</h2>
                    <p className="text-sm text-blue-600 mt-1">{service.category_name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass(service.status)}`}>{service.status}</span>
                </div>
                <p className="text-gray-600 mt-4">{service.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div><p className="text-sm text-gray-500">Harga</p><p className="font-bold text-blue-600">{formatCurrency(service.price)}</p></div>
                  <div><p className="text-sm text-gray-500">Durasi</p><p className="font-medium">{service.duration} menit</p></div>
                  <div><p className="text-sm text-gray-500">Lokasi</p><p className="font-medium">{service.location}</p></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">Booking Layanan</h2></div>
              <BookingTable bookings={serviceBookings} role="admin" returnTo="/admin/bookings" compact />
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">Ulasan</h2></div>
              <div className="p-5"><ReviewList reviews={reviews} /></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">Provider</h2></div>
              <div className="p-5 text-center">
                <img src={profilePath(service.provider_image)} className="w-20 h-20 rounded-full mx-auto object-cover mb-3" alt={service.provider_name} />
                <h4 className="font-medium text-gray-800">{service.provider_name}</h4>
                <a href={`/admin/user_detail?id=${service.provider_id}`} className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <i className="fas fa-user-circle mr-2" />Lihat Profile
                </a>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">Statistik</h2></div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between"><span className="text-gray-500">Rating</span><span className="font-semibold">{reviewStats.avg_rating.toFixed(1)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Total Ulasan</span><span className="font-semibold">{reviewStats.total_reviews}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Total Booking</span><span className="font-semibold">{service.total_bookings}</span></div>
              </div>
            </div>
          </div>
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
