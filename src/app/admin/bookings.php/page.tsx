import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { BookingTable } from "@/components/BookingTable";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getAllBookings } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function AdminBookings({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await getSessionUser();
  if (!session || session.role !== "admin") redirect("/login.php?error=Anda tidak memiliki akses admin");
  const bookings = await getAllBookings();
  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="admin" active="/admin/bookings.php" title="Admin Dashboard">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h1 className="text-lg font-semibold text-gray-800">Manage Bookings</h1>
          </div>
          <BookingTable bookings={bookings} role="admin" returnTo="/admin/bookings.php" />
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
