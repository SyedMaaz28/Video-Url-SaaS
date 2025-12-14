declare global {
  var __videoStore: Map<string, string> | undefined;
}

// Use a global singleton so it survives RSC reloads
const videoMap =
  globalThis.__videoStore ?? new Map<string, string>();

if (!globalThis.__videoStore) {
  globalThis.__videoStore = videoMap;
}

export function saveVideo(id: string, url: string) {
  videoMap.set(id, url);
}

export function getVideo(id: string) {
  return videoMap.get(id);
}
