"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { winnersData } from "@/data/winnersData";

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);

const gameColors: Record<string, { from: string; to: string }> = {
  "Crazy Race":  { from: "#ff8c00", to: "#ff4500" },
  "Quiz Master": { from: "#ff8c00", to: "#ffb347" },
  "Word Puzzle": { from: "#ffb347", to: "#ff6a00" },
  "Math Hero":   { from: "#ff6a00", to: "#ff8c00" },
};

const getGameGradient = (game: string) =>
  gameColors[game] ?? { from: "#ff8c00", to: "#ffb347" };

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

export default function Banner() {
  useEffect(() => {
    let swiperInstance: any = null;
    let retryCount = 0;
    const maxRetries = 20;

    const initSwiper = () => {
      if (typeof window !== "undefined" && (window as any).Swiper) {
        const Swiper = (window as any).Swiper;
        if (swiperInstance) swiperInstance.destroy();
        swiperInstance = new Swiper(".banner-swiper", {
          direction: "horizontal",
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          speed: 1200,
          parallax: true,
          autoplay: { delay: 5000, disableOnInteraction: false },
          pagination: { el: ".banner-swiper-pagination", clickable: true },
          observer: true,
          observeParents: true,
        });
        return true;
      }
      return false;
    };

    if (!initSwiper()) {
      const interval = setInterval(() => {
        retryCount++;
        if (initSwiper() || retryCount >= maxRetries) clearInterval(interval);
      }, 500);
      return () => clearInterval(interval);
    }
    return () => { if (swiperInstance) swiperInstance.destroy(); };
  }, []);

  const recentPlayers = winnersData
    .slice()
    .sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time))
    .slice(0, 4);

  return (
    <section className="banner-section pb-6 pt-lg-1 pt-sm-1 mt-lg-8 mt-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Player card ── */
        .pt-card {
          background: #0b1117;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .pt-header {
          padding: 20px 20px 14px;
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

        .pt-count-pill {
          font-size: 10px;
          font-weight: 500;
          color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          padding: 3px 10px;
        }

        /* ── Player rows ── */
        .pt-list {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .pt-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
          cursor: pointer;
          position: relative;
          flex: 1;
        }

        .pt-item:last-child { border-bottom: none; }
        .pt-item:hover { background: rgba(255,255,255,0.02); }

        /* newest indicator */
        .pt-item.is-newest::before {
          content: '';
          position: absolute;
          left: 0; top: 20%; bottom: 20%;
          width: 2px;
          background: linear-gradient(180deg, #ff8c00, #ff4500);
          border-radius: 0 2px 2px 0;
        }

        .pt-rank {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,0.12);
          width: 16px;
          text-align: center;
          flex-shrink: 0;
        }

        .pt-avatar {
          position: relative;
          flex-shrink: 0;
        }

        .pt-avatar-img {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .pt-avatar-fallback {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255,140,0,0.1);
          border: 1px solid rgba(255,140,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #ff8c00;
        }

        .pt-online {
          position: absolute;
          bottom: -2px; right: -2px;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #4ade80;
          border: 2px solid #0b1117;
        }

        .pt-info {
          flex: 1;
          min-width: 0;
        }

        .pt-name {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pt-time {
          font-size: 11px;
          font-weight: 300;
          color: rgba(255,255,255,0.25);
          margin: 0;
        }

        .pt-game-badge {
          flex-shrink: 0;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 8px;
          white-space: nowrap;
          letter-spacing: 0.2px;
        }

        /* ── Footer ── */
        .pt-footer {
          padding: 12px 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .pt-footer-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: color 0.15s;
        }
        .pt-footer-link:hover { color: #ff8c00; text-decoration: none; }

        /* ── Mascot float ── */
        .float-mascot { animation: float 4s ease-in-out infinite; }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-18px); }
        }

        /* ── Swiper pagination override ── */
        .banner-swiper-pagination { 
          bottom: 16px !important; 
        }
        @media (max-width: 575px) {
          .banner-swiper-pagination {
            bottom: 5px !important;
          }
        }
        .banner-swiper-pagination .swiper-pagination-bullet {
          background: rgba(255,255,255,0.3) !important;
          opacity: 1 !important;
          width: 6px; height: 6px;
        }
        .banner-swiper-pagination .swiper-pagination-bullet-active {
          background: #ff8c00 !important;
          width: 20px;
          border-radius: 3px;
        }

        @media (max-width: 991px) {
           .hero-content {
             padding-bottom: 20px;
           }
        }
      `}</style>

      <div className="container-fluid px-lg-12 px-md-10 px-6">
        <div className="row g-3 align-items-stretch">

          {/* ── Banner Swiper ── */}
          <div className="col-12 d-flex align-items-stretch">
            <div
              className="swiper banner-swiper position-relative flex-fill w-100 overflow-hidden shadow-lg"
              style={{ borderRadius: "28px", backgroundColor: "#0b1117", minHeight: "360px", border: "1px solid rgba(255,255,255,0.06)" }}
              data-observer="true"
              data-observe-parents="true"
            >
              <div className="banner-bg-img position-absolute w-100 h-100" style={{ opacity: 0.4 }}>
                <img className="w-100 h-100 object-fit-cover" src="/assets/img/hero-banner-bg.png" alt="banner" />
              </div>
              <div className="banner-swiper-pagination"></div>
              <div className="swiper-wrapper h-100">

                {/* Slide 1 */}
                <div className="swiper-slide h-100">
                  <div className="banner-content h-100 d-flex align-items-center">
                    <div className="row justify-content-center gy-3 align-items-center w-100">
                      <div className="col-lg-6 col-md-8 col-11">
                        <div className="hero-content ps-lg-12 ps-6">
                          <p data-swiper-parallax="-200" className="tcn-1 mb-lg-4 mb-3 opacity-75 fw-medium fs-six text-uppercase tracking-wider">SIAP • BERSIAP • MAIN</p>
                          <h2 data-swiper-parallax="-300" className="hero-title tcn-1 mb-lg-5 mb-4" style={{ lineHeight: "100%", fontWeight: 900, letterSpacing: "-1.5px", fontSize: "clamp(2rem, 8vw, 4rem)" }}>
                            ARENA GAMING <span className="tcp-1">TERBAIK</span>
                          </h2>
                          <p data-swiper-parallax="-350" className="tcn-1 mb-lg-6 mb-5 opacity-75 fs-six" style={{ maxWidth: 600 }}>
                            Gabung di arena cerdas cermat dengan sensasi gaming yang seru. Tantang pengetahuanmu dan kuasai panggung turnamen!
                          </p>
                          <div data-swiper-parallax="-400" className="d-flex align-items-center flex-wrap gap-xl-4 gap-3 mb-lg-1 mb-8 mb-sm-6">
                            <Link href="/competitions" className="gps-btn-primary">Masuk Arena</Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 position-relative d-none d-lg-block" style={{ zIndex: 10 }}>
                        <div data-swiper-parallax="-500" className="banner-characters position-relative d-flex align-items-center justify-content-center" style={{ minHeight: 340 }}>
                          <img src="/assets/img/astronaut-mascot-transparent.png" alt="Mascot" className="float-mascot" style={{ height: 450, width: "auto", zIndex: 20, filter: "drop-shadow(0 0 60px rgba(0,209,255,0.4))", transform: "scale(1.35) translateY(5px)", objectFit: "contain" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 2 */}
                <div className="swiper-slide h-100">
                  <div className="banner-content h-100 d-flex align-items-center">
                    <div className="row justify-content-center gy-3 align-items-center w-100">
                      <div className="col-lg-6 col-md-8 col-11">
                        <div className="hero-content ps-lg-12 ps-6">
                          <p data-swiper-parallax="-200" className="tcn-1 mb-lg-4 mb-3 opacity-75 fw-medium fs-six text-uppercase tracking-wider">NAIK LEVEL • HANYA SKILL</p>
                          <h2 data-swiper-parallax="-300" className="hero-title tcn-1 mb-lg-5 mb-4" style={{ lineHeight: "100%", fontWeight: 900, letterSpacing: "-1.5px", fontSize: "clamp(2rem, 8vw, 4rem)" }}>
                            RAIH KEMENANGAN <span className="tcp-1">BERUNTUN</span>
                          </h2>
                          <p data-swiper-parallax="-350" className="tcn-1 mb-lg-6 mb-5 opacity-75 fs-six" style={{ maxWidth: 600 }}>
                            Mainkan quiz layaknya pro gamer. Jawab cepat, kumpulkan combo poin, dan rebut posisi pertama di leaderboard.
                          </p>
                          <div data-swiper-parallax="-400" className="d-flex align-items-center flex-wrap gap-xl-4 gap-3 mb-lg-1 mb-8 mb-sm-6">
                            <Link href="/leaderboard" className="gps-btn-primary">Cek Leaderboard</Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 position-relative d-none d-lg-block" style={{ zIndex: 10 }}>
                        <div data-swiper-parallax="-500" className="banner-characters position-relative d-flex align-items-center justify-content-center" style={{ minHeight: 340 }}>
                          <img src="/assets/img/new-boy-mascot.png" alt="Mascot" className="float-mascot" style={{ height: 400, width: "auto", zIndex: 20, filter: "drop-shadow(0 0 30px rgba(255,140,0,0.3))", borderRadius: 30, transform: "scale(1.1) translateY(5px)", objectFit: "contain" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 3 */}
                <div className="swiper-slide h-100">
                  <div className="banner-content h-100 d-flex align-items-center">
                    <div className="row justify-content-center gy-3 align-items-center w-100">
                      <div className="col-lg-6 col-md-8 col-11">
                        <div className="hero-content ps-lg-12 ps-6">
                          <p data-swiper-parallax="-200" className="tcn-1 mb-lg-4 mb-3 opacity-75 fw-medium fs-six text-uppercase tracking-wider">ADU CEPAT • TANPA LAG</p>
                          <h2 data-swiper-parallax="-300" className="hero-title tcn-1 mb-lg-5 mb-4" style={{ lineHeight: "100%", fontWeight: 900, letterSpacing: "-1.5px", fontSize: "clamp(2rem, 8vw, 4rem)" }}>
                            REFLEKS <span className="tcp-1">TERCEPAT MENANG</span>
                          </h2>
                          <p data-swiper-parallax="-350" className="tcn-1 mb-lg-6 mb-5 opacity-75 fs-six" style={{ maxWidth: 600 }}>
                            Buktikan kecepatan jarimu dan ketajaman otakmu. Di mode ini, setiap detik adalah penentu kemenanganmu!
                          </p>
                          <div data-swiper-parallax="-400" className="d-flex align-items-center flex-wrap gap-xl-4 gap-3 mb-lg-1 mb-8 mb-sm-6">
                            <Link href="/games" className="gps-btn-primary">Main Sekarang</Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 position-relative d-none d-lg-block" style={{ zIndex: 10 }}>
                        <div data-swiper-parallax="-500" className="banner-characters position-relative d-flex align-items-center justify-content-center" style={{ minHeight: 340 }}>
                          <img src="/assets/img/astronaut-mascot-transparent.png" alt="Mascot" className="float-mascot" style={{ height: 450, width: "auto", zIndex: 20, filter: "drop-shadow(0 0 60px rgba(0,209,255,0.4))", transform: "scale(1.35) rotate(-5deg) translateY(5px)", objectFit: "contain" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 4 */}
                <div className="swiper-slide h-100">
                  <div className="banner-content h-100 d-flex align-items-center">
                    <div className="row justify-content-center gy-3 align-items-center w-100">
                      <div className="col-lg-6 col-md-8 col-11">
                        <div className="hero-content ps-lg-12 ps-6">
                          <p data-swiper-parallax="-200" className="tcn-1 mb-lg-4 mb-3 opacity-75 fw-medium fs-six text-uppercase tracking-wider">HADIAH EPIK • STATUS MVP</p>
                          <h2 data-swiper-parallax="-300" className="hero-title tcn-1 mb-lg-5 mb-4" style={{ lineHeight: "100%", fontWeight: 900, letterSpacing: "-1.5px", fontSize: "clamp(2rem, 8vw, 4rem)" }}>
                            JADI JUARA <span className="tcp-1">LEGENDA</span>
                          </h2>
                          <p data-swiper-parallax="-350" className="tcn-1 mb-lg-6 mb-5 opacity-75 fs-six" style={{ maxWidth: 600 }}>
                            Raih trophy eksklusif, sertifikat nasional, dan total hadiah jutaan Rupiah. Inilah saatnya jadi MVP di GameForSmart!
                          </p>
                          <div data-swiper-parallax="-400" className="d-flex align-items-center flex-wrap gap-xl-4 gap-3 mb-lg-1 mb-8 mb-sm-6">
                            <Link href="/register" className="gps-btn-primary">Klaim Slotmu</Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 position-relative d-none d-lg-block" style={{ zIndex: 10 }}>
                        <div data-swiper-parallax="-500" className="banner-characters position-relative d-flex align-items-center justify-content-center" style={{ minHeight: 340 }}>
                          <img src="/assets/img/new-boy-mascot.png" alt="Mascot" className="float-mascot" style={{ height: 400, width: "auto", zIndex: 20, filter: "drop-shadow(0 0 30px rgba(255,140,0,0.3))", borderRadius: 30, transform: "scale(1.1) translateY(5px)", objectFit: "contain" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}