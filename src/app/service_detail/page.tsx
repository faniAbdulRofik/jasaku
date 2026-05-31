import { PageChrome } from "@/components/PageChrome";
import { createBookingAction } from "@/lib/actions";
import { getServiceDetail } from "@/lib/data";
import { formatCurrency, formatDate, imagePath, profilePath } from "@/lib/format";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

type ServiceDetailProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ServiceDetailPage({ searchParams }: ServiceDetailProps) {
  const params = await searchParams;
  const id = Number(single(params.id) || 0);
  const detail = await getServiceDetail(id);
  const user = await getSessionUser();

  if (!detail) {
    return (
      <PageChrome searchParams={params}>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">Layanan tidak ditemukan</h1>
              <a href="/search" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Kembali ke pencarian</a>
            </div>
          </div>
        </div>
      </PageChrome>
    );
  }

  const { service, reviews, reviewStats, providerServices } = detail;
  const otherServices = providerServices.filter((item) => item.id !== service.id);
  const providerAvgRating = providerServices.length
    ? providerServices.reduce((sum, item) => sum + Number(item.avg_rating || 0), 0) / providerServices.length
    : 0;
  const providerTotalBookings = providerServices.reduce((sum, item) => sum + Number(item.total_bookings || 0), 0);
  const responseTime = (service as any).response_time || "< 2 hours";
  const isVerified = Boolean((service as any).verified);
  const times = Array.from({ length: 13 }, (_, index) => `${String(index + 8).padStart(2, "0")}:00`);

  return (
    <PageChrome searchParams={params}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative flex-shrink-0">
                    <img src={imagePath(service.image)} alt={service.title} className="w-full md:w-64 h-64 object-cover rounded-xl" />
                    {isVerified && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                        <i className="fas fa-check-circle text-xs mr-1" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-sm text-blue-600 font-medium">
                          <i className={`${service.category_icon} mr-1`} />
                          {service.category_name}
                        </span>
                        <h1 className="text-2xl font-bold text-gray-900 mt-1">{service.title}</h1>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <i className="fas fa-heart text-xl" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <i className="fas fa-star text-yellow-400" />
                          <span className="font-semibold">{reviewStats.avg_rating.toFixed(1)}</span>
                        </div>
                        <span className="text-xs text-gray-500">{reviewStats.total_reviews} Reviews</span>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold mb-1">{service.total_bookings}</div>
                        <span className="text-xs text-gray-500">Bookings</span>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold mb-1">{service.duration || 0}</div>
                        <span className="text-xs text-gray-500">Minutes</span>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold mb-1 text-green-600">{responseTime}</div>
                        <span className="text-xs text-gray-500">Response</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-map-marker-alt text-gray-400" />
                        <span>{service.location}</span>
                      </div>
                      {isVerified && (
                        <div className="flex items-center space-x-1">
                          <i className="fas fa-shield-alt text-green-500" />
                          <span>Terverifikasi</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm mb-6">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    <button id="description-tab" className="py-4 px-1 border-b-2 font-medium text-sm border-blue-500 text-blue-600">Deskripsi</button>
                    <button id="reviews-tab" className="py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700">Ulasan</button>
                    <button id="provider-services-tab" className="py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700">Semua Layanan</button>
                    <button id="provider-ratings-tab" className="py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700">Semua Rating</button>
                  </nav>
                </div>

                <div className="p-6">
                  <div id="description-content" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Tentang Layanan Ini</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{service.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Tentang Provider</h3>
                      <div className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg">
                        <img src={profilePath(service.provider_image)} className="w-16 h-16 rounded-full object-cover border border-gray-200" alt={service.provider_name} />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{service.provider_name}</h4>
                          <p className="text-sm text-gray-500 mt-1">Provider Profesional</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <i className="fas fa-star text-yellow-400" />
                              <span>{providerAvgRating.toFixed(1)}</span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <i className="fas fa-check-circle text-green-500" />
                              <span>{providerTotalBookings} bookings</span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <i className="fas fa-concierge-bell text-blue-500" />
                              <span>{providerServices.length} layanan</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="reviews-content" className="hidden space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold">Ulasan ({reviewStats.total_reviews})</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <i className="fas fa-star text-yellow-400" />
                            <span className="font-semibold">{reviewStats.avg_rating.toFixed(1)}</span>
                          </div>
                          <span className="text-gray-500">dari {reviewStats.total_reviews} ulasan</span>
                        </div>
                      </div>
                    </div>

                    {reviews.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-center">
                              <div className="text-4xl font-bold text-primary mb-2">{reviewStats.avg_rating.toFixed(1)}</div>
                              <div className="flex justify-center mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <i key={star} className={`fas fa-star ${star <= Math.round(reviewStats.avg_rating) ? "text-yellow-400" : "text-gray-300"} mx-0.5`} />
                                ))}
                              </div>
                              <small className="text-gray-500">{reviewStats.total_reviews} ulasan</small>
                            </div>
                          </div>
                          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="space-y-3">
                              {[5, 4, 3, 2, 1].map((rating) => {
                                const count = Number(reviewStats[`rating_${rating}`] || 0);
                                const percentage = reviewStats.total_reviews > 0 ? (count / reviewStats.total_reviews) * 100 : 0;
                                return (
                                  <div key={rating} className="flex items-center">
                                    <span className="w-8 text-sm text-gray-500">{rating}<i className="fas fa-star text-yellow-400"> </i></span>
                                    <div className="flex-1 mx-2">
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                                      </div>
                                    </div>
                                    <span className="w-8 text-sm text-gray-500 text-right">{count}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {reviews.map((review) => (
                            <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                              <div className="flex items-start space-x-4">
                                <img src={profilePath(review.customer_image)} alt={review.customer_name} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-medium text-gray-900">{review.customer_name}</h5>
                                    <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                                  </div>
                                  <div className="flex items-center space-x-1 mb-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <i key={star} className={`fas fa-star ${star <= review.rating ? "text-yellow-400" : "text-gray-300"} text-sm`} />
                                    ))}
                                  </div>
                                  {review.comment && <p className="text-gray-700">{review.comment}</p>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
                          <i className="fas fa-star text-gray-400 text-xl" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Belum ada ulasan</h3>
                        <p className="text-gray-500">Jadilah yang pertama memberikan ulasan</p>
                      </div>
                    )}
                  </div>

                  <div id="provider-services-content" className="hidden">
                    <h3 className="text-lg font-semibold mb-4">Semua Layanan dari {service.provider_name}</h3>
                    {otherServices.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {otherServices.map((item) => (
                          <a key={item.id} href={`/service_detail?id=${item.id}`} className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                            <img src={imagePath(item.image)} className="w-16 h-16 rounded-lg object-cover border border-gray-200 mr-3" alt={item.title} />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                              <div className="flex items-center mt-1">
                                <span className="text-sm font-medium text-gray-900">{formatCurrency(item.price)}</span>
                                {item.avg_rating ? (
                                  <span className="ml-2 text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full flex items-center">
                                    <i className="fas fa-star text-yellow-500 mr-1 text-xs" />
                                    {item.avg_rating.toFixed(1)}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
                          <i className="fas fa-concierge-bell text-gray-400 text-xl" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Tidak ada layanan lainnya</h3>
                      </div>
                    )}
                  </div>

                  <div id="provider-ratings-content" className="hidden">
                    <h3 className="text-lg font-semibold mb-4">Semua Rating dari {service.provider_name}</h3>
                    {providerServices.length > 0 ? (
                      <div className="space-y-4">
                        {providerServices.map((item) => (
                          <div key={item.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <a href={`/service_detail?id=${item.id}`} className="text-blue-600 hover:text-blue-800 font-medium">{item.title}</a>
                                <div className="flex items-center mt-1">
                                  <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <i key={star} className={`fas fa-star text-xs ${star <= Math.round(item.avg_rating) ? "text-yellow-400" : "text-gray-300"}`} />
                                    ))}
                                  </div>
                                  <span className="ml-2 text-sm text-gray-500"><span className="font-semibold">{item.avg_rating.toFixed(1)}</span></span>
                                </div>
                              </div>
                              <div className="ml-4 text-right">
                                <span className="text-sm font-medium text-gray-900">{formatCurrency(item.price)}</span>
                                <div className="text-xs text-gray-500">{item.total_bookings} bookings</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
                          <i className="fas fa-star text-gray-400 text-xl" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Tidak ada rating lainnya</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Booking Sekarang</h3>
                {user?.role === "customer" ? (
                  <form action={createBookingAction} className="space-y-4">
                    <input type="hidden" name="service_id" value={service.id} />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                      <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" id="booking_date" name="booking_date" required min={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Waktu</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" id="booking_time" name="booking_time" required>
                        <option value="">Pilih waktu...</option>
                        {times.map((time) => <option key={time} value={time}>{time}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Catatan (Opsional)</label>
                      <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none" rows={3} id="notes" name="notes" placeholder="Tambahkan catatan khusus..." />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Harga Layanan:</span>
                        <span className="font-medium">{formatCurrency(service.price)}</span>
                      </div>
                      <hr className="border-gray-200" />
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span className="text-blue-600">{formatCurrency(service.price)}</span>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      <i className="fas fa-calendar-check mr-2" />Booking Sekarang
                    </button>
                  </form>
                ) : user ? (
                  <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-200">
                    <i className="fas fa-exclamation-triangle mr-2" />
                    Hanya customer yang dapat melakukan booking
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 mb-4">
                      <i className="fas fa-info-circle mr-2" />
                      Silakan login untuk melakukan booking
                    </div>
                    <div className="space-y-3">
                      <a href="/login" className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center">
                        <i className="fas fa-sign-in-alt mr-2" />Login
                      </a>
                      <a href="/register" className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center">
                        <i className="fas fa-user-plus mr-2" />Daftar
                      </a>
                    </div>
                  </>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Response time:</span>
                    <span className="font-medium">{responseTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <i className="fas fa-check-circle" />
                    <span>Garansi kepuasan 100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageChrome>
  );
}
