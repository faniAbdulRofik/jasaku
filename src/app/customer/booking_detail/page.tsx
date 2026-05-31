import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { BookingDetailView } from "@/components/BookingDetailView";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getBookingById } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
function single(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }

export default async function CustomerBookingDetail({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "customer") redirect("/login?error=Anda harus login sebagai customer");

  const id = Number(single(params.id) || 0);
  const booking = await getBookingById(id);
  if (!booking || booking.customer_id !== session.id) redirect("/customer/bookings?error=Booking tidak ditemukan");

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="customer" active="/customer/bookings" title="Customer Dashboard">
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 md:p-5">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
                <i className="fas fa-calendar-alt mr-2 text-blue-600" />
                Detail Booking #{String(booking.id).padStart(4, "0")}
              </h1>
              <p className="text-sm text-gray-500 mt-1">Detail lengkap pesanan layanan Anda</p>
            </div>
          </div>
        </div>
        <BookingDetailView booking={booking} role="customer" backHref="/customer/bookings" />
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
