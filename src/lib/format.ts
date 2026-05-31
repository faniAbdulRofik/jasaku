import type { BookingStatus } from "./types";

export function formatCurrency(value: number | string | null | undefined) {
  const numberValue = Number(value ?? 0);
  return `Rp ${new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(numberValue)}`;
}

export function formatNumber(value: number | string | null | undefined) {
  return new Intl.NumberFormat("id-ID").format(Number(value ?? 0));
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return `${formatDate(value)} ${new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)}`;
}

export function normalizeTime(value: string | null | undefined) {
  if (!value) return "-";
  return value.slice(0, 5);
}

export function imagePath(image: string | null | undefined, fallback = "default-service.jpg") {
  if (image?.startsWith("http") || image?.startsWith("/")) return image;
  return `/assets/images/${image || fallback}`;
}

export function profilePath(image: string | null | undefined) {
  if (image?.startsWith("http") || image?.startsWith("/")) return image;
  return `/assets/images/${image || "default-profile.jpg"}`;
}

export function statusClass(status: BookingStatus | string) {
  const classes: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-700",
    confirmed: "bg-green-50 text-green-700",
    in_progress: "bg-blue-50 text-blue-700",
    completed: "bg-purple-50 text-purple-700",
    cancelled: "bg-red-50 text-red-700",
    active: "bg-green-50 text-green-700",
    inactive: "bg-red-50 text-red-700",
  };

  return classes[status] || "bg-gray-100 text-gray-700";
}

export function statusText(status: BookingStatus | string) {
  const labels: Record<string, string> = {
    pending: "Menunggu",
    confirmed: "Dikonfirmasi",
    in_progress: "Berlangsung",
    completed: "Selesai",
    cancelled: "Dibatalkan",
    active: "Active",
    inactive: "Inactive",
  };

  return labels[status] || status;
}

export function buildQuery(params: Record<string, string | number | undefined | null>) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `?${query}` : "";
}
