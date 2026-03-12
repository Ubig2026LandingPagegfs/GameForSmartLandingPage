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
                {/* Header */}
                <div className="gps-section-header">
                    <h2 className="gps-section-title">Tentang Game Ini</h2>
                </div>

                {/* Deskripsi */}
                <div className="gps-about-text">
                    {renderDescription()}
                </div>

                {isLong && (
                    <button onClick={() => setIsExpanded(!isExpanded)} className="gps-read-more">
                        {isExpanded ? '▲ Sembunyikan' : '▼ Baca selengkapnya'}
                    </button>
                )}

                {/* Divider */}
                <div className="gps-divider" />

                {/* Meta Info Cards */}
                <div className="gps-meta-grid">
                    <div className="gps-meta-card">
                        <div className="gps-meta-icon">
                            <i className="ti ti-calendar"></i>
                        </div>
                        <div className="gps-meta-info">
                            <span className="gps-meta-label">Diupdate Pada</span>
                            <span className="gps-meta-val">{date || '7 Mar 2026'}</span>
                        </div>
                    </div>

                    <div className="gps-meta-card">
                        <div className="gps-meta-icon">
                            <i className="ti ti-category"></i>
                        </div>
                        <div className="gps-meta-info">
                            <span className="gps-meta-label">Genre</span>
                            <span className="gps-meta-val">{genre}</span>
                        </div>
                    </div>

                    <div className="gps-meta-card">
                        <div className="gps-meta-icon">
                            <i className="ti ti-device-gamepad-2"></i>
                        </div>
                        <div className="gps-meta-info">
                            <span className="gps-meta-label">Mode Bermain</span>
                            <span className="gps-meta-val">Single · Multiplayer</span>
                        </div>
                    </div>

                    <div className="gps-meta-card">
                        <div className="gps-meta-icon">
                            <i className="ti ti-devices"></i>
                        </div>
                        <div className="gps-meta-info">
                            <span className="gps-meta-label">Platform</span>
                            <span className="gps-meta-val">{platform} · Mobile</span>
                        </div>
                    </div>

                    <div className="gps-meta-card">
                        <div className="gps-meta-icon">
                            <i className="ti ti-currency-dollar"></i>
                        </div>
                        <div className="gps-meta-info">
                            <span className="gps-meta-label">Harga</span>
                            <span className="gps-meta-val gps-free-badge">Gratis</span>
                        </div>
                    </div>

                    <div className="gps-meta-card">
                        <div className="gps-meta-icon">
                            <i className="ti ti-language"></i>
                        </div>
                        <div className="gps-meta-info">
                            <span className="gps-meta-label">Bahasa</span>
                            <span className="gps-meta-val">Indonesia · English</span>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="gps-tags">
                    <span className="gps-tag">#{genre}</span>
                    <span className="gps-tag">#{platform}</span>
                    <span className="gps-tag">#Multiplayer</span>
                    <span className="gps-tag">#Gratis</span>
                    {features?.slice(0, 2).map((f, i) => (
                        <span key={i} className="gps-tag">#{f.title.split(' ').slice(0, 2).join('')}</span>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .gps-section {
                    padding: 28px 0;
                    border-bottom: 1px solid var(--border, rgba(255,255,255,0.08));
                }
                .gps-section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 14px;
                }
                .gps-section-title {
                    font-size: 1.15rem;
                    font-weight: 700;
                    color: var(--text-primary, #e8eaf0);
                    margin: 0;
                    letter-spacing: 0.01em;
                }

                /* Description */
                .gps-about-text { margin-bottom: 4px; }
                .gps-desc-para {
                    font-size: 0.9rem;
                    color: var(--text-secondary, #8b90a0);
                    line-height: 1.75;
                    margin: 0 0 10px;
                }

                .gps-read-more {
                    background: none;
                    border: none;
                    color: var(--accent, #ff8c00);
                    font-size: 0.82rem;
                    font-weight: 600;
                    cursor: pointer;
                    padding: 0;
                    margin-top: 2px;
                    opacity: 0.85;
                    transition: opacity 0.2s;
                }
                .gps-read-more:hover { opacity: 1; text-decoration: underline; }

                .gps-divider {
                    height: 1px;
                    background: var(--border, rgba(255,255,255,0.07));
                    margin: 20px 0 16px;
                }

                /* Meta Grid */
                .gps-meta-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                    margin-bottom: 18px;
                }
                @media (max-width: 600px) {
                    .gps-meta-grid { grid-template-columns: repeat(2, 1fr); }
                }

                .gps-meta-card {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: var(--bg-surface, #161922);
                    border: 1px solid var(--border, rgba(255,255,255,0.07));
                    border-radius: 10px;
                    padding: 10px 12px;
                }
                .gps-meta-icon {
                    width: 34px;
                    height: 34px;
                    flex-shrink: 0;
                    border-radius: 8px;
                    background: rgba(255, 140, 0, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    color: var(--accent, #ff8c00);
                }
                .gps-meta-info {
                    display: flex;
                    flex-direction: column;
                    gap: 1px;
                    min-width: 0;
                }
                .gps-meta-label {
                    font-size: 0.7rem;
                    color: var(--text-muted, #50566a);
                    white-space: nowrap;
                }
                .gps-meta-val {
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: var(--text-primary, #e8eaf0);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .gps-free-badge {
                    color: #6fcf97 !important;
                }

                /* Tags */
                .gps-tags { display: flex; flex-wrap: wrap; gap: 8px; }
                .gps-tag {
                    background: var(--bg-elevated, #1e2130);
                    color: var(--text-secondary, #8b90a0);
                    border: 1px solid var(--border, rgba(255,255,255,0.07));
                    border-radius: 20px;
                    padding: 4px 12px;
                    font-size: 0.78rem;
                    cursor: pointer;
                    transition: background 0.2s, color 0.2s, border-color 0.2s;
                }
                .gps-tag:hover {
                    background: rgba(255, 140, 0, 0.12);
                    color: var(--accent, #ff8c00);
                    border-color: rgba(255, 140, 0, 0.3);
                }
            `}</style>
        </>
    );
}