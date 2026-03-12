"use client";

import React, { useState } from "react";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import GameCard from "@/components/features/games/GameCard";
import CTA from "@/components/features/home/CTA";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { allItemsData } from "@/data/allItemsData";

export default function GamesView() {
  const [activeTab, setActiveTab] = useState("All");

  const games = allItemsData.filter((item) => item.type === "game");

  const filteredGames =
    activeTab === "All"
      ? games
      : games.filter((game) => game.status === activeTab);

  return (
    <>
      <Header />
      <main className="main-container container-fluid d-flex pt-20 pb-20 px-0 position-relative">
        <Sidebar />
        <article className="main-content mt-10">
          <section className="tournament-section game-section pb-120">
            <div className="tournament-wrapper alt">
              <div className="container-fluid py-lg-15 py-sm-10 py-8 px-lg-15 px-md-10 px-6">
                <div className="row align-items-center justify-content-between mb-lg-15 mb-md-8 mb-sm-6 mb-4">
                  <div className="col-12 text-center">
                    <h2 className="display-four tcn-1 cursor-scale growUp title-anim">
                      Games
                    </h2>
                  </div>
                </div>
                <div className="singletab tournaments-tab mb-10">
                  <div className="d-center flex-wrap gap-6 mb-lg-15 mb-sm-10 mb-6">
                    <ul className="tablinks d-flex flex-wrap align-items-center justify-content-center gap-3 list-unstyled m-0 p-0">
                      {[
                        "All",
                        "Action",
                        "Racing",
                        "Puzzle",
                        "Trivia",
                        "Coming Soon",
                      ].map((tab) => (
                        <li key={tab}>
                          <Button
                            variant={activeTab === tab ? "default" : "outline"}
                            className={`rounded-pill py-6 px-8 text-base transition-all ${activeTab === tab ? "bg-orange-gradient text-white border-none shadow-[0_0_15px_rgba(255,140,0,0.5)]" : "bg-transparent text-[#e6e6e6] border-[#262626] hover:bg-[#1a1a1a] hover:text-white"}`}
                            onClick={() => setActiveTab(tab)}
                          >
                            {tab}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="row gy-lg-10 gy-6 justify-content-center">
                  {filteredGames.map((game) => (
                    <div
                      key={game.id}
                      className="col-xxl-3 col-lg-4 col-md-6 col-sm-10"
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
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <CTA />
        </article>
      </main>
      <Footer />
    </>
  );
}
