// components/GameFeatures.tsx
// Seksi fitur utama — bullet point list

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

                <ul className="gps-feat-list">
                    {features.map((feature, idx) => (
                        <li key={idx} className="gps-feat-item">
                            <div className="gps-feat-icon-wrap">
                                {feature.icon && feature.icon.startsWith('ti ti-') ? (
                                    <i className={`${feature.icon} gps-feat-icon`}></i>
                                ) : (
                                    <span className="gps-feat-icon" style={{ fontStyle: 'normal' }}>{feature.icon}</span>
                                )}
                            </div>
                            <div className="gps-feat-body">
                                <p className="gps-feat-title">{feature.title}</p>
                                <p className="gps-feat-desc">{feature.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <style jsx>{`
                .gps-section {
                    padding: 24px 0;
                    border-bottom: 1px solid var(--border, rgba(255,255,255,0.08));
                }
                .gps-section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                    color: var(--text-secondary, #8b90a0);
                }
                .gps-section-header:hover { color: var(--text-primary, #e8eaf0); }
                .gps-section-title {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: var(--text-primary, #e8eaf0);
                    margin: 0;
                }

                /* Bullet point list */
                .gps-feat-list {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .gps-feat-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 12px 14px;
                    border-radius: 10px;
                    border: 1px solid var(--border, rgba(255,255,255,0.08));
                    background: var(--bg-surface, #161922);
                    transition: box-shadow 0.2s, transform 0.2s;
                }
                .gps-feat-item:hover {
                    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
                    transform: translateY(-1px);
                }

                .gps-feat-icon-wrap {
                    flex-shrink: 0;
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    background: rgba(255, 140, 0, 0.12);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .gps-feat-icon {
                    font-size: 1.1rem;
                    color: var(--accent, #ff8c00);
                }

                .gps-feat-body {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                .gps-feat-title {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--text-primary, #e8eaf0);
                    margin: 0;
                }
                .gps-feat-desc {
                    font-size: 0.775rem;
                    color: var(--text-secondary, #8b90a0);
                    margin: 0;
                    line-height: 1.5;
                }
            `}</style>
        </>
    );
}