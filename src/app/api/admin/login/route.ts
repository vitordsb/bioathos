import { NextResponse } from "next/server";
import { checkAdminCredentials, setAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const login = typeof body?.login === "string" ? body.login : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!checkAdminCredentials(login, password)) {
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }
  await setAdminSession();
  return NextResponse.json({ ok: true });
}
