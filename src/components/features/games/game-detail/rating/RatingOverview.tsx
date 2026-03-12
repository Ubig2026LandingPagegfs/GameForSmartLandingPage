// components/features/games/game-detail/rating/RatingOverview.tsx

import RatingStars from "./RatingStars";
import { RATING_BARS } from "@/data/rating";

interface RatingOverviewProps {
    rating: string;
    players: string;
}

const SUMMARY_PILLS = [
    {
        label: "Gameplay menyenangkan",
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
        ),
    },
    {
        label: "Grafis memukau",
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
        ),
    },
    {
        label: "Cerita seru",
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
        ),
    },
];

export default function RatingOverview({ rating, players }: RatingOverviewProps) {
    const ratingNum = parseFloat(rating);

    return (
        <>
            <div className="ro-overview">
                {/* Big score */}
                <div className="ro-score-block">
                    <span className="ro-score-num">{rating}</span>
                    <RatingStars rating={Math.floor(ratingNum)} size="md" />
                    <span className="ro-score-sub">{players} ulasan</span>
                </div>

                <div className="ro-divider" />

                {/* Rating bars */}
                <div className="ro-bars">
                    {RATING_BARS.map(({ star, pct }) => (
                        <div key={star} className="ro-bar-row">
                            <span className="ro-bar-label">{star}</span>
                            <div className="ro-bar-track">
                                <div className="ro-bar-fill" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="ro-bar-pct">{pct}%</span>
                        </div>
                    ))}
                </div>

                {/* Summary pills */}
                <div className="ro-pills">
                    {SUMMARY_PILLS.map(({ label, icon }) => (
                        <div key={label} className="ro-pill">
                            {icon}
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .ro-overview {
                    display: grid;
                    grid-template-columns: auto 1px 1fr auto;
                    gap: 28px;
                    align-items: center;
                    padding: 20px 24px;
                    background: var(--bg-surface, rgba(255,255,255,0.03));
                    border: 1px solid var(--border, rgba(255,255,255,0.07));
                    border-radius: 14px;
                }

                /* Score */
                .ro-score-block {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    min-width: 90px;
                }
                .ro-score-num {
                    font-size: 4rem;
                    font-weight: 300;
                    color: var(--text-primary, #e8eaed);
                    line-height: 1;
                    letter-spacing: -2px;
                }
                .ro-score-sub {
                    font-size: 0.72rem;
                    color: var(--text-muted, rgba(255,255,255,0.4));
                    white-space: nowrap;
                }

                /* Divider */
                .ro-divider {
                    width: 1px;
                    height: 80px;
                    background: var(--border, rgba(255,255,255,0.08));
                }

                /* Bars */
                .ro-bars {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                }
                .ro-bar-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .ro-bar-label {
                    font-size: 0.75rem;
                    color: var(--text-muted, rgba(255,255,255,0.4));
                    width: 10px;
                    text-align: right;
                    flex-shrink: 0;
                }
                .ro-bar-track {
                    flex: 1;
                    height: 5px;
                    background: var(--bg-elevated, rgba(255,255,255,0.08));
                    border-radius: 3px;
                    overflow: hidden;
                }
                .ro-bar-fill {
                    height: 100%;
                    background: #ff8c00;
                    border-radius: 3px;
                    transition: width 0.6s ease;
                }
                .ro-bar-pct {
                    font-size: 0.7rem;
                    color: var(--text-muted, rgba(255,255,255,0.35));
                    width: 28px;
                    text-align: right;
                    flex-shrink: 0;
                }

                /* Pills */
                .ro-pills {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                }
                .ro-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 12px;
                    background: rgba(255, 140, 0, 0.08);
                    border: 1px solid rgba(255, 140, 0, 0.18);
                    border-radius: 20px;
                    font-size: 0.75rem;
                    color: var(--text-primary, #e8eaed);
                    white-space: nowrap;
                }
                .ro-pill svg { color: #ff8c00; flex-shrink: 0; }

                /* Responsive */
                @media (max-width: 900px) {
                    .ro-overview {
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: auto auto;
                    }
                    .ro-divider { display: none; }
                    .ro-score-block { grid-column: 1; grid-row: 1; }
                    .ro-bars        { grid-column: 2; grid-row: 1; }
                    .ro-pills       { grid-column: 1 / -1; grid-row: 2; flex-direction: row; flex-wrap: wrap; }
                }
                @media (max-width: 600px) {
                    .ro-overview { grid-template-columns: 1fr; padding: 16px; gap: 16px; }
                    .ro-score-block { flex-direction: row; gap: 12px; align-items: center; }
                    .ro-score-num   { font-size: 2.8rem; }
                    .ro-pills       { flex-direction: row; flex-wrap: wrap; gap: 6px; }
                }
            `}</style>
        </>
    );
}