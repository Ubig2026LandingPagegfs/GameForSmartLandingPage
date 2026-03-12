// components/GameMeta.tsx
// Menampilkan info meta game yang dioverlay di atas hero banner

import Link from "next/link";

interface GameMetaProps {
  image: string;
  title: string;
  slug: string;
  rating: string;
  players: string;
  videoUrl?: string;
  playUrl?: string;
  onOpenTrailer: () => void;
}

export default function GameMeta({
  image,
  title,
  slug,
  rating,
  players,
  videoUrl,
  playUrl,
  onOpenTrailer,
}: GameMetaProps) {
  const handleShare = async () => {
    const shareData = {
      title: title,
      text: `Mainkan game ${title} di GameForSmart!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share dibatalkan");
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link game berhasil disalin!");
    }
  };

  return (
    <>
      <div className="gps-meta">
        {/* Title & Subtitle */}
        <h1 className="gps-title">{title}</h1>
        <div className="gps-subtitle">
            <span className="gps-developer">Gameforsmart.com</span>
            <p className="gps-ad-info">Gratis dimainkan · Langsung di browser</p>
        </div>

        {/* Stats Row containing Icon */}
        <div className="gps-stats-row">
            <div className="gps-meta-icon">
                <img src={image} alt={title} />
            </div>

            <div className="gps-stats-blocks">
                <div className="gps-stat-item">
                    <span className="gps-stat-val">
                        {rating}
                        <span style={{ color: '#ff8c00', marginLeft: '2px' }}>★</span>
                    </span>
                    <span className="gps-stat-label">{players} ulasan</span>
                </div>
                <div className="gps-stat-divider" />
                <div className="gps-stat-item">
                    <span className="gps-stat-val">{players}</span>
                    <span className="gps-stat-label">Pemain aktif</span>
                </div>
                <div className="gps-stat-divider" />
                <div className="gps-stat-item">
                    <span className="gps-stat-val" style={{ display: 'flex', justifyContent: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                    </span>
                    <span className="gps-stat-label">Gratis</span>
                </div>
            </div>
        </div>

        {/* Buttons Row */}
        <div className="gps-actions-row">
            <div className="gps-actions-start">
                <Link href={playUrl || `/play/${slug}`} className="gps-btn-primary" target={playUrl ? "_blank" : undefined} rel={playUrl ? "noopener noreferrer" : undefined}>
                    Main Sekarang
                </Link>

                <button className="gps-btn-text" onClick={handleShare}>
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" /></svg>
                    Bagikan
                </button>

                {videoUrl && (
                    <button className="gps-btn-trailer" onClick={onOpenTrailer}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        Cuplikan
                    </button>
                )}
            </div>
        </div>
        
        {/* <p className="gps-footer-note">
            Google Play Games di PC diperlukan untuk menginstal game ini di Windows. Dengan
            mendownload aplikasi dan game, kamu menyetujui <a href="#">Persyaratan Layanan Google</a> dan <a href="#">Persyaratan Layanan Google Play</a>. <a href="#">Pelajari lebih lanjut</a>.
        </p> */}

      </div>

      <style jsx>{`
        .gps-meta {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 24px 0 0;
          max-width: 900px;
        }

        .gps-title {
          font-size: 3rem;
          font-weight: 500;
          color: #fff;
          margin: 0;
          line-height: 1.1;
        }

        .gps-subtitle {
          margin-bottom: 4px;
        }

        .gps-developer {
          color: #ff8c00;
          font-size: 1rem;
          font-weight: 500;
          text-decoration: none;
          display: block;
          margin-bottom: 4px;
        }

        .gps-developer:hover {
          text-decoration: underline;
        }

        .gps-ad-info {
          font-size: 0.85rem;
          color: var(--text-secondary, #9aa0a6);
          margin: 0;
        }

        /* Stats Row */
        .gps-stats-row {
          display: flex;
          align-items: center;
          gap: 24px;
          margin: 8px 0 12px;
        }

        .gps-meta-icon {
          width: 72px;
          height: 72px;
          border-radius: 16px;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .gps-meta-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gps-stats-blocks {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .gps-stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .gps-stat-val {
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .gps-stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary, #9aa0a6);
        }

        .gps-stat-divider {
          width: 1px;
          height: 24px;
          background: rgba(255,255,255,0.2);
        }

        /* Actions */
        .gps-actions-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 8px;
        }

        .gps-actions-start {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }

        .gps-actions-end {
            margin-left: auto;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }

        /* Local Button Overrides Extracted */

        .gps-btn-text {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #ff8c00;
          border: none;
          padding: 8px 12px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
          border-radius: 4px;
        }
        .gps-btn-text:hover {
          background: rgba(255, 140, 0, 0.1);
        }

        .gps-btn-trailer {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 24px;
          padding: 10px 24px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .gps-btn-trailer:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        /* Footer Note */
        .gps-footer-note {
          font-size: 0.75rem;
          color: var(--text-secondary, #9aa0a6);
          line-height: 1.5;
          max-width: 600px;
          margin-top: 12px;
        }

        .gps-footer-note a {
          color: var(--text-secondary, #9aa0a6);
          text-decoration: underline;
        }
        .gps-footer-note a:hover {
          color: #fff;
        }

        @media (max-width: 768px) {
          .gps-meta {
            padding: 16px 0 0;
          }
          .gps-title {
            font-size: 2rem;
          }
          .gps-stats-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .gps-actions-start {
             flex-direction: column;
             align-items: stretch;
             width: 100%;
          }
          .gps-btn-primary, .gps-btn-default, .gps-btn-text {
             justify-content: center;
             width: 100%;
          }
          .gps-actions-row {
             flex-direction: column;
             align-items: stretch;
          }
        }
      `}</style>
    </>
  );
}
