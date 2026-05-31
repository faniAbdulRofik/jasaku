import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { ServiceForm } from "@/components/ServiceForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getCategories } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function AddService({ searchParams }: PageProps) {
  const params = await searchParams;
  const user = await getSessionUser();
  if (!user || user.role !== "provider") redirect("/login.php?error=Anda harus login sebagai provider");
  const categories = await getCategories();

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="provider" active="/provider/services.php" title="Provider Dashboard">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h1 className="text-lg font-semibold text-gray-800">Tambah Layanan</h1>
          </div>
          <ServiceForm categories={categories} providerId={user.id} returnTo="/provider/services.php" />
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
