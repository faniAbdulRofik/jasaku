import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { ServiceForm } from "@/components/ServiceForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getCategories, getServiceDetail, getUsers } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
function single(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }

export default async function AdminServiceEdit({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "admin") redirect("/login?error=Anda tidak memiliki akses admin");
  const [categories, providers, detail] = await Promise.all([getCategories(), getUsers("provider"), getServiceDetail(Number(single(params.id) || 0))]);
  if (!detail) redirect("/admin/services?error=Layanan tidak ditemukan");
  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="admin" active="/admin/services" title="Admin Dashboard">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"><div className="p-5 border-b border-gray-100"><h1 className="text-lg font-semibold text-gray-800">Edit Service</h1></div><ServiceForm categories={categories} providers={providers} providerId={detail.service.provider_id} service={detail.service} returnTo="/admin/services" isAdmin /></div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
