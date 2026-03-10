// components/GameFeatures.tsx
// Seksi fitur utama — horizontal scrollable card strip

interface Feature {
    title: string;
    description: string;
    icon: string;
}

interface GameFeaturesProps {
    features: Feature[];
    image: string;
}

export default function GameFeatures({ features, image }: GameFeaturesProps) {
    if (!features || features.length === 0) return null;

    return (
        <>
            <div className="gps-section">
                <div className="gps-section-header">
                    <h2 className="gps-section-title">Fitur Utama</h2>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </div>

                <div className="gps-feat-strip">
                    {features.map((feature, idx) => (
                        <div key={idx} className="gps-feat-card">
                            <div className="gps-feat-img">
                                <img src={image} alt={feature.title} draggable={false} />
                                <div className="gps-feat-overlay">
                                    <i className={`${feature.icon} gps-feat-icon`}></i>
                                </div>
                            </div>
                            <div className="gps-feat-body">
                                <span className="gps-feat-badge">Fitur tersedia</span>
                                <p className="gps-feat-title">{feature.title}</p>
                                <p className="gps-feat-desc">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .gps-section { padding: 24px 0; border-bottom: 1px solid var(--border, rgba(255,255,255,0.08)); }
                .gps-section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                    color: var(--text-secondary, #8b90a0);
                }
                .gps-section-header:hover { color: var(--text-primary, #e8eaf0); }
                .gps-section-title { font-size: 1.125rem; font-weight: 600; color: var(--text-primary, #e8eaf0); margin: 0; }

                /* Horizontal scrollable strip */
                .gps-feat-strip {
                    display: flex;
                    gap: 12px;
                    overflow-x: auto;
                    scrollbar-width: none;
                    padding-bottom: 4px;
                }
                .gps-feat-strip::-webkit-scrollbar { display: none; }

                .gps-feat-card {
                    flex-shrink: 0;
                    width: 200px;
                    border-radius: 10px;
                    overflow: hidden;
                    border: 1px solid var(--border, rgba(255,255,255,0.08));
                    background: var(--bg-surface, #161922);
                    transition: box-shadow 0.2s, transform 0.2s;
                }
                .gps-feat-card:hover {
                    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
                    transform: translateY(-2px);
                }

                .gps-feat-img {
                    position: relative;
                    height: 110px;
                    overflow: hidden;
                }
                .gps-feat-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s;
                }
                .gps-feat-card:hover .gps-feat-img img { transform: scale(1.05); }
                .gps-feat-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .gps-feat-icon { font-size: 1.8rem; color: #fff; }

                .gps-feat-body { padding: 10px 12px; }
                .gps-feat-badge {
                    font-size: 0.68rem;
                    color: var(--accent, #ff8c00);
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .gps-feat-title {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--text-primary, #e8eaf0);
                    margin: 4px 0 2px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .gps-feat-desc {
                    font-size: 0.75rem;
                    color: var(--text-secondary, #8b90a0);
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </>
    );
}