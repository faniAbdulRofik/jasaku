import { formatDate, profilePath } from "@/lib/format";
import type { ReviewWithMeta } from "@/lib/types";

export function ReviewList({ reviews }: { reviews: ReviewWithMeta[] }) {
  if (!reviews.length) {
    return (
      <div className="p-8 text-center bg-white">
        <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
          <i className="fas fa-star text-gray-400 text-3xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Belum ada ulasan</h3>
        <p className="text-gray-500">Ulasan akan muncul di sini</p>
      </div>
    );
  }

  return (
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
              <div className="text-sm text-blue-600 mb-2">{review.service_title}</div>
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
  );
}
