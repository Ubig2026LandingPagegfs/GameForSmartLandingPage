// components/GameAbout.tsx
// Seksi "Tentang game ini": deskripsi, tags genre, dan info update/perangkat

import { useState } from 'react';

interface Feature {
    title: string;
    description: string;
    icon: string;
}

interface GameAboutProps {
    description: string;
    genre: string;
    platform: string;
    date?: string;
    features?: Feature[];
}

const CHAR_LIMIT = 300;

export default function GameAbout({ description, genre, platform, date, features }: GameAboutProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLong = description.length > CHAR_LIMIT;

    const renderDescription = () => {
        const content = (!isLong || isExpanded) ? description : description.substring(0, CHAR_LIMIT) + '...';
        return content.split('\n\n').map((para, i) => (
            <p key={i} className="gps-desc-para">{para}</p>
        ));
    };

    return (
        <>
            <div className="gps-section">
                <div className="gps-section-header">
                    <h2 className="gps-section-title">Tentang game ini</h2>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </div>

                <div className="gps-about-text">
                    {renderDescription()}
                </div>

                {isLong && (
                    <button onClick={() => setIsExpanded(!isExpanded)} className="gps-read-more">
                        {isExpanded ? 'Sembunyikan' : 'Baca selengkapnya'}
                    </button>
                )}

                {/* Tags */}
                <div className="gps-tags">
                    <span className="gps-tag">#{genre}</span>
                    <span className="gps-tag">#{platform}</span>
                    <span className="gps-tag">#Multiplayer</span>
                    {features?.map((f, i) => (
                        <span key={i} className="gps-tag">#{f.title}</span>
                    ))}
                </div>

                {/* Meta row */}
                <div className="gps-meta-row">
                    <div className="gps-meta-cell">
                        <span className="gps-meta-cell-label">Diupdate pada</span>
                        <span className="gps-meta-cell-val">{date || '7 Mar 2026'}</span>
                    </div>
                    <div className="gps-meta-cell">
                        <span className="gps-meta-cell-label">Mode bermain</span>
                        <span className="gps-meta-cell-val">Multiplayer · Single Player</span>
                    </div>
                    <div className="gps-meta-cell">
                        <span className="gps-meta-cell-label">Perangkat</span>
                        <span className="gps-meta-cell-val">PC · Tablet · Mobile</span>
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

                .gps-desc-para { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.7; margin: 0 0 10px; }

                .gps-read-more {
                    background: none; border: none;
                    color: var(--accent-blue);
                    font-size: 0.875rem; font-weight: 600;
                    cursor: pointer; padding: 0; margin-top: 4px;
                }
                .gps-read-more:hover { text-decoration: underline; }

                .gps-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
                .gps-tag {
                    background: var(--bg-elevated);
                    color: var(--text-secondary);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    padding: 5px 14px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: background 0.2s, color 0.2s;
                }
                .gps-tag:hover { background: rgba(255,122,0,0.15); color: var(--accent); border-color: rgba(255,122,0,0.3); }

                .gps-meta-row {
                    display: flex;
                    gap: 32px;
                    margin-top: 16px;
                    padding-top: 16px;
                    border-top: 1px solid var(--border-subtle);
                    flex-wrap: wrap;
                }
                .gps-meta-cell { display: flex; flex-direction: column; gap: 2px; }
                .gps-meta-cell-label { font-size: 0.75rem; color: var(--text-muted); }
                .gps-meta-cell-val { font-size: 0.875rem; color: var(--text-primary); font-weight: 500; }
            `}</style>
        </>
    );
}