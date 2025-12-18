// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }


// i


"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [generated, setGenerated] = useState("");

  function generateLink() {
    if (!url) return;
    setGenerated(url);
  }

  function copyLink() {
    if (!generated) return;
    navigator.clipboard.writeText(generated);
  }

  function openLink() {
    if (!generated) return;
    window.open(generated, "_blank");
  }

  return (
    <main className="min-h-screen bg-[#121212] text-gray-200 flex flex-col">
      {/* Top Center Title */}
<header className="w-full pt-10 pb-6 flex flex-col items-center text-center space-y-2">
  <h1 className="text-3xl font-bold tracking-tight text-gray-100">
    ClipNest
  </h1>
  <p className="text-sm md:text-base text-gray-400 max-w-xl">
    Upload demo videos and generate clean, shareable links for portfolios and
    project showcases.
  </p>
</header>


      {/* Centered Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-[#1a1a1a] border border-gray-800 shadow-xl p-6 space-y-5">
          {/* Input */}
          <input
            type="text"
            placeholder="Paste your video URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="
              w-full
              rounded-lg
              bg-[#121212]
              border border-gray-700
              px-4
              py-3
              text-sm
              text-gray-200
              placeholder-gray-500
              focus:outline-none
              focus:border-gray-500
            "
          />

          {/* Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={generateLink}
              className="
                rounded-lg
                bg-gray-800
                py-2
                text-sm
                hover:bg-gray-700
                transition
              "
            >
              Generate
            </button>

            <button
              onClick={copyLink}
              className="
                rounded-lg
                bg-gray-800
                py-2
                text-sm
                hover:bg-gray-700
                transition
              "
            >
              Copy
            </button>

            <button
              onClick={openLink}
              className="
                rounded-lg
                bg-gray-800
                py-2
                text-sm
                hover:bg-gray-700
                transition
              "
            >
              Open
            </button>
          </div>

          {/* Output */}
          {generated && (
            <p className="text-xs text-gray-400 break-all pt-2">
              {generated}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}




