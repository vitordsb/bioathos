import { cookies } from "next/headers";
import crypto from "node:crypto";

const COOKIE = "bioathos_admin";

function secret(): string {
  return process.env.ADMIN_SECRET || "bioathos-dev-secret-change-me";
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

export function adminLogin(): string {
  return process.env.ADMIN_LOGIN || "1001";
}

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "1234";
}

export function checkAdminCredentials(login: string, password: string): boolean {
  return login === adminLogin() && password === adminPassword();
}

export async function isAdminAuthed(): Promise<boolean> {
  const c = await cookies();
  const token = c.get(COOKIE)?.value;
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  return sign(payload) === sig;
}

export async function setAdminSession(): Promise<void> {
  const payload = `${Date.now()}:${crypto.randomBytes(8).toString("hex")}`;
  const token = `${payload}.${sign(payload)}`;
  const c = await cookies();
  c.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearAdminSession(): Promise<void> {
  const c = await cookies();
  c.delete(COOKIE);
}
