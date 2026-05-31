import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getBookingStats, getBookingsForUser } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ProviderEarnings({ searchParams }: PageProps) {
  const params = await searchParams;
  const user = await getSessionUser();
  if (!user || user.role !== "provider") redirect("/login?error=Anda harus login sebagai provider");
  const [stats, completed] = await Promise.all([
    getBookingStats(user.id, "provider"),
    getBookingsForUser(user.id, "provider", "completed", 1, 100),
  ]);

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="provider" active="/provider/earnings" title="Provider Dashboard">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-500">Total Penghasilan</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(stats.total_earnings)}</h3>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-500">Booking Selesai</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.completed}</h3>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-500">Menunggu Konfirmasi</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.pending}</h3>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h1 className="text-lg font-semibold text-gray-800">Riwayat Penghasilan</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Layanan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {completed.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(booking.booking_date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.service_title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.customer_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{formatCurrency(booking.total_price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
