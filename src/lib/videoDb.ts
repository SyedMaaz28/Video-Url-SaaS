import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/videos.json");

type VideoMap = Record<string, string>;

export function getAllVideos(): VideoMap {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw || "{}");
}

export function saveVideo(id: string, url: string) {
  const videos = getAllVideos();
  videos[id] = url;
  fs.writeFileSync(filePath, JSON.stringify(videos, null, 2));
}

export function getVideo(id: string): string | null {
  const videos = getAllVideos();
  return videos[id] || null;
}

