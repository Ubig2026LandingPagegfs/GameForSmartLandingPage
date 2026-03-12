// components/features/games/game-detail/rating/ReviewCard.tsx

"use client";

import { useState } from "react";
import RatingStars from "./RatingStars";
import { Review } from "@/data/rating";

interface ReviewCardProps {
    review: Review;
    showDevResponse?: boolean;
}

export default function ReviewCard({ review, showDevResponse = false }: ReviewCardProps) {
    const [helpful, setHelpful] = useState(false);

    return (
        <>
            <div className="rc-card">
                {/* Top row */}
                <div className="rc-top">
                    <div className="rc-user">
                        <div className="rc-avatar" style={{ background: review.avatarBg }}>
                            {review.avatar}
                        </div>
                        <div>
                            <span className="rc-name">{review.name}</span>
                            <span className="rc-device">{review.device}</span>
                        </div>
                    </div>
                    <button className="rc-more" aria-label="Opsi">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="5" r="1.5"/>
                            <circle cx="12" cy="12" r="1.5"/>
                            <circle cx="12" cy="19" r="1.5"/>
                        </svg>
                    </button>
                </div>

                {/* Meta */}
                <div className="rc-meta">
                    <RatingStars rating={review.rating} size="sm" color="#ff8c00" />
                    <span className="rc-date">{review.date}</span>
                </div>

                {/* Text */}
                <p className="rc-text">{review.text}</p>

                {/* Footer */}
                <div className="rc-footer">
                    <span className="rc-helpful-label">Ulasan ini membantu?</span>
                    <button
                        className={`rc-action-btn${helpful ? " active" : ""}`}
                        onClick={() => setHelpful(prev => !prev)}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24"
                            fill={helpful ? "currentColor" : "none"}
                            stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
                            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                        </svg>
                        Ya ({helpful ? review.helpful + 1 : review.helpful})
                    </button>
                    <button className="rc-action-btn">
                        <svg width="13" height="13" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/>
                            <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                        </svg>
                        Tidak
                    </button>
                </div>

                {/* Developer response */}
                {showDevResponse && (
                    <div className="rc-dev-response">
                        <div className="rc-dev-header">
                            <span className="rc-dev-name">Gameforsmart.com</span>
                            <span className="rc-dev-date">13 Maret 2025</span>
                        </div>
                        <p className="rc-dev-text">
                            Halo {review.name.split(" ")[0]}! Senang sekali mendengar kamu menyukai game kami.
                            Kami akan terus berusaha memberikan konten menarik untuk kamu. Terima kasih sudah bermain!
                        </p>
                    </div>
                )}
            </div>

            <style jsx>{`
                .rc-card {
                    padding: 18px 0;
                    border-bottom: 1px solid var(--border, rgba(255,255,255,0.06));
                }
                .rc-card:last-child { border-bottom: none; }

                /* Top */
                .rc-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                }
                .rc-user {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .rc-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 0.875rem;
                    flex-shrink: 0;
                }
                .rc-name {
                    display: block;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--text-primary, #e8eaed);
                    line-height: 1.2;
                }
                .rc-device {
                    display: block;
                    font-size: 0.72rem;
                    color: var(--text-muted, rgba(255,255,255,0.38));
                    margin-top: 2px;
                }
                .rc-more {
                    background: none;
                    border: none;
                    color: var(--text-muted, rgba(255,255,255,0.35));
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    transition: background 0.15s;
                }
                .rc-more:hover { background: rgba(255,255,255,0.06); }

                /* Meta */
                .rc-meta {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 8px;
                }
                .rc-date {
                    font-size: 0.72rem;
                    color: var(--text-muted, rgba(255,255,255,0.35));
                }

                /* Text */
                .rc-text {
                    font-size: 0.875rem;
                    color: var(--text-secondary, rgba(255,255,255,0.7));
                    line-height: 1.6;
                    margin: 0 0 12px;
                }

                /* Footer */
                .rc-footer {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                .rc-helpful-label {
                    font-size: 0.75rem;
                    color: var(--text-muted, rgba(255,255,255,0.35));
                }
                .rc-action-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    padding: 5px 12px;
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 20px;
                    color: var(--text-muted, rgba(255,255,255,0.45));
                    font-size: 0.75rem;
                    cursor: pointer;
                    font-family: inherit;
                    transition: all 0.15s;
                }
                .rc-action-btn:hover {
                    background: rgba(255,255,255,0.06);
                    border-color: rgba(255,255,255,0.2);
                    color: var(--text-primary, #e8eaed);
                }
                .rc-action-btn.active {
                    background: rgba(255,140,0,0.1);
                    border-color: rgba(255,140,0,0.3);
                    color: var(--accent, #ff8c00);
                }

                /* Dev response */
                .rc-dev-response {
                    margin-top: 14px;
                    padding: 14px 16px;
                    background: rgba(255,255,255,0.03);
                    border-left: 3px solid rgba(255,255,255,0.1);
                    border-radius: 0 8px 8px 0;
                }
                .rc-dev-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 6px;
                }
                .rc-dev-name {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: var(--text-primary, #e8eaed);
                }
                .rc-dev-date {
                    font-size: 0.72rem;
                    color: var(--text-muted, rgba(255,255,255,0.35));
                }
                .rc-dev-text {
                    font-size: 0.82rem;
                    color: var(--text-secondary, rgba(255,255,255,0.6));
                    line-height: 1.5;
                    margin: 0;
                }
            `}</style>
        </>
    );
}