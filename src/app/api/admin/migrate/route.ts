import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { applySchema } from "@/lib/schema";
import { runSeed } from "@/lib/seed";

export const runtime = "nodejs";

export async function POST() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  await applySchema();
  const result = await runSeed();
  return NextResponse.json({ ok: true, ...result });
}
