import { kv } from "@vercel/kv";

export async function saveVideo(id: string, url: string) {
  await kv.set(`video:${id}`, url);
}

export async function getVideo(id: string): Promise<string | null> {
  return await kv.get<string>(`video:${id}`);
}
