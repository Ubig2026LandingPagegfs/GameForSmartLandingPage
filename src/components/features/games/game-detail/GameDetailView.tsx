"use client";

// GameDetailView.tsx
// Komponen utama halaman detail game.

import { useState } from 'react';
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { TournamentInfo } from '@/data/types';
// Hot reload trigger
import gamesRaw from '@/data/games.json';
const gamesData = gamesRaw as TournamentInfo[];

import GameHero     from '@/components/features/games/game-detail/GameHero';
import GameMeta     from '@/components/features/games/game-detail/GameMeta';
import GameGallery  from '@/components/features/games/game-detail/GameGallery';
import GameAbout    from '@/components/features/games/game-detail/GameAbout';
import GameFeatures from '@/components/features/games/game-detail/GameFeatures';
import GameExtraDetails from '@/components/features/games/game-detail/GameExtraDetails';
import GameRating   from '@/components/features/games/game-detail/GameRating';
import GameSidebar  from '@/components/features/games/game-detail/GameSidebar';
import VideoModal   from '@/components/features/games/game-detail/VideoModal';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import Footer from '@/components/shared/Footer';

interface GameDetailViewProps {
    game: TournamentInfo;
}

export default function GameDetailView({ game }: GameDetailViewProps) {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [activeScreenshot, setActiveScreenshot] = useState(0);

    const getYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = game.videoUrl ? getYoutubeId(game.videoUrl) : null;
    const videoThumb = videoId 
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : (game.screenshots?.[0] || game.image);

    const allMedia = [
        ...(game.videoUrl ? [{ type: 'video' as const, src: videoThumb }] : []),
        ...(game.screenshots?.map((s: string) => ({ type: 'image' as const, src: s })) || []),
    ];

    const customCrumbs = [
        { href: '/games', label: 'Games', isLast: false },
        { href: `/games/${game.slug}`, label: game.title, isLast: true }
    ];

    return (
        <>
            <Header />

            <GameHero image={game.image} title={game.title} videoUrl={game.videoUrl}>
                <GameMeta
                    image={game.image}
                    title={game.title}
                    slug={game.slug}
                    rating={game.rating}
                    players={game.players}
                    videoUrl={game.videoUrl}
                    playUrl={game.playUrl}
                    logo={game.logo}
                    onOpenTrailer={() => setIsVideoModalOpen(true)}
                />
            </GameHero>

            <main className="page-main">
                <Sidebar />
                <article className="page-article">
                    <div className="breadcrumb-wrapper px-lg-18 px-md-10 px-6 mb-4">
                        <Breadcrumbs customCrumbs={customCrumbs} />
                    </div>
                    <div className="page-body">

                        {/* ── Konten Utama ── */}
                        <div className="content-col">
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
                            <GameExtraDetails 
                                howToPlay={game.howToPlay}
                                characters={game.characters}
                                charactersTitle={game.charactersTitle}
                                categories={game.categories}
                            />
                            <GameRating
                                title={game.title}
                                image={game.image}
                                rating={game.rating}
                                players={game.players}
                            />
                        </div>

                        {/* ── Sidebar Kanan ── */}
                        <GameSidebar
                            slug={game.slug}
                            genre={game.genre}
                            date={game.date}
                            prizeMoney={game.prizeMoney}
                            currentGameId={game.id}
                            currentGameTitle={game.title}
                            allGames={gamesData}
                            playUrl={game.playUrl}
                        />

                    </div>
                </article>
            </main>
            <Footer/>

            {isVideoModalOpen && game.videoUrl && (
                <VideoModal
                    videoUrl={game.videoUrl}
                    onClose={() => setIsVideoModalOpen(false)}
                />
            )}

            <style jsx global>{`
                /* ── Design Tokens ── */
                :root {
                    --bg-base:         #0d0f17;
                    --bg-surface:      #161922;
                    --bg-elevated:     #1e2130;
                    --border:          rgba(255, 255, 255, 0.07);
                    --border-hover:    rgba(255, 255, 255, 0.14);
                    --text-primary:    #e8eaf0;
                    --text-secondary:  #8b90a0;
                    --text-muted:      #50566a;
                    --accent:          #ff8c00;
                    --accent-hover:    #e07800;
                    --accent-dim:      rgba(255, 140, 0, 0.12);
                    --accent-blue:     #7eb8f7;
                    --accent-green:    #6fcf97;
                    --star-color:      #f5a623;
                    --radius-sm:       6px;
                    --radius-md:       10px;
                    --radius-lg:       14px;

                    /* Spacing scale */
                    --space-xs:  8px;
                    --space-sm:  12px;
                    --space-md:  20px;
                    --space-lg:  32px;
                    --space-xl:  48px;
                    --space-2xl: 64px;

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
                /* ── Page Shell ── */
                .page-main {
                    display: flex;
                    background: var(--bg-base);
                    min-height: 100vh;
                    color: var(--text-primary);
                    font-family: 'Outfit', 'DM Sans', system-ui, sans-serif;
                    max-width: 100%;
                    box-sizing: border-box;
                    padding-top: var(--space-xl);
                    padding-bottom: var(--space-xl);
                }

                .page-article {
                    flex: 1;
                    min-width: 0;
                }

                /* ── Page Body ── */
                .page-body {
                    display: flex;
                    gap: var(--space-lg);
                    padding: 0 var(--page-px) var(--space-2xl);
                    width: 100%;
                    box-sizing: border-box;
                }

                /* ── Column widths ── */
                .content-col {
                    flex: 1;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                }

                /* ── Responsive ── */
                @media (max-width: 860px) {
                    .page-body {
                        flex-direction: column;
                        padding-top: var(--space-lg);
                    }
                }

                @media (max-width: 480px) {
                    .page-body {
                        gap: var(--space-md);
                        padding: var(--space-md) var(--page-px) var(--space-xl);
                    }
                }
            `}</style>
        </>
    );
}
