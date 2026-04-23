"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/features/games/GameCard";
import { useSearch } from "@/context/SearchContext";
import gamesDataRaw from "@/data/games.json";
import { TournamentInfo } from "@/data/types";
import { supabase } from "@/lib/supabase";

const fallbackGames = gamesDataRaw as TournamentInfo[];

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
    screenshots: db.screenshots || [],
    isFavorite: db.is_favorite || false,
    players: String(db.played_count || 0),
    rating: "4.9",
    status: db.status || "Active",
    href: `/games/${db.slug}`,
  } as unknown as TournamentInfo;
}

export default function GamesSection() {
  const { searchQuery } = useSearch();
  const [gamesData, setGamesData] = useState<TournamentInfo[]>(fallbackGames);

  // Fetch data dari Supabase saat komponen dimuat
  useEffect(() => {
    async function fetchGames() {
      try {
        const { data, error } = await supabase
          .from('master_games')
          .select('*')
          .eq('status', 'PUBLISHED')
          .order('is_favorite', { ascending: false }) // Favorit dulu (true > false)
          .order('created_at', { ascending: false });

        if (data && !error && data.length > 0) {
          setGamesData(data.map(mapDbToGame));
        }
      } catch (err) {
        console.error('GamesSection: Supabase fetch failed, using fallback', err);
      }
    }
    fetchGames();
  }, []);

  const filteredGames = [...gamesData]
    .filter(
      (game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.type.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(0, 4);

  return (
    <section className="tournament-section game-section pt-10 pb-10">
      <div className="tournament-wrapper alt">
        <div className="container-fluid px-lg-15 px-md-10 px-6">
          <div className="row justify-content-between align-items-end mb-lg-8 mb-sm-6 mb-4 g-3">
            <div className="col">
              <Link href="/games">
                <motion.h2 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="display-four tcn-1 cursor-scale growUp font-heading text-[calc(1.1rem+1vw)]"
                >
                  Game
                </motion.h2>
              </Link>
            </div>
            <div className="col-auto">
              <Link href="/games" className="gps-btn-outline">
                Lihat Semua
              </Link>
            </div>
          </div>
          <div className="tabcontents">
            <div className="tabitem active">
              <div className="row justify-content-start g-md-6 g-4">
                {filteredGames.length > 0 ? (
                  filteredGames.map((tournament) => (
                    <div
                      key={tournament.id}
                      className="col-xl-3 col-md-6 col-12"
                    >
                      <GameCard {...tournament} link={tournament.href} />
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-20">
                    <h3 className="tcn-1">
                      Tidak ada game ditemukan untuk "{searchQuery}"
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
