"use client";

import { ReactNode, useEffect, useState } from "react";

interface GameHeroProps {
  image: string;
  title: string;
  videoUrl?: string;
  children?: ReactNode;
}

export default function GameHero({
  image,
  title,
  videoUrl,
  children,
}: GameHeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getYoutubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = videoUrl ? getYoutubeId(videoUrl) : null;

  return (
    <section
      className="relative w-full"
      style={{ minHeight: "70vh", backgroundColor: "#0a0c12" }}
    >
      {/* Background Banner */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {mounted && videoId ? (
          <iframe
            title={title}
            loading="eager"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1&playlist=${videoId}`}
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
            style={{
              width: "100vw",
              height: "56.25vw",
              minHeight: "100%",
              minWidth: "177.77vh",
            }}
          />
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        {/* GRADIENT OVERLAY */}
        <div className="hero-gradient absolute inset-0 w-full h-full" />
      </div>

      {/* Banner Content */}
      <div className="relative z-1 flex items-end w-full px-5 sm:px-10 lg:px-20 py-16" style={{ minHeight: "70vh" }}>
        <div className="w-full text-left">{children}</div>
      </div>

      <style jsx>{`
        .hero-gradient {
          background:
            linear-gradient(
              to right,
              rgba(15, 17, 24, 1) 0%,
              rgba(15, 17, 24, 0.9) 40%,
              rgba(15, 17, 24, 0.2) 100%
            ),
            linear-gradient(to top, rgba(15, 17, 24, 1) 0%, transparent 100%);
        }
      `}</style>
    </section>
  );
}
