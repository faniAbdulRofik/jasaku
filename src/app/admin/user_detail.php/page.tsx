import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getBookingStats, getProviderServices, getUserById } from "@/lib/data";
import { formatCurrency, formatDateTime, profilePath, statusClass } from "@/lib/format";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
function single(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }

export default async function AdminUserDetail({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "admin") redirect("/login.php?error=Anda tidak memiliki akses admin");
  const id = Number(single(params.id) || 0);
  const user = await getUserById(id);
  if (!user) redirect("/admin/users.php?error=User tidak ditemukan");
  const [stats, services] = await Promise.all([
    getBookingStats(user.id, user.role === "provider" ? "provider" : user.role === "customer" ? "customer" : "admin"),
    user.role === "provider" ? getProviderServices(user.id, 1, 5) : Promise.resolve([]),
  ]);

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="admin" active="/admin/users.php" title="Admin Dashboard">
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800"><i className="fas fa-user mr-2 text-blue-600" />Detail User</h1>
              <p className="text-sm text-gray-500 mt-1">Detail lengkap informasi user</p>
            </div>
            <div className="flex space-x-2">
              <a href={`/admin/user_edit.php?id=${user.id}`} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"><i className="fas fa-edit mr-2" />Edit</a>
              <a href="/admin/users.php" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><i className="fas fa-arrow-left mr-2" />Kembali</a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">Informasi User</h2></div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><p className="text-sm text-gray-500">Nama Lengkap</p><p className="font-medium">{user.full_name}</p></div>
                <div><p className="text-sm text-gray-500">Username</p><p className="font-medium">{user.username}</p></div>
                <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{user.email}</p></div>
                <div><p className="text-sm text-gray-500">Telepon</p><p className="font-medium">{user.phone || "-"}</p></div>
                <div><p className="text-sm text-gray-500">Role</p><p className="font-medium capitalize">{user.role}</p></div>
                <div><p className="text-sm text-gray-500">Status</p><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass(user.status)}`}>{user.status}</span></div>
                <div><p className="text-sm text-gray-500">Dibuat</p><p className="font-medium">{formatDateTime(user.created_at)}</p></div>
                <div><p className="text-sm text-gray-500">Diupdate</p><p className="font-medium">{formatDateTime(user.updated_at)}</p></div>
                <div className="md:col-span-2"><p className="text-sm text-gray-500">Alamat</p><p className="font-medium">{user.address || "-"}</p></div>
              </div>
            </div>

            {services.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">Layanan Provider</h2></div>
                <div className="divide-y divide-gray-100">
                  {services.map((service) => (
                    <a key={service.id} href={`/admin/service_detail.php?id=${service.id}`} className="flex items-center p-5 hover:bg-gray-50">
                      <img src={`/assets/images/${service.image || "default-service.jpg"}`} alt={service.title} className="w-12 h-12 rounded-lg object-cover mr-4" />
                      <div><p className="font-medium text-gray-900">{service.title}</p><p className="text-sm text-gray-500">{formatCurrency(service.price)}</p></div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 text-center">
                <img src={profilePath(user.profile_image)} className="w-24 h-24 rounded-full mx-auto object-cover mb-3" alt={user.full_name} />
                <h4 className="font-medium text-gray-800">{user.full_name}</h4>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">Statistik</h2></div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between"><span className="text-gray-500">Total Booking</span><span className="font-semibold">{stats.total_bookings}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Selesai</span><span className="font-semibold">{stats.completed}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Penghasilan</span><span className="font-semibold">{formatCurrency(stats.total_earnings)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
