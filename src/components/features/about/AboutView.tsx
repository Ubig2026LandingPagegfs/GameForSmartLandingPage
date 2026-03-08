"use client";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutView() {
  return (
    <>
      <Header />
      <main
        className="main-container container-fluid d-flex align-items-start pt-sm-20 pt-15 pb-20 px-0 position-relative"
        style={{ overflow: "visible" }}
      >
        <Sidebar />
        <article className="main-content mt-lg-10">
          <section className="about-content-section pb-120">
            <div className="container-fluid px-lg-15 px-md-10 px-6">
              <div className="mb-10 mb-lg-15">
                <Breadcrumbs />
                <h1
                  className="display-two text-white fw-bold mt-4 text-uppercase"
                  style={{ letterSpacing: "4px" }}
                >
                  About Us
                </h1>
              </div>
              <div className="row g-8 align-items-center">
                <div className="col-lg-6 pe-lg-10">
                  <h2
                    className="display-four text-white mb-6 fw-bold"
                    style={{ lineHeight: "1.2" }}
                  >
                    Platform Game Edukatif Interaktif untuk Generasi Cerdas
                  </h2>

                  <div
                    className="hr-line mb-6"
                    style={{
                      width: "80px",
                      height: "2px",
                      background: "rgba(255, 140, 0, 0.5)",
                    }}
                  ></div>

                  <p
                    className="tcn-6 fs-base mb-4"
                    style={{ lineHeight: "1.8" }}
                  >
                    GameForSmart adalah platform kompetisi pendidikan digital
                    yang dirancang untuk mengasah kecerdasan, ketangkasan, dan
                    sportivitas pelajar di seluruh Indonesia.
                  </p>
                  <p
                    className="tcn-6 fs-base mb-6"
                    style={{ lineHeight: "1.8" }}
                  >
                    Kami menghadirkan berbagai game interaktif yang tidak hanya
                    seru untuk dimainkan, tetapi juga disisipkan soal-soal
                    edukatif di setiap tantangannya. Mulai dari game puzzle yang
                    mengasah logika, game balapan yang melatih fokus dan
                    kecepatan berpikir, hingga berbagai kategori permainan
                    lainnya yang dirancang untuk meningkatkan kemampuan akademik
                    secara menyenangkan.
                  </p>

                  <ul className="list-unstyled d-flex flex-column gap-3 mb-8">
                    <li className="d-flex align-items-start gap-3 tcn-6 fs-base">
                      <i className="ti ti-square-rounded-check-filled tcp-1 mt-1 fs-base"></i>
                      <span>Game interaktif berbasis edukasi</span>
                    </li>
                    <li className="d-flex align-items-start gap-3 tcn-6 fs-base">
                      <i className="ti ti-square-rounded-check-filled tcp-1 mt-1 fs-base"></i>
                      <span>Tersedia game gratis dan premium</span>
                    </li>
                    <li className="d-flex align-items-start gap-3 tcn-6 fs-base">
                      <i className="ti ti-square-rounded-check-filled tcp-1 mt-1 fs-base"></i>
                      <span>Sistem kompetisi & leaderboard</span>
                    </li>
                    <li className="d-flex align-items-start gap-3 tcn-6 fs-base">
                      <i className="ti ti-square-rounded-check-filled tcp-1 mt-1 fs-base"></i>
                      <span>Soal-soal edukatif di setiap permainan</span>
                    </li>
                  </ul>

                  <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-8 gap-4">
                    <p
                      className="tcn-6 fs-base mb-4"
                      style={{ lineHeight: "1.8" }}
                    >
                      Berdiri dengan semangat inovasi digital, GameForSmart
                      menjadi ruang belajar yang kompetitif, modern, dan
                      menyenangkan bagi generasi masa depan.
                    </p>
                  </div>

                  <Button
                    asChild
                    className="btn-half-border position-relative d-inline-flex py-5 px-8 bgp-1 rounded-pill text-nowrap fw-bold hover-lift transition-all shadow-btn border-none hover:bg-transparent text-white"
                  >
                    <Link href="/games">Mulai Bermain Sekarang</Link>
                  </Button>
                </div>

                {/* <div className="col-lg-6 mt-10 mt-lg-0">
                  <div className="about-image-wrapper position-relative">
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 bg-warning opacity-10 rounded-4"
                      style={{ transform: "translate(-20px, 20px)", zIndex: 0 }}
                    ></div>
                    <img
                      src="/assets/img/about.png"
                      alt="GameForSmart Activity"
                      className="w-100 rounded-4 object-fit-cover shadow-lg position-relative"
                      style={{ minHeight: "500px", zIndex: 1 }}
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
