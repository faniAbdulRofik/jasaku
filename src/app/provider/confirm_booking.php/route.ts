import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/provider/bookings.php", request.url));
}

export const POST = GET;
