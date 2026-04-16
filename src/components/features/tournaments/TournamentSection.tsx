"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import competitionsDataRaw from "@/data/competitions.json";
import { TournamentInfo } from "@/data/types";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Trophy,
  GraduationCap,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const tournamentsData = competitionsDataRaw as TournamentInfo[];

export default function TournamentSection() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const [tournaments, setTournaments] = useState<any[]>(tournamentsData);

  const formatDateRange = (startStr: string | null, endStr: string | null) => {
    if (!startStr && !endStr) return "Sesuai Jadwal";
    try {
      const startObj = startStr ? new Date(startStr) : null;
      const endObj = endStr ? new Date(endStr) : null;
      
      if (startObj && endObj) {
          const startMonth = startObj.toLocaleString('id-ID', { month: 'long' });
          const startYear = startObj.getFullYear();
          const endMonth = endObj.toLocaleString('id-ID', { month: 'long' });
          const endYear = endObj.getFullYear();
          
          if (startYear === endYear) {
             if (startMonth === endMonth) {
                return `${startMonth} ${startYear}`;
             }
             return `${startMonth} - ${endMonth} ${startYear}`;
          }
          return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
      }
      if (startObj) return `${startObj.toLocaleString('id-ID', { month: 'long' })} ${startObj.getFullYear()}`;
      return "Sesuai Jadwal";
    } catch (e) {
       return "Sesuai Jadwal";
    }
  };

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const { data, error } = await supabase.from('competitions').select('*');
        if (data && !error) {
          const mapped = data.map(db => ({
            id: db.id,
            status: db.status === "published" ? "Published" : (db.status === "coming_soon" ? "Coming Soon" : db.status),
            href: `/competitions/${db.slug}`,
            image: db.poster_url || "/images/competitions/nasional.webp", // Fallback if no poster
            title: db.title,
            description: db.description || "Kompetisi terbaru GameforSmart",
            date: formatDateRange(db.qualification_start_date || db.registration_start_date, db.final_end_date || db.qualification_end_date || db.registration_end_date), 
            prizeMoney: db.prize_pool || "Lihat Detail",
            type: db.category || "Umum",
            slug: db.slug,
            startDateForSort: db.qualification_start_date || db.registration_start_date || null
          }));
          
          if (mapped.length > 0) {
            setTournaments(mapped);
          }
        }
      } catch (err) {
        console.error("Gagal memuat kompetisi dari Supabase", err);
      }
    };
    
    fetchCompetitions();
  }, []);

  const visibleTournaments = tournaments
    .filter((t) => t.status === "Published" || t.status === "Coming Soon")
    .sort((a, b) => {
      // 1. Prioritize 'Published' status
      if (a.status === "Published" && b.status !== "Published") return -1;
      if (a.status !== "Published" && b.status === "Published") return 1;

      // 2. Sort by date (earlier dates first)
      const dateA = a.startDateForSort ? new Date(a.startDateForSort).getTime() : Infinity;
      const dateB = b.startDateForSort ? new Date(b.startDateForSort).getTime() : Infinity;
      return dateA - dateB;
    });

  useEffect(() => {
    let swiperInstance: any = null;
    let retryCount = 0;
    const maxRetries = 20;

    // Check if there are elements to render. If not, do not initialize.
    if (visibleTournaments.length === 0) return;

    const initSwiper = () => {
      if (typeof window !== "undefined" && (window as any).Swiper) {
        const Swiper = (window as any).Swiper;
        if (swiperInstance) swiperInstance.destroy();

        swiperInstance = new Swiper(".tournament-swiper", {
          effect: "coverflow",
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: "auto",
          loop: true,
          speed: 800,
          coverflowEffect: {
            rotate: 0,
            stretch: 50,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          },
          on: {
            slideChange: (swiper: any) => {
              setActiveIndex(swiper.realIndex);
            },
          },
          breakpoints: {
            320: { coverflowEffect: { depth: 0, stretch: 0 } },
            1024: {
              coverflowEffect: {
                rotate: 0,
                stretch: 50,
                depth: 200,
                modifier: 1,
              },
            },
          },
        });
        swiperRef.current = swiperInstance;
        return true;
      }
      return false;
    };

    if (!initSwiper()) {
      const interval = setInterval(() => {
        retryCount++;
        if (initSwiper() || retryCount >= maxRetries) clearInterval(interval);
      }, 500);
      return () => clearInterval(interval);
    }

    return () => {
      if (swiperInstance) swiperInstance.destroy();
    };
  }, [tournaments]);

  const next = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };
  const prev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };
  const paginate = (index: number) => {
    if (swiperRef.current) swiperRef.current.slideToLoop(index);
  };

  const statusColor = (status: string) =>
    status === "Published" || status === "Active"
      ? {
          dot: "bg-emerald-400",
          text: "text-emerald-400",
          border: "border-emerald-500/40",
          bg: "bg-emerald-500/10",
        }
      : {
          dot: "bg-orange-400",
          text: "text-orange-400",
          border: "border-orange-500/40",
          bg: "bg-orange-500/10",
        };

  return (
    <section className="pt-20 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-4">
          <p className="text-xs tracking-[0.3em] text-gray-400 mb-3">
            KOMPETISI
          </p>
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Siap Unjuk Kemampuan?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Pilih lomba sesuai jenjang dan wilayahmu
          </p>
        </div>

        {/* CARD WRAPPER */}
        <div className="relative max-w-7xl mx-auto">
          <button
            suppressHydrationWarning
            onClick={prev}
            className="absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-white/20 bg-[#161920] flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 z-20 transition-all shadow-lg"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>

          <button
            suppressHydrationWarning
            onClick={next}
            className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-white/20 bg-[#161920] flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 z-20 transition-all shadow-lg"
          >
            <ChevronRight size={28} className="text-white" />
          </button>

          {/* SWIPER */}
          <div className="swiper tournament-swiper !overflow-visible">
            <div className="swiper-wrapper py-4">
              {visibleTournaments.map((tournament) => {
                const sc = statusColor(tournament.status);
                return (
                  <div
                    key={tournament.id}
                    className="swiper-slide !w-[90%] lg:!w-[900px]"
                  >
                    <Card className="relative h-auto overflow-hidden border border-orange-500/30 bg-[#161920] backdrop-blur-xl transition-all duration-500 tournament-card">
                      {/* TOP BAR */}
                      <div className="h-[3px] w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500" />

                      {/* FIX: use items-stretch so image column fills card height */}
                      <div className="flex flex-col lg:flex-row-reverse h-full">
                        {/* IMAGE — removed fixed h-[240px], use self-stretch + min-h for mobile */}
                        <Link 
                          href={tournament.href} 
                          className="lg:w-1/2 overflow-hidden bg-black/20 block cursor-pointer group/img"
                        >
                          <img
                            src={tournament.image}
                            alt={tournament.title}
                            className="w-full h-auto block transition-transform duration-700 group-hover/img:scale-110"
                          />
                        </Link>

                        {/* CONTENT — mirroring the HTML design */}
                        <CardContent className="p-8 lg:p-10 flex flex-col justify-between lg:w-1/2 relative overflow-hidden">
                          {/* Subtle glow */}
                          <div className="absolute top-16 left-12 w-56 h-56 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

                          {/* STATUS BADGE */}
                          <div>
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase border ${sc.text} ${sc.border} ${sc.bg} mb-5`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${sc.dot} animate-pulse`}
                              />
                              {tournament.status}
                            </span>

                            {/* TITLE */}
                            <Link href={tournament.href} className="block group/title">
                              <h3 className="text-2xl lg:text-[1.75rem] font-extrabold text-white mb-3 leading-snug group-hover/title:text-orange-500 transition-colors">
                                {tournament.title}
                              </h3>
                            </Link>

                            {/* DIVIDER */}
                            <div className="w-10 h-[3px] rounded-full bg-gradient-to-r from-orange-500 to-transparent mb-4" />

                            {/* DESCRIPTION */}
                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6">
                              {tournament.description.split("\n")[0]}
                            </p>

                            {/* INFO TAGS */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {/* Date */}
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-gray-300">
                                <Calendar size={12} className="opacity-70" />
                                {tournament.date}
                              </span>
                              {/* Prize */}
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-yellow-400/10 border border-yellow-400/30 text-yellow-300">
                                <Trophy size={12} className="opacity-80" />
                                {tournament.prizeMoney}
                              </span>
                              {/* Type/Level */}
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-sky-400/8 border border-sky-400/20 text-sky-300">
                                <GraduationCap
                                  size={12}
                                  className="opacity-70"
                                />
                                {tournament.type}
                              </span>
                            </div>
                          </div>

                          {/* CTA + SOCIAL PROOF */}
                          <div>
                            <div className="flex flex-wrap gap-3 mb-5">
                              <button
                                suppressHydrationWarning
                                onClick={
                                  tournament.status === "Coming Soon"
                                    ? undefined
                                    : () => {
                                        router.push(`/competitions/${tournament.slug}/register`);
                                      }
                                }
                                disabled={tournament.status === "Coming Soon"}
                                className={`gps-btn-primary whitespace-nowrap flex-1 text-center ${
                                  tournament.status === "Coming Soon" ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                              >
                                {tournament.status === "Coming Soon" ? "Belum Dibuka" : "Daftar"}
                              </button>
                              <Link
                                href={tournament.href}
                                className="gps-btn-outline whitespace-nowrap inline-flex items-center gap-1 group"
                              >
                                Detail
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DOTS */}
          <div className="flex justify-center gap-2 mt-6">
            {visibleTournaments.map((_, i) => (
              <button
                suppressHydrationWarning
                key={i}
                onClick={() => paginate(i)}
                className={`h-[4px] rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 bg-orange-500" : "w-2 bg-white/30"}`}
              />
            ))}
          </div>

          {/* VIEW ALL */}
          <div className="text-center mt-6">
            <Link
              href="/competitions"
              className="text-gray-400 hover:text-white text-sm transition-colors group inline-flex items-center"
            >
              Lihat Semua Kompetisi
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .tournament-swiper .swiper-slide {
          transition: all 0.5s ease-in-out;
          opacity: 0.4;
          filter: blur(2px);
          transform: scale(0.85);
        }
        .tournament-swiper .swiper-slide-active {
          opacity: 1;
          filter: blur(0px);
          transform: scale(1);
          z-index: 10;
        }
        .tournament-swiper .swiper-slide-prev,
        .tournament-swiper .swiper-slide-next {
          opacity: 0.7;
          filter: blur(1px);
          transform: scale(0.92);
          z-index: 5;
        }
        .tournament-card {
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }
        .swiper-slide-active .tournament-card {
          box-shadow: 0 0 30px rgba(249, 115, 22, 0.2);
          border-color: rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </section>
  );
}