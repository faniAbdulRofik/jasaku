import { PageChrome } from "@/components/PageChrome";
import { getCategories, getFeaturedServices, getHomeStats, getLatestReviews } from "@/lib/data";
import { formatCurrency, formatNumber, imagePath, profilePath } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [stats, categories, featuredServices, reviews] = await Promise.all([
    getHomeStats(),
    getCategories(),
    getFeaturedServices(6),
    getLatestReviews(3),
  ]);
  const heroStats = {
    total_providers: stats.total_providers,
    total_customers: stats.total_customers,
    total_categories: categories.length,
  };

  const categoryExamples = [
    { name: "Jasa Rumah", icon: "fas fa-home", count: "1,200+", color: "bg-blue-500" },
    { name: "Teknologi", icon: "fas fa-laptop-code", count: "800+", color: "bg-green-500" },
    { name: "Kesehatan", icon: "fas fa-heartbeat", count: "600+", color: "bg-yellow-500" },
    { name: "Pendidikan", icon: "fas fa-graduation-cap", count: "400+", color: "bg-red-500" },
    { name: "Event", icon: "fas fa-calendar-alt", count: "300+", color: "bg-purple-500" },
    { name: "Reparasi", icon: "fas fa-tools", count: "500+", color: "bg-pink-500" },
  ];

  return (
    <PageChrome>
      <section
        className="relative text-white min-h-screen flex items-center w-full"
        style={{ background: "linear-gradient(135deg, #2563eb 0%, #9333ea 55%, #4338ca 100%)" }}
        data-aos="fade-in"
      >
        <div className="absolute inset-0 bg-black opacity-20" />
        <div className="relative w-full px-4 mx-auto">
          <div className="text-center mb-12 w-full" data-aos="fade-up" data-aos-delay="100">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Temukan Jasa Terbaik
              <br />
              <span className="text-yellow-400">Di Sekitar Anda</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 mx-auto max-w-3xl">
              Platform terpercaya untuk menghubungkan Anda dengan ribuan penyedia jasa profesional
            </p>
          </div>

          <div className="w-full mx-auto" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-white rounded-2xl shadow-2xl p-4 w-full max-w-4xl mx-auto">
              <form id="searchForm" action="/search" method="GET" className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex-1 relative">
                  <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="text" name="keyword" placeholder="Cari jasa apa yang Anda butuhkan?" className="w-full pl-12 pr-4 py-3 text-gray-700 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                </div>
                <div className="flex-1 relative">
                  <i className="fas fa-map-marker-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="text" name="location" placeholder="Dimana lokasi Anda?" className="w-full pl-12 pr-4 py-3 text-gray-700 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                </div>
                <button
                  type="submit"
                  className="text-white px-7 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                  style={{ background: "linear-gradient(90deg, #2563eb 0%, #9333ea 100%)" }}
                >
                  Cari Sekarang
                </button>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 w-full px-4 max-w-7xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">{formatNumber(heroStats.total_providers)}+</div>
              <div className="text-blue-100">Penyedia Jasa</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">{formatNumber(heroStats.total_customers)}+</div>
              <div className="text-blue-100">Pelanggan Puas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">{heroStats.total_categories}+</div>
              <div className="text-blue-100">Kategori Jasa</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">4.9</div>
              <div className="text-blue-100">Rating Rata-rata</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white w-full">
        <div className="w-full px-4 mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kategori Populer</h2>
            <p className="text-xl text-gray-600 max-w-2xl">Temukan berbagai jasa profesional yang Anda butuhkan</p>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 w-full max-w-6xl">
              {categoryExamples.map((category, index) => (
                <a key={category.name} href="#" className="group flex flex-col items-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]" data-aos="zoom-in" data-aos-delay={index * 100} data-aos-duration="600">
                  <div className={`${category.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                    <i className={`${category.icon} text-white text-2xl`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 text-center">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} jasa</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-10 bg-gray-50 w-full">
        <div className="w-full px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16 w-full" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cara Kerja</h2>
            <p className="text-xl text-gray-600 mx-auto">Dapatkan jasa yang Anda butuhkan hanya dalam 3 langkah mudah</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              ["from-blue-500 to-purple-600", "fa-search", "1. Cari Jasa", "Cari jasa yang Anda butuhkan dengan mudah menggunakan fitur pencarian dan filter"],
              ["from-green-500 to-teal-600", "fa-calendar-check", "2. Booking Online", "Pilih tanggal dan waktu yang sesuai, lalu lakukan booking dengan sistem yang aman"],
              ["from-orange-500 to-red-600", "fa-thumbs-up", "3. Nikmati Layanan", "Provider profesional akan datang sesuai jadwal dan memberikan layanan terbaik"],
            ].map(([gradient, icon, title, text], index) => (
              <div key={title} className="text-center group w-full" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                <div className={`bg-gradient-to-br ${gradient} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${icon} text-white text-2xl`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white w-full">
        <div className="w-full px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-8 w-full" data-aos="fade-up">
            <div className="w-full md:w-auto mb-3 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">Layanan Unggulan</h2>
              <p className="text-lg text-gray-600">Penyedia jasa terbaik dengan rating tertinggi</p>
            </div>
            <a
              href="/search"
              className="group relative z-10 mt-2 md:mt-0 inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              <span>LIHAT SEMUA</span>
              <i className="fas fa-chevron-right ml-2 text-sm transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {featuredServices.map((service, index) => (
              <a key={service.id} href={`/service_detail?id=${service.id}`} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] overflow-hidden border border-gray-100 w-full relative transform hover:-translate-y-2 hover:scale-[1.03] will-change-transform" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                <div className="relative w-full h-48 overflow-hidden z-10">
                  <img src={imagePath(service.image)} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 z-20">
                    <i className="fas fa-check-circle w-3 h-3" />
                    <span>Verified</span>
                  </div>
                </div>
                <div className="p-6 w-full relative z-10 bg-white/90 group-hover:bg-white transition-all duration-300">
                  <div className="flex items-center justify-between mb-2 w-full">
                    <span className="text-sm text-blue-600 font-medium">{service.category_name}</span>
                    <div className="flex items-center space-x-1">
                      <i className="fas fa-star text-yellow-400 w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">{service.avg_rating.toFixed(1)}</span>
                      <span className="text-sm text-gray-500">({service.reviews_count})</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 text-lg transform group-hover:translate-x-1">{service.title}</h3>
                  <p className="text-lg font-bold text-green-600 transform group-hover:translate-x-1 transition-transform duration-300">Mulai {formatCurrency(service.price)}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-10 bg-gradient-to-br from-blue-50 to-purple-50 w-full">
        <div className="w-full px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16 w-full" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kata Pelanggan Kami</h2>
            <p className="text-xl text-gray-600 mx-auto">Dengarkan pengalaman pelanggan yang telah menggunakan layanan kami</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {reviews.map((review: any, index) => (
              <div key={review.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow w-full" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i key={star} className={`fas fa-star ${star <= Number(review.rating) ? "text-yellow-400" : "text-gray-300"} w-5 h-5`} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&quot;{review.comment}&quot;</p>
                <div className="flex items-center space-x-4">
                  <img src={profilePath(review.customer_image)} alt={review.customer_name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.customer_name}</h4>
                    <p className="text-sm text-gray-500">Service: {review.service_title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full" data-aos="fade-in">
        <div className="w-full px-4 text-center max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-yellow font-bold mb-6">Siap Memulai?</h2>
          <p className="text-xl text-blue-100 mb-8 mx-auto">Bergabunglah dengan ribuan pelanggan yang telah merasakan kemudahan menggunakan BookingJasa</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full" data-aos="fade-up" data-aos-delay="100">
            <a href="/register?role=customer" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">Daftar Sebagai Pelanggan</a>
            <a href="/register?role=provider" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105">Daftar Sebagai Provider</a>
          </div>
        </div>
      </section>
    </PageChrome>
  );
}
