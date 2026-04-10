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
    <section className="hero-section">
      <div className="hero-bg">
        {/* Video/image sits in the center-right area */}
        <div className="hero-media-box">
          {mounted && videoId ? (
            <iframe
              title={title}
              loading="eager"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1&playlist=${videoId}`}
              allow="autoplay; encrypted-media"
              className="hero-video"
            />
          ) : (
            <img src={image} alt={title} className="hero-img" />
          )}
        </div>

        {/*
          Four separate gradient panels — each is a solid-to-transparent strip
          that sits directly on top of the video edges.
          Using separate elements avoids the CSS multi-gradient blending issue.
        */}
        <div className="fade-left" />
        <div className="fade-right" />
        <div className="fade-bottom" />
        <div className="fade-top" />
      </div>

      <div className="hero-content-wrap">
        <div className="hero-content">{children}</div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          min-height: clamp(450px, 70vh, 900px);
          background: #0a0c12;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          top: 90px; /* Offset so the fixed header doesn't overlap the top of the image */
          background: #0a0c12;
        }

        /* Video/image covers full width — fade overlays handle left darkness */
        .hero-media-box {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
        }

        .hero-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
          pointer-events: none;
        }

        /* ── LEFT fade: solid dark over left 35%, feathers to transparent ── */
        .fade-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 70%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to right,
            #0a0c12 0%,
            #0a0c12 35%,
            rgba(10, 12, 18, 0.95) 42%,
            rgba(10, 12, 18, 0.82) 50%,
            rgba(10, 12, 18, 0.6) 60%,
            rgba(10, 12, 18, 0.3) 72%,
            rgba(10, 12, 18, 0.08) 85%,
            rgba(10, 12, 18, 0) 100%
          );
        }

        /* ── RIGHT fade: covers right edge firmly ── */
        .fade-right {
          position: absolute;
          top: 0;
          right: 0;
          width: 65%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to left,
            #0a0c12 0%,
            #0a0c12 25%,
            rgba(10, 12, 18, 0.95) 35%,
            rgba(10, 12, 18, 0.8) 50%,
            rgba(10, 12, 18, 0.55) 65%,
            rgba(10, 12, 18, 0.25) 80%,
            rgba(10, 12, 18, 0.08) 90%,
            rgba(10, 12, 18, 0) 100%
          );
        }

        /* ── BOTTOM fade ── */
        .fade-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 45%;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to top,
            #0a0c12 0%,
            rgba(10, 12, 18, 0.85) 20%,
            rgba(10, 12, 18, 0.5) 40%,
            rgba(10, 12, 18, 0.15) 60%,
            transparent 80%
          );
        }

        /* ── TOP fade ── */
        .fade-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 25%;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(10, 12, 18, 0.7) 0%,
            rgba(10, 12, 18, 0.3) 30%,
            transparent 70%
          );
        }

        /* Content */
        .hero-content-wrap {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: flex-end;
          min-height: clamp(450px, 70vh, 900px);
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          padding-top: 100px;
          padding-left: calc(var(--sidebar-w, 105px) + clamp(20px, 4vw, 72px));
          padding-right: clamp(20px, 4vw, 72px);
        }

        .hero-content {
          width: 100%;
          max-width: 480px;
          text-align: left;
          padding-bottom: 64px;
          box-sizing: border-box;
        }

        @media (max-width: 1024px) {
          .fade-left {
            background: linear-gradient(
              to right,
              #0a0c12 0%,
              #0a0c12 30%,
              rgba(10, 12, 18, 0.85) 50%,
              rgba(10, 12, 18, 0) 100%
            );
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: auto;
            background: transparent;
            padding-top: 80px; /* Leave space for main header */
          }
          .hero-bg {
            display: none; /* Hide full banner on mobile for Play Store look */
          }
          .fade-left {
            background: linear-gradient(
              to right,
              #0a0c12 0%,
              #0a0c12 25%,
              rgba(10, 12, 18, 0.7) 50%,
              rgba(10, 12, 18, 0) 100%
            );
          }
          .fade-right {
            width: 25%;
          }
          .hero-content-wrap {
            min-height: auto;
            padding-left: clamp(16px, 4vw, 24px);
            padding-right: clamp(16px, 4vw, 24px);
          }
          .hero-content {
            max-width: 100%;
            padding-bottom: 0px;
          }
        }
      `}</style>
    </section>
  );
}
