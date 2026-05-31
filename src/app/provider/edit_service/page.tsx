import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { ServiceForm } from "@/components/ServiceForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getCategories, getServiceDetail } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
function single(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }

export default async function EditService({ searchParams }: PageProps) {
  const params = await searchParams;
  const user = await getSessionUser();
  if (!user || user.role !== "provider") redirect("/login?error=Anda harus login sebagai provider");
  const id = Number(single(params.id) || 0);
  const [categories, detail] = await Promise.all([getCategories(), getServiceDetail(id)]);
  if (!detail || detail.service.provider_id !== user.id) redirect("/provider/services?error=Layanan tidak ditemukan");

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="provider" active="/provider/services" title="Provider Dashboard">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h1 className="text-lg font-semibold text-gray-800">Edit Layanan</h1>
          </div>
          <ServiceForm categories={categories} service={detail.service} providerId={user.id} returnTo="/provider/services" />
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
