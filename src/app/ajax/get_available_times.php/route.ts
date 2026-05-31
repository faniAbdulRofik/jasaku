import { NextResponse } from "next/server";

export async function GET() {
  const data = Array.from({ length: 13 }, (_, index) => {
    const time = `${String(index + 8).padStart(2, "0")}:00`;
    return { time, available: true };
  });

  return NextResponse.json({ success: true, data });
}
