import { redirect } from "next/navigation";
import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { adminDeleteCategoryAction, adminSaveCategoryAction } from "@/lib/actions";
import { buildQuery } from "@/lib/format";
import { getAdminCategoriesPage } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function formatTableDate(value: string | null | undefined) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function truncateDescription(value: string | null | undefined) {
  const description = value || "";
  return description.length > 50 ? `${description.slice(0, 50)}...` : description;
}

export default async function AdminCategories({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "admin") redirect("/login?error=Anda tidak memiliki akses admin");

  const search = single(params.search) || "";
  const page = Math.max(1, Number(single(params.page) || 1));
  const error = single(params.error);
  const success = single(params.success);
  const result = await getAdminCategoriesPage(search, page, 10);
  const startRecord = result.totalRecords ? (result.page - 1) * result.limit + 1 : 0;
  const endRecord = Math.min(result.page * result.limit, result.totalRecords);
  const firstPage = Math.max(1, result.page - 2);
  const lastPage = Math.min(result.totalPages, result.page + 2);

  return (
    <>
      <SiteHeader />
      <DashboardShell role="admin" active="/admin/categories" title="Admin Dashboard">
        <div className="mb-6" data-aos="fade-up">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 md:p-5">
              <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Kelola Kategori</h1>
                  <p className="text-sm text-gray-500 mt-1">Manajemen kategori layanan</p>
                </div>
                <div className="flex-shrink-0">
                  <button type="button" className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition-all" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
                    <i className="fas fa-plus text-xs w-4 text-center mr-2" />
                    Tambah Kategori
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="fas fa-exclamation-circle text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button type="button" className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="fas fa-check-circle text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button type="button" className="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6" data-aos="fade-up" data-aos-delay="150">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="p-5">
              <form method="GET" className="grid grid-cols-1 md:grid-cols-10 gap-4">
                <div className="md:col-span-8">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-search text-gray-400" />
                    </div>
                    <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="search" placeholder="Cari kategori..." defaultValue={search} />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <i className="fas fa-search mr-2" /> Cari
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100" data-aos="fade-up" data-aos-delay="200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-medium text-gray-900">Daftar Kategori</h3>
          </div>
          <div className="p-6">
            {result.categories.length === 0 ? (
              <div className="text-center py-8" data-aos="fade-up">
                <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
                  <i className="fas fa-folder-open text-gray-400 text-xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Tidak ada kategori ditemukan</h3>
                <p className="text-gray-500">Mulai dengan menambahkan kategori baru</p>
                <button type="button" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
                  <i className="fas fa-plus mr-2" /> Tambah Kategori
                </button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kategori</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Service</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dibuat</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {result.categories.map((category) => (
                        <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">{category.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 max-w-xs truncate">{truncateDescription(category.description)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {category.service_count} service
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTableDate(category.created_at)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <a href={`/admin/category_edit?id=${category.id}`} className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors" title="Edit">
                                <i className="fas fa-edit" />
                              </a>
                              {category.service_count === 0 ? (
                                <form action={adminDeleteCategoryAction} className="inline">
                                  <input type="hidden" name="id" value={category.id} />
                                  <ConfirmSubmitButton
                                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                                    title="Hapus"
                                    message={`Yakin ingin menghapus kategori "${category.name}"? Tindakan ini tidak bisa dibatalkan.`}
                                  >
                                    <i className="fas fa-trash" />
                                  </ConfirmSubmitButton>
                                </form>
                              ) : (
                                <span className="text-gray-400 p-1 cursor-not-allowed" title="Tidak dapat dihapus karena masih memiliki service">
                                  <i className="fas fa-lock" />
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {result.totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between" data-aos="fade-up">
                    <div className="flex-1 flex justify-between sm:hidden">
                      {result.page > 1 && (
                        <a href={`/admin/categories${buildQuery({ page: result.page - 1, search })}`} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          Sebelumnya
                        </a>
                      )}
                      {result.page < result.totalPages && (
                        <a href={`/admin/categories${buildQuery({ page: result.page + 1, search })}`} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          Selanjutnya
                        </a>
                      )}
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Menampilkan <span className="font-medium">{startRecord}</span> sampai <span className="font-medium">{endRecord}</span> dari <span className="font-medium">{result.totalRecords}</span> kategori
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          {result.page > 1 && (
                            <a href={`/admin/categories${buildQuery({ page: result.page - 1, search })}`} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                              <span className="sr-only">Sebelumnya</span>
                              <i className="fas fa-chevron-left" />
                            </a>
                          )}

                          {Array.from({ length: lastPage - firstPage + 1 }, (_, index) => firstPage + index).map((pageNumber) => (
                            <a key={pageNumber} href={`/admin/categories${buildQuery({ page: pageNumber, search })}`} className={`${pageNumber === result.page ? "z-10 bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}>
                              {pageNumber}
                            </a>
                          ))}

                          {result.page < result.totalPages && (
                            <a href={`/admin/categories${buildQuery({ page: result.page + 1, search })}`} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                              <span className="sr-only">Selanjutnya</span>
                              <i className="fas fa-chevron-right" />
                            </a>
                          )}
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="addCategoryModal" tabIndex={-1} aria-labelledby="addCategoryModalLabel" aria-hidden="true">
          <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-lg outline-none text-current">
              <form action={adminSaveCategoryAction}>
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-lg">
                  <h5 className="text-xl font-medium leading-normal text-gray-800" id="addCategoryModalLabel">Tambah Kategori Baru</h5>
                  <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close">
                    <i className="fas fa-times" />
                  </button>
                </div>
                <div className="modal-body relative p-4">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
                    <input type="text" className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" id="name" name="name" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                    <textarea className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" id="description" name="description" rows={3} />
                  </div>
                </div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-lg">
                  <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors" data-bs-dismiss="modal">Batal</button>
                  <button type="submit" name="add_category" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    <i className="fas fa-save mr-2" /> Simpan Kategori
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
