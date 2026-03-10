"use client";

// components/GameRating.tsx
// Rating overview + bar distribusi + dummy ulasan + form review

import { useState } from "react";

const RATING_BARS = [
    { star: 5, pct: 80 },
    { star: 4, pct: 15 },
    { star: 3, pct: 3  },
    { star: 2, pct: 1  },
    { star: 1, pct: 1  },
];

const DUMMY_REVIEWS = [
    {
        id: 1,
        name: "Arya Pratama",
        avatar: "A",
        avatarBg: "#4f46e5",
        date: "12 Maret 2025",
        rating: 5,
        text: "Game yang luar biasa seru! Mekanisme merge-nya sangat adiktif dan ceritanya menarik. Sudah bermain 3 minggu dan belum bosan sama sekali.",
        helpful: 24,
        device: "Samsung Galaxy S23",
    },
    {
        id: 2,
        name: "Siti Nurhaliza",
        avatar: "S",
        avatarBg: "#0891b2",
        date: "5 Maret 2025",
        rating: 5,
        text: "Grafisnya cantik banget, alur ceritanya bikin penasaran. Tapi agak berat di HP lama. Overall recommended banget buat yang suka puzzle story!",
        helpful: 18,
        device: "Redmi Note 12",
    },
    {
        id: 3,
        name: "Budi Santoso",
        avatar: "B",
        avatarBg: "#059669",
        date: "28 Februari 2025",
        rating: 4,
        text: "Gameplay-nya asik, tapi ada beberapa bug kecil yang bikin frustasi. Semoga update berikutnya bisa diperbaiki. Tetap 4 bintang karena konsepnya bagus.",
        helpful: 9,
        device: "iPhone 14",
    },
];

interface GameRatingProps {
    rating: string;
    players: string;
}

