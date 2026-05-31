import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { ReviewList } from "@/components/ReviewList";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { saveReviewAction } from "@/lib/actions";
import { getCompletedBookingsWithoutReview, getReviewsForUser } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function CustomerReviews({ searchParams }: PageProps) {
  const params = await searchParams;
  const user = await getSessionUser();
  if (!user || user.role !== "customer") redirect("/login?error=Anda harus login sebagai customer");
  const [reviews, reviewable] = await Promise.all([getReviewsForUser(user.id, "customer"), getCompletedBookingsWithoutReview(user.id)]);

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="customer" active="/customer/reviews" title="Customer Dashboard">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h1 className="text-lg font-semibold text-gray-800">My Reviews</h1>
              </div>
              <div className="p-5">
                <ReviewList reviews={reviews} />
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Beri Review</h2>
              </div>
              <div className="p-5">
                {reviewable.length ? (
                  <form action={saveReviewAction} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Booking</label>
                      <select name="booking_id" className="w-full p-3 border border-gray-300 rounded-lg" required>
                        {reviewable.map((booking) => (
                          <option key={booking.id} value={booking.id}>{booking.service_title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <select name="rating" className="w-full p-3 border border-gray-300 rounded-lg" required>
                        {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Komentar</label>
                      <textarea name="comment" rows={4} className="w-full p-3 border border-gray-300 rounded-lg" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Kirim Review</button>
                  </form>
                ) : (
                  <p className="text-sm text-gray-500">Tidak ada booking selesai yang menunggu review.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
