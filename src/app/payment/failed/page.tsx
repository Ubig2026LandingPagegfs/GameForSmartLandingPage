"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentFailedPage() {
  return (
    <div className="payment-result-view py-lg-12 py-8 px-sm-6 px-4 d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="container-fluid max-w-md mx-auto text-center">
        <div className="result-card bgn-4 p-md-8 p-6 rounded-4 border border-secondary border-opacity-10 shadow-lg position-relative overflow-hidden">
          <div
            className="custom-gradient-bg position-absolute top-0 start-0 w-100 h-100 opacity-25"
            style={{ pointerEvents: "none" }}
          ></div>

          <div className="position-relative z-1 d-flex flex-column align-items-center">
            {/* Failed Icon */}
            <div
              className="failed-icon mb-6 bgn-3 rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "100px",
                height: "100px",
                border: "2px solid #ef4444",
                boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)",
              }}
            >
              <i
                className="ti ti-x display-three"
                style={{ color: "#ef4444" }}
              ></i>
            </div>

            <h2 className="tcn-1 mb-3 fw-bold display-six">Pembayaran Gagal</h2>
            
            <p className="tcn-6 mb-8" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
              Mohon maaf, transaksi pembayaran Anda tidak dapat diproses atau telah kedaluwarsa. Silakan periksa kembali metode pembayaran Anda dan coba lagi.
            </p>

            <div className="d-flex flex-column w-100 gap-3">
              <Button
                asChild
                className="btn-half-border position-relative d-inline-flex py-4 bgp-1 w-100 rounded-pill text-nowrap fw-bold transition-all hover-scale border-none hover:bg-transparent text-white d-flex justify-content-center align-items-center gap-2 fs-five"
              >
                <Link href="/competitions">
                  <i className="ti ti-refresh"></i> Coba Pembayaran Lagi
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="py-4 w-100 rounded-pill fw-bold transition-all border border-secondary border-opacity-20 text-white hover:bg-white hover:bg-opacity-10 bg-transparent fs-five d-flex justify-content-center"
              >
                <Link href="/contact">Hubungi Bantuan</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .max-w-md {
          max-width: 550px;
        }
        .display-three {
          font-size: 3.5rem;
        }
        .display-six {
          font-size: 2rem;
        }
      `}</style>
    </div>
  );
}
