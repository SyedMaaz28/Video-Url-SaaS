import { NextResponse } from "next/server";
import { saveVideo } from "@/lib/videoKV";

export async function POST(req: Request) {
  const { id, url } = await req.json();

  if (!id || !url) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  await saveVideo(id, url);

  return NextResponse.json({ success: true });
}
