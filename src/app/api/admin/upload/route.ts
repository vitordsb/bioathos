import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { saveImage } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no_file" }, { status: 400 });
  }

  const result = await saveImage(file);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ url: result.url });
}
