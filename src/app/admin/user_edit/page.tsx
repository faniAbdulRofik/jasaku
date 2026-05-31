import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { adminSaveUserAction } from "@/lib/actions";
import { getUserById } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
function single(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }

export default async function AdminUserEdit({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "admin") redirect("/login?error=Anda tidak memiliki akses admin");
  const user = await getUserById(Number(single(params.id) || 0));
  if (!user) redirect("/admin/users?error=User tidak ditemukan");
  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="admin" active="/admin/users" title="Admin Dashboard">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100"><h1 className="text-lg font-semibold text-gray-800">Edit User</h1></div>
          <form action={adminSaveUserAction} className="p-6 space-y-6">
            <input type="hidden" name="id" value={user.id} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="username" defaultValue={user.username || ""} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Username" required />
              <input name="full_name" defaultValue={user.full_name} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Nama Lengkap" required />
              <input type="email" name="email" defaultValue={user.email} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Email" required />
              <input name="phone" defaultValue={user.phone || ""} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Phone" />
              <select name="role" defaultValue={user.role} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                <option value="customer">Customer</option><option value="provider">Provider</option><option value="admin">Admin</option>
              </select>
              <select name="status" defaultValue={user.status} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                <option value="active">Active</option><option value="inactive">Inactive</option>
              </select>
              <input type="password" name="password" className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Password baru (opsional)" />
              <textarea name="address" defaultValue={user.address || ""} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Address" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Simpan User</button>
          </form>
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
