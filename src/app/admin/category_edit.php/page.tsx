import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { adminSaveCategoryAction } from "@/lib/actions";
import { getAllCategories, getAllServices } from "@/lib/data";
import { formatDateTime } from "@/lib/format";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
function single(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }

export default async function AdminCategoryEdit({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "admin") redirect("/login.php?error=Anda tidak memiliki akses admin");
  const id = Number(single(params.id) || 0);
  const [categories, services] = await Promise.all([getAllCategories(), getAllServices()]);
  const category = categories.find((item) => Number(item.id) === id);
  if (!category) redirect("/admin/categories.php?error=Kategori tidak ditemukan");
  const categoryServices = services.filter((service) => service.category_id === category.id);

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="admin" active="/admin/categories.php" title="Admin Dashboard">
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Edit Kategori</h1>
            <a href="/admin/categories.php" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><i className="fas fa-arrow-left mr-2" />Kembali</a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5">
                <form action={adminSaveCategoryAction}>
                  <input type="hidden" name="id" value={category.id} />
                  <input type="hidden" name="status" value={category.status} />
                  <input type="hidden" name="icon" value={category.icon || "fas fa-concierge-bell"} />
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nama Kategori</label>
                    <input type="text" className="form-control" id="name" name="name" defaultValue={category.name} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Deskripsi</label>
                    <textarea className="form-control" id="description" name="description" rows={4} defaultValue={category.description || ""} />
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <a href="/admin/categories.php" className="btn btn-secondary me-md-2">Batal</a>
                    <button type="submit" className="btn btn-primary"><i className="fas fa-save mr-2" />Update Kategori</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-4 border-b border-gray-100"><h5 className="mb-0">Informasi Kategori</h5></div>
              <div className="p-5">
                <p><strong>ID:</strong> {category.id}</p>
                <p><strong>Jumlah Service:</strong> <span className="badge bg-info">{categoryServices.length} service</span></p>
                <p><strong>Dibuat:</strong> {formatDateTime(category.created_at)}</p>
                <p><strong>Diupdate:</strong> {formatDateTime(category.updated_at)}</p>
              </div>
            </div>
            {categoryServices.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mt-3">
                <div className="p-4 border-b border-gray-100"><h6 className="mb-0">Service dalam Kategori Ini</h6></div>
                <div className="p-5">
                  <ul className="list-unstyled mb-0">
                    {categoryServices.slice(0, 5).map((service) => (
                      <li key={service.id}><i className="fas fa-cog text-muted me-2" />{service.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
