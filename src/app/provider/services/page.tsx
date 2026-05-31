import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { deleteServiceAction } from "@/lib/actions";
import { getProviderServices } from "@/lib/data";
import { formatCurrency, imagePath, statusClass } from "@/lib/format";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ProviderServices({ searchParams }: PageProps) {
  const params = await searchParams;
  const user = await getSessionUser();
  if (!user || user.role !== "provider") redirect("/login?error=Anda harus login sebagai provider");
  const services = await getProviderServices(user.id, 1, 100);

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="provider" active="/provider/services" title="Provider Dashboard">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800">Layanan Saya</h1>
            <a href="/provider/add_service" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"><i className="fas fa-plus mr-2" />Tambah Layanan</a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Layanan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={imagePath(service.image)} className="w-12 h-12 rounded-lg object-cover border border-gray-200 mr-3" alt={service.title} />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{service.title}</div>
                          <div className="text-xs text-gray-500">{service.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.category_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(service.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass(service.status)}`}>{service.status}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <a href={`/service_detail?id=${service.id}`} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Lihat detail" aria-label={`Lihat detail ${service.title}`}>
                          <i className="fas fa-eye" />
                        </a>
                        <a href={`/provider/edit_service?id=${service.id}`} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors" title="Edit layanan" aria-label={`Edit ${service.title}`}>
                          <i className="fas fa-pen-to-square" />
                        </a>
                        <form action={deleteServiceAction}>
                          <input type="hidden" name="id" value={service.id} />
                          <input type="hidden" name="return_to" value="/provider/services" />
                          <ConfirmSubmitButton
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            title="Hapus layanan"
                            message={`Yakin ingin menghapus layanan "${service.title}"? Tindakan ini tidak bisa dibatalkan.`}
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
