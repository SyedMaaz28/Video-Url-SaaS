import { getVideo } from "@/lib/videoKV";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function VideoPage({ params }: Props) {
  const { id } = await params;
  const videoUrl = await getVideo(id);

  if (!videoUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Video not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <video
          src={videoUrl}
          controls
          className="
            w-full
            aspect-video
            rounded-xl
            shadow-2xl
            bg-black
          "
        />
      </div>
    </div>
  );
}
