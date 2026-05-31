import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { adminSaveUserAction } from "@/lib/actions";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function AdminUserAdd({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "admin") redirect("/login.php?error=Anda tidak memiliki akses admin");
  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="admin" active="/admin/users.php" title="Admin Dashboard">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100"><h1 className="text-lg font-semibold text-gray-800">Add User</h1></div>
          <AdminUserForm />
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}

function AdminUserForm({ user }: { user?: any }) {
  return (
    <form action={adminSaveUserAction} className="p-6 space-y-6">
      <input type="hidden" name="id" value={user?.id || ""} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="username" defaultValue={user?.username || ""} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Username" required />
        <input name="full_name" defaultValue={user?.full_name || ""} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Nama Lengkap" required />
        <input type="email" name="email" defaultValue={user?.email || ""} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Email" required />
        <input name="phone" defaultValue={user?.phone || ""} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Phone" />
        <select name="role" defaultValue={user?.role || "customer"} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
          <option value="customer">Customer</option>
          <option value="provider">Provider</option>
          <option value="admin">Admin</option>
        </select>
        <select name="status" defaultValue={user?.status || "active"} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <input type="password" name="password" className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder={user ? "Password baru (opsional)" : "Password"} />
        <textarea name="address" defaultValue={user?.address || ""} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Address" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Simpan User</button>
    </form>
  );
}
