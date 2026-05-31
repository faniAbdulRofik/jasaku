import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    success: true,
    total_earnings: 0,
    available_balance: 0,
    pending_balance: 0,
  });
}
