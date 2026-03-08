// components/GameRating.tsx
// Seksi rating & ulasan: angka besar, bar distribusi bintang, dan form review

const RATING_BARS = [
    { star: 5, pct: 80 },
    { star: 4, pct: 15 },
    { star: 3, pct: 3 },
    { star: 2, pct: 1 },
    { star: 1, pct: 1 },
];

interface GameRatingProps {
    rating: string;
    players: string;
}

export default function GameRating({ rating, players }: GameRatingProps) {
    const ratingNum = Math.floor(parseFloat(rating));

    return (
        <>
            <div className="gps-section">
                <div className="gps-section-header">
                    <h2 className="gps-section-title">Rating dan ulasan</h2>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </div>

                {/* Score + Bars */}
                <div className="gps-rating-layout">
                    <div className="gps-rating-big">
                        <span className="gps-rating-number">{rating}</span>
                        <div className="gps-stars">
                            {[1,2,3,4,5].map(s => (
                                <span key={s} className={s <= ratingNum ? 'star-on' : 'star-off'}>★</span>
                            ))}
                        </div>
                        <span className="gps-rating-count">{players} ulasan</span>
                    </div>

                    <div className="gps-rating-bars">
                        {RATING_BARS.map(({ star, pct }) => (
                            <div key={star} className="gps-bar-row">
                                <span className="gps-bar-label">{star}</span>
                                <div className="gps-bar-track">
                                    <div className="gps-bar-fill" style={{ width: `${pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Review input */}
                <div className="gps-review-input">
                    <div className="gps-review-avatar">U</div>
                    <div className="gps-review-field">
                        <textarea placeholder="Jelaskan pengalaman kamu bermain game ini..." rows={1} />
                        <div className="gps-review-actions">
                            <button className="gps-review-post">Posting</button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .gps-section { padding: 24px 0; border-bottom: 1px solid var(--border); }
                .gps-section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                    cursor: pointer;
                    color: var(--text-secondary);
                }
                .gps-section-header:hover { color: var(--text-primary); }
                .gps-section-title { font-size: 1.125rem; font-weight: 600; color: var(--text-primary); margin: 0; }

                .gps-rating-layout { display: flex; gap: 32px; align-items: center; margin-bottom: 20px; }
                .gps-rating-big { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
                .gps-rating-number { font-size: 3.5rem; font-weight: 400; color: var(--text-primary); line-height: 1; }
                .gps-stars { font-size: 1.1rem; margin: 4px 0; }
                .star-on { color: var(--star-color); }
                .star-off { color: var(--bg-elevated); }
                .gps-rating-count { font-size: 0.78rem; color: var(--text-muted); }

                .gps-rating-bars { flex: 1; display: flex; flex-direction: column; gap: 6px; }
                .gps-bar-row { display: flex; align-items: center; gap: 10px; }
                .gps-bar-label { font-size: 0.78rem; color: var(--text-muted); width: 10px; text-align: right; flex-shrink: 0; }
                .gps-bar-track { flex: 1; height: 6px; background: var(--bg-elevated); border-radius: 3px; overflow: hidden; }
                .gps-bar-fill { height: 100%; background: var(--star-color); border-radius: 3px; }

                .gps-review-input {
                    display: flex; gap: 12px; align-items: flex-start;
                    padding: 16px;
                    background: var(--bg-surface);
                    border-radius: 10px;
                    border: 1px solid var(--border);
                }
                .gps-review-avatar {
                    width: 36px; height: 36px;
                    border-radius: 50%;
                    background: var(--accent); color: #fff;
                    display: flex; align-items: center; justify-content: center;
                    font-weight: 700; flex-shrink: 0;
                }
                .gps-review-field { flex: 1; }
                .gps-review-field textarea {
                    width: 100%; background: transparent; border: none;
                    font-size: 0.875rem; color: var(--text-primary);
                    outline: none; resize: none; font-family: inherit;
                }
                .gps-review-field textarea::placeholder { color: var(--text-muted); }
                .gps-review-actions { display: flex; justify-content: flex-end; }
                .gps-review-post {
                    background: none; border: none;
                    color: var(--accent-blue); font-weight: 700;
                    font-size: 0.875rem; cursor: pointer;
                    padding: 4px 8px; border-radius: 4px;
                }
                .gps-review-post:hover { background: rgba(138,180,248,0.1); }

                @media (max-width: 768px) {
                    .gps-rating-layout { flex-direction: column; gap: 16px; }
                }
            `}</style>
        </>
    );
}