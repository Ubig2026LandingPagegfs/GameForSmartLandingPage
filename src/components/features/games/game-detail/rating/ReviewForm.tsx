// components/features/games/game-detail/rating/ReviewForm.tsx

"use client";

import { useState } from "react";

export default function ReviewForm() {
    const [reviewText, setReviewText] = useState("");
    const [userRating, setUserRating]   = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const RATING_LABELS = ["", "Sangat buruk", "Kurang bagus", "Cukup baik", "Bagus", "Luar biasa!"];
    const activeRating  = hoverRating || userRating;
    const canSubmit     = reviewText.trim().length > 0 && userRating > 0;

    return (
        <>
            <div className="rf-wrap">
                <p className="rf-label">Bagikan pengalamanmu</p>

                {/* Star picker */}
                <div className="rf-star-picker">
                    {[1, 2, 3, 4, 5].map(s => (
                        <button
                            key={s}
                            className={`rf-star${s <= activeRating ? " active" : ""}`}
                            onMouseEnter={() => setHoverRating(s)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setUserRating(s)}
                            aria-label={`${s} bintang`}
                        >
                            ★
                        </button>
                    ))}
                    {userRating > 0 && (
                        <span className="rf-star-label">{RATING_LABELS[userRating]}</span>
                    )}
                </div>

                {/* Input */}
                <div className="rf-input-row">
                    <div className="rf-avatar">U</div>
                    <div className="rf-field">
                        <textarea
                            placeholder="Jelaskan pengalaman kamu bermain game ini..."
                            rows={3}
                            maxLength={500}
                            value={reviewText}
                            onChange={e => setReviewText(e.target.value)}
                        />
                        <div className="rf-footer">
                            <span className="rf-char-count">{reviewText.length}/500</span>
                            <button
                                className={`rf-submit${canSubmit ? " active" : ""}`}
                                disabled={!canSubmit}
                            >
                                Posting ulasan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .rf-wrap {
                    padding: 18px 20px;
                    background: var(--bg-surface, rgba(255,255,255,0.02));
                    border: 1px solid var(--border, rgba(255,255,255,0.07));
                    border-radius: 14px;
                }
                .rf-label {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--text-primary, #e8eaed);
                    margin: 0 0 12px;
                }

                /* Stars */
                .rf-star-picker {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    margin-bottom: 14px;
                }
                .rf-star {
                    background: none;
                    border: none;
                    font-size: 1.6rem;
                    color: var(--bg-elevated, rgba(255,255,255,0.15));
                    cursor: pointer;
                    padding: 0 2px;
                    line-height: 1;
                    transition: color 0.12s, transform 0.12s;
                }
                .rf-star.active  { color: #01875f; }
                .rf-star:hover   { transform: scale(1.15); }
                .rf-star-label {
                    font-size: 0.8rem;
                    color: #01875f;
                    font-weight: 600;
                    margin-left: 6px;
                }

                /* Input row */
                .rf-input-row {
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                }
                .rf-avatar {
                    width: 36px;
                    height: 36px;
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
                .rf-field { flex: 1; }
                .rf-field textarea {
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
                .rf-field textarea:focus   { border-color: rgba(245,158,11,0.45); }
                .rf-field textarea::placeholder { color: var(--text-muted, rgba(255,255,255,0.35)); }

                .rf-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 8px;
                }
                .rf-char-count { font-size: 0.72rem; color: var(--text-muted, rgba(255,255,255,0.3)); }

                .rf-submit {
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
                .rf-submit.active {
                    background: var(--accent, #ff8c00);
                    border-color: var(--accent, #ff8c00);
                    color: #fff;
                    cursor: pointer;
                }
                .rf-submit.active:hover { filter: brightness(1.1); }
            `}</style>
        </>
    );
}