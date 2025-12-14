"use client";

import { useState } from "react";
import { generateId } from "@/lib/generateId";
import { saveVideo } from "@/lib/videoStore";

export default function VideoUploader() {
  const [loading, setLoading] = useState(false);
  const [videoPath, setVideoPath] = useState(""); // short /v/id
  const [error, setError] = useState("");

  console.log(
    "Cloudinary:",
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) {
        throw new Error("Upload failed");
      }

      const id = generateId();

await fetch("/api/video", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id,
    url: data.secure_url,
  }),
});

setVideoPath(`/v/${id}`);


    } catch (err) {
      setError("Video upload failed. Check Cloudinary setup.");
    } finally {
      setLoading(false);
    }
  }

  const fullUrl =
    videoPath && typeof window !== "undefined"
      ? `${window.location.origin}${videoPath}`
      : "";

  return (
    <div className="space-y-4">
      <input type="file" accept="video/*" onChange={handleUpload} />

      {loading && <p>Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {videoPath && (
        <div className="space-y-2">
          <p className="font-semibold">Short Video Link:</p>

          <div className="flex items-center gap-2">
            <input
              value={fullUrl}
              readOnly
              className="flex-1 border px-2 py-1 rounded text-sm"
            />

            <button
              onClick={() => navigator.clipboard.writeText(fullUrl)}
              className="border px-3 py-1 rounded text-sm"
            >
              Copy
            </button>
          </div>

          <a
            href={videoPath}
            target="_blank"
            className="text-blue-500 underline text-sm"
          >
            Open video
          </a>
        </div>
      )}
    </div>
  );
}
