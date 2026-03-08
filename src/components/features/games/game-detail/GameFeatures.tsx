// components/GameFeatures.tsx
// Grid kartu fitur utama game

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

                <div className="gps-events-grid">
                    {features.map((feature, idx) => (
                        <div key={idx} className="gps-event-card">
                            <div className="gps-event-img">
                                <img src={image} alt={feature.title} />
                                <div className="gps-event-overlay">
                                    <i className={`${feature.icon} gps-event-icon`}></i>
                                </div>
                            </div>
                            <div className="gps-event-info">
                                <span className="gps-event-badge">Fitur tersedia</span>
                                <p className="gps-event-title">{feature.title}</p>
                                <p className="gps-event-desc">{feature.description}</p>
                            </div>
                        </div>
                    ))}
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

                .gps-events-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 12px;
                }
                .gps-event-card {
                    border-radius: 10px;
                    overflow: hidden;
                    border: 1px solid var(--border);
                    background: var(--bg-surface);
                    cursor: pointer;
                    transition: box-shadow 0.2s, transform 0.2s;
                }
                .gps-event-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.4); transform: translateY(-2px); }

                .gps-event-img { position: relative; height: 112px; overflow: hidden; }
                .gps-event-img img { width: 100%; height: 100%; object-fit: cover; }
                .gps-event-overlay {
                    position: absolute; inset: 0;
                    background: rgba(0,0,0,0.35);
                    display: flex; align-items: center; justify-content: center;
                }
                .gps-event-icon { font-size: 2rem; color: #fff; }

                .gps-event-info { padding: 10px 12px; background: var(--bg-surface); }
                .gps-event-badge { font-size: 0.7rem; color: var(--accent); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
                .gps-event-title { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); margin: 4px 0 2px; }
                .gps-event-desc { font-size: 0.78rem; color: var(--text-secondary); margin: 0; }
            `}</style>
        </>
    );
}