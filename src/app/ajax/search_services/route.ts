import { NextRequest, NextResponse } from "next/server";
import { searchServices } from "@/lib/data";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = Number(params.get("page") || 1);
  const result = await searchServices(
    {
      keyword: params.get("keyword") || "",
      location: params.get("location") || "",
      category: params.get("category") || params.get("category_id") || "",
      min_price: params.get("min_price") || "",
      max_price: params.get("max_price") || "",
      sort: params.get("sort") || "newest",
    },
    page,
    12,
  );

  return NextResponse.json({
    success: true,
    data: result.services,
    pagination: {
      page,
      total: result.total,
      total_pages: result.totalPages,
    },
  });
}
