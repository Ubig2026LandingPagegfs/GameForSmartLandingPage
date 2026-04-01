"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MathCaptcha from "@/components/shared/MathCaptcha";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaOk, setCaptchaOk] = useState(false);
  const [resetCaptcha, setResetCaptcha] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !captchaOk) return;
    
    setIsSubmitting(true);
    // Simulasi API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setEmail("");
        setResetCaptcha(prev => prev + 1);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="call-to-action py-20 overflow-hidden" id="cta">
      <div className="container-fluid px-lg-12 px-md-10 px-6">
        <div className="relative overflow-hidden rounded-[40px] bg-[#161920] px-8 py-20 text-center shadow-2xl md:px-20">
          
          {/* Decorative Vector Lines */}
          <div className="absolute -left-10 -bottom-10 pointer-events-none opacity-20">
            <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 300C0 134.315 134.315 0 300 0" stroke="var(--color-orange)" strokeWidth="2" />
              <path d="M0 250C0 111.929 111.929 0 250 0" stroke="var(--color-orange)" strokeWidth="1" strokeDasharray="5 5" />
            </svg>
          </div>
          <div className="absolute -right-10 -top-10 pointer-events-none opacity-20 rotate-180">
            <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 300C0 134.315 134.315 0 300 0" stroke="var(--color-orange)" strokeWidth="2" />
              <path d="M0 250C0 111.929 111.929 0 250 0" stroke="var(--color-orange)" strokeWidth="1" strokeDasharray="5 5" />
            </svg>
          </div>

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col items-center">
            <span className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-orange-500/80">
              Newsletter Premium
            </span>
            <h2 className="mb-8 max-w-[600px] font-heading text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
              Langganan Newsletter untuk Tips & Penawaran Terbaru
            </h2>
            
            <form onSubmit={handleSubmit} className="w-100 max-w-[500px] space-y-4">
              <div className="group relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda"
                  required
                  disabled={isSubmitting || isSuccess}
                  className="h-14 w-100 rounded-2xl border-white/10 bg-white/5 px-6 text-base text-white placeholder:text-white/40 focus:border-orange-500/50 focus:bg-white/10 focus:ring-0"
                />
              </div>
              
              {/* CAPTCHA */}
              <MathCaptcha onVerify={setCaptchaOk} className="mb-2" resetKey={resetCaptcha} />
              
              <Button
                type="submit"
                disabled={isSubmitting || isSuccess || !captchaOk}
                className={`gps-btn-primary h-14 w-100 rounded-2xl text-lg font-bold transition-all duration-300 ${isSuccess ? 'bg-green-500 hover:bg-green-600 text-white' : ''} ${!captchaOk ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: isSuccess ? '#22c55e' : undefined, color: isSuccess ? 'white' : undefined }}
              >
                {isSubmitting ? (
                  <span className="d-flex justify-content-center align-items-center gap-2">
                    <i className="ti ti-loader animate-spin"></i> Memproses...
                  </span>
                ) : isSuccess ? (
                  <span className="d-flex justify-content-center align-items-center gap-2">
                    <i className="ti ti-check"></i> Berhasil Berlangganan!
                  </span>
                ) : (
                  "Langganan Sekarang"
                )}
              </Button>
            </form>

            <p className="mt-8 text-sm text-white/60">
              Pelajari lebih lanjut tentang layanan kami di{" "}
              <Link href="/faq" className="font-semibold text-orange-500 underline-offset-4 hover:underline">
                Pusat Bantuan
              </Link>
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .call-to-action {
          position: relative;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
