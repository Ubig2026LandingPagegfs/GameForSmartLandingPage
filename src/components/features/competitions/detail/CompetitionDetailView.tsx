"use client";

// views/CompetitionDetailView.tsx
// Orchestrates all competition detail sub-components.

import { useState } from "react";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { TournamentInfo } from "@/data/types";
import GameHero from "@/components/features/games/game-detail/GameHero";
import VideoModal from "@/components/features/games/game-detail/VideoModal";
import Footer from "@/components/shared/Footer";

import CompetitionHeroContent from "@/components/features/competitions/detail/CompetitionHeroContent";
import CompetitionAbout from "@/components/features/competitions/detail/CompetitionAbout";
import CompetitionRules       from "@/components/features/competitions/detail/CompetitionRules";
import CompetitionInfoCard    from "@/components/features/competitions/detail/CompetitionInfoCard";
import CompetitionTimeline    from "@/components/features/competitions/detail/CompetitionTimeline";
import CompetitionPrizes      from "@/components/features/competitions/detail/CompetitionPrizes";

interface CompetitionDetailViewProps {
  tournament: TournamentInfo;
}

const MOCK_REGISTERED = 64;

export default function CompetitionDetailView({ tournament }: CompetitionDetailViewProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const maxQuota = parseInt((tournament.teams ?? "100").replace(/\D/g, "")) || 100;
  const defaultVideoUrl = tournament.videoUrl || "https://youtu.be/_FCYtKCGMjk?si=ua8fNlWphch6S_sr";

  return (
    <>
      <Header />

      {/* ── Hero Banner (Full Width Outside Main Container) ── */}
      <GameHero
        image={tournament.image || "/images/bghero.webp"}
        title={tournament.title}
        videoUrl={defaultVideoUrl}
      >
        <CompetitionHeroContent
          title={tournament.title}
          slug={tournament.slug}
          videoUrl={defaultVideoUrl}
          onOpenVideo={() => setIsVideoModalOpen(true)}
        />
      </GameHero>

      <main className="main-container container-fluid d-flex pt-10 pb-15 px-0 position-relative" style={{ overflow: "visible" }}>
        <Sidebar />

        <article className="main-content w-100">
          {/* ── Body ── */}
          <div className="container-fluid px-lg-15 px-md-10 px-6 mt-10 pb-120">
            <section className="tournament-details">

              {/* Row 1: description + sidebar */}
              <div className="row g-10 align-items-start">
                <div className="col-lg-8 animate-fade-in-up">
                  <CompetitionAbout description={tournament.description} />
                  <CompetitionRules rules={tournament.rules} />
                </div>

                <div className="col-lg-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <CompetitionInfoCard
                    slug={tournament.slug}
                    title={tournament.title}
                    prizeMoney={tournament.prizeMoney}
                    date={tournament.date}
                    ticketFee={tournament.ticketFee}
                    currentRegistered={MOCK_REGISTERED}
                    maxQuota={maxQuota}
                  />
                </div>
              </div>

              {/* Row 2: Timeline */}
              <div className="row mt-12 g-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <CompetitionTimeline date={tournament.date} finalRound={tournament.finalRound} />
              </div>

              {/* Row 3: Prizes */}
              <div className="row mt-12 g-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <CompetitionPrizes prizes={tournament.prizes} />
              </div>

            </section>
          </div>
        </article>
      </main>

      <Footer/>

      {/* Video Modal */}
      {isVideoModalOpen && defaultVideoUrl && (
        <VideoModal
          videoUrl={defaultVideoUrl}
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}

      <style jsx global>{`
        :root {
            /* Page horizontal padding — satu sumber kebenaran */
            --page-px: clamp(20px, 4vw, 72px);

            /* Sidebar width for alignment */
            --sidebar-w: 105px;
        }

        @media (max-width: 991px) {
            :root {
                --sidebar-w: 0px;
            }
        }
      `}</style>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}