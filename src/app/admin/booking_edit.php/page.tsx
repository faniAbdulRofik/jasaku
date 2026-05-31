import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { updateBookingStatusAction } from "@/lib/actions";
import { getBookingById } from "@/lib/data";
import { formatCurrency, formatDate, normalizeTime, statusText } from "@/lib/format";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
function single(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }

export default async function AdminBookingEdit({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "admin") redirect("/login.php?error=Anda tidak memiliki akses admin");

  const id = Number(single(params.id) || 0);
  const booking = await getBookingById(id);
  if (!booking) redirect("/admin/bookings.php?error=Booking tidak ditemukan");

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="admin" active="/admin/bookings.php" title="Admin Dashboard">
        <div className="mb-6" data-aos="fade-up">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 md:p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-5">
                <div className="space-y-1">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
                    <i className="fas fa-edit mr-2 text-blue-600" />
                    Edit Booking #{booking.id}
                  </h1>
                  <p className="text-sm text-gray-500 md:text-gray-600">Ubah status booking</p>
                </div>
                <a href={`/admin/booking_detail.php?id=${booking.id}`} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center">
                  <i className="fas fa-arrow-left mr-2" /> Kembali
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Form Edit Booking</h2>
              </div>
              <form action={updateBookingStatusAction} className="p-5 space-y-5">
                <input type="hidden" name="id" value={booking.id} />
                <input type="hidden" name="return_to" value={`/admin/booking_detail.php?id=${booking.id}`} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                    <input value={booking.customer_name || ""} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                    <input value={booking.provider_name || ""} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Layanan</label>
                    <input value={booking.service_title || ""} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                    <input value={formatCurrency(booking.total_price)} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                    <input value={formatDate(booking.booking_date)} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Waktu</label>
                    <input value={normalizeTime(booking.booking_time)} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status Booking</label>
                    <select id="status" name="status" defaultValue={booking.status} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                      <option value="pending">{statusText("pending")}</option>
                      <option value="confirmed">{statusText("confirmed")}</option>
                      <option value="in_progress">{statusText("in_progress")}</option>
                      <option value="completed">{statusText("completed")}</option>
                      <option value="cancelled">{statusText("cancelled")}</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                  <a href={`/admin/booking_detail.php?id=${booking.id}`} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Batal</a>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <i className="fas fa-save mr-2" />Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">Ringkasan</h2></div>
              <div className="p-5 space-y-3">
                <div><p className="text-sm text-gray-500">Status Saat Ini</p><p className="font-medium">{statusText(booking.status)}</p></div>
                <div><p className="text-sm text-gray-500">Booking ID</p><p className="font-medium">#{booking.id}</p></div>
                <div><p className="text-sm text-gray-500">Total Harga</p><p className="font-bold text-blue-600">{formatCurrency(booking.total_price)}</p></div>
              </div>
            </div>
          </div>
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
