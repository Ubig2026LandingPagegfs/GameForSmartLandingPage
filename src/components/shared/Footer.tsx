"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer bgn-4 bt position-relative overflow-hidden w-100">
      <div className="mx-xxl-10 mx-md-8 mx-2 position-relative footer-inner-container">
        <div className="row justify-content-between">
          <div className="col-lg-3 col-sm-6 br py-lg-12 pt-sm-10 pt-6 footer-card-area">
            <div className="py-lg-10">
              <div className="footer-logo mb-4">
                <Link
                  href="/"
                  className="d-block footer-brand-link"
                >
                  <img
                    className="d-block"
                    style={{ width: "250px", minWidth: "250px", height: "auto" }}
                    src="/images/gameforsmartlogo.webp"
                    alt="logo"
                  />
                </Link>
              </div>
              <p className="mb-6 tcn-6">
                Platform quiz interaktif untuk pembelajaran yang lebih menarik
              </p>
              <div className="social-links">
                <ul className="d-flex align-items-center gap-3 flex-wrap">
                  <li>
                    <a href="#" className="d-center">
                      <i className="ti ti-brand-facebook fs-xl"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-center">
                      <i className="ti ti-brand-twitter fs-xl"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-center">
                      <i className="ti ti-brand-instagram fs-xl"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 br br-res py-lg-12 pt-sm-10 pt-6 footer-card-area">
            <div className="py-lg-10 ps-lg-10 ps-5">
              <h4 className="footer-title mb-8 title-anim">Produk</h4>
              <ul className="footer-list d-grid gap-2">
                <li>
                  <Link
                    href="/games"
                    className="footer-link d-flex align-items-center tcn-6"
                  >
                    {" "}
                    Game
                  </Link>
                </li>
                <li>
                  <Link
                    href="/competitions"
                    className="footer-link d-flex align-items-center tcn-6"
                  >
                    {" "}
                    Mode Kompetisi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/games"
                    className="footer-link d-flex align-items-center tcn-6"
                  >
                    {" "}
                    Peringkat
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 br py-lg-12 pt-sm-10 pt-6 footer-card-area">
            <div className="py-lg-10 ps-lg-10 ps-5">
              <h4 className="footer-title mb-8 title-anim">Dukungan</h4>
              <ul className="footer-list d-grid gap-2">
                <li>
                  <Link
                    href="/faq"
                    className="footer-link d-flex align-items-center tcn-6"
                  >
                    {" "}
                    Pusat Bantuan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="footer-link d-flex align-items-center tcn-6"
                  >
                    {" "}
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="footer-link d-flex align-items-center tcn-6"
                  >
                    {" "}
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 py-lg-12 pt-sm-10 pt-6 footer-card-area">
            <div className="py-lg-10 ps-lg-10 ps-5">
              <h4 className="footer-title mb-8 title-anim">Perusahaan</h4>
              <ul className="footer-list d-grid gap-2">
                <li>
                  <Link
                    href="/about"
                    className="footer-link d-flex align-items-center tcn-6"
                  >
                    {" "}
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="/teams"
                    className="footer-link d-flex align-items-center tcn-6"
                  >
                    {" "}
                    Tim
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="footer-link d-flex align-items-center tcn-6"
                  >
                    {" "}
                    Karir
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row pb-4 pt-lg-4 pt-8 justify-content-between">
          <div className="col-lg-6">
            <span>
              © 2026 GameForSmart. Hak cipta dilindungi undang-undang.
            </span>
          </div>
          <div className="col-lg-6 d-flex justify-content-lg-end">
            <ul className="d-flex flex-wrap align-items-center gap-lg-10 gap-sm-6 gap-4 justify-content-center justify-content-lg-end">
              <li>
                <Link href="/terms-condition">Kebijakan Privasi</Link>
              </li>
              <li>
                <Link href="/terms-condition">Ketentuan Layanan</Link>
              </li>
              <li>
                <Link href="/terms-condition">Cookies</Link>
              </li>
              <li>
                <span className="tcn-6 cursor-pointer hover-orange pointer">
                  <i className="ti ti-world"></i> Bahasa
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mascot relocated inside container-fluid */}
        <img
          src="/assets/img/astronaut-mascot.png"
          alt="Astronaut"
          className="footer-mascot"
        />
      </div>

      <style jsx>{`
        .footer-inner-container {
          z-index: 2;
        }

        .footer-mascot {
          position: absolute;
          bottom: 0;
          right: 0;
          height: clamp(400px, 50vh, 700px);
          transform: translateX(35%);
          z-index: 10;
          pointer-events: none;
          object-fit: contain;
        }
        
        @media (max-width: 991px) {
          .footer-mascot {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
}
