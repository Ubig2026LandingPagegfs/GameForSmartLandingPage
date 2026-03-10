"use client";

// components/features/games/game-detail/GameRating.tsx
// Orchestrator — hanya menyusun sub-komponen rating

import { useState } from "react";
import RatingOverview  from "./rating/RatingOverview";
import ReviewForm      from "./rating/ReviewForm";
import ReviewCard      from "./rating/ReviewCard";
import ReviewListModal from "./rating/ReviewListModal";
import { DUMMY_REVIEWS } from "@/data/rating";

interface GameRatingProps {
    title: string;
    image: string;
    rating: string;
    players: string;
}

export default function GameRating({ title, image, rating, players }: GameRatingProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="gr-section">
                {/* Section header */}
                <div className="gr-header">
                    <h2 className="gr-title">Rating dan ulasan</h2>
                    <button className="gr-see-all" onClick={() => setIsModalOpen(true)}>
                        Lihat semua
                        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"/>
                        </svg>
                    </button>
                </div>

                {/* Score + bars + pills */}
                <RatingOverview rating={rating} players={players} />

                {/* Write review form */}
                <ReviewForm />

                {/* Review list */}
                <div className="gr-reviews">
                    {DUMMY_REVIEWS.map((review, i) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            showDevResponse={i === 0}
                        />
                    ))}
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <ReviewListModal
                    title={title}
                    image={image}
                    reviews={DUMMY_REVIEWS}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            <style jsx>{`
                .gr-section {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    padding-bottom: 28px;
                    border-bottom: 1px solid var(--border, rgba(255,255,255,0.08));
                }

                .gr-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .gr-title {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: var(--text-primary, #e8eaed);
                    margin: 0;
                }
                .gr-see-all {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.82rem;
                    color: var(--accent-blue, #8ab4f8);
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-weight: 500;
                    transition: opacity 0.15s;
                    font-family: inherit;
                    padding: 0;
                }
                .gr-see-all:hover { opacity: 0.75; }

                .gr-reviews {
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
        </>
    );
}