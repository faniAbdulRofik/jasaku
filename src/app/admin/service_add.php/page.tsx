import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { ServiceForm } from "@/components/ServiceForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getCategories, getUsers } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function AdminServiceAdd({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "admin") redirect("/login.php?error=Anda tidak memiliki akses admin");
  const [categories, providers] = await Promise.all([getCategories(), getUsers("provider")]);
  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="admin" active="/admin/services.php" title="Admin Dashboard">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"><div className="p-5 border-b border-gray-100"><h1 className="text-lg font-semibold text-gray-800">Add Service</h1></div><ServiceForm categories={categories} providers={providers} providerId={providers[0]?.id || 0} returnTo="/admin/services.php" isAdmin /></div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
