"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginView() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Harap isi semua bidang.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      login();
      router.push("/");
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      login();
      router.push("/");
    }, 1200);
  };

  if (!mounted) return null;

  return (
    <div className="login-page-wrapper position-relative min-vh-100 overflow-hidden d-flex align-items-center justify-content-center">
      {/* Background Elements */}
      <div className="bg-blur-circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>
      
      {/* Logo Top Left */}
      <div className="login-logo-container position-absolute top-0 start-0 p-lg-10 p-6">
        <Link href="/">
          <img 
            src="/images/gameforsmartlogo.webp" 
            alt="GameForSmart Logo" 
            className="login-header-logo"
            style={{ width: "240px", height: "auto" }}
          />
        </Link>
      </div>

      {/* Main Content */}
      <div className="container position-relative z-1">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10">
            <div className="login-card p-xl-10 p-lg-8 p-6 rounded-5 border border-white border-opacity-10 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="display-five tcn-1 fw-bold mb-3">Selamat Datang</h2>
                <p className="tcn-6">Silakan masuk untuk melanjutkan petualangan Anda.</p>
              </div>

              {/* Social Login */}
              <div className="mb-8">
                <button 
                  onClick={handleGoogleLogin}
                  className="w-100 d-flex align-items-center justify-content-center gap-3 py-3 px-4 bg-white rounded-pill text-dark fw-bold transition-all hover-scale border-0"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: "20px" }} />
                  Masuk dengan Google
                </button>
              </div>

              <div className="d-flex align-items-center gap-3 mb-8">
                <div className="flex-grow-1 border-bottom border-white border-opacity-10"></div>
                <span className="tcn-6 fs-sm text-uppercase">Atau email</span>
                <div className="flex-grow-1 border-bottom border-white border-opacity-10"></div>
              </div>

              <form onSubmit={handleLogin} className="d-flex flex-column gap-6">
                <div>
                  <label className="tcn-1 fs-sm fw-medium mb-2 d-block">
                    Alamat Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-100 py-3 px-4 bgn-3 rounded-3 tcn-1 border border-secondary border-opacity-10 focus-neon text-base h-12"
                    placeholder="contoh@email.com"
                    required
                  />
                </div>

                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="tcn-1 fs-sm fw-medium d-block">
                      Kata Sandi
                    </label>
                    <Link href="#" className="tcp-1 fs-xs hover-underline">Lupa sandi?</Link>
                  </div>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-100 py-3 px-4 bgn-3 rounded-3 tcn-1 border border-secondary border-opacity-10 focus-neon text-base h-12"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {error && <p className="text-danger fs-sm mb-0">{error}</p>}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-half-border w-100 py-6 bgp-1 rounded-pill text-white fw-bold transition-all hover-scale"
                >
                  {isSubmitting ? (
                    <span className="d-flex align-items-center gap-2">
                      <i className="ti ti-loader animate-spin"></i> Memproses...
                    </span>
                  ) : (
                    "Masuk ke Akun"
                  )}
                </Button>

                <p className="tcn-6 text-center fs-sm mt-4">
                  Belum punya akun? <Link href="/register" className="tcp-1 fw-bold hover-underline">Daftar sekarang</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .login-page-wrapper {
          background-color: #0a0c12;
          color: #fff;
        }
        
        .bg-blur-circles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }
        
        .circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
        }
        
        .circle-1 {
          width: 400px;
          height: 400px;
          background: var(--bgp-1, #ff8c00);
          top: -100px;
          right: -100px;
        }
        
        .circle-2 {
          width: 300px;
          height: 300px;
          background: #4f46e5;
          bottom: -50px;
          left: -50px;
        }
        
        .login-card {
          background: rgba(22, 25, 32, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .focus-neon:focus {
          outline: none;
          border-color: var(--tcp-1) !important;
          box-shadow: 0 0 15px rgba(255, 140, 0, 0.3);
        }
        
        .hover-scale:hover {
          transform: scale(1.02);
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .login-header-logo {
          filter: drop-shadow(0 0 8px rgba(0,0,0,0.5));
          transition: transform 0.3s ease;
        }
        .login-header-logo:hover {
          transform: scale(1.05);
        }

        @media (max-width: 991px) {
          .login-header-logo { width: 180px !important; }
          .login-logo-container { padding: 30px !important; }
        }
      `}</style>
    </div>
  );
}
