import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json({ success: true });
}

export const GET = POST;
