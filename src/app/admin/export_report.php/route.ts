import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse("Report,Value\nTotal Users,0\nTotal Services,0\nTotal Bookings,0\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": "attachment; filename=jasaku-report.csv",
    },
  });
}
