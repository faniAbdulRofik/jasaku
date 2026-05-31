import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { saveProfileAction } from "@/lib/actions";
import { getUserById } from "@/lib/data";
import { profilePath } from "@/lib/format";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ProviderSettings({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "provider") redirect("/login.php?error=Anda harus login sebagai provider");
  const user = await getUserById(session.id);

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="provider" active="/provider/settings.php" title="Provider Dashboard">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h1 className="text-lg font-semibold text-gray-800">Pengaturan</h1>
          </div>
          <form action={saveProfileAction} className="p-6 space-y-6">
            <input type="hidden" name="return_to" value="/provider/settings.php" />
            <div className="flex items-center space-x-4">
              <img src={profilePath(user?.profile_image || session.profile_image)} className="w-20 h-20 rounded-full object-cover border border-gray-200" alt="Profile" />
              <input type="file" name="profile_image" className="image-upload block text-sm text-gray-600" accept="image/*" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input name="full_name" defaultValue={user?.full_name || session.full_name} className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" name="email" defaultValue={user?.email || session.email} className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telepon</label>
                <input name="phone" defaultValue={user?.phone || ""} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                <input type="password" name="new_password" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
                <input type="password" name="confirm_password" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                <textarea name="address" defaultValue={user?.address || ""} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Simpan Pengaturan</button>
          </form>
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
