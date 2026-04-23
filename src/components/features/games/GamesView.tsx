"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import GameCard from "@/components/features/games/GameCard";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import gamesRaw from "@/data/games.json";
import { TournamentInfo } from "@/data/types";
import { supabase } from "@/lib/supabase";

const fallbackData = gamesRaw as TournamentInfo[];

// Helper map data Supabase ke TournamentInfo
function mapDbToGame(db: any): TournamentInfo {
  return {
    id: db.id,
    slug: db.slug,
    title: db.title,
    type: db.genre || db.type || 'game',
    genre: db.genre || 'Uncategorized',
    platform: db.platform || 'Web',
    image: db.image || '',
    logo: db.logo || '',
    playUrl: db.play_url || '',
    videoUrl: db.video_url || '',
    description: db.description || '',
    features: db.features || [],
    howToPlay: db.how_to_play || [],
    charactersTitle: db.characters_title || '',
    characters: db.characters || [],
    categories: db.categories || [],
    screenshots: db.screenshots || [],
    isFavorite: db.is_favorite || false,
    players: String(db.played_count || 0),
    rating: "4.9",
    status: db.status || "Active",
    href: `/games/${db.slug}`,
  } as unknown as TournamentInfo;
}

export default function GamesView() {
  const [activeTab, setActiveTab] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [allGames, setAllGames] = useState<TournamentInfo[]>(fallbackData);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch data dari Supabase
  useEffect(() => {
    async function fetchGames() {
      try {
        const { data, error } = await supabase
          .from('master_games')
          .select('*')
          .eq('status', 'PUBLISHED')
          .order('created_at', { ascending: false });

        if (data && !error && data.length > 0) {
          setAllGames(data.map(mapDbToGame));
        }
        // Jika gagal, tetap menggunakan fallbackData yang sudah di-set di useState
      } catch (err) {
        console.error('Failed to fetch games from Supabase:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGames();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const games = [...allGames];

  const filteredGames = games.filter((game) => {
    if (activeTab === "All") return true;
    if (activeTab === "Favorit") return game.isFavorite;
    return game.genre === activeTab || game.status === activeTab;
  });

  return (
    <>
      <Header />
      <main className="main-container container-fluid d-flex align-items-start pt-20 pb-20 px-0 position-relative" style={{ overflow: "visible" }}>
        <Sidebar />
        <article className="main-content mt-0">
          <section className="tournament-section game-section pb-120">
            <div className="tournament-wrapper alt">
              <div className="container-fluid py-lg-15 py-sm-10 py-8 px-lg-15 px-md-10 px-6">
                <div className="mb-10">
                  <Breadcrumbs />
                </div>
                <div className="row align-items-center justify-content-between mb-lg-15 mb-md-8 mb-sm-6 mb-4">
                  <div className="col-12 text-center">
                    <motion.h2 
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="display-four tcn-1 cursor-scale growUp"
                    >
                      Games
                    </motion.h2>
                  </div>
                </div>
                <div className="singletab tournaments-tab mb-10">
                  <div className="d-center gap-6 mb-lg-15 mb-sm-10 mb-6 w-100 overflow-visible">
                    {/* Desktop Tabs */}
                    <ul className="tablinks d-none d-md-flex flex-nowrap align-items-center justify-content-lg-center gap-3 list-unstyled m-0 p-2 overflow-x-auto scrollbar-hide w-100" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {[
                        "All",
                        "Favorit",
                        "Action",
                        "Racing",
                        "Puzzle",
                        "Trivia",
                        "Coming Soon",
                      ].map((tab) => (
                        <li key={tab} className="flex-shrink-0">
                          <Button
                            variant={activeTab === tab ? "default" : "outline"}
                            className={`rounded-pill py-3 py-sm-6 px-5 px-sm-8 text-sm text-sm-base transition-all ${activeTab === tab ? "bg-orange-gradient text-white border-none shadow-[0_0_15px_rgba(255,140,0,0.5)]" : "bg-transparent text-[#e6e6e6] border-[#262626] hover:bg-[#1a1a1a] hover:text-white"}`}
                            onClick={() => setActiveTab(tab)}
                          >
                            {tab}
                          </Button>
                        </li>
                      ))}
                    </ul>

                    {/* Mobile Dropdown */}
                    <div
                      className="d-block d-md-none position-relative w-100"
                      ref={dropdownRef}
                    >
                      <button
                        className="dropdown-toggle-btn w-100 d-flex justify-content-between align-items-center py-3 px-6 rounded-3 tcn-1 bgn-3 border-0"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span>{activeTab}</span>
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="dropdown-menu-list position-absolute start-0 w-100 mt-2 p-2 rounded-3 bgn-3 list-unstyled shadow-lg"
                            style={{ zIndex: 100 }}
                          >
                            {[
                              "All",
                              "Favorit",
                              "Action",
                              "Racing",
                              "Puzzle",
                              "Trivia",
                              "Coming Soon",
                            ].map((tab) => (
                              <li key={tab}>
                                <button
                                  className={`dropdown-item w-100 text-start py-3 px-4 rounded-2 border-0 bg-transparent tcn-1 ${activeTab === tab ? "bg-primary-dark fw-bold" : "hover-bg-n4"}`}
                                  style={{
                                    color: activeTab === tab ? "#ff8c00" : "inherit",
                                  }}
                                  onClick={() => {
                                    setActiveTab(tab);
                                    setIsDropdownOpen(false);
                                  }}
                                >
                                  {tab}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                <div className="row gy-lg-10 gy-6 justify-content-center">
                  {filteredGames.map((game) => (
                    <div
                      key={game.id}
                      className="col-xl-3 col-lg-4 col-sm-6 col-12"
                    >
                      <GameCard
                        id={game.id}
                        title={game.title}
                        type={game.genre}
                        image={game.image}
                        status={game.status}
                        platform={game.platform}
                        rating={game.rating}
                        players={game.players}
                        link={`/games/${game.slug}`}
                        playUrl={game.playUrl}
                        isFavorite={game.isFavorite}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />

      <style jsx>{`
        .dropdown-toggle-btn {
          background: #1c1f2a;
          color: rgb(var(--n1));
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          transition: all 0.3s ease;
        }
        .dropdown-toggle-btn:hover {
          border-color: rgba(var(--p1), 0.5) !important;
        }
        .dropdown-menu-list {
          background: #1c1f2a;
          border: 1px solid rgba(var(--p1), 0.3);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          overflow: hidden;
        }
        .dropdown-item {
          transition: all 0.2s ease;
          color: rgb(var(--n1));
          font-size: 14px;
        }
        .dropdown-item:hover {
          background: rgba(var(--p1), 0.1);
          color: #ff8c00;
          padding-left: 20px;
        }
        .bg-primary-dark {
          background: rgba(var(--p1), 0.15);
        }
        .hover-bg-n4:hover {
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </>
  );
}
