export type UserRole = "customer" | "provider" | "admin";

export type UserStatus = "active" | "inactive";

export type ServiceStatus = "active" | "inactive";

export type BookingStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

export type PaymentStatus = "pending" | "paid" | "refunded";

export type SessionUser = {
  id: number;
  username: string | null;
  email: string;
  full_name: string;
  role: UserRole;
  profile_image: string | null;
};

export type User = SessionUser & {
  phone: string | null;
  address: string | null;
  status: UserStatus;
  password?: string;
  created_at: string | null;
  updated_at: string | null;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  status: ServiceStatus;
  created_at: string | null;
  updated_at: string | null;
};

export type Service = {
  id: number;
  provider_id: number;
  category_id: number;
  title: string;
  slug: string | null;
  description: string;
  price: number;
  duration: string | null;
  price_type: string;
  location: string;
  image: string | null;
  status: ServiceStatus;
  rating: number;
  total_reviews: number;
  total_bookings: number;
  created_at: string | null;
  updated_at: string | null;
};

export type ServiceWithMeta = Service & {
  provider_name: string;
  provider_image: string | null;
  category_name: string;
  category_icon: string | null;
  avg_rating: number;
  reviews_count: number;
};

export type Booking = {
  id: number;
  booking_code: string | null;
  customer_id: number;
  provider_id: number;
  service_id: number;
  booking_date: string;
  booking_time: string;
  notes: string | null;
  total_price: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  payment_method: string | null;
  completed_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type BookingWithMeta = Booking & {
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string | null;
  provider_name?: string;
  provider_email?: string;
  provider_phone?: string | null;
  service_title?: string;
  service_description?: string;
  service_duration?: string | null;
  service_image?: string | null;
};

export type Review = {
  id: number;
  booking_id: number;
  customer_id: number;
  provider_id: number;
  service_id: number;
  rating: number;
  comment: string | null;
  status: ServiceStatus;
  created_at: string | null;
  updated_at: string | null;
};

export type ReviewWithMeta = Review & {
  customer_name?: string;
  customer_image?: string | null;
  service_title?: string;
  provider_name?: string;
};

export type BookingStats = {
  total_bookings: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  total_earnings: number;
};
