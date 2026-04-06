"use client";
// components/features/competitions/competition-detail/CompetitionInfoCard.tsx

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface CompetitionInfoCardProps {
  slug: string;
  title?: string;
  prizeMoney?: string;
  prizeUsd?: string;
  date?: string;
  ticketFee?: string;
  currentRegistered: number;
  maxQuota: number;
}

export default function CompetitionInfoCard({
  slug,
  title,
  prizeMoney,
  prizeUsd,
  date,
  ticketFee,
  currentRegistered,
  maxQuota,
}: CompetitionInfoCardProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const progressPercent = Math.min((currentRegistered / maxQuota) * 100, 100);
  const isFull = currentRegistered >= maxQuota;
  const slotsLeft = maxQuota - currentRegistered;

  const stats = [
    { label: "PERIODE", value: date ?? "TBA" },
    { label: "ENTRY", value: ticketFee || "Gratis" },
    { label: "TIM", value: `${currentRegistered}/${maxQuota}` },
  ];

  return (
    <div style={{ position: "sticky", top: 120 }}>
      {/* ── Card Wrapper ── */}
      <div
        style={{
          background: "linear-gradient(160deg, #161920 0%, #0d0f14 100%)",
          borderRadius: 20,
          border: "1px solid rgba(255,140,0,0.18)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
      >
        {/* ── Orange accent bar at top ── */}
        <div
          style={{
            height: 4,
            background: "linear-gradient(90deg, #ff8c00, #ffb347, #ff8c00)",
            backgroundSize: "200% 100%",
          }}
        />

        <div className="p-6">
          {/* ── Header row: badge + competition name ── */}
          <div className="d-flex justify-content-between align-items-center mb-5">
            <span
              className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-bold fs-xs"
              style={{
                background: "rgba(255,140,0,0.12)",
                border: "1px solid rgba(255,140,0,0.3)",
                color: "#ff8c00",
                letterSpacing: "0.03em",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#ff8c00",
                  boxShadow: "0 0 6px #ff8c00",
                  display: "inline-block",
                }}
              />
              Pendaftaran Dibuka
            </span>

            {title && (
              <span
                className="fs-xs fw-semibold text-end"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  maxWidth: 110,
                  lineHeight: 1.3,
                }}
              >
                {title}
              </span>
            )}
          </div>

          {/* ── Prize money ── */}
          <div className="mb-5">
            <p
              className="mb-1 text-uppercase fw-semibold"
              style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.12em" }}
            >
              Total Hadiah
            </p>
            <h2
              className="fw-bold mb-1"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                color: "#ff8c00",
                lineHeight: 1.1,
                textShadow: "0 0 20px rgba(255,140,0,0.35)",
              }}
            >
              {prizeMoney ?? "—"}
            </h2>
            {prizeUsd && (
              <p
                style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}
                className="mb-0"
              >
                ≈ {prizeUsd}
              </p>
            )}
          </div>

          {/* ── Divider ── */}
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
              marginBottom: 20,
            }}
          />

          {/* ── Stats grid ── */}
          <div
            className="d-grid mb-5"
            style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}
          >
            {stats.map(({ label, value }) => (
              <div
                key={label}
                className="text-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  padding: "12px 8px",
                }}
              >
                <p
                  className="mb-1 text-uppercase"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.38)",
                    fontWeight: 700,
                  }}
                >
                  {label}
                </p>
                <p
                  className="mb-0 fw-bold"
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    lineHeight: 1.2,
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* ── Capacity progress ── */}
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span
                style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}
              >
                Kapasitas terisi
              </span>
              <span
                className="fw-bold"
                style={{ color: "#ff8c00", fontSize: 12 }}
              >
                {progressPercent.toFixed(0)}%
                {!isFull && (
                  <span
                    style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}
                  >
                    {" "}
                    · {slotsLeft} slot tersisa
                  </span>
                )}
              </span>
            </div>

            {/* Track */}
            <div
              style={{
                height: 8,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #ff6a00, #ff8c00, #ffb347)",
                  borderRadius: 99,
                  transition: "width 0.6s ease",
                  boxShadow: "0 0 8px rgba(255,140,0,0.6)",
                }}
              />
            </div>
          </div>

          {/* ── CTA Button ── */}
          {isFull ? (
            <button
              className="btn w-100 fw-bold py-3 rounded-3"
              disabled
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.35)",
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "not-allowed",
                fontSize: 15,
              }}
            >
              Kuota Penuh
            </button>
          ) : (
            <button
              suppressHydrationWarning
              onClick={() => {
                router.push(`/competitions/${slug}/register`);
              }}
              className="d-flex align-items-center justify-content-center gap-2 w-100 fw-bold text-decoration-none text-white rounded-3 border-0"
              style={{
                background:
                  "linear-gradient(135deg, #ff6a00 0%, #ff8c00 60%, #e07800 100%)",
                padding: "14px 20px",
                fontSize: 15,
                letterSpacing: "0.02em",
                boxShadow: "0 4px 20px rgba(255,140,0,0.4)",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 6px 28px rgba(255,140,0,0.6)";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 4px 20px rgba(255,140,0,0.4)";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(0)";
              }}
            >
              Daftar Sekarang
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          )}

          {/* ── Sub-text ── */}
          <p
            className="text-center mt-3 mb-0"
            style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}
          >
            Pembayaran via transfer bank &amp; e-wallet
          </p>
        </div>
      </div>
    </div>
  );
}
