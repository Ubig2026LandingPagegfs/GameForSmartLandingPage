// components/GameSidebar.tsx
// Sidebar kanan: kartu "Main di Browser", persyaratan, info game, changelog, game lainnya

interface GameItem {
    id: number;
    title: string;
    type: string;
    image: string;
    rating: string;
    players: string;
    href: string;
    description: string;
}

const BROWSER_FEATURES = [
    'Tanpa download & instalasi',
    'Kompatibel di semua browser modern',
    'Simpan progres otomatis ke akun',
    'Bisa dimainkan di PC, tablet & HP',
    'Gratis selamanya',
];

const BROWSER_REQUIREMENTS = [
    { label: 'Browser', value: 'Chrome 90+, Firefox 88+, Edge 90+, Safari 14+' },
    { label: 'Koneksi', value: 'Minimal 1 Mbps (disarankan 5 Mbps+)' },
    { label: 'JavaScript', value: 'Harus diaktifkan' },
    { label: 'Resolusi', value: 'Minimal 1024×768' },
    { label: 'Akun', value: 'Diperlukan untuk menyimpan progres' },
];

const CHANGELOG = [
    'Peningkatan performa dan optimasi grafis.',
    'Penambahan event turnamen mingguan.',
    'Perbaikan bug minor pada leaderboard.',
];

interface GameSidebarProps {
    slug: string;
    genre: string;
    date?: string;
    prizeMoney?: string;
    currentGameId?: number;
    allGames?: GameItem[];
    playUrl?: string;
}

