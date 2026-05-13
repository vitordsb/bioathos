import { NextResponse } from "next/server";
import { clearAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  await clearAdminSession();
  const url = new URL("/admin/login", request.url);
  return NextResponse.redirect(url, { status: 303 });
}
