"use client";
import React from "react";
import Link from "next/link";
import { winnersData } from "@/data/winnersData";

interface RecentPlayersCardProps {
  gameTitle: string;
}

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);

const timeToSeconds = (timeStr: string): number => {
  const match = timeStr.match(/(\d+)\s*(minute|second|hour)/);
  if (!match) return 9999;
  const [, num, unit] = match;
  const n = parseInt(num);
  if (unit === "second") return n;
  if (unit === "minute") return n * 60;
  if (unit === "hour") return n * 3600;
  return 9999;
};

export default function RecentPlayersCard({ gameTitle }: RecentPlayersCardProps) {
  // Filter only players for THIS specific game
  // and sort by most recent
  const players = winnersData
    .filter(p => p.game === gameTitle)
    .sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time))
    .slice(0, 3);

  if (players.length === 0) return null;

  return (
    <div className="pt-card w-100 mb-4">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .pt-card {
          background: #161922; /* Matches GameSidebar surface */
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .pt-header {
          padding: 16px 20px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pt-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pt-live-dot {
          position: relative;
          width: 8px;
          height: 8px;
        }
        .pt-live-dot::before,
        .pt-live-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #ff8c00;
        }
        .pt-live-dot::after {
          animation: pt-ping 1.8s ease-out infinite;
          opacity: 0;
        }
        @keyframes pt-ping {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.8); opacity: 0; }
        }

        .pt-title {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          margin: 0;
        }

        .pt-list {
          display: flex;
          flex-direction: column;
        }

        .pt-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
          position: relative;
        }

        .pt-item:last-child { border-bottom: none; }
        .pt-item:hover { background: rgba(255,255,255,0.02); }

        .pt-item.is-newest::before {
          content: '';
          position: absolute;
          left: 0; top: 20%; bottom: 20%;
          width: 2px;
          background: linear-gradient(180deg, #ff8c00, #ff4500);
          border-radius: 0 2px 2px 0;
        }

        .pt-avatar {
          position: relative;
          flex-shrink: 0;
        }

        .pt-avatar-img {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .pt-avatar-fallback {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255,140,0,0.1);
          border: 1px solid rgba(255,140,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #ff8c00;
        }

        .pt-info {
          flex: 1;
          min-width: 0;
        }

        .pt-name {
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pt-time {
          font-size: 10px;
          font-weight: 300;
          color: rgba(255,255,255,0.25);
          margin: 0;
        }

        .pt-footer {
          padding: 10px 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .pt-footer-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: color 0.15s;
        }
        .pt-footer-link:hover { color: #ff8c00; text-decoration: none; }
      `}</style>

      {/* Header */}
      <div className="pt-header">
        <div className="pt-title-wrap">
          <span className="pt-live-dot" />
          <h3 className="pt-title">Pemain Terakhir</h3>
        </div>
      </div>

      {/* Player list */}
      <div className="pt-list">
        {players.map((player, i) => (
          <div
            key={player.id}
            className={`pt-item ${i === 0 ? "is-newest" : ""}`}
          >
            <div className="pt-avatar">
              {player.img ? (
                <img
                  className="pt-avatar-img"
                  src={`/assets/img/${player.img}`}
                  alt={player.name}
                />
              ) : (
                <div className="pt-avatar-fallback">
                  {getInitials(player.name)}
                </div>
              )}
            </div>

            <div className="pt-info">
              <p className="pt-name">{player.name}</p>
              <p className="pt-time">{player.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-footer">
        <Link href="/leaderboard" className="pt-footer-link">
          Lihat semua pemain
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
