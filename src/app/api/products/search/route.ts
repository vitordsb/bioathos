import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const results = await searchProducts(q, 6);
  return NextResponse.json({ results });
}
