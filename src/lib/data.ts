import { supabaseAdmin } from "./supabase";
import type {
  Booking,
  BookingStats,
  BookingWithMeta,
  Category,
  ReviewWithMeta,
  ServiceWithMeta,
  User,
} from "./types";

function one<T>(value: T | T[] | null | undefined): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

function numberValue(value: unknown) {
  return Number(value ?? 0);
}

function normalizeService(row: any, reviewMap?: Map<number, { avg: number; count: number }>): ServiceWithMeta {
  const category = one<any>(row.category || row.categories);
  const provider = one<any>(row.provider || row.users);
  const review = reviewMap?.get(Number(row.id));

  return {
    id: Number(row.id),
    provider_id: Number(row.provider_id),
    category_id: Number(row.category_id),
    title: row.title || "",
    slug: row.slug || null,
    description: row.description || "",
    price: numberValue(row.price),
    duration: row.duration || null,
    price_type: row.price_type || "fixed",
    location: row.location || "",
    image: row.image || "default-service.jpg",
    status: row.status || "active",
    rating: numberValue(row.rating),
    total_reviews: Number(row.total_reviews ?? review?.count ?? 0),
    total_bookings: Number(row.total_bookings ?? 0),
    created_at: row.created_at || null,
    updated_at: row.updated_at || null,
    provider_name: provider?.full_name || "Provider",
    provider_image: provider?.profile_image || "default-profile.jpg",
    category_name: category?.name || "Kategori",
    category_icon: category?.icon || "fas fa-concierge-bell",
    avg_rating: Number(row.avg_rating ?? review?.avg ?? row.rating ?? 0),
    reviews_count: Number(row.reviews_count ?? review?.count ?? row.total_reviews ?? 0),
  };
}

function normalizeBooking(row: any): BookingWithMeta {
  const service = one<any>(row.service || row.services);
  const customer = one<any>(row.customer);
  const provider = one<any>(row.provider);

  return {
    id: Number(row.id),
    booking_code: row.booking_code || null,
    customer_id: Number(row.customer_id),
    provider_id: Number(row.provider_id),
    service_id: Number(row.service_id),
    booking_date: row.booking_date,
    booking_time: row.booking_time,
    notes: row.notes || null,
    total_price: numberValue(row.total_price),
    status: row.status || "pending",
    payment_status: row.payment_status || "pending",
    payment_method: row.payment_method || null,
    completed_at: row.completed_at || null,
    created_at: row.created_at || null,
    updated_at: row.updated_at || null,
    customer_name: customer?.full_name,
    customer_email: customer?.email,
    customer_phone: customer?.phone,
    provider_name: provider?.full_name,
    provider_email: provider?.email,
    provider_phone: provider?.phone,
    service_title: service?.title,
    service_description: service?.description,
    service_duration: service?.duration,
    service_image: service?.image || "default-service.jpg",
  };
}

async function getReviewMap(serviceIds: number[]) {
  const supabase = supabaseAdmin();
  const reviewMap = new Map<number, { avg: number; count: number }>();

  if (!supabase || serviceIds.length === 0) {
    return reviewMap;
  }

  const { data } = await supabase
    .from("reviews")
    .select("service_id,rating")
    .eq("status", "active")
    .in("service_id", serviceIds);

  (data || []).forEach((review: any) => {
    const serviceId = Number(review.service_id);
    const current = reviewMap.get(serviceId) || { avg: 0, count: 0 };
    const total = current.avg * current.count + Number(review.rating || 0);
    current.count += 1;
    current.avg = current.count ? total / current.count : 0;
    reviewMap.set(serviceId, current);
  });

  return reviewMap;
}

async function attachServiceMeta(rows: any[]) {
  const reviewMap = await getReviewMap(rows.map((row) => Number(row.id)));
  return rows.map((row) => normalizeService(row, reviewMap));
}

export async function getCategories() {
  const supabase = supabaseAdmin();
  if (!supabase) return [] as Category[];

  const { data } = await supabase.from("categories").select("*").eq("status", "active").order("name");
  return (data || []) as Category[];
}

