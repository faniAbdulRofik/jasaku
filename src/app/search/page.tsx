import { PageChrome } from "@/components/PageChrome";
import { getCategories, searchServices } from "@/lib/data";
import { buildQuery, formatCurrency, imagePath } from "@/lib/format";

export const dynamic = "force-dynamic";

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const filters = {
    keyword: single(params.keyword) || "",
    location: single(params.location) || "",
    category: single(params.category) || "",
    min_price: single(params.min_price) || "",
    max_price: single(params.max_price) || "",
    sort: single(params.sort) || "newest",
    view: single(params.view) || "grid",
  };
  const page = Number(single(params.page) || 1);
  const [categories, result] = await Promise.all([getCategories(), searchServices(filters, page, 12)]);
  const viewMode = filters.view === "list" ? "list" : "grid";

  return (
    <PageChrome searchParams={params}>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <form method="GET" action="/search" id="searchForm" className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input type="text" name="keyword" placeholder="Cari jasa yang Anda butuhkan..." defaultValue={filters.keyword} className="block w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 placeholder-gray-400 transition-all duration-200" />
              </div>

              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input type="text" name="location" placeholder="Lokasi" defaultValue={filters.location} className="block w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 placeholder-gray-400 transition-all duration-200" />
              </div>

              <button type="submit" className="flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Cari Jasa
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filter</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>

                <form method="GET" action="/search">
                  <input type="hidden" name="keyword" value={filters.keyword} />
                  <input type="hidden" name="location" value={filters.location} />
                  <input type="hidden" name="sort" value={filters.sort} />
                  <input type="hidden" name="view" value={viewMode} />

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Kategori</label>
                    <select name="category" defaultValue={filters.category} className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none">
                      <option value="">Semua Kategori</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Rentang Harga</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="number" name="min_price" placeholder="Min" defaultValue={filters.min_price} className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
                      <input type="number" name="max_price" placeholder="Max" defaultValue={filters.max_price} className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Terapkan Filter
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:w-3/4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {filters.keyword ? `Hasil Pencarian untuk "${filters.keyword}"` : "Semua Layanan Tersedia"}
                  </h2>
                  <p className="text-gray-600">Ditemukan {result.total} layanan</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
                    <a href={`/search${buildQuery({ ...filters, view: "grid", page: 1 })}`} className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500"}`} title="Grid View">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </a>
                    <a href={`/search${buildQuery({ ...filters, view: "list", page: 1 })}`} className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500"}`} title="List View">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </a>
                  </div>

                  <form method="GET" action="/search" className="flex items-center">
                    <input type="hidden" name="keyword" value={filters.keyword} />
                    <input type="hidden" name="location" value={filters.location} />
                    <input type="hidden" name="category" value={filters.category} />
                    <input type="hidden" name="min_price" value={filters.min_price} />
                    <input type="hidden" name="max_price" value={filters.max_price} />
                    <input type="hidden" name="view" value={viewMode} />
                    <select id="sortSelect" name="sort" defaultValue={filters.sort} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                      <option value="newest">Terbaru</option>
                      <option value="price_low">Harga Terendah</option>
                      <option value="price_high">Harga Tertinggi</option>
                      <option value="rating">Rating Tertinggi</option>
                    </select>
                    <button type="submit" className="sr-only">Sort</button>
                  </form>
                </div>
              </div>

              {result.services.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Tidak ada layanan ditemukan</h3>
                  <p className="mt-1 text-gray-500">Coba ubah kata kunci atau filter pencarian Anda</p>
                  <div className="mt-6">
                    <a href="/search" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Cari Lagi
                    </a>
                  </div>
                </div>
              ) : (
                <div className={viewMode === "grid" ? "grid gap-6 grid-cols-1 md:grid-cols-2" : "space-y-6"}>
                  {result.services.map((service) => (
                    <div key={service.id} className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border overflow-hidden ${viewMode === "list" ? "flex flex-col md:flex-row" : ""}`}>
                      <div className={`${viewMode === "list" ? "md:w-1/3 h-48" : "h-48"} relative`}>
                        <img src={imagePath(service.image)} alt={service.title} className={`w-full h-full object-cover ${viewMode === "list" ? "md:rounded-l-lg" : "rounded-t-lg"}`} />
                      </div>

                      <div className={`p-4 flex-1 ${viewMode === "list" ? "md:border-l border-gray-200" : ""}`}>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-blue-600 text-sm font-medium">{service.category_name}</span>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${star <= Math.round(service.avg_rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-1 text-sm font-semibold">{service.avg_rating.toFixed(1)}</span>
                            <span className="text-gray-500 text-sm ml-1">({service.reviews_count})</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {service.description.slice(0, viewMode === "list" ? 200 : 100)}
                          {service.description.length > (viewMode === "list" ? 200 : 100) ? "..." : ""}
                        </p>
                        <div className="flex items-center text-gray-500 text-sm mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {service.location || "Lokasi tidak tersedia"}
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-green-600 font-bold">{formatCurrency(service.price)}</div>
                            <div className="text-blue-600 text-sm font-medium mt-1">Tersedia Hari Ini</div>
                          </div>
                          <a href={`/service_detail?id=${service.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Lihat Detail
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {result.totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    {page > 1 && (
                      <a href={`/search${buildQuery({ ...filters, page: page - 1 })}`} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Sebelumnya
                      </a>
                    )}
                    {Math.max(1, page - 2) > 1 && (
                      <>
                        <a href={`/search${buildQuery({ ...filters, page: 1 })}`} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">1</a>
                        {Math.max(1, page - 2) > 2 && <span className="px-2 py-2 text-gray-500">...</span>}
                      </>
                    )}
                    {Array.from({ length: Math.min(result.totalPages, page + 2) - Math.max(1, page - 2) + 1 }, (_, index) => Math.max(1, page - 2) + index).map((pageNumber) => (
                      <a key={pageNumber} href={`/search${buildQuery({ ...filters, page: pageNumber })}`} className={`px-4 py-2 rounded-lg ${pageNumber === page ? "bg-blue-600 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                        {pageNumber}
                      </a>
                    ))}
                    {Math.min(result.totalPages, page + 2) < result.totalPages && (
                      <>
                        {Math.min(result.totalPages, page + 2) < result.totalPages - 1 && <span className="px-2 py-2 text-gray-500">...</span>}
                        <a href={`/search${buildQuery({ ...filters, page: result.totalPages })}`} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">{result.totalPages}</a>
                      </>
                    )}
                    {page < result.totalPages && (
                      <a href={`/search${buildQuery({ ...filters, page: page + 1 })}`} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center">
                        Selanjutnya
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageChrome>
  );
}
