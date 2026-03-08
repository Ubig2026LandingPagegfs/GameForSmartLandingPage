// components/GamePrivacy.tsx
// Seksi Keamanan & Privasi - menampilkan kebijakan data web game

const PRIVACY_ITEMS = [
    {
        icon: '🛡️',
        text: 'Data pemain tidak dijual atau dibagikan ke pihak ketiga',
        sub: 'Profil, riwayat skor, dan preferensi game',
    },
    {
        icon: '🔒',
        text: 'Koneksi dienkripsi menggunakan HTTPS',
        sub: 'Semua data ditransmisikan melalui koneksi aman',
    },
    {
        icon: '👤',
        text: 'Akun dapat dihapus kapan saja',
        sub: 'Termasuk semua data dan riwayat permainan',
    },
    {
        icon: '🍪',
        text: 'Menggunakan cookie untuk menyimpan sesi login',
        sub: 'Cookie dapat dihapus melalui pengaturan browser',
    },
];

export default function GamePrivacy() {
    return (
        <>
            <div className="gps-section">
                <div className="gps-section-header">
                    <h2 className="gps-section-title">Keamanan & Privasi</h2>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </div>

                <p className="gps-safety-intro">
                    Keamanan akun dan data kamu adalah prioritas kami. Berikut informasi tentang bagaimana Gameforsmart mengelola data pemain.
                </p>

                <div className="gps-safety-card">
                    {PRIVACY_ITEMS.map((item, i) => (
                        <div key={i} className="gps-safety-row">
                            <span className="gps-safety-icon">{item.icon}</span>
                            <div>
                                <p className="gps-safety-text">{item.text}</p>
                                {item.sub && <p className="gps-safety-sub">{item.sub}</p>}
                            </div>
                        </div>
                    ))}
                </div>

                <button className="gps-read-more">Lihat kebijakan privasi lengkap</button>
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

                .gps-safety-intro { font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.6; }

                .gps-safety-card {
                    border: 1px solid var(--border);
                    border-radius: 10px;
                    overflow: hidden;
                    background: var(--bg-surface);
                }
                .gps-safety-row {
                    display: flex;
                    gap: 14px;
                    align-items: flex-start;
                    padding: 14px 16px;
                    border-bottom: 1px solid var(--border-subtle);
                }
                .gps-safety-row:last-child { border-bottom: none; }
                .gps-safety-icon { font-size: 1rem; flex-shrink: 0; padding-top: 1px; }
                .gps-safety-text { font-size: 0.85rem; color: var(--text-primary); margin: 0 0 2px; }
                .gps-safety-sub { font-size: 0.78rem; color: var(--text-secondary); margin: 0; }

                .gps-read-more {
                    background: none; border: none;
                    color: var(--accent-blue);
                    font-size: 0.875rem; font-weight: 600;
                    cursor: pointer; padding: 0; margin-top: 12px;
                    display: block;
                }
                .gps-read-more:hover { text-decoration: underline; }
            `}</style>
        </>
    );
}