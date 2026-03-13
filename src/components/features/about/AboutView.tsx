"use client";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Footer from "@/components/shared/Footer";
import Link from "next/link";

const stats = [
  { value: "10K+", label: "Pelajar Aktif" },
  { value: "200+", label: "Kompetisi" },
  { value: "50+", label: "Jenis Game" },
  { value: "34", label: "Provinsi" },
];

const features = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Game Edukatif",
    desc: "Puzzle, balapan, dan tantangan berbasis kurikulum nasional.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: "Kompetisi & Leaderboard",
    desc: "Bersaing secara sehat dan ukur kemampuan nyata.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Gratis & Premium",
    desc: "Mulai gratis, upgrade untuk fitur kompetisi eksklusif.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Untuk Semua Pelajar",
    desc: "SD hingga SMA, dari Sabang sampai Merauke.",
  },
];

export default function AboutView() {
  return (
    <>
      <style>{`
        .av-root * { box-sizing: border-box; }
        .av-root { font-family: 'Poppins', sans-serif; }

        /* ── Page fade-in ── */
        .av-page { animation: av-up 0.65s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes av-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Eyebrow ── */
        .av-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #ff8c00;
          margin-bottom: 16px;
        }
        .av-eyebrow::before {
          content: '';
          width: 22px; height: 1px;
          background: #ff8c00;
          opacity: 0.6;
        }

        /* ── Heading ── */
        .av-title {
          font-family: 'Chakra Petch', sans-serif;
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -1.5px;
          line-height: 1.05;
          margin: 0 0 24px;
        }
        .av-title em {
          font-style: normal;
          color: #ff8c00;
        }

        /* ── Body text ── */
        .av-body {
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          line-height: 1.8;
          margin: 0 0 32px;
          max-width: 480px;
        }

        /* ── Features grid ── */
        .av-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 36px;
        }

        .av-feat {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 18px 16px;
          transition: background 0.2s, border-color 0.2s;
        }
        .av-feat:hover {
          background: rgba(255,140,0,0.05);
          border-color: rgba(255,140,0,0.18);
        }

        .av-feat-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(255,140,0,0.1);
          border: 1px solid rgba(255,140,0,0.18);
          color: #ff8c00;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 12px;
        }

        .av-feat-title {
          font-family: 'Chakra Petch', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 5px;
        }

        .av-feat-desc {
          font-size: 12px;
          font-weight: 300;
          color: rgba(255,255,255,0.35);
          line-height: 1.6;
          margin: 0;
        }

        /* ── CTA button ── */
        .av-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ff8c00;
          color: #fff;
          font-family: 'Chakra Petch', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.3px;
          padding: 13px 26px;
          border-radius: 100px;
          text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }
        .av-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255,140,0,0.3);
          color: #fff;
          text-decoration: none;
        }
        .av-cta:active { transform: translateY(0); }

        .av-cta-arrow {
          display: flex;
          align-items: center;
          transition: transform 0.2s;
        }
        .av-cta:hover .av-cta-arrow {
          transform: translate(3px, -3px);
        }

        /* ── Right panel ── */
        .av-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: av-up 0.65s 0.15s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── Stats grid ── */
        .av-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .av-stat {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 22px 20px;
          position: relative;
          overflow: hidden;
        }
        .av-stat::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,140,0,0.3), transparent);
        }

        .av-stat-value {
          font-family: 'Chakra Petch', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #ff8c00;
          letter-spacing: -1px;
          line-height: 1;
          margin: 0 0 5px;
        }

        .av-stat-label {
          font-size: 11px;
          font-weight: 400;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.5px;
          margin: 0;
        }

        /* ── Mission card ── */
        .av-mission {
          background: rgba(255,140,0,0.06);
          border: 1px solid rgba(255,140,0,0.15);
          border-radius: 16px;
          padding: 24px 22px;
          position: relative;
          overflow: hidden;
        }
        .av-mission::before {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #ff8c00, #ff6a00);
          border-radius: 3px 0 0 3px;
        }

        .av-mission-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #ff8c00;
          margin: 0 0 10px;
        }

        .av-mission-text {
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.6);
          line-height: 1.75;
          margin: 0;
          font-style: italic;
        }

        /* ── Trust badges ── */
        .av-trust {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .av-trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          padding: 6px 12px;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          font-weight: 400;
        }

        .av-trust-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #4ade80;
          flex-shrink: 0;
        }

        @media (max-width: 576px) {
          .av-features { grid-template-columns: 1fr; }
          .av-stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <Header />
      <main
        className="main-container container-fluid d-flex align-items-start pt-sm-20 pt-15 pb-20 px-0 position-relative"
        style={{ overflow: "visible" }}
      >
        <Sidebar />
        <article className="main-content mt-lg-10 av-root">
          <section className="pb-120">
            <div className="container-fluid px-lg-15 px-md-10 px-6">

              {/* Header */}
              <div className="av-page mb-12 mb-lg-16">
                <Breadcrumbs />
                <div className="mt-6">
                  <span className="av-eyebrow">Tentang Kami</span>
                  <h1 className="av-title">
                    Belajar lebih seru,<br />
                    bersaing lebih <em>cerdas.</em>
                  </h1>
                </div>
              </div>

              {/* Two-column */}
              <div className="row g-8 align-items-start">

                {/* Left */}
                <div className="col-lg-6 pe-lg-6">
                  <p className="av-body">
                    GameForSmart adalah platform kompetisi pendidikan digital yang
                    dirancang untuk mengasah kecerdasan, ketangkasan, dan
                    sportivitas pelajar di seluruh Indonesia.
                  </p>

                  <div className="av-features">
                    {features.map((f) => (
                      <div key={f.title} className="av-feat">
                        <div className="av-feat-icon">{f.icon}</div>
                        <p className="av-feat-title">{f.title}</p>
                        <p className="av-feat-desc">{f.desc}</p>
                      </div>
                    ))}
                  </div>

                  <Link href="/games" className="av-cta">
                    Mulai Bermain Sekarang
                    <span className="av-cta-arrow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"/>
                        <polyline points="7 7 17 7 17 17"/>
                      </svg>
                    </span>
                  </Link>
                </div>

                {/* Right */}
                <div className="col-lg-6 ps-lg-6">
                  <div className="av-right">

                    {/* Stats */}
                    <div className="av-stats">
                      {stats.map((s) => (
                        <div key={s.label} className="av-stat">
                          <p className="av-stat-value">{s.value}</p>
                          <p className="av-stat-label">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Mission quote */}
                    <div className="av-mission">
                      <p className="av-mission-label">Misi Kami</p>
                      <p className="av-mission-text">
                        "Menjadi ruang belajar yang kompetitif, modern, dan
                        menyenangkan — mencetak generasi Indonesia yang cerdas
                        sekaligus berjiwa sportif."
                      </p>
                    </div>

                    {/* Trust badges */}
                    <div className="av-trust">
                      <span className="av-trust-badge">
                        <span className="av-trust-dot" />
                        Aktif sejak 2022
                      </span>
                      <span className="av-trust-badge">
                        <span className="av-trust-dot" />
                        Terdaftar Kemendikbud
                      </span>
                      <span className="av-trust-badge">
                        <span className="av-trust-dot" />
                        34 Provinsi terjangkau
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}