export default function GameRating({ rating, players }: GameRatingProps) {
    const ratingNum = parseFloat(rating);
    const fullStars = Math.floor(ratingNum);
    const [reviewText, setReviewText] = useState("");
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [helpfulClicked, setHelpfulClicked] = useState<Set<number>>(new Set());

    const toggleHelpful = (id: number) => {
        setHelpfulClicked(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <>
            <div className="gr-section">
                <div className="gr-header">
                    <h2 className="gr-title">Rating dan ulasan</h2>
                    <a href="#" className="gr-see-all">
                        Lihat semua
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"/>
                        </svg>
                    </a>
                </div>

                {/* ── Overview ── */}
                <div className="gr-overview">
                    {/* Big score */}
                    <div className="gr-score-block">
                        <span className="gr-score-num">{rating}</span>
                        <div className="gr-stars">
                            {[1,2,3,4,5].map(s => (
                                <span key={s} className={s <= fullStars ? "gr-star on" : "gr-star"}>★</span>
                            ))}
                        </div>
                        <span className="gr-score-sub">{players} ulasan</span>
                    </div>

                    {/* Divider */}
                    <div className="gr-divider" />

                    {/* Bars */}
                    <div className="gr-bars">
                        {RATING_BARS.map(({ star, pct }) => (
                            <div key={star} className="gr-bar-row">
                                <span className="gr-bar-star">{star}</span>
                                <div className="gr-bar-track">
                                    <div className="gr-bar-fill" style={{ width: `${pct}%` }} />
                                </div>
                                <span className="gr-bar-pct">{pct}%</span>
                            </div>
                        ))}
                    </div>

                    {/* Quick summary */}
                    <div className="gr-summary">
                        <div className="gr-summary-pill">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
                                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                            </svg>
                            Gameplay menyenangkan
                        </div>
                        <div className="gr-summary-pill">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                            Grafis memukau
                        </div>
                        <div className="gr-summary-pill">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            Cerita seru
                        </div>
                    </div>
                </div>

                {/* ── Review Input ── */}
                <div className="gr-write-review">
                    <p className="gr-write-label">Bagikan pengalamanmu</p>

                    {/* Star picker */}
                    <div className="gr-star-picker">
                        {[1,2,3,4,5].map(s => (
                            <button
                                key={s}
                                className={`gr-pick-star${s <= (hoverRating || userRating) ? " active" : ""}`}
                                onMouseEnter={() => setHoverRating(s)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setUserRating(s)}
                                aria-label={`${s} bintang`}
                            >★</button>
                        ))}
                        {userRating > 0 && (
                            <span className="gr-pick-label">
                                {["", "Sangat buruk", "Kurang bagus", "Cukup baik", "Bagus", "Luar biasa!"][userRating]}
                            </span>
                        )}
                    </div>

                    <div className="gr-input-row">
                        <div className="gr-avatar me">U</div>
                        <div className="gr-field">
                            <textarea
                                placeholder="Jelaskan pengalaman kamu bermain game ini..."
                                rows={3}
                                value={reviewText}
                                onChange={e => setReviewText(e.target.value)}
                            />
                            <div className="gr-field-footer">
                                <span className="gr-char-count">{reviewText.length}/500</span>
                                <button
                                    className={`gr-post-btn${reviewText.trim() && userRating > 0 ? " active" : ""}`}
                                    disabled={!reviewText.trim() || userRating === 0}
                                >
                                    Posting ulasan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Dummy Reviews ── */}
                <div className="gr-reviews">
                    {DUMMY_REVIEWS.map((review) => (
                        <div key={review.id} className="gr-review-card">
                            <div className="gr-review-top">
                                <div className="gr-reviewer">
                                    <div className="gr-avatar" style={{ background: review.avatarBg }}>
                                        {review.avatar}
                                    </div>
                                    <div>
                                        <span className="gr-reviewer-name">{review.name}</span>
                                        <span className="gr-review-device">{review.device}</span>
                                    </div>
                                </div>
                                <button className="gr-more-btn" aria-label="Opsi">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                                    </svg>
                                </button>
                            </div>

                            <div className="gr-review-meta">
                                <div className="gr-review-stars">
                                    {[1,2,3,4,5].map(s => (
                                        <span key={s} className={s <= review.rating ? "gr-star on sm" : "gr-star sm"}>★</span>
                                    ))}
                                </div>
                                <span className="gr-review-date">{review.date}</span>
                            </div>

                            <p className="gr-review-text">{review.text}</p>

                            <div className="gr-review-footer">
                                <span className="gr-helpful-label">Ulasan ini membantu?</span>
                                <button
                                    className={`gr-helpful-btn${helpfulClicked.has(review.id) ? " clicked" : ""}`}
                                    onClick={() => toggleHelpful(review.id)}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill={helpfulClicked.has(review.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
                                        <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                                    </svg>
                                    Ya ({helpfulClicked.has(review.id) ? review.helpful + 1 : review.helpful})
                                </button>
                                <button className="gr-helpful-btn">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/>
                                        <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                                    </svg>
                                    Tidak
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                /* ── Section ── */
                .gr-section {
                    padding: 28px 0;
                    border-bottom: 1px solid var(--border, rgba(255,255,255,0.08));
                }

                /* ── Header ── */
                .gr-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
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
                    text-decoration: none;
                    font-weight: 500;
                    transition: opacity 0.15s;
                }
                .gr-see-all:hover { opacity: 0.75; }

                /* ── Overview ── */
                .gr-overview {
                    display: grid;
                    grid-template-columns: auto 1px 1fr auto;
                    gap: 28px;
                    align-items: center;
                    padding: 20px 24px;
                    background: var(--bg-surface, rgba(255,255,255,0.03));
                    border: 1px solid var(--border, rgba(255,255,255,0.07));
                    border-radius: 14px;
                    margin-bottom: 20px;
                }

                /* Score */
                .gr-score-block {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    min-width: 90px;
                }
                .gr-score-num {
                    font-size: 4rem;
                    font-weight: 300;
                    color: var(--text-primary, #e8eaed);
                    line-height: 1;
                    letter-spacing: -2px;
                }
                .gr-stars { display: flex; gap: 2px; }
                .gr-star { font-size: 1rem; color: var(--bg-elevated, rgba(255,255,255,0.15)); }
                .gr-star.on { color: var(--star-color, #f59e0b); }
                .gr-star.sm { font-size: 0.82rem; }
                .gr-score-sub {
                    font-size: 0.72rem;
                    color: var(--text-muted, rgba(255,255,255,0.4));
                    margin-top: 2px;
                    white-space: nowrap;
                }

                /* Vertical divider */
                .gr-divider {
                    width: 1px;
                    height: 80px;
                    background: var(--border, rgba(255,255,255,0.08));
                }

                /* Bars */
                .gr-bars {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                }
                .gr-bar-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .gr-bar-star {
                    font-size: 0.75rem;
                    color: var(--text-muted, rgba(255,255,255,0.4));
                    width: 10px;
                    text-align: right;
                    flex-shrink: 0;
                }
                .gr-bar-track {
                    flex: 1;
                    height: 5px;
                    background: var(--bg-elevated, rgba(255,255,255,0.08));
                    border-radius: 3px;
                    overflow: hidden;
                }
                .gr-bar-fill {
                    height: 100%;
                    background: var(--star-color, #f59e0b);
                    border-radius: 3px;
                    transition: width 0.6s ease;
                }
                .gr-bar-pct {
                    font-size: 0.7rem;
                    color: var(--text-muted, rgba(255,255,255,0.35));
                    width: 28px;
                    text-align: right;
                    flex-shrink: 0;
                }

                /* Summary pills */
                .gr-summary {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                }
                .gr-summary-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 12px;
                    background: rgba(245,158,11,0.08);
                    border: 1px solid rgba(245,158,11,0.18);
                    border-radius: 20px;
                    font-size: 0.75rem;
                    color: var(--text-primary, #e8eaed);
                    white-space: nowrap;
                }
                .gr-summary-pill svg { color: #f59e0b; flex-shrink: 0; }

                /* ── Write Review ── */
                .gr-write-review {
                    padding: 18px 20px;
                    background: var(--bg-surface, rgba(255,255,255,0.02));
                    border: 1px solid var(--border, rgba(255,255,255,0.07));
                    border-radius: 14px;
                    margin-bottom: 20px;
                }
                .gr-write-label {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--text-primary, #e8eaed);
                    margin: 0 0 12px;
                }

                /* Star picker */
                .gr-star-picker {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    margin-bottom: 14px;
                }
                .gr-pick-star {
                    background: none;
                    border: none;
                    font-size: 1.6rem;
                    color: var(--bg-elevated, rgba(255,255,255,0.15));
                    cursor: pointer;
                    padding: 0 2px;
                    line-height: 1;
                    transition: color 0.12s, transform 0.12s;
                }
                .gr-pick-star.active { color: #f59e0b; }
                .gr-pick-star:hover { transform: scale(1.15); }
                .gr-pick-label {
                    font-size: 0.8rem;
                    color: #f59e0b;
                    font-weight: 600;
                    margin-left: 6px;
                }

                /* Input row */
                .gr-input-row {
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                }
                .gr-avatar {
                    width: 36px; height: 36px;
                    border-radius: 50%;
                    background: var(--accent, #ff8c00);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 0.875rem;
                    flex-shrink: 0;
                }
                .gr-avatar.me { background: var(--accent, #ff8c00); }

                .gr-field { flex: 1; }
                .gr-field textarea {
                    width: 100%;
                    background: var(--bg-elevated, rgba(255,255,255,0.05));
                    border: 1px solid var(--border, rgba(255,255,255,0.1));
                    border-radius: 10px;
                    padding: 10px 14px;
                    font-size: 0.875rem;
                    color: var(--text-primary, #e8eaed);
                    outline: none;
                    resize: none;
                    font-family: inherit;
                    transition: border-color 0.15s;
                    box-sizing: border-box;
                }
                .gr-field textarea:focus { border-color: rgba(245,158,11,0.45); }
                .gr-field textarea::placeholder { color: var(--text-muted, rgba(255,255,255,0.35)); }

                .gr-field-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 8px;
                }
                .gr-char-count { font-size: 0.72rem; color: var(--text-muted, rgba(255,255,255,0.3)); }
                .gr-post-btn {
                    padding: 7px 18px;
                    border-radius: 20px;
                    border: 1.5px solid rgba(255,255,255,0.12);
                    background: transparent;
                    color: rgba(255,255,255,0.35);
                    font-size: 0.82rem;
                    font-weight: 600;
                    cursor: not-allowed;
                    font-family: inherit;
                    transition: all 0.15s;
                }
                .gr-post-btn.active {
                    background: #ff8c00;
                    border-color: #ff8c00;
                    color: #fff;
                    cursor: pointer;
                }
                .gr-post-btn.active:hover { filter: brightness(1.1); }

                /* ── Reviews ── */
                .gr-reviews {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                .gr-review-card {
                    padding: 18px 0;
                    border-bottom: 1px solid var(--border, rgba(255,255,255,0.06));
                }
                .gr-review-card:last-child { border-bottom: none; }

                .gr-review-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                }
                .gr-reviewer {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .gr-reviewer-name {
                    display: block;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--text-primary, #e8eaed);
                    line-height: 1.2;
                }
                .gr-review-device {
                    display: block;
                    font-size: 0.72rem;
                    color: var(--text-muted, rgba(255,255,255,0.38));
                    margin-top: 2px;
                }
                .gr-more-btn {
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
                .gr-more-btn:hover { background: rgba(255,255,255,0.06); }

                .gr-review-meta {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 8px;
                }
                .gr-review-date { font-size: 0.72rem; color: var(--text-muted, rgba(255,255,255,0.35)); }

                .gr-review-text {
                    font-size: 0.875rem;
                    color: var(--text-secondary, rgba(255,255,255,0.7));
                    line-height: 1.6;
                    margin: 0 0 12px;
                }

                .gr-review-footer {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .gr-helpful-label {
                    font-size: 0.75rem;
                    color: var(--text-muted, rgba(255,255,255,0.35));
                    margin-right: 2px;
                }
                .gr-helpful-btn {
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
                .gr-helpful-btn:hover {
                    background: rgba(255,255,255,0.06);
                    border-color: rgba(255,255,255,0.2);
                    color: var(--text-primary, #e8eaed);
                }
                .gr-helpful-btn.clicked {
                    background: rgba(255, 140, 0, 0.1);
                    border-color: rgba(255, 140, 0, 0.3);
                    color: #ff8c00;
                }

                /* ── Responsive ── */
                @media (max-width: 900px) {
                    .gr-overview {
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: auto auto;
                    }
                    .gr-divider { display: none; }
                    .gr-score-block { grid-column: 1; grid-row: 1; }
                    .gr-bars        { grid-column: 2; grid-row: 1; }
                    .gr-summary     { grid-column: 1 / -1; grid-row: 2; flex-direction: row; flex-wrap: wrap; }
                }

                @media (max-width: 600px) {
                    .gr-overview {
                        grid-template-columns: 1fr;
                        padding: 16px;
                        gap: 16px;
                    }
                    .gr-score-block { flex-direction: row; gap: 12px; align-items: center; }
                    .gr-score-num   { font-size: 2.8rem; }
                    .gr-summary     { flex-direction: row; flex-wrap: wrap; gap: 6px; }
                }
            `}</style>
        </>
    );
}