"use client";

interface HowToPlay {
    step: number;
    title: string;
    description: string;
}

interface Character {
    name: string;
    icon: string;
    description: string;
}

interface GameExtraDetailsProps {
    howToPlay?: HowToPlay[];
    characters?: Character[];
    charactersTitle?: string;
    categories?: string[];
}

export default function GameExtraDetails({ howToPlay, characters, charactersTitle, categories }: GameExtraDetailsProps) {
    if (!howToPlay?.length && !characters?.length && !categories?.length) return null;

    return (
        <>
            {howToPlay && howToPlay.length > 0 && (
                <div className="gps-section">
                    <div className="gps-section-header">
                        <h2 className="gps-section-title">Cara Bermain</h2>
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    </div>
                    <div className="gps-how-to-play">
                        {howToPlay.map((item) => (
                            <div key={item.step} className="gps-step-card">
                                <div className="gps-step-num">{item.step}</div>
                                <div className="gps-step-body">
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {characters && characters.length > 0 && (
                <div className="gps-section">
                    <div className="gps-section-header">
                        <h2 className="gps-section-title">{charactersTitle || "Pilih Karaktermu"}</h2>
                    </div>
                    <div className="gps-chars-grid">
                        {characters.map((char, idx) => (
                            <div key={idx} className="gps-char-card">
                                <div className="gps-char-icon">{char.icon}</div>
                                <div className="gps-char-info">
                                    <h4>{char.name}</h4>
                                    <p>{char.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {categories && categories.length > 0 && (
                <div className="gps-section">
                    <div className="gps-section-header">
                        <h2 className="gps-section-title">Kategori Soal</h2>
                    </div>
                    <div className="gps-categories">
                        {categories.map((cat, idx) => (
                            <span key={idx} className="gps-cat-pill">{cat}</span>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
                .gps-section {
                    padding: 24px 0;
                    border-bottom: 1px solid var(--border, rgba(255,255,255,0.08));
                }
                .gps-section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    color: var(--text-secondary, #8b90a0);
                }
                .gps-section-title {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: var(--text-primary, #e8eaf0);
                    margin: 0;
                }

                /* How to Play */
                .gps-how-to-play {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .gps-step-card {
                    display: flex;
                    gap: 16px;
                    background: var(--bg-surface, #161922);
                    padding: 16px;
                    border-radius: 12px;
                    border: 1px solid var(--border, rgba(255,255,255,0.08));
                }
                .gps-step-num {
                    width: 32px;
                    height: 32px;
                    flex-shrink: 0;
                    background: var(--accent, #ff8c00);
                    color: #fff;
                    font-weight: bold;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                }
                .gps-step-body {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .gps-step-body h4 {
                    margin: 0;
                    font-size: 0.95rem;
                    color: var(--text-primary);
                }
                .gps-step-body p {
                    margin: 0;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    line-height: 1.5;
                }

                /* Characters */
                .gps-chars-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                    gap: 16px;
                }
                .gps-char-card {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    background: var(--bg-surface, #161922);
                    padding: 16px;
                    border-radius: 12px;
                    border: 1px solid var(--border, rgba(255,255,255,0.08));
                    transition: transform 0.2s;
                }
                .gps-char-card:hover { transform: translateY(-2px); }
                .gps-char-icon {
                    font-size: 1.8rem;
                    flex-shrink: 0;
                }
                .gps-char-info {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .gps-char-info h4 {
                    margin: 0;
                    font-size: 0.95rem;
                    color: var(--text-primary);
                }
                .gps-char-info p {
                    margin: 0;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    line-height: 1.4;
                }

                /* Categories */
                .gps-categories {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .gps-cat-pill {
                    background: rgba(255,255,255,0.05);
                    color: var(--text-primary);
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    border: 1px solid var(--border);
                }
            `}</style>
        </>
    );
}
