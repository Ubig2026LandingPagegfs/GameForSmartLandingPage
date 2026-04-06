"use client";
// components/features/competitions/competition-detail/CompetitionHeroContent.tsx

import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface CompetitionHeroContentProps {
  title: string;
  slug: string;
  videoUrl?: string;
  onOpenVideo: () => void;
}

export default function CompetitionHeroContent({
  title,
  slug,
  videoUrl,
  onOpenVideo,
}: CompetitionHeroContentProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  return (
    <>
      <div className="gps-meta">
        <div className="gps-breadcrumbs-wrapper">
          <Breadcrumbs />
        </div>

        <h1 className="gps-title">{title}</h1>

        <div className="gps-subtitle">
          <span className="gps-badge">Turnamen Kompetitif</span>
        </div>

        <div className="gps-actions-row">
          <button
            suppressHydrationWarning
            onClick={() => {
              router.push(`/competitions/${slug}/register`);
            }}
            className="gps-btn-primary"
          >
            Daftar Sekarang <i className="ti ti-chevron-right" />
          </button>

          {videoUrl && (
            <button className="gps-btn-trailer" onClick={onOpenVideo}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Cuplikan
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .gps-meta {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 0 0 24px;
          max-width: 900px;
          text-align: left;
          margin-left: 0;
          margin-right: auto;
          align-items: flex-start;
        }

        .gps-breadcrumbs-wrapper {
          margin-bottom: 4px;
        }

        .gps-title {
          font-size: 3rem;
          font-weight: 500;
          color: #fff;
          margin: 0;
          line-height: 1.1;
        }

        .gps-subtitle {
          margin-bottom: 8px;
        }

        .gps-badge {
          color: #ff8c00;
          font-size: 1.1rem;
          font-weight: 500;
        }

        .gps-actions-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          margin-top: 16px;
          justify-content: flex-start;
          width: 100%;
        }

        .gps-btn-primary {
          display: inline-flex;
          align-items: center;
          background: #ff8c00;
          color: #fff;
          border: none;
          padding: 12px 32px;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
          gap: 8px;
        }

        .gps-btn-primary:hover {
          background: #e67e00;
          color: #fff;
        }

        .gps-btn-trailer {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 30px;
          padding: 12px 24px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .gps-btn-trailer:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        @media (max-width: 768px) {
          .gps-meta {
            padding: 16px 0 0;
          }
          .gps-title {
            font-size: 2rem;
          }
          .gps-actions-row {
             flex-direction: column;
             align-items: stretch;
          }
          .gps-btn-primary, .gps-btn-trailer {
             justify-content: center;
             width: 100%;
          }
        }
      `}</style>
    </>
  );
}