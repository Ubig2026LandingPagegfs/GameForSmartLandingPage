"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/features/games/GameCard";
import { useSearch } from "@/context/SearchContext";
import { gamesData } from "@/data/gamesData";

export default function GamesSection() {
  const { searchQuery } = useSearch();

  const filteredGames = gamesData.filter(
    (game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="tournament-section game-section pt-20 pb-10">
      <div className="tournament-wrapper alt">
        <div className="container-fluid px-lg-15 px-md-10 px-6">
          <div className="row justify-content-between align-items-end mb-lg-8 mb-sm-6 mb-4 g-3">
            <div className="col">
              <Link href="/games">
                <h2 className="display-four tcn-1 cursor-scale growUp title-anim font-heading text-[calc(1.1rem+1vw)]">
                  Permainan
                </h2>
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
                      Tidak ada permainan ditemukan untuk "{searchQuery}"
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
