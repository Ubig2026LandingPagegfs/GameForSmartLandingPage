"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Trophy, 
  GraduationCap, 
  Lock 
} from "lucide-react";

interface TournamentCardProps {
  id: number;
  title: string;
  type: string;
  image: string;
  status: string;
  prizeMoney?: string;
  ticketFee?: string;
  date?: string;
  teams?: string;
  description?: string;
  slug?: string;
  practiceAttempts?: number;
  competitionAttempts?: number;
  link?: string;
}

export default function TournamentCard({
  id,
  title,
  type,
  image,
  status,
  prizeMoney = "Rp 0",
  ticketFee = "Gratis",
  date = "07 OKT, 05:10",
  teams = "12/12",
  description,
  slug,
  practiceAttempts,
  competitionAttempts,
  link,
}: TournamentCardProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const statusColor = (status: string) => {
    switch(status) {
      case "Active":
        return {
          dot: "bg-emerald-400",
          text: "text-emerald-400",
          border: "border-emerald-500/40",
          bg: "bg-emerald-500/10",
        };
      case "Coming Soon":
        return {
          dot: "bg-gray-400",
          text: "text-gray-400",
          border: "border-gray-500/40",
          bg: "bg-gray-500/10",
        };
      default: // Upcoming
        return {
          dot: "bg-orange-400",
          text: "text-orange-400",
          border: "border-orange-500/40",
          bg: "bg-orange-500/10",
        };
    }
  };

  const sc = statusColor(status);
  const detailHref = link || `/competitions/${slug || id}`;
  const registerHref = `/competitions/${slug || id}/register`;
  const firstLineDescription = (description || "Lomba menguji kemampuan siswa dalam menyelesaikan tantangan.").split("\n")[0];

  return (
    <Card className="relative h-full overflow-hidden border border-orange-500/30 bg-[#161920] backdrop-blur-xl transition-all duration-300 tournament-card flex flex-col">
      {/* TOP BAR */}
      <div className="h-[3px] w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500" />

      {/* IMAGE AREA - BLURRED BACKDROP TECHNIQUE */}
      <div className="relative aspect-square w-full overflow-hidden bg-black/40 group/img">
        <Link href={detailHref} className="block w-full h-full relative">
          {/* Blurred Background Layer */}
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
          />
          
          {/* Main Content Layer (Un-cropped) */}
          <img
            src={image}
            alt={title}
            className={`relative w-full h-full object-contain transition-transform duration-700 group-hover/img:scale-105 ${
              status === "Coming Soon" ? "filter blur-sm brightness-[0.4]" : ""
            }`}
          />

          {/* Coming Soon Lock */}
          {status === "Coming Soon" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
              <Lock size={40} className="text-white/40 mb-2" />
              <span className="text-xs font-bold text-white/50 tracking-[0.3em] uppercase">Coming Soon</span>
            </div>
          )}
        </Link>
      </div>

      <CardContent className="p-6 flex flex-col flex-grow relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-12 left-8 w-40 h-40 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />

        {/* STATUS BADGE */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase border ${sc.text} ${sc.border} ${sc.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} ${status !== "Coming Soon" ? "animate-pulse" : ""}`} />
            {status}
          </span>
        </div>

        {/* TITLE */}
        <Link href={detailHref} className="block group/title">
          <h4 className="text-lg font-extrabold text-white mb-2 leading-snug group-hover/title:text-orange-500 transition-colors line-clamp-2 min-h-[56px]">
            {title}
          </h4>
        </Link>

        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-widest mb-3 block">
          {type}
        </span>

        {/* DIVIDER */}
        <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-transparent mb-4" />

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2 min-h-[32px]">
          {firstLineDescription}
        </p>

        {/* INFO TAGS */}
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.25 rounded-lg text-[10px] font-medium bg-white/5 border border-white/10 text-gray-300">
            <Calendar size={10} className="opacity-70" />
            {date}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.25 rounded-lg text-[10px] font-semibold bg-yellow-400/10 border border-yellow-400/30 text-yellow-300">
            <Trophy size={10} className="opacity-80" />
            {prizeMoney}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.25 rounded-lg text-[10px] font-medium bg-sky-400/8 border border-sky-400/20 text-sky-300">
            <GraduationCap size={10} className="opacity-70" />
            {teams}
          </span>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex gap-2">
          <button
            suppressHydrationWarning
            onClick={() => {
              router.push(registerHref);
            }}
            className="gps-btn-primary py-2.5 flex-1 text-xs font-bold"
          >
            Daftar
          </button>
          <Link
            href={detailHref}
            className="gps-btn-outline py-2.5 w-max px-4 text-xs"
          >
            Detail
          </Link>
        </div>
      </CardContent>
      <style jsx>{`
        .tournament-card {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.05);
        }
        .tournament-card:hover {
          border-color: rgba(249, 115, 22, 0.4);
          box-shadow: 0 0 30px rgba(249, 115, 22, 0.1);
          transform: translateY(-4px);
        }
      `}</style>
    </Card>
  );
}
