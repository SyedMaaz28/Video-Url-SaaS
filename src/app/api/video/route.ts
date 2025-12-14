import { NextResponse } from "next/server";
import { saveVideo } from "@/lib/videoDb";

export async function POST(req: Request) {
  const body = await req.json();
  const { id, url } = body;

  if (!id || !url) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  saveVideo(id, url);

  return NextResponse.json({ success: true });
}
