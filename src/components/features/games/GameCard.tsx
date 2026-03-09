"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface GameCardProps {
  id: number;
  title: string;
  type: string;
  image: string;
  status: string;
  rating: string;
  platform: string;
  players: string;
  description?: string;
  link?: string;
  slug?: string;
}

export default function GameCard({
  id,
  title,
  type,
  image,
  status,
  rating,
  platform,
  players,
  description,
  link,
  slug,
}: GameCardProps) {
  const defaultDescription =
    "Game menarik yang siap memberikan pengalaman bermain tidak terlupakan buat Anda.";
  const fullDescription = description || defaultDescription;
  return (
    <div className="tournament-card bgn-4 d-flex flex-column h-100 w-100 rounded-2xl overflow-hidden">
      {/* IMAGE AREA */}
      <div className="tournament-img position-relative h-[360px] sm:h-[400px] shrink-0">
        <img
          className="w-100 h-100 object-fit-cover"
          src={image}
          alt="game"
          style={{
            objectPosition: "top",
            ...(status === "Coming Soon"
              ? { filter: "blur(4px) brightness(0.4)" }
              : {}),
          }}
        />
        {status === "Coming Soon" && (
          <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
            <i className="ti ti-lock display-four tcn-1 mb-2"></i>
            <h5 className="tcn-1 text-uppercase fw-bold">Segera Hadir</h5>
          </div>
        )}
        {status === "Popular" && (
          <span
            className="position-absolute top-0 end-0 py-1 px-4 text-white fs-sm fw-bold shadow-sm bg-destructive"
            style={{
              borderRadius: "0 0 0 20px",
              zIndex: 2,
            }}
          >
            Populer
          </span>
        )}
        {status === "New" && (
          <span
            className="position-absolute top-0 end-0 py-1 px-4 bgn-1 tcn-1 fs-sm fw-bold shadow-sm"
            style={{ borderRadius: "0 0 0 20px", zIndex: 2 }}
          >
            Baru
          </span>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className="tournament-content p-[14px] sm:p-4 d-flex flex-column flex-grow-1">
        {/* TITLE, TYPE, AND STATUS TAGS */}
        <div className="d-flex justify-content-between align-items-start mb-3 gap-2">
          <div>
            <Link href={link || `/games/${slug || id}`} className="d-block">
              <h4 className="tournament-title text-base sm:text-lg font-bold text-white mb-1">
                {title}
              </h4>
            </Link>
            <span className="tcn-6 fs-sm">{type}</span>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-2 flex-wrap shrink-0">
            {status === "Coming Soon" ? (
              <span className="py-1 px-3 tcn-1 d-flex align-items-center gap-2 fs-sm fw-bold rounded-[20px] bg-primary border border-primary text-primary-foreground">
                <span className="w-2 h-2 rounded-full shrink-0 bg-white"></span>
                Segera Hadir
              </span>
            ) : status !== "Popular" && status !== "New" ? (
              <span
                className="py-1 px-3 d-flex align-items-center gap-2 fs-sm rounded-[20px]"
                style={{
                  backgroundColor: "rgba(114, 255, 0, 0.1)",
                  border: "1px solid #72ff00",
                  color: "#72ff00",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: "#72ff00" }}
                ></span>
                {status || "Berlangsung"}
              </span>
            ) : null}
          </div>
        </div>

        {/* DESCRIPTION ROW */}
        <div className="mb-4">
          <p className="tcn-6 fs-sm mb-0 line-clamp-2">{fullDescription}</p>
        </div>

        {/* META INFO ROW — platform | players | rating */}
        <div
          className="d-flex align-items-center gap-3 mb-3 pb-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="d-flex align-items-center gap-2">
            <i className="ti ti-device-gamepad-2 fs-base tcn-6"></i>
            <span className="tcn-6 fs-sm">{platform}</span>
          </div>
          <span className="tcn-6" style={{ opacity: 0.3 }}>
            |
          </span>
          <div className="d-flex align-items-center gap-2">
            <i className="ti ti-player-play fs-base tcn-6"></i>
            <span className="tcn-6 fs-sm">
              {players === "-" ? "0" : players}
            </span>
          </div>
          <span className="tcn-6" style={{ opacity: 0.3 }}>
            |
          </span>
          <div className="d-flex align-items-center gap-1">
            <i className="ti ti-star-filled fs-base text-warning"></i>
            <span className="tcn-6 fs-sm">{rating}</span>
          </div>
        </div>

        {/* CTA BUTTON */}
        <div className="mt-auto">
          <Button
            asChild
            className="w-100 d-flex align-items-center justify-content-center gap-2 rounded-[30px] font-bold py-[10px]"
          >
            <Link href={link || `/games/${slug || id}`}>
              Lihat Game
              <i className="ti ti-arrow-right fs-base"></i>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}