"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface TournamentCardProps {
  id: number;
  title: string;
  type: string;
  image: string;
  status: string;
  prizeMoney?: string;
  ticketFee?: string;
  date?: string;
  teams?: string;
  description?: string;
  slug?: string;
  practiceAttempts?: number;
  competitionAttempts?: number;
  link?: string;
}

export default function TournamentCard({
  id,
  title,
  type,
  image,
  status,
  prizeMoney = "Rp 0",
  ticketFee = "Gratis",
  date = "07 OKT, 05:10",
  teams = "12/12",
  description,
  slug,
  practiceAttempts,
  competitionAttempts,
  link,
}: TournamentCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const fullDescription =
    description ||
    "Kompetisi menguji kemampuan siswa dalam menyelesaikan tantangan yang tersedia sebagai latihan.";

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      setIsTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [fullDescription]);

  return (
    <div className="tournament-card p-xl-4 p-3 pb-xl-8 bgn-4 d-flex flex-column h-100 w-100">
      <div
        className="tournament-img mb-8 position-relative w-100"
        style={{ flexShrink: 0 }}
      >
        <div className="img-area overflow-hidden position-relative w-100 rounded d-flex align-items-center justify-content-center">
          <img
            className="w-100 h-auto object-fit-contain"
            src={image}
            alt="tournament"
            style={
              status === "Coming Soon"
                ? { filter: "blur(4px) brightness(0.4)" }
                : {}
            }
          />
          {status === "Coming Soon" && (
            <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
              <i className="ti ti-lock display-four tcn-1 mb-2"></i>
              <h5 className="tcn-1 text-uppercase fw-bold">Segera Hadir</h5>
            </div>
          )}
        </div>
        {status === "Popular" ? (
          <span
            className="card-status position-absolute top-0 end-0 py-1 px-4 tcn-1 fs-sm fw-bold shadow-sm"
            style={{
              backgroundColor: "#ff4d4d",
              borderRadius: "0 0 0 20px",
              zIndex: 2,
            }}
          >
            Populer
          </span>
        ) : (
          status === "New" && (
            <span
              className="card-status position-absolute top-0 end-0 py-1 px-4 bgn-1 tcn-1 fs-sm fw-bold shadow-sm"
              style={{ borderRadius: "0 0 0 20px", zIndex: 2 }}
            >
              Baru
            </span>
          )
        )}
      </div>
      <div className="tournament-content px-xxl-4 d-flex flex-column flex-grow-1">
        <div className="tournament-info mb-5">
          <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-1">
            <Link
              href={link || `/competitions/${slug || id}`}
              className="d-block"
            >
              <h4 className="tournament-title tcn-1 mb-0 fs-five">{title}</h4>
            </Link>
            {status !== "Popular" &&
              status !== "New" &&
              (status === "Coming Soon" ? (
                <span
                  className="py-2 px-3 tcn-1 d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: "#F6471C",
                    border: "1px solid #F6471C",
                    borderRadius: "20px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                    }}
                  ></span>
                  <span className="fw-bold fs-sm text-nowrap">
                    Segera Hadir
                  </span>
                </span>
              ) : (
                <span
                  className="py-2 px-3 tcn-1 d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: "rgba(114, 255, 0, 0.1)",
                    border: "1px solid #72ff00",
                    borderRadius: "20px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#72ff00",
                      borderRadius: "50%",
                    }}
                  ></span>
                  <span className="fs-sm text-nowrap">
                    {status || "Berlangsung"}
                  </span>
                </span>
              ))}
          </div>
          <span className="tcn-6 fs-sm">{type}</span>
        </div>
        <div className="hr-line line3"></div>
        <div
          className="card-info d-flex flex-column gap-2 my-5 position-relative flex-grow-1"
          onMouseEnter={() => isTruncated && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p ref={textRef} className="tcn-6 fs-sm mb-0 line-clamp-2">
            {fullDescription}
          </p>
          {showTooltip && isTruncated && (
            <div className="custom-tooltip-box rounded-3 p-3 bgn-3 tcn-1 shadow-lg">
              {fullDescription}
            </div>
          )}
        </div>
        <div className="hr-line line3 mt-auto"></div>
        <div className="card-more-info d-between align-items-center mt-6">
          <Link
            href={link || `/competitions/${slug || id}`}
            className="gps-btn-primary flex-grow-1"
          >
            <span className="fs-six">Daftar</span>
          </Link>
          <Link
            href={link || `/competitions/${slug || id}`}
            className="btn-detail d-flex align-items-center justify-content-center"
            style={{
              width: "44px",
              height: "44px",
              border: "1px solid rgba(255, 140, 0, 0.4)",
              borderRadius: "50%",
              color: "#ff8c00",
              boxShadow: "0 0 10px rgba(255, 140, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
            title="Lihat Deskripsi"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 140, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <i className="ti ti-arrow-right fs-2xl"></i>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .custom-tooltip-box {
          position: absolute;
          bottom: 100%;
          left: 0;
          width: 100%;
          max-width: 300px;
          background: #090b10;
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 100;
          margin-bottom: 10px;
          font-size: 14px;
          line-height: 1.5;
          pointer-events: none;
          animation: tooltipFadeIn 0.3s ease-in-out;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 575px) {
          .tournament-card {
            padding: 15px !important;
          }
          .tournament-title {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
