"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { winnersData } from "@/data/winnersData";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const formatToRupiah = (amountStr: string) => {
  // Extract number from "+$220" or similar
  const num = parseInt(amountStr.replace(/[+$,]/g, ""));
  if (isNaN(num)) return amountStr;

  // Convert to Rupiah equivalent ($220 -> Rp 220.000)
  const idrValue = num * 1000;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(idrValue)
    .replace("IDR", "Rp");
};

export default function Banner() {
  useEffect(() => {
    // Initialize Swiper with a check to handle delayed script loading
    let swiperInstance: any = null;
    let retryCount = 0;
    const maxRetries = 20;

    const initSwiper = () => {
      if (typeof window !== "undefined" && (window as any).Swiper) {
        const Swiper = (window as any).Swiper;

        // Destroy existing instance if any
        if (swiperInstance) {
          swiperInstance.destroy();
        }

        swiperInstance = new Swiper(".banner-swiper", {
          direction: "vertical",
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          speed: 1200,
          parallax: true,
          mousewheel: {
            invert: false,
            releaseOnEdges: true,
          },
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".banner-swiper-pagination",
            clickable: true,
          },
          observer: true,
          observeParents: true,
        });
        return true;
      }
      return false;
    };

    // Try immediate init
    if (!initSwiper()) {
      const interval = setInterval(() => {
        retryCount++;
        if (initSwiper() || retryCount >= maxRetries) {
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.destroy();
      }
    };
  }, []);

  return (
    <section className="banner-section pb-6 pt-lg-1 pt-sm-1 mt-lg-8 mt-4">
      <div className="container-fluid px-lg-12 px-md-10 px-6">
        <div
          className="row g-3 align-items-stretch hover-none"
          style={{ minHeight: "360px", height: "auto" }}
        >
          <div className="col-xxl-9 col-xl-8 col-lg-7 d-flex align-items-stretch">
            <div
              className="swiper banner-swiper position-relative flex-fill w-100 h-100 overflow-hidden shadow-lg border border-secondary border-opacity-10"
              style={{
                borderRadius: "40px",
                backgroundColor: "#0b1117",
                height: "100%",
                minHeight: "360px",
              }}
              data-observer="true"
              data-observe-parents="true"
            >
              <div
                className="banner-bg-img position-absolute w-100 h-100"
                style={{ opacity: "0.4" }}
              >
                <img
                  className="w-100 h-100 object-fit-cover"
                  src="/assets/img/hero-banner-bg.png"
                  alt="banner"
                />
              </div>
              <div className="banner-swiper-pagination"></div>
              <div className="swiper-wrapper h-100">
                {/* Slide 1 - INTRO KOMPETISI */}
                <div className="swiper-slide h-100">
                  <div className="banner-content h-100 d-flex align-items-center">
                    <div className="row justify-content-center gy-3 align-items-center w-100">
                      <div className="col-lg-6 col-md-8 col-11">
                        <div className="hero-content ps-lg-12 ps-6">
                          <p
                            data-swiper-parallax="-200"
                            className="tcn-1 mb-lg-4 mb-3 opacity-75 fw-medium fs-six text-uppercase tracking-wider"
                          >
                            SIAP • BERSIAP • MAIN
                          </p>
                          <h2
                            data-swiper-parallax="-300"
                            className="hero-title tcn-1 mb-lg-5 mb-4"
                            style={{
                              fontSize: "3.5rem",
                              lineHeight: "100%",
                              fontWeight: "900",
                              letterSpacing: "-1.5px",
                            }}
                          >
                            ARENA GAMING <span className="tcp-1">TERBAIK</span>
                          </h2>
                          <p
                            data-swiper-parallax="-350"
                            className="tcn-1 mb-lg-6 mb-5 opacity-75 fs-six"
                            style={{ maxWidth: "600px" }}
                          >
                            Gabung di arena cerdas cermat dengan sensasi gaming
                            yang seru. Tantang pengetahuanmu dan kuasai panggung
                            turnamen!
                          </p>

                          <div
                            data-swiper-parallax="-400"
                            className="d-flex align-items-center flex-wrap gap-xl-4 gap-3 mb-1"
                          >
                            <Link href="/competitions" className="gps-btn-primary">
                              Masuk Arena
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-6 position-relative d-none d-lg-block"
                        style={{ zIndex: 10 }}
                      >
                        <div
                          data-swiper-parallax="-500"
                          className="banner-characters position-relative d-flex align-items-center justify-content-center"
                          style={{ minHeight: "340px" }}
                        >
                          <img
                            src="/assets/img/astronaut-mascot-transparent.png"
                            alt="Mascot"
                            className="float-mascot"
                            style={{
                              height: "450px",
                              width: "auto",
                              zIndex: 20,
                              filter:
                                "drop-shadow(0 0 60px rgba(0, 209, 255, 0.4))",
                              transform: "scale(1.35) translateY(5px)",
                              objectFit: "contain",
                              display: "block",
                              opacity: 1,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Slide 2 - TANTANGAN & SKOR */}
                <div className="swiper-slide h-100">
                  <div className="banner-content h-100 d-flex align-items-center">
                    <div className="row justify-content-center gy-3 align-items-center w-100">
                      <div className="col-lg-6 col-md-8 col-11">
                        <div className="hero-content ps-lg-12 ps-6">
                          <p
                            data-swiper-parallax="-200"
                            className="tcn-1 mb-lg-4 mb-3 opacity-75 fw-medium fs-six text-uppercase tracking-wider"
                          >
                            NAIK LEVEL • HANYA SKILL
                          </p>
                          <h2
                            data-swiper-parallax="-300"
                            className="hero-title tcn-1 mb-lg-5 mb-4"
                            style={{
                              fontSize: "3.5rem",
                              lineHeight: "100%",
                              fontWeight: "900",
                              letterSpacing: "-1.5px",
                            }}
                          >
                            RAIH KEMENANGAN{" "}
                            <span className="tcp-1">BERUNTUN</span>
                          </h2>
                          <p
                            data-swiper-parallax="-350"
                            className="tcn-1 mb-lg-6 mb-5 opacity-75 fs-six"
                            style={{ maxWidth: "600px" }}
                          >
                            Mainkan quiz layaknya pro gamer. Jawab cepat,
                            kumpulkan combo poin, dan rebut posisi pertama di
                            leaderboard.
                          </p>

                          <div
                            data-swiper-parallax="-400"
                            className="d-flex align-items-center flex-wrap gap-xl-4 gap-3 mb-1"
                          >
                            <Link href="/leaderboard" className="gps-btn-primary">
                              Cek Leaderboard
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-6 position-relative d-none d-lg-block"
                        style={{ zIndex: 10 }}
                      >
                        <div
                          data-swiper-parallax="-500"
                          className="banner-characters position-relative d-flex align-items-center justify-content-center"
                          style={{ minHeight: "340px" }}
                        >
                          <img
                            src="/assets/img/new-boy-mascot.png"
                            alt="Mascot"
                            className="float-mascot"
                            style={{
                              height: "400px",
                              width: "auto",
                              zIndex: 20,
                              filter:
                                "drop-shadow(0 0 30px rgba(255, 140, 0, 0.3))",
                              borderRadius: "30px",
                              transform: "scale(1.1) translateY(5px)",
                              objectFit: "contain",
                              display: "block",
                              opacity: 1,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* SLIDE 3 - MODE TANTANGAN CEPAT */}
                <div className="swiper-slide h-100">
                  <div className="banner-content h-100 d-flex align-items-center">
                    <div className="row justify-content-center gy-3 align-items-center w-100">
                      <div className="col-lg-6 col-md-8 col-11">
                        <div className="hero-content ps-lg-12 ps-6">
                          <p
                            data-swiper-parallax="-200"
                            className="tcn-1 mb-lg-4 mb-3 opacity-75 fw-medium fs-six text-uppercase tracking-wider"
                          >
                            ADU CEPAT • TANPA LAG
                          </p>
                          <h2
                            data-swiper-parallax="-300"
                            className="hero-title tcn-1 mb-lg-5 mb-4"
                            style={{
                              fontSize: "3.5rem",
                              lineHeight: "100%",
                              fontWeight: "900",
                              letterSpacing: "-1.5px",
                            }}
                          >
                            REFLEKS{" "}
                            <span className="tcp-1">TERCEPAT MENANG</span>
                          </h2>
                          <p
                            data-swiper-parallax="-350"
                            className="tcn-1 mb-lg-6 mb-5 opacity-75 fs-six"
                            style={{ maxWidth: "600px" }}
                          >
                            Buktikan kecepatan jarimu dan ketajaman otakmu. Di
                            mode ini, setiap detik adalah penentu kemenanganmu!
                          </p>

                          <div
                            data-swiper-parallax="-400"
                            className="d-flex align-items-center flex-wrap gap-xl-4 gap-3 mb-1"
                          >
                            <Link href="/games" className="gps-btn-primary">
                              Main Sekarang
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-6 position-relative d-none d-lg-block"
                        style={{ zIndex: 10 }}
                      >
                        <div
                          data-swiper-parallax="-500"
                          className="banner-characters position-relative d-flex align-items-center justify-content-center"
                          style={{ minHeight: "340px" }}
                        >
                          <img
                            src="/assets/img/astronaut-mascot-transparent.png"
                            alt="Mascot"
                            className="float-mascot"
                            style={{
                              height: "450px",
                              width: "auto",
                              zIndex: 20,
                              filter:
                                "drop-shadow(0 0 60px rgba(0, 209, 255, 0.4))",
                              transform:
                                "scale(1.35) rotate(-5deg) translateY(5px)",
                              objectFit: "contain",
                              display: "block",
                              opacity: 1,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* SLIDE 4 - PRESTASI & HADIAH */}
                <div className="swiper-slide h-100">
                  <div className="banner-content h-100 d-flex align-items-center">
                    <div className="row justify-content-center gy-3 align-items-center w-100">
                      <div className="col-lg-6 col-md-8 col-11">
                        <div className="hero-content ps-lg-12 ps-6">
                          <p
                            data-swiper-parallax="-200"
                            className="tcn-1 mb-lg-4 mb-3 opacity-75 fw-medium fs-six text-uppercase tracking-wider"
                          >
                            HADIAH EPIK • STATUS MVP
                          </p>
                          <h2
                            data-swiper-parallax="-300"
                            className="hero-title tcn-1 mb-lg-5 mb-4"
                            style={{
                              fontSize: "3.5rem",
                              lineHeight: "100%",
                              fontWeight: "900",
                              letterSpacing: "-1.5px",
                            }}
                          >
                            JADI JUARA <span className="tcp-1">LEGENDA</span>
                          </h2>
                          <p
                            data-swiper-parallax="-350"
                            className="tcn-1 mb-lg-6 mb-5 opacity-75 fs-six"
                            style={{ maxWidth: "600px" }}
                          >
                            Raih trophy eksklusif, sertifikat nasional, dan
                            total hadiah jutaan Rupiah. Inilah saatnya jadi MVP
                            di GameForSmart!
                          </p>

                          <div
                            data-swiper-parallax="-400"
                            className="d-flex align-items-center flex-wrap gap-xl-4 gap-3 mb-1"
                          >
                            <Link href="/register" className="gps-btn-primary">
                              Klaim Slotmu
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-6 position-relative d-none d-lg-block"
                        style={{ zIndex: 10 }}
                      >
                        <div
                          data-swiper-parallax="-500"
                          className="banner-characters position-relative d-flex align-items-center justify-content-center"
                          style={{ minHeight: "340px" }}
                        >
                          <img
                            src="/assets/img/new-boy-mascot.png"
                            alt="Mascot"
                            className="float-mascot"
                            style={{
                              height: "400px",
                              width: "auto",
                              zIndex: 20,
                              filter:
                                "drop-shadow(0 0 30px rgba(255, 140, 0, 0.3))",
                              borderRadius: "30px",
                              transform: "scale(1.1) translateY(5px)",
                              objectFit: "contain",
                              display: "block",
                              opacity: 1,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-lg-5 d-flex align-items-stretch">
            <div
              className="card-area flex-fill d-flex flex-column w-100 overflow-hidden shadow-lg border border-secondary border-opacity-10 px-0"
              style={{
                backgroundColor: "#0b1117",
                borderRadius: "40px",
                height: "100%",
                minHeight: "100%",
              }}
            >
              <div className="card-header pt-4 px-4 pb-2">
                <h3 className="tcn-1 dot-icon mb-0 fs-six fw-bold text-uppercase d-flex align-items-center">
                  <span className="d-flex gap-1 me-2">
                    <span
                      className="otp-dots"
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        backgroundColor: "var(--tcp-1)",
                        boxShadow: "0 0 10px var(--tcp-1)",
                      }}
                    ></span>
                    <span
                      className="otp-dots"
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        backgroundColor: "var(--tcp-1)",
                        boxShadow: "0 0 10px var(--tcp-1)",
                      }}
                    ></span>
                  </span>
                  Pemenang Terakhir
                </h3>
              </div>
              <div className="card-items d-flex flex-column flex-grow-1 overflow-auto custom-scrollbar">
                {winnersData.slice(0, 4).map((winner, i, arr) => (
                  <div
                    key={winner.id}
                    className="winner-list-item px-4 py-4 transition flex-grow-1 d-flex flex-column justify-content-center"
                    style={{
                      borderBottom:
                        i < arr.length - 1
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "none",
                      cursor: "pointer",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="card-img-area rounded-circle overflow-hidden border border-2 border-dark d-flex align-items-center justify-content-center"
                          style={{
                            width: "42px",
                            height: "42px",
                            minWidth: "42px",
                            backgroundColor: winner.img
                              ? "transparent"
                              : "rgba(255,255,255,0.1)",
                          }}
                        >
                          {winner.img ? (
                            <img
                              className="w-100 h-100 object-fit-cover"
                              src={`/assets/img/${winner.img}`}
                              alt="profile"
                            />
                          ) : (
                            <span className="tcn-1 fs-seven fw-bold">
                              {getInitials(winner.name)}
                            </span>
                          )}
                        </div>
                        <div className="card-info">
                          <h4
                            className="card-title fw-bold tcn-1 mb-0"
                            style={{ fontSize: "0.95rem" }}
                          >
                            {winner.name}
                          </h4>
                          <span
                            className="tcn-1 opacity-50"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {winner.time}
                          </span>
                        </div>
                      </div>
                      <div className="card-data text-end">
                        <p
                          className="card-text fw-bold mb-0"
                          style={{ fontSize: "1.05rem", color: "#00D1FF" }}
                        >
                          {formatToRupiah(winner.amount)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <style jsx>{`
                .winner-list-item:hover {
                  background-color: rgba(255, 255, 255, 0.03);
                }
                .hover-scale:hover {
                  transform: scale(1.05);
                }
                .custom-scrollbar::-webkit-scrollbar {
                  width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(255, 140, 0, 0.2);
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: rgba(255, 140, 0, 0.4);
                }
                .float-mascot {
                  animation: float 4s ease-in-out infinite;
                }
                @keyframes float {
                  0% {
                    transform: translateY(0);
                  }
                  50% {
                    transform: translateY(-20px);
                  }
                  100% {
                    transform: translateY(0);
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
