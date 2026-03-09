// components/features/competitions/competition-detail/CompetitionHeroContent.tsx

import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

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
  return (
    <div className="gps-meta" style={{ padding: "0 0 24px", maxWidth: 900 }}>
      <div className="mb-4">
        <Breadcrumbs />
      </div>

      <h1
        style={{ fontSize: "3.5rem", fontWeight: 600, color: "#fff", marginBottom: 8, lineHeight: 1.1 }}
      >
        {title}
      </h1>

      <div className="mb-6">
        <span style={{ color: "#ff8c00", fontSize: "1.1rem", fontWeight: 500 }}>
          Turnamen Kompetitif
        </span>
      </div>

      <div className="d-flex align-items-center gap-4 mt-8">
        <Link
          href={`/competitions/${slug}/register`}
          className="gps-btn-primary"
          style={{
            background: "#ff8c00",
            color: "#fff",
            padding: "12px 32px",
            borderRadius: 6,
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
          }}
        >
          Daftar Sekarang <i className="ti ti-chevron-right" />
        </Link>

        {videoUrl && (
          <button
            onClick={onOpenVideo}
            style={{
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: 30,
              border: "1px solid rgba(255,255,255,0.2)",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Cuplikan
          </button>
        )}
      </div>

      <style jsx>{`
        .gps-btn-primary:hover { background: #e67e00 !important; }
      `}</style>
    </div>
  );
}