export default function GameSidebar({ slug, genre, date, prizeMoney, currentGameId, allGames = [], playUrl }: GameSidebarProps) {
    // Filter game lain selain yang sedang dibuka, max 4
    const relatedGames = allGames.filter(g => g.id !== currentGameId).slice(0, 4);
    return (
        <>
            <aside className="gps-sidebar-col">

                {/* ── Main di Browser ── */}
                <div className="gps-sidebar-card gps-pc-card">
                    <div className="gps-pc-header">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                        </svg>
                        <span>Main Langsung di Browser</span>
                    </div>
                    <p className="gps-pc-desc">Tidak perlu download atau install apapun. Buka dan langsung main!</p>
                    <a href={playUrl || `/play/${slug}`} className="gps-link-green" target={playUrl ? "_blank" : undefined} rel={playUrl ? "noopener noreferrer" : undefined}>
                        Mulai bermain sekarang →
                    </a>
                    <ul className="gps-pc-features">
                        {BROWSER_FEATURES.map((f, i) => (
                            <li key={i}>
                                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                </svg>
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── Persyaratan Browser ── */}
                {/* <div className="gps-sidebar-card">
                    <h3 className="gps-sidebar-card-title">Persyaratan Browser</h3>
                    <ul className="gps-req-list">
                        {BROWSER_REQUIREMENTS.map((req, i) => (
                            <li key={i}><strong>{req.label}:</strong> {req.value}</li>
                        ))}
                    </ul>
                    <p className="gps-req-note">Performa terbaik pada browser versi terbaru dengan koneksi stabil.</p>
                </div> */}

                {/* ── Informasi Game ── */}
                <div className="gps-sidebar-card">
                    <h3 className="gps-sidebar-card-title">Informasi Game</h3>
                    <dl className="gps-info-list">
                        <dt>Developer</dt>
                        <dd><a href="#" className="gps-link-green">Gameforsmart.com</a></dd>
                        <dt>Genre</dt>
                        <dd>{genre}</dd>
                        <dt>Platform</dt>
                        <dd>Web Browser</dd>
                        <dt>Bahasa</dt>
                        <dd>Indonesia · English</dd>
                        <dt>Dirilis</dt>
                        <dd>{date || 'Desember 2025'}</dd>
                        {prizeMoney && (
                            <>
                                <dt>Total Hadiah</dt>
                                <dd>{prizeMoney}</dd>
                            </>
                        )}
                    </dl>
                </div>

                {/* ── Changelog ── */}
                <div className="gps-sidebar-card">
                    <h3 className="gps-sidebar-card-title">Yang baru</h3>
                    <ul className="gps-changelog">
                        {CHANGELOG.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* ── Game Lainnya ── */}
                {relatedGames.length > 0 && (
                    <div className="gps-sidebar-card">
                        <h3 className="gps-sidebar-card-title">Game Lainnya</h3>
                        <ul className="gps-related-list">
                            {relatedGames.map(game => (
                                <li key={game.id}>
                                    <a href={game.href} className="gps-related-item">
                                        <div className="gps-related-img">
                                            <img src={game.image} alt={game.title} />
                                        </div>
                                        <div className="gps-related-info">
                                            <span className="gps-related-title">{game.title}</span>
                                            <span className="gps-related-type">{game.type}</span>
                                            <div className="gps-related-rating">
                                                <span className="star-icon">★</span>
                                                <span>{game.rating}</span>
                                                <span className="gps-related-players">· {game.players} pemain</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </aside>

            <style jsx>{`
                .gps-sidebar-col {
                    width: 300px;
                    flex-shrink: 0;
                    padding-top: 24px;
                }
                .gps-sidebar-card {
                    background: var(--bg-surface);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 16px;
                }
                .gps-sidebar-card-title { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin: 0 0 12px; }

                /* Play di Browser card */
                .gps-pc-card { background: var(--bg-elevated); }
                .gps-pc-header { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin-bottom: 8px; }
                .gps-pc-desc { font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 8px; }
                .gps-link-green { color: var(--accent-green); font-size: 0.82rem; font-weight: 600; text-decoration: none; }
                .gps-link-green:hover { text-decoration: underline; color: var(--accent-green); }
                .gps-pc-features { list-style: none; margin: 12px 0 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
                .gps-pc-features li { display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: var(--text-secondary); }
                .gps-pc-features svg { color: var(--accent-green); flex-shrink: 0; }

                /* Requirements */
                .gps-req-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
                .gps-req-list li { font-size: 0.8rem; color: var(--text-secondary); }
                .gps-req-list strong { color: var(--text-primary); }
                .gps-req-note { font-size: 0.78rem; color: var(--text-muted); margin: 10px 0 0; }

                /* Info list */
                .gps-info-list { display: grid; grid-template-columns: auto 1fr; gap: 6px 12px; margin: 0; }
                .gps-info-list dt { font-size: 0.78rem; color: var(--text-muted); padding-top: 2px; }
                .gps-info-list dd { font-size: 0.82rem; color: var(--text-primary); font-weight: 500; margin: 0; }

                /* Changelog */
                .gps-changelog { list-style: disc; padding-left: 16px; margin: 0; display: flex; flex-direction: column; gap: 6px; }
                .gps-changelog li { font-size: 0.82rem; color: var(--text-secondary); }

                /* Related Games */
                .gps-related-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0; }
                .gps-related-item {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    padding: 10px 0;
                    border-bottom: 1px solid var(--border-subtle);
                    text-decoration: none;
                    transition: opacity 0.2s;
                }
                .gps-related-list li:last-child .gps-related-item { border-bottom: none; }
                .gps-related-item:hover { opacity: 0.8; }
                .gps-related-img {
                    width: 52px; height: 52px;
                    border-radius: 10px;
                    overflow: hidden;
                    flex-shrink: 0;
                    border: 1px solid var(--border);
                }
                .gps-related-img img { width: 100%; height: 100%; object-fit: cover; }
                .gps-related-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
                .gps-related-title { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .gps-related-type { font-size: 0.75rem; color: var(--text-muted); }
                .gps-related-rating { display: flex; align-items: center; gap: 4px; font-size: 0.75rem; color: var(--text-secondary); }
                .star-icon { color: var(--star-color); font-size: 0.8rem; }
                .gps-related-players { color: var(--text-muted); }

                @media (max-width: 1024px) {
                    .gps-sidebar-col { display: none; }
                }
            `}</style>
        </>
    );
}