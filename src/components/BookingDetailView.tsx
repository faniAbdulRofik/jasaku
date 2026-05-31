import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";
import { updateBookingStatusAction } from "@/lib/actions";
import { formatCurrency, formatDate, formatDateTime, imagePath, normalizeTime, statusClass, statusText } from "@/lib/format";
import type { BookingWithMeta, UserRole } from "@/lib/types";

type BookingDetailViewProps = {
  booking: BookingWithMeta;
  role: UserRole;
  backHref: string;
};

export function BookingDetailView({ booking, role, backHref }: BookingDetailViewProps) {
  const detailHref = `${role === "provider" ? "/provider" : "/customer"}/booking_detail.php?id=${booking.id}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Informasi Booking</h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div><p className="text-sm text-gray-500">ID Booking</p><p className="font-medium">#{String(booking.id).padStart(4, "0")}</p></div>
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
                <p className="text-sm text-gray-500 mb-2">Catatan</p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{booking.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
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
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">{role === "provider" ? "Customer" : "Provider"}</h2></div>
          <div className="p-5">
            <h4 className="font-medium text-gray-800">{role === "provider" ? booking.customer_name : booking.provider_name}</h4>
            <p className="text-gray-600 text-sm mb-2">{role === "provider" ? booking.customer_email : booking.provider_email}</p>
            {(role === "provider" ? booking.customer_phone : booking.provider_phone) && (
              <p className="text-gray-600 text-sm">{role === "provider" ? booking.customer_phone : booking.provider_phone}</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">Aksi</h2></div>
          <div className="p-5 space-y-3">
            <a href={backHref} className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">
              <i className="fas fa-arrow-left mr-2" /> Kembali
            </a>

            {role === "provider" && booking.status === "pending" && (
              <>
                <form action={updateBookingStatusAction}>
                  <input type="hidden" name="id" value={booking.id} />
                  <input type="hidden" name="status" value="confirmed" />
                  <input type="hidden" name="return_to" value={detailHref} />
                  <ConfirmSubmitButton className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700" message={`Yakin ingin mengonfirmasi booking #${String(booking.id).padStart(4, "0")}?`}>
                    <i className="fas fa-check mr-2" /> Konfirmasi
                  </ConfirmSubmitButton>
                </form>
                <form action={updateBookingStatusAction}>
                  <input type="hidden" name="id" value={booking.id} />
                  <input type="hidden" name="status" value="cancelled" />
                  <input type="hidden" name="return_to" value={detailHref} />
                  <ConfirmSubmitButton className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700" message={`Yakin ingin membatalkan booking #${String(booking.id).padStart(4, "0")}?`}>
                    <i className="fas fa-times mr-2" /> Batalkan
                  </ConfirmSubmitButton>
                </form>
              </>
            )}

            {role === "provider" && booking.status === "confirmed" && (
              <form action={updateBookingStatusAction}>
                <input type="hidden" name="id" value={booking.id} />
                <input type="hidden" name="status" value="completed" />
                <input type="hidden" name="return_to" value={detailHref} />
                <ConfirmSubmitButton className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700" message={`Tandai booking #${String(booking.id).padStart(4, "0")} sebagai selesai?`}>
                  <i className="fas fa-check-double mr-2" /> Selesai
                </ConfirmSubmitButton>
              </form>
            )}

            {role === "customer" && booking.status === "pending" && (
              <form action={updateBookingStatusAction}>
                <input type="hidden" name="id" value={booking.id} />
                <input type="hidden" name="status" value="cancelled" />
                <input type="hidden" name="return_to" value={detailHref} />
                <ConfirmSubmitButton className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700" message={`Yakin ingin membatalkan booking #${String(booking.id).padStart(4, "0")}?`}>
                  <i className="fas fa-times mr-2" /> Batalkan
                </ConfirmSubmitButton>
              </form>
            )}

            {role === "customer" && booking.status === "completed" && (
              <a href={`/customer/reviews.php?booking_id=${booking.id}`} className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600">
                <i className="fas fa-star mr-2" /> Beri Review
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
