// components/GameMeta.tsx
// Menampilkan icon game, judul, developer, statistik, dan tombol aksi

import Link from "next/link";

interface GameMetaProps {
  image: string;
  title: string;
  slug: string;
  rating: string;
  players: string;
  videoUrl?: string;
  onOpenTrailer: () => void;
}

export default function GameMeta({
  image,
  title,
  slug,
  rating,
  players,
  videoUrl,
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
        {/* Icon */}
        <div className="gps-meta-icon">
          <img src={image} alt={title} />
        </div>

        <div className="gps-meta-info">
          <h1 className="gps-title">{title}</h1>
          <a href="#" className="gps-developer">
            Gameforsmart.com
          </a>
          <p className="gps-tag-line">Gratis dimainkan · Langsung di browser</p>

          {/* Stats */}
          <div className="gps-stats">
            <div className="gps-stat-item">
              <span className="gps-stat-val">{rating}★</span>
              <span className="gps-stat-label">{players} ulasan</span>
            </div>
            <div className="gps-stat-divider" />
            <div className="gps-stat-item">
              <span className="gps-stat-val">{players}</span>
              <span className="gps-stat-label">Pemain aktif</span>
            </div>
            <div className="gps-stat-divider" />
            <div className="gps-stat-item">
              <span className="gps-stat-val">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </span>
              <span className="gps-stat-label">Gratis</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="gps-actions">
            <Link href={`/play/${slug}`} className="gps-btn-install">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Main Sekarang
            </Link>

            <button
              className="gps-btn-secondary d-flex align-items-center gap-2"
              title="Bagikan"
              onClick={handleShare}
            >
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" />
              </svg>
              Bagikan
            </button>

            {videoUrl && (
              <button className="gps-btn-trailer" onClick={onOpenTrailer}>
                ▶ Cuplikan
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .gps-meta {
          display: flex;
          gap: 20px;
          padding: 24px 0;
          border-bottom: 1px solid var(--border);
        }
        .gps-meta-icon {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid var(--border);
        }
        .gps-meta-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .gps-meta-info {
          flex: 1;
        }
        .gps-title {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 2px;
          line-height: 1.2;
        }
        .gps-developer {
          color: var(--accent-blue);
          font-size: 0.875rem;
          text-decoration: none;
          display: block;
          margin-bottom: 2px;
        }
        .gps-developer:hover {
          text-decoration: underline;
          color: var(--accent-blue);
        }
        .gps-tag-line {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin: 0 0 12px;
        }

        /* Stats */
        .gps-stats {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .gps-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .gps-stat-val {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .gps-stat-label {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .gps-stat-divider {
          width: 1px;
          height: 28px;
          background: var(--border);
        }

        /* Buttons */
        .gps-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .gps-btn-install {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 24px;
          padding: 10px 24px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition:
            background 0.2s,
            transform 0.15s;
        }
        .gps-btn-install:hover {
          background: var(--accent-hover);
          color: #fff;
          transform: translateY(-1px);
        }

        .gps-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--accent-blue);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 9px 20px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .gps-btn-secondary:hover {
          background: var(--bg-elevated);
        }

        .gps-btn-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .gps-btn-icon:hover {
          background: var(--bg-elevated);
          color: var(--text-primary);
        }

        .gps-btn-trailer {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-elevated);
          color: var(--text-primary);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 10px 20px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .gps-btn-trailer:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 768px) {
          .gps-meta {
            flex-direction: column;
          }
          .gps-meta-icon {
            width: 64px;
            height: 64px;
          }
          .gps-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </>
  );
}
