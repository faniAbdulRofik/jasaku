import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { BookingTable } from "@/components/BookingTable";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getBookingsForUser } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
function single(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }

export default async function CustomerBookings({ searchParams }: PageProps) {
  const params = await searchParams;
  const user = await getSessionUser();
  if (!user || user.role !== "customer") redirect("/login.php?error=Anda harus login sebagai customer");
  const status = single(params.status) || "";
  const bookings = await getBookingsForUser(user.id, "customer", status, 1, 50);

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="customer" active="/customer/bookings.php" title="Customer Dashboard">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h1 className="text-lg font-semibold text-gray-800">My Bookings</h1>
            <form method="GET" action="/customer/bookings.php">
              <select name="status" defaultValue={status} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option value="">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button type="submit" className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Filter</button>
            </form>
          </div>
          <BookingTable bookings={bookings} role="customer" returnTo="/customer/bookings.php" />
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
