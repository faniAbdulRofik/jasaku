import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getAdminStats } from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/format";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function AdminReports({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "admin") redirect("/login.php?error=Anda tidak memiliki akses admin");
  const stats = await getAdminStats();
  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="admin" active="/admin/reports.php" title="Admin Dashboard">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5"><p className="text-sm text-gray-500">Users</p><h3 className="text-2xl font-bold">{formatNumber(stats.total_users)}</h3></div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5"><p className="text-sm text-gray-500">Services</p><h3 className="text-2xl font-bold">{formatNumber(stats.total_services)}</h3></div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5"><p className="text-sm text-gray-500">Bookings</p><h3 className="text-2xl font-bold">{formatNumber(stats.total_bookings)}</h3></div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5"><p className="text-sm text-gray-500">Revenue</p><h3 className="text-2xl font-bold">{formatCurrency(stats.total_revenue)}</h3></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">User Distribution</h2>
            <div className="space-y-3">
              {Object.entries(stats.user_roles).map(([role, count]) => (
                <div key={role} className="flex items-center"><span className="w-3 h-3 rounded-full mr-2 bg-blue-500" /><span className="text-sm font-medium text-gray-700 capitalize">{role}</span><span className="ml-auto text-sm font-semibold text-gray-700">{count}</span></div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Booking Status</h2>
            <div className="space-y-3">
              {Object.entries(stats.booking_status).map(([status, count]) => (
                <div key={status} className="flex items-center"><span className="w-3 h-3 rounded-full mr-2 bg-purple-500" /><span className="text-sm font-medium text-gray-700 capitalize">{status}</span><span className="ml-auto text-sm font-semibold text-gray-700">{count}</span></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
