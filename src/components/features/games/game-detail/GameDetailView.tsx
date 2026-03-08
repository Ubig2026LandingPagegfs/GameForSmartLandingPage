"use client";

// GameDetailView.tsx
// Komponen utama halaman detail game.
// Hanya bertugas sebagai orchestrator — state management dan perakitan layout.
// Setiap seksi dikelola oleh komponen terpisah di folder ./components/

import { useState } from 'react';
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { TournamentInfo } from '@/data/allItemsData';
import { gamesData } from '@/data/gamesData'; // sesuaikan path export gamesData

import GameHero      from '@/components/features/games/game-detail/GameHero';
import GameMeta      from '@/components/features/games/game-detail/GameMeta';
import GameGallery   from '@/components/features/games/game-detail/GameGallery';
import GameAbout     from '@/components/features/games/game-detail/GameAbout';
import GameFeatures  from '@/components/features/games/game-detail/GameFeatures';
// import GamePrivacy   from '@/components/features/games/game-detail/GamePrivacy';
import GameRating    from '@/components/features/games/game-detail/GameRating';
import GameSidebar   from '@/components/features/games/game-detail/GameSidebar';
import VideoModal    from '@/components/features/games/game-detail/VideoModal';

interface GameDetailViewProps {
    game: TournamentInfo;
}

export default function GameDetailView({ game }: GameDetailViewProps) {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [activeScreenshot, setActiveScreenshot] = useState(0);

    // Gabungkan video thumbnail + screenshots menjadi satu array media
    const allMedia = [
        ...(game.videoUrl ? [{ type: 'video' as const, src: game.image }] : []),
        ...(game.screenshots?.map(s => ({ type: 'image' as const, src: s })) || []),
    ];

    return (
        <>
            <Header />
            <main className="main-container container-fluid d-flex pt-sm-20 pt-15 px-0 position-relative">
                <Sidebar />
                <article className="main-content mt-lg-20 mt-10 w-100">
                    <div className="gps-wrapper">

                        <GameHero image={game.image} title={game.title} />

                        <div className="gps-body">
                            {/* ── Kolom Kiri (konten utama) ── */}
                            <div className="gps-main-col">
                                <GameMeta
                                    image={game.image}
                                    title={game.title}
                                    slug={game.slug}
                                    rating={game.rating}
                                    players={game.players}
                                    videoUrl={game.videoUrl}
                                    onOpenTrailer={() => setIsVideoModalOpen(true)}
                                />

                                <GameGallery
                                    media={allMedia}
                                    activeIndex={activeScreenshot}
                                    onSelect={setActiveScreenshot}
                                    onOpenVideo={() => setIsVideoModalOpen(true)}
                                />

                                <GameAbout
                                    description={game.description}
                                    genre={game.genre}
                                    platform={game.platform}
                                    date={game.date}
                                    features={game.features}
                                />

                                <GameFeatures
                                    features={game.features || []}
                                    image={game.image}
                                />

                                {/* <GamePrivacy /> */}

                                <GameRating
                                    rating={game.rating}
                                    players={game.players}
                                />
                            </div>

                            {/* ── Kolom Kanan (sidebar) ── */}
                            <GameSidebar
                                slug={game.slug}
                                genre={game.genre}
                                date={game.date}
                                prizeMoney={game.prizeMoney}
                                currentGameId={game.id}
                                allGames={gamesData}
                            />
                        </div>

                    </div>
                </article>
            </main>

            {/* Video Modal — hanya render jika videoUrl ada dan modal terbuka */}
            {isVideoModalOpen && game.videoUrl && (
                <VideoModal
                    videoUrl={game.videoUrl}
                    onClose={() => setIsVideoModalOpen(false)}
                />
            )}

            <style jsx>{`
                /* ── CSS Variables (dark theme) ── */
                :root {
                    --bg-base:        #0f1118;
                    --bg-surface:     #1a1c25;
                    --bg-elevated:    #22252f;
                    --border:         rgba(255,255,255,0.08);
                    --border-subtle:  rgba(255,255,255,0.05);
                    --text-primary:   #e8eaed;
                    --text-secondary: #9aa0a6;
                    --text-muted:     #5f6368;
                    --accent:         #ff7a00;
                    --accent-hover:   #e86d00;
                    --accent-blue:    #8ab4f8;
                    --accent-green:   #81c995;
                    --star-color:     #f9ab00;
                }

                /* ── Wrapper & Layout ── */
                .gps-wrapper {
                    background: var(--bg-base);
                    min-height: 100vh;
                    font-family: 'Google Sans', 'Roboto', sans-serif;
                    color: var(--text-primary);
                }
                .gps-body {
                    display: flex;
                    gap: 32px;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px 80px;
                }
                .gps-main-col { flex: 1; min-width: 0; }

                @media (max-width: 768px) {
                    .gps-body { padding: 0 16px 60px; }
                }
            `}</style>
        </>
    );
}