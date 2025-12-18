// 


"use client";

import { useState } from "react";
import { generateId } from "@/lib/generateId";

export default function VideoUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
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

      const finalUrl = `${window.location.origin}/v/${id}`;
      setGeneratedUrl(finalUrl);
    } catch (err) {
      setError("Failed to upload and generate link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-[#1a1a1a] border border-gray-800 shadow-xl p-6 space-y-5">
      {/* Upload Section */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Upload demo video
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="
            w-full
            text-sm
            text-gray-300
            file:mr-4
            file:py-2
            file:px-4
            file:rounded-lg
            file:border-0
            file:bg-gray-800
            file:text-gray-200
            hover:file:bg-gray-700
          "
        />
      </div>

      {/* Generated Link */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Generated link
        </label>
        <input
          type="text"
          value={generatedUrl}
          readOnly
          placeholder="Link will appear here"
          className="
            w-full
            rounded-lg
            bg-[#121212]
            border
            border-gray-700
            px-3
            py-2
            text-sm
            text-gray-300
            placeholder-gray-500
          "
        />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={handleGenerate}
          disabled={!file || loading}
          className="
            rounded-lg
            bg-gray-800
            py-2
            text-sm
            hover:bg-gray-700
            transition
            disabled:opacity-50
          "
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        <button
          onClick={() => generatedUrl && window.open(generatedUrl, "_blank")}
          disabled={!generatedUrl}
          className="
            rounded-lg
            bg-gray-800
            py-2
            text-sm
            hover:bg-gray-700
            transition
            disabled:opacity-50
          "
        >
          Open
        </button>

        <button
          onClick={() =>
            generatedUrl && navigator.clipboard.writeText(generatedUrl)
          }
          disabled={!generatedUrl}
          className="
            rounded-lg
            bg-gray-800
            py-2
            text-sm
            hover:bg-gray-700
            transition
            disabled:opacity-50
          "
        >
          Copy
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-400 pt-1">{error}</p>
      )}
    </div>
  );
}
