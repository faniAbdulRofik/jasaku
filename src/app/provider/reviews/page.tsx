import { redirect } from "next/navigation";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { ReviewList } from "@/components/ReviewList";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getReviewsForUser } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ProviderReviews({ searchParams }: PageProps) {
  const params = await searchParams;
  const user = await getSessionUser();
  if (!user || user.role !== "provider") redirect("/login?error=Anda harus login sebagai provider");
  const reviews = await getReviewsForUser(user.id, "provider");

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="provider" active="/provider/reviews" title="Provider Dashboard">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h1 className="text-lg font-semibold text-gray-800">Ulasan</h1>
          </div>
          <div className="p-5">
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </DashboardShell>
      <SiteFooter />
    </>
  );
}
