import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: true, notifications: [], unread_count: 0 });
}