export async function getAllCategories() {
  const supabase = supabaseAdmin();
  if (!supabase) return [] as Category[];

  const { data } = await supabase.from("categories").select("*").order("name");
  return (data || []) as Category[];
}

export type AdminCategoryRow = Category & {
  service_count: number;
};

export async function getAdminCategoriesPage(search = "", page = 1, limit = 10) {
  const supabase = supabaseAdmin();
  if (!supabase) {
    return {
      categories: [] as AdminCategoryRow[],
      totalRecords: 0,
      totalPages: 0,
      page: 1,
      limit,
    };
  }

  const [{ data: categoriesData }, { data: servicesData }] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase.from("services").select("category_id"),
  ]);

  const counts = new Map<number, number>();
  (servicesData || []).forEach((service: any) => {
    const categoryId = Number(service.category_id);
    counts.set(categoryId, (counts.get(categoryId) || 0) + 1);
  });

  const keyword = search.toLowerCase();
  const rows = ((categoriesData || []) as Category[])
    .map((category) => ({
      ...category,
      service_count: counts.get(Number(category.id)) || 0,
    }))
    .filter((category) => {
      if (!keyword) return true;
      return (
        category.name.toLowerCase().includes(keyword) ||
        (category.description || "").toLowerCase().includes(keyword)
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const safePage = Math.max(1, page);
  const totalRecords = rows.length;
  const totalPages = Math.ceil(totalRecords / limit);
  const offset = (safePage - 1) * limit;

  return {
    categories: rows.slice(offset, offset + limit),
    totalRecords,
    totalPages,
    page: safePage,
    limit,
  };
}

export async function getHomeStats() {
  const supabase = supabaseAdmin();
  if (!supabase) {
    return { total_providers: 0, total_services: 0, total_bookings: 0, total_customers: 0 };
  }

  const [providers, services, bookings, customers] = await Promise.all([
    supabase.from("users").select("id", { count: "exact", head: true }).eq("role", "provider").eq("status", "active"),
    supabase.from("services").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "completed"),
    supabase.from("users").select("id", { count: "exact", head: true }).eq("role", "customer").eq("status", "active"),
  ]);

  return {
    total_providers: providers.count || 1,
    total_services: services.count || 0,
    total_bookings: bookings.count || 0,
    total_customers: customers.count || 0,
  };
}

export async function getFeaturedServices(limit = 6) {
  const supabase = supabaseAdmin();
  if (!supabase) return [] as ServiceWithMeta[];

  const { data } = await supabase
    .from("services")
    .select("*, category:categories(name,icon), provider:users!services_provider_id_fkey(full_name,profile_image)")
    .eq("status", "active")
    .order("rating", { ascending: false })
    .order("total_reviews", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (!data || data.length === 0) return [] as ServiceWithMeta[];
  return attachServiceMeta(data || []);
}

export type SearchFilters = {
  keyword?: string;
  location?: string;
  category?: string;
  min_price?: string;
  max_price?: string;
  sort?: string;
  view?: string;
};

export async function searchServices(filters: SearchFilters, page = 1, limit = 12) {
  const supabase = supabaseAdmin();
  if (!supabase) {
    return { services: [] as ServiceWithMeta[], total: 0, totalPages: 0 };
  }

  const offset = (Math.max(1, page) - 1) * limit;
  let query = supabase
    .from("services")
    .select("*, category:categories(name,icon), provider:users!services_provider_id_fkey(full_name,profile_image)", { count: "exact" })
    .eq("status", "active");

  if (filters.keyword) {
    const keyword = filters.keyword.replaceAll(",", " ");
    query = query.or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`);
  }

  if (filters.location) {
    query = query.ilike("location", `%${filters.location}%`);
  }

  if (filters.category) {
    query = query.eq("category_id", Number(filters.category));
  }

  if (filters.min_price) {
    query = query.gte("price", Number(filters.min_price));
  }

  if (filters.max_price) {
    query = query.lte("price", Number(filters.max_price));
  }

  if (filters.sort === "price_low") {
    query = query.order("price", { ascending: true });
  } else if (filters.sort === "price_high") {
    query = query.order("price", { ascending: false });
  } else if (filters.sort === "rating") {
    query = query.order("rating", { ascending: false }).order("total_reviews", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data, count } = await query.range(offset, offset + limit - 1);
  const total = count || 0;

  if (!data || data.length === 0) {
    return { services: [] as ServiceWithMeta[], total: 0, totalPages: 0 };
  }

  return {
    services: await attachServiceMeta(data || []),
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getServiceDetail(id: number) {
  const supabase = supabaseAdmin();
  if (!id) return null;
  if (!supabase) return null;

  const { data } = await supabase
    .from("services")
    .select("*, category:categories(name,icon), provider:users!services_provider_id_fkey(full_name,profile_image,email,phone)")
    .eq("id", id)
    .maybeSingle();

  if (!data) return null;

  const [service] = await attachServiceMeta([data]);
  const [reviews, providerServices, validBookings] = await Promise.all([
    getReviewsByService(id, 5),
    getProviderServices(Number(data.provider_id), 1, 12),
    supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("service_id", id)
      .in("status", ["pending", "confirmed", "completed"]),
  ]);

  return {
    service: {
      ...service,
      total_bookings: validBookings.count || service.total_bookings || 0,
    },
    reviews,
    reviewStats: getReviewStats(reviews),
    providerServices,
  };
}

export async function getProviderServices(providerId: number, page = 1, limit = 10) {
  const supabase = supabaseAdmin();
  if (!supabase) return [] as ServiceWithMeta[];

  const offset = (Math.max(1, page) - 1) * limit;
  const { data } = await supabase
    .from("services")
    .select("*, category:categories(name,icon), provider:users!services_provider_id_fkey(full_name,profile_image)")
    .eq("provider_id", providerId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (!data || data.length === 0) return [] as ServiceWithMeta[];
  return attachServiceMeta(data || []);
}

export async function getReviewsByService(serviceId: number, limit = 50) {
  const supabase = supabaseAdmin();
  if (!supabase) return [] as ReviewWithMeta[];

  const { data } = await supabase
    .from("reviews")
    .select("*, customer:users!reviews_customer_id_fkey(full_name,profile_image), service:services(title), provider:users!reviews_provider_id_fkey(full_name)")
    .eq("service_id", serviceId)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (!data || data.length === 0) return [] as ReviewWithMeta[];

  return (data || []).map((row: any) => {
    const customer = one<any>(row.customer);
    const service = one<any>(row.service);
    const provider = one<any>(row.provider);
    return {
      ...row,
      id: Number(row.id),
      rating: Number(row.rating || 0),
      customer_name: customer?.full_name || "Customer",
      customer_image: customer?.profile_image || "default-profile.jpg",
      service_title: service?.title,
      provider_name: provider?.full_name,
    };
  });
}

export async function getLatestReviews(limit = 3) {
  const supabase = supabaseAdmin();
  if (!supabase) return [] as ReviewWithMeta[];

  const { data } = await supabase
    .from("reviews")
    .select("*, customer:users!reviews_customer_id_fkey(full_name,profile_image), service:services(title), provider:users!reviews_provider_id_fkey(full_name)")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (!data || data.length === 0) return [] as ReviewWithMeta[];

  return (data || []).map((row: any) => {
    const customer = one<any>(row.customer);
    const service = one<any>(row.service);
    const provider = one<any>(row.provider);
    return {
      ...row,
      id: Number(row.id),
      rating: Number(row.rating || 0),
      customer_name: customer?.full_name || "Customer",
      customer_image: customer?.profile_image || "default-profile.jpg",
      service_title: service?.title,
      provider_name: provider?.full_name,
    };
  });
}

export function getReviewStats(reviews: ReviewWithMeta[]) {
  const stats: Record<string, number> = {
    total_reviews: reviews.length,
    avg_rating: 0,
    rating_1: 0,
    rating_2: 0,
    rating_3: 0,
    rating_4: 0,
    rating_5: 0,
  };

  let total = 0;
  reviews.forEach((review) => {
    const rating = Number(review.rating || 0);
    total += rating;
    stats[`rating_${rating}`] = (stats[`rating_${rating}`] || 0) + 1;
  });
  stats.avg_rating = reviews.length ? total / reviews.length : 0;

  return stats;
}

export async function getBookingStats(userId: number, role: "customer" | "provider" | "admin") {
  const supabase = supabaseAdmin();
  const stats: BookingStats = {
    total_bookings: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    total_earnings: 0,
  };

  if (!supabase) return stats;

  let query = supabase.from("bookings").select("*");
  if (role === "customer") query = query.eq("customer_id", userId);
  if (role === "provider") query = query.eq("provider_id", userId);

  const { data } = await query;
  (data || []).forEach((booking: Booking) => {
    stats.total_bookings += 1;
    if (booking.status === "pending") stats.pending += 1;
    if (booking.status === "confirmed") stats.confirmed += 1;
    if (booking.status === "completed") {
      stats.completed += 1;
      stats.total_earnings += Number(booking.total_price || 0);
    }
    if (booking.status === "cancelled") stats.cancelled += 1;
  });

  return stats;
}

export async function getBookingsForUser(userId: number, role: "customer" | "provider", status = "", page = 1, limit = 10) {
  const supabase = supabaseAdmin();
  if (!supabase) return [] as BookingWithMeta[];

  const offset = (Math.max(1, page) - 1) * limit;
  let query = supabase
    .from("bookings")
    .select(
      "*, service:services(title,description,duration,image), customer:users!bookings_customer_id_fkey(full_name,email,phone), provider:users!bookings_provider_id_fkey(full_name,email,phone)",
    )
    .order(role === "provider" ? "booking_date" : "created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  query = role === "customer" ? query.eq("customer_id", userId) : query.eq("provider_id", userId);
  if (status) query = query.eq("status", status);

  const { data } = await query;
  return (data || []).map(normalizeBooking);
}

export async function getCompletedBookingsWithoutReview(customerId: number) {
  const supabase = supabaseAdmin();
  if (!supabase) return [] as BookingWithMeta[];

  const { data: reviews } = await supabase.from("reviews").select("booking_id").eq("customer_id", customerId);
  const reviewedIds = (reviews || []).map((review: any) => Number(review.booking_id));

  let query = supabase
    .from("bookings")
    .select(
      "*, service:services(title,description,duration,image), customer:users!bookings_customer_id_fkey(full_name,email,phone), provider:users!bookings_provider_id_fkey(full_name,email,phone)",
    )
    .eq("customer_id", customerId)
    .eq("status", "completed")
    .order("created_at", { ascending: false });

  if (reviewedIds.length > 0) {
    query = query.not("id", "in", `(${reviewedIds.join(",")})`);
  }

  const { data } = await query;
  return (data || []).map(normalizeBooking);
}

export async function getBookingById(id: number) {
  const supabase = supabaseAdmin();
  if (!supabase) return null;

  const { data } = await supabase
    .from("bookings")
    .select(
      "*, service:services(title,description,duration,image), customer:users!bookings_customer_id_fkey(full_name,email,phone), provider:users!bookings_provider_id_fkey(full_name,email,phone)",
    )
    .eq("id", id)
    .maybeSingle();

  return data ? normalizeBooking(data) : null;
}

export async function getReviewsForUser(userId: number, role: "customer" | "provider") {
  const supabase = supabaseAdmin();
  if (!supabase) return [] as ReviewWithMeta[];

  let query = supabase
    .from("reviews")
    .select("*, customer:users!reviews_customer_id_fkey(full_name,profile_image), service:services(title), provider:users!reviews_provider_id_fkey(full_name)")
    .order("created_at", { ascending: false });

  query = role === "customer" ? query.eq("customer_id", userId) : query.eq("provider_id", userId);
  const { data } = await query;

  return (data || []).map((row: any) => {
    const customer = one<any>(row.customer);
    const service = one<any>(row.service);
    const provider = one<any>(row.provider);
    return {
      ...row,
      id: Number(row.id),
      rating: Number(row.rating || 0),
      customer_name: customer?.full_name || "Customer",
      customer_image: customer?.profile_image || "default-profile.jpg",
      service_title: service?.title,
      provider_name: provider?.full_name,
    };
  });
}

export async function getUsers(role = "") {
  const supabase = supabaseAdmin();
  if (!supabase) return [] as User[];

  let query = supabase.from("users").select("*").order("created_at", { ascending: false });
  if (role) query = query.eq("role", role);

  const { data } = await query;
  return (data || []) as User[];
}

export async function getUserById(id: number) {
  const supabase = supabaseAdmin();
  if (!supabase) return null;

  const { data } = await supabase.from("users").select("*").eq("id", id).maybeSingle();
  return data as User | null;
}

export async function getAllServices() {
  const supabase = supabaseAdmin();
  if (!supabase) return [] as ServiceWithMeta[];

  const { data } = await supabase
    .from("services")
    .select("*, category:categories(name,icon), provider:users!services_provider_id_fkey(full_name,profile_image)")
    .order("created_at", { ascending: false });

  return attachServiceMeta(data || []);
}

export async function getAllBookings() {
  const supabase = supabaseAdmin();
  if (!supabase) return [] as BookingWithMeta[];

  const { data } = await supabase
    .from("bookings")
    .select(
      "*, service:services(title,description,duration,image), customer:users!bookings_customer_id_fkey(full_name,email,phone), provider:users!bookings_provider_id_fkey(full_name,email,phone)",
    )
    .order("created_at", { ascending: false });

  return (data || []).map(normalizeBooking);
}

export async function getAdminStats() {
  const supabase = supabaseAdmin();
  if (!supabase) {
    return {
      total_users: 0,
      total_services: 0,
      total_bookings: 0,
      total_revenue: 0,
      user_roles: {} as Record<string, number>,
      booking_status: {} as Record<string, number>,
      recent_activities: [] as Array<{ type: string; title: string; created_at: string | null; description: string }>,
      monthly_bookings: [] as Array<{ label: string; bookings: number }>,
      daily_bookings: [] as Array<{ label: string; bookings: number }>,
    };
  }

  const [usersResult, servicesResult, bookingsResult] = await Promise.all([
    supabase.from("users").select("*"),
    supabase.from("services").select("*"),
    supabase.from("bookings").select("*"),
  ]);

  const users = usersResult.data || [];
  const services = servicesResult.data || [];
  const bookings = bookingsResult.data || [];
  const userRoles: Record<string, number> = {};
  const bookingStatus: Record<string, number> = {};
  const monthly = new Map<string, number>();
  const daily = new Map<string, number>();

  users.forEach((user: any) => {
    userRoles[user.role] = (userRoles[user.role] || 0) + 1;
  });

  bookings.forEach((booking: any) => {
    bookingStatus[booking.status] = (bookingStatus[booking.status] || 0) + 1;
    if (booking.created_at) {
      const created = new Date(booking.created_at);
      const month = created.toLocaleString("id-ID", { month: "short", year: "numeric" });
      const day = created.toLocaleString("id-ID", { day: "2-digit", month: "short" });
      monthly.set(month, (monthly.get(month) || 0) + 1);
      daily.set(day, (daily.get(day) || 0) + 1);
    }
  });

  const recentActivities = [
    ...users.map((user: any) => ({ type: "user", title: user.full_name, created_at: user.created_at, description: "Pengguna baru mendaftar" })),
    ...services.map((service: any) => ({ type: "service", title: service.title, created_at: service.created_at, description: "Layanan baru ditambahkan" })),
    ...bookings.map((booking: any) => ({ type: "booking", title: `Booking #${booking.id}`, created_at: booking.created_at, description: "Booking baru dibuat" })),
  ]
    .filter((item) => item.created_at)
    .sort((a, b) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime())
    .slice(0, 10);

  return {
    total_users: users.length,
    total_services: services.length,
    total_bookings: bookings.length,
    total_revenue: bookings.filter((booking: any) => booking.status === "completed").reduce((sum: number, booking: any) => sum + Number(booking.total_price || 0), 0),
    user_roles: userRoles,
    booking_status: bookingStatus,
    recent_activities: recentActivities,
    monthly_bookings: [...monthly.entries()].map(([label, count]) => ({ label, bookings: count })),
    daily_bookings: [...daily.entries()].map(([label, count]) => ({ label, bookings: count })),
  };
}
