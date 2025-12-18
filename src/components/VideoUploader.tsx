"use client";

import { useState } from "react";
import { generateId } from "@/lib/generateId";

export default function VideoUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function handleGenerate() {
    if (!file) return;

    setLoading(true);
    setError("");
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`
      );

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = async () => {
        const data = JSON.parse(xhr.responseText);

        if (!data.secure_url) {
          setError("Upload failed");
          setLoading(false);
          return;
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

        setGeneratedUrl(`${window.location.origin}/v/${id}`);
        setLoading(false);
      };

      xhr.onerror = () => {
        setError("Upload failed");
        setLoading(false);
      };

      xhr.send(formData);
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-[#1a1a1a] border border-gray-800 shadow-xl p-6 space-y-6">
      {/* Upload */}
      <label className="block">
        <div
          className="
            w-full
            rounded-xl
            border
            border-dashed
            border-gray-700
            bg-[#121212]
            px-4
            py-6
            text-center
            text-sm
            text-gray-400
            cursor-pointer
            hover:border-gray-500
            transition
          "
        >
          {file ? (
            <span className="text-gray-200">{file.name}</span>
          ) : (
            <span>Click or drag a video file here</span>
          )}
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
        </div>
      </label>

      {/* Progress */}
      {loading && (
        <div className="w-full">
          <div className="h-2 rounded bg-gray-800 overflow-hidden">
            <div
              className="h-full bg-gray-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Uploading… {progress}%
          </p>
        </div>
      )}

      {/* Generated Link */}
      <div>
        <label className="block text-xs text-gray-400 mb-2">
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
<div className="space-y-3">
  {/* Generate Button */}
  <button
    onClick={handleGenerate}
    disabled={!file || loading}
    className="
      w-full
      rounded-lg
      bg-gray-200
      py-2.5
      text-sm
      font-medium
      text-gray-900
      hover:bg-gray-300
      transition
      disabled:opacity-50
    "
  >
    {loading ? "Generating…" : "Generate Link"}
  </button>

  {/* Open + Copy */}
  <div className="grid grid-cols-2 gap-3">
    <button
      onClick={() => generatedUrl && window.open(generatedUrl, "_blank")}
      disabled={!generatedUrl}
      className="
        w-full
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
        w-full
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
</div>


      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
