import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { updateBookingStatusAction } from "@/lib/actions";
import { getBookingById } from "@/lib/data";
import { formatCurrency, formatDate, formatDateTime, imagePath, normalizeTime, statusClass, statusText } from "@/lib/format";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
function single(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }

export default async function AdminBookingDetail({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "admin") redirect("/login?error=Anda tidak memiliki akses admin");

  const id = Number(single(params.id) || 0);
  const booking = await getBookingById(id);
  if (!booking) redirect("/admin/bookings?error=Booking tidak ditemukan");

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="admin" active="/admin/bookings" title="Admin Dashboard">
        <div className="mb-6" data-aos="fade-up">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 md:p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-5">
                <div className="space-y-1">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
                    <i className="fas fa-calendar-alt mr-2 text-blue-600" />
                    Detail Booking #{booking.id}
                  </h1>
                  <p className="text-sm text-gray-500 md:text-gray-600">Detail lengkap informasi booking</p>
                </div>
                <div className="flex space-x-2">
                  <a href={`/admin/booking_edit?id=${booking.id}`} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center">
                    <i className="fas fa-edit mr-2" /> Edit
                  </a>
                  <a href="/admin/bookings" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center">
                    <i className="fas fa-arrow-left mr-2" /> Kembali
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100" data-aos="fade-up" data-aos-delay="100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Informasi Booking</h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div><p className="text-sm text-gray-500">ID Booking</p><p className="font-medium">#{booking.id}</p></div>
                    <div><p className="text-sm text-gray-500">Tanggal Booking</p><p className="font-medium">{formatDate(booking.booking_date)}</p></div>
                    <div><p className="text-sm text-gray-500">Waktu</p><p className="font-medium">{normalizeTime(booking.booking_time)}</p></div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass(booking.status)}`}>
                        {statusText(booking.status)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div><p className="text-sm text-gray-500">Dibuat</p><p className="font-medium">{formatDateTime(booking.created_at)}</p></div>
                    <div><p className="text-sm text-gray-500">Diupdate</p><p className="font-medium">{formatDateTime(booking.updated_at)}</p></div>
                    <div><p className="text-sm text-gray-500">Total Harga</p><p className="font-bold text-blue-600">{formatCurrency(booking.total_price)}</p></div>
                  </div>
                </div>
                {booking.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">Catatan Customer</p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-wrap">{booking.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100" data-aos="fade-up" data-aos-delay="150">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Informasi Layanan</h2>
              </div>
              <div className="p-5">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/4">
                    <img src={imagePath(booking.service_image)} className="w-full h-auto rounded-lg object-cover" alt="Service" />
                  </div>
                  <div className="w-full md:w-3/4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{booking.service_title}</h3>
                    <p className="text-gray-600 mb-4">{booking.service_description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <p className="text-sm"><span className="font-medium text-gray-700">Durasi:</span> <span className="text-gray-600">{booking.service_duration} menit</span></p>
                      <p className="text-sm"><span className="font-medium text-gray-700">Harga:</span> <span className="text-gray-600">{formatCurrency(booking.total_price)}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100" data-aos="fade-up" data-aos-delay="200">
              <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">Customer</h2></div>
              <div className="p-5 text-center">
                <h4 className="font-medium text-gray-800">{booking.customer_name}</h4>
                <p className="text-gray-600 text-sm mb-2">{booking.customer_email}</p>
                {booking.customer_phone && <p className="text-gray-600 text-sm mb-3">{booking.customer_phone}</p>}
                <a href={`/admin/user_detail?id=${booking.customer_id}`} className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <i className="fas fa-user-circle mr-2" /> Lihat Profile
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100" data-aos="fade-up" data-aos-delay="250">
              <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">Provider</h2></div>
              <div className="p-5 text-center">
                <h4 className="font-medium text-gray-800">{booking.provider_name}</h4>
                <p className="text-gray-600 text-sm mb-2">{booking.provider_email}</p>
                {booking.provider_phone && <p className="text-gray-600 text-sm mb-3">{booking.provider_phone}</p>}
                <a href={`/admin/user_detail?id=${booking.provider_id}`} className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <i className="fas fa-user-circle mr-2" /> Lihat Profile
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100" data-aos="fade-up" data-aos-delay="300">
              <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">Aksi</h2></div>
              <div className="p-5 space-y-3">
                <a href={`/admin/booking_edit?id=${booking.id}`} className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600">
                  <i className="fas fa-edit mr-2" /> Edit Booking
                </a>
                {booking.status === "pending" && (
                  <>
                    <form action={updateBookingStatusAction}>
                      <input type="hidden" name="id" value={booking.id} />
                      <input type="hidden" name="status" value="confirmed" />
                      <input type="hidden" name="return_to" value={`/admin/booking_detail?id=${booking.id}`} />
                      <ConfirmSubmitButton
                        className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                        message={`Yakin ingin mengonfirmasi booking #${booking.id}?`}
                      >
                        <i className="fas fa-check mr-2" /> Konfirmasi
                      </ConfirmSubmitButton>
                    </form>
                    <form action={updateBookingStatusAction}>
                      <input type="hidden" name="id" value={booking.id} />
                      <input type="hidden" name="status" value="cancelled" />
                      <input type="hidden" name="return_to" value={`/admin/booking_detail?id=${booking.id}`} />
                      <ConfirmSubmitButton
                        className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                        message={`Yakin ingin membatalkan booking #${booking.id}?`}
                      >
                        <i className="fas fa-times mr-2" /> Batalkan
                      </ConfirmSubmitButton>
                    </form>
                  </>
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
