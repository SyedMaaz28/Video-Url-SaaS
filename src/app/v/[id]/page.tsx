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
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <video
        src={videoUrl}
        controls
        className="w-full max-w-3xl rounded-lg shadow-lg"
      />
    </div>
  );
}
