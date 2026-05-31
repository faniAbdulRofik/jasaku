import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";
import { updateBookingStatusAction } from "@/lib/actions";
import { formatCurrency, formatDate, formatDateTime, imagePath, normalizeTime, statusClass, statusText } from "@/lib/format";
import type { BookingWithMeta, UserRole } from "@/lib/types";

type BookingTableProps = {
  bookings: BookingWithMeta[];
  role: UserRole;
  returnTo: string;
  compact?: boolean;
};

export function BookingTable({ bookings, role, returnTo, compact = false }: BookingTableProps) {
  const detailHref = (bookingId: number) => {
    if (role === "provider") return `/provider/booking_detail?id=${bookingId}`;
    if (role === "customer") return `/customer/booking_detail?id=${bookingId}`;
    return `${returnTo}?id=${bookingId}`;
  };

  if (!bookings.length) {
    return (
      <div className="p-8 text-center bg-white">
        <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
          <i className="fas fa-calendar text-gray-400 text-3xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Belum ada booking</h3>
        <p className="text-gray-500 mb-4">Booking akan muncul di sini</p>
      </div>
    );
  }

  if (role === "admin") {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Layanan</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal & Waktu</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              {!compact && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">#{booking.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{booking.customer_name}</div>
                  <div className="text-sm text-gray-500">{booking.customer_email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{booking.provider_name}</div>
                  <div className="text-sm text-gray-500">{booking.provider_email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{booking.service_title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{formatDate(booking.booking_date)}</div>
                  <div className="text-sm text-gray-500">{normalizeTime(booking.booking_time)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(booking.total_price)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass(booking.status)}`}>
                    {statusText(booking.status)}
                  </span>
                </td>
                {!compact && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <a href={`/admin/booking_detail?id=${booking.id}`} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Detail">
                        <i className="fas fa-eye" />
                      </a>
                      <a href={`/admin/booking_edit?id=${booking.id}`} className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors" title="Edit">
                        <i className="fas fa-edit" />
                      </a>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{role === "provider" ? "Customer" : "Layanan"}</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{role === "provider" ? "Layanan" : "Provider"}</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal & Waktu</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            {!compact && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">#{String(booking.id).padStart(4, "0")}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {role === "provider" ? (
                  <>
                    <div className="text-sm font-medium text-gray-900">{booking.customer_name}</div>
                    <div className="text-sm text-gray-500">{booking.customer_phone}</div>
                  </>
                ) : (
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full object-cover border border-gray-200" src={imagePath(booking.service_image)} alt="Service" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{booking.service_title}</div>
                      <div className="text-sm text-gray-500">Dibuat: {formatDateTime(booking.created_at)}</div>
                    </div>
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {role === "provider" ? (
                  <div className="flex items-center">
                    <img src={imagePath(booking.service_image)} className="w-10 h-10 rounded-lg object-cover mr-3" alt="Service" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.service_title}</div>
                      <div className="text-xs text-gray-500">{formatDateTime(booking.created_at)}</div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-sm text-gray-900">{booking.provider_name}</div>
                    <div className="text-sm text-gray-500">{booking.provider_phone}</div>
                  </>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={role === "provider" ? "text-sm font-medium text-gray-900" : "text-sm text-gray-900"}>{formatDate(booking.booking_date)}</div>
                <div className="text-sm text-gray-500">{normalizeTime(booking.booking_time)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass(booking.status)}`}>
                  {statusText(booking.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(booking.total_price)}</td>
              {!compact && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className={role === "provider" ? "flex space-x-2" : "flex space-x-2"}>
                    <a href={detailHref(booking.id)} className={role === "provider" ? "p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" : "text-blue-600 hover:text-blue-800"} title="Detail">
                      <i className="fas fa-eye" />
                    </a>
                    {role === "provider" && booking.status === "pending" && (
                      <>
                      <form action={updateBookingStatusAction}>
                        <input type="hidden" name="id" value={booking.id} />
                        <input type="hidden" name="status" value="confirmed" />
                        <input type="hidden" name="return_to" value={returnTo} />
                        <ConfirmSubmitButton
                          className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                          title="Konfirmasi"
                          message={`Yakin ingin mengonfirmasi booking #${String(booking.id).padStart(4, "0")}?`}
                        >
                          <i className="fas fa-check" />
                        </ConfirmSubmitButton>
                      </form>
                      <form action={updateBookingStatusAction}>
                        <input type="hidden" name="id" value={booking.id} />
                        <input type="hidden" name="status" value="cancelled" />
                        <input type="hidden" name="return_to" value={returnTo} />
                        <ConfirmSubmitButton
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          title="Batalkan"
                          message={`Yakin ingin membatalkan booking #${String(booking.id).padStart(4, "0")}?`}
                        >
                          <i className="fas fa-times" />
                        </ConfirmSubmitButton>
                      </form>
                      </>
                    )}
                    {role === "provider" && booking.status === "confirmed" && (
                      <form action={updateBookingStatusAction}>
                        <input type="hidden" name="id" value={booking.id} />
                        <input type="hidden" name="status" value="completed" />
                        <input type="hidden" name="return_to" value={returnTo} />
                        <ConfirmSubmitButton
                          className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                          title="Selesai"
                          message={`Tandai booking #${String(booking.id).padStart(4, "0")} sebagai selesai? Pastikan layanan benar-benar sudah selesai.`}
                        >
                          <i className="fas fa-check-double" />
                        </ConfirmSubmitButton>
                      </form>
                    )}
                    {role === "customer" && booking.status === "pending" && (
                      <form action={updateBookingStatusAction}>
                        <input type="hidden" name="id" value={booking.id} />
                        <input type="hidden" name="status" value="cancelled" />
                        <input type="hidden" name="return_to" value={returnTo} />
                        <ConfirmSubmitButton
                          className="text-red-600 hover:text-red-800"
                          title="Batalkan"
                          message={`Yakin ingin membatalkan booking #${String(booking.id).padStart(4, "0")}?`}
                        >
                          <i className="fas fa-times" />
                        </ConfirmSubmitButton>
                      </form>
                    )}
                    {role === "customer" && booking.status === "completed" && (
                      <a href={`/customer/reviews?booking_id=${booking.id}`} className="text-yellow-600 hover:text-yellow-800" title="Review">
                        <i className="fas fa-star" />
                      </a>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
