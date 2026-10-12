"use client";

import { useState } from "react";
import Image from "next/image";

const CHANNEL_ID = "UCnGWqkgS_j0n2bGEwldnXTA";
const EMBED_URL = `https://www.youtube-nocookie.com/embed/live_stream?channel=${CHANNEL_ID}&autoplay=1`;

export default function LiveStreamFacade() {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-2xl">
        <iframe
          src={EMBED_URL}
          title="Peaceful Rest Baptist Church Live Stream"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full aspect-video"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setActive(true)}
      aria-label="Watch Peaceful Rest Baptist Church live stream on YouTube"
      className="group relative w-full rounded-2xl overflow-hidden shadow-2xl block"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src="/hero-worship.png"
          alt="Peaceful Rest Baptist Church worship service"
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-200" />

        {/* Play button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200">
            <svg
              viewBox="0 0 24 24"
              fill="white"
              className="w-9 h-9 ml-1"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">
            Watch Live on YouTube
          </span>
        </div>
      </div>
    </button>
  );
}
