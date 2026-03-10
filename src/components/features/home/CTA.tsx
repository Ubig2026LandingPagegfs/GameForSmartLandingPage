"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CTA() {
  return (
    <div className="call-to-action" id="cta">
      <div className="container-fluid px-lg-12 px-md-10 px-6">
        <div className="row justify-content-between align-items-center g-0 px-lg-12 px-8 py-30 rounded-3xl bg-[#0c0c0c]">
          {/* LEFT — Title + Description */}
          <div className="col-lg-5 col-md-6 mb-6 mb-lg-0">
            <h2 className="display-two tcn-1 mb-3 font-black tracking-tight title-anim font-heading">
              Tetap Terupdate
            </h2>
            <p className="fs-lg tcn-6 mb-0 font-body max-w-[420px]">
              Punya pertanyaan atau masukan? Kami senang mendengar dari Anda.
              Hubungi tim kami atau gunakan formulir kontak kami.
            </p>
          </div>

          {/* RIGHT — Label + Input+Button + Privacy note */}
          <div className="col-lg-5 col-md-6">
            <p className="tcn-6 fs-sm mb-2 fw-medium">Stay Informed</p>
            <div className="cta-input-group d-flex align-items-center w-100 p-2 mb-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow-1 border-0 bg-transparent text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-base shadow-none cta-input outline-none"
              />
              <Button
                type="submit"
                className="gps-btn-primary flex-shrink-0 h-100"
              >
                Submit
              </Button>
            </div>
            <p className="tcn-6 fs-sm mb-0">
              By subscribing you agree to our{" "}
              <a href="#" className="tcp-1 text-decoration-underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .max-w-\\[420px\\] {
          max-width: 420px;
        }
        .cta-input-group {
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50px;
          background-color: rgba(255,255,255,0.05);
        }
        .cta-input {
          outline: none;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
}
