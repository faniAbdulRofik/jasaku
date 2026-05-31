import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { deleteServiceAction } from "@/lib/actions";
import { getAllServices } from "@/lib/data";
import { formatCurrency, imagePath, statusClass } from "@/lib/format";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function AdminServices({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "admin") redirect("/login?error=Anda tidak memiliki akses admin");
  const services = await getAllServices();
  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="admin" active="/admin/services" title="Admin Dashboard">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800">Manage Services</h1>
            <a href="/admin/service_add" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"><i className="fas fa-plus mr-2" />Add Service</a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id}>
                    <td className="px-6 py-4"><div className="flex items-center"><img src={imagePath(service.image)} className="w-12 h-12 rounded-lg object-cover border border-gray-200 mr-3" alt={service.title} /><div><div className="text-sm font-medium text-gray-900">{service.title}</div><div className="text-xs text-gray-500">{service.category_name}</div></div></div></td>
                    <td className="px-6 py-4 text-sm text-gray-900">{service.provider_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(service.price)}</td>
                    <td className="px-6 py-4"><span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass(service.status)}`}>{service.status}</span></td>
                    <td className="px-6 py-4 text-sm font-medium"><div className="flex space-x-2"><a href={`/admin/service_detail?id=${service.id}`} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Detail"><i className="fas fa-eye" /></a><a href={`/admin/service_edit?id=${service.id}`} className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors" title="Edit"><i className="fas fa-edit" /></a><form action={deleteServiceAction}><input type="hidden" name="id" value={service.id} /><input type="hidden" name="return_to" value="/admin/services" /><ConfirmSubmitButton className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Hapus" message={`Yakin ingin menghapus layanan "${service.title}"? Tindakan ini tidak bisa dibatalkan.`}><i className="fas fa-trash" /></ConfirmSubmitButton></form></div></td>
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
