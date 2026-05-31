import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { adminDeleteUserAction } from "@/lib/actions";
import { getUsers } from "@/lib/data";
import { profilePath, statusClass } from "@/lib/format";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function AdminUsers({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "admin") redirect("/login.php?error=Anda tidak memiliki akses admin");
  const users = await getUsers();

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="admin" active="/admin/users.php" title="Admin Dashboard">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800">Manage Users</h1>
            <a href="/admin/user_add.php" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"><i className="fas fa-user-plus mr-2" />Add User</a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={profilePath(user.profile_image)} className="w-10 h-10 rounded-full object-cover border border-gray-200 mr-3" alt={user.full_name} />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-900">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass(user.status)}`}>{user.status}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <a href={`/admin/user_detail.php?id=${user.id}`} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Detail">
                          <i className="fas fa-eye" />
                        </a>
                        <a href={`/admin/user_edit.php?id=${user.id}`} className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors" title="Edit">
                          <i className="fas fa-edit" />
                        </a>
                        <form action={adminDeleteUserAction}>
                          <input type="hidden" name="id" value={user.id} />
                          <ConfirmSubmitButton
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            title="Hapus"
                            message={`Yakin ingin menghapus user "${user.full_name}"? Tindakan ini tidak bisa dibatalkan.`}
                          >
                            <i className="fas fa-trash" />
                          </ConfirmSubmitButton>
                        </form>
                      </div>
                    </td>
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
