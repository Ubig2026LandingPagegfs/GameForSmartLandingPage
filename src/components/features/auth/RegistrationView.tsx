"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MathCaptcha from "@/components/shared/MathCaptcha";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

interface RegistrationViewProps {
  competitionTitle: string;
  competitionSlug: string;
  fee: string;
}

export default function RegistrationView({
  competitionTitle,
  competitionSlug,
  fee,
}: RegistrationViewProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaOk, setCaptchaOk] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [checkingRegistration, setCheckingRegistration] = useState(false);
  const [localUser, setLocalUser] = useState<any>(null);
  const [debugMsg, setDebugMsg] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    institution: "",
    email: "",
    category: "",
  });

  const customCrumbs = [
    { href: "/competitions", label: "Competitions", isLast: false },
    { href: `/competitions/${competitionSlug}`, label: competitionTitle, isLast: false },
    { href: "#", label: "Register", isLast: true },
  ];

  const { profile, user, isLoggedIn, loading: authLoading, handleLogin } = useAuth();

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.user_metadata?.full_name || user.user_metadata?.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    // Tangkap token dari URL seperti saran teman
    const rawToken = new URLSearchParams(window.location.search).get("token");
    if (rawToken) {
      setDebugMsg("Menemukan token di URL. Memverifikasi...");
      
      let cleanToken = rawToken;
      // Jika user tidak sengaja copy seluruh JSON object dari localstorage
      if (rawToken.startsWith("{") && rawToken.includes("access_token")) {
        try {
          const parsed = JSON.parse(rawToken);
          if (parsed.access_token) cleanToken = parsed.access_token;
        } catch (e) {}
      }

      setIsVerifying(true);
      // PENTING: Gunakan setSession agar client Supabase benar-benar login, bukan cuma fetch data user.
      // Dengan setSession, token JWT akan dibawa di header untuk menembus RLS database.
      supabase.auth.setSession({
        access_token: cleanToken,
        refresh_token: cleanToken // Jika ada
      }).then(({ data, error }) => {
        if (error) {
           setDebugMsg("Error setSession: " + error.message);
        } else if (data?.session?.user) {
          const sessionUser = data.session.user;
          setDebugMsg("Token valid. User: " + sessionUser.email);
          setLocalUser(sessionUser);
          setFormData(prev => ({
            ...prev,
            fullName: sessionUser.user_metadata?.full_name || sessionUser.user_metadata?.name || "",
            email: sessionUser.email || "",
          }));
          // Bersihkan token 
          window.history.replaceState({}, '', window.location.pathname);
        } else {
           setDebugMsg("Tidak ada error tapi user kosong?");
        }
        setIsVerifying(false);
      }).catch(err => {
         setDebugMsg("Exception: " + err.message);
      });
    }
  }, []);

  const activeUser = user || localUser;

  // Cek apakah user ini sudah terdaftar sebelumnya
  useEffect(() => {
    if (activeUser && competitionSlug) {
      setCheckingRegistration(true);
      supabase
        .from('competition_participants')
        .select('id')
        .eq('competition_id', competitionSlug)
        .eq('user_id', activeUser.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setIsAlreadyRegistered(true);
          }
          setCheckingRegistration(false);
        });
    }
  }, [activeUser, competitionSlug]);

  // Redirect otomatis ke login jika belum login (dengan perlindungan anti-loop)
  useEffect(() => {
    if (!authLoading && !isVerifying && !activeUser) {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const hasToken = params.has("token");
        const hasRedirected = sessionStorage.getItem("redirected_to_login") === "true";

        // Jangan redirect jika:
        // 1. Ada token di URL (sedang proses verifikasi)
        // 2. Sudah pernah redirect sebelumnya di sesi ini (cegah loop)
        if (!hasToken && !hasRedirected) {
          sessionStorage.setItem("redirected_to_login", "true");
          const authUrl = process.env.NEXT_PUBLIC_AUTH_BASE_URL || 'https://app.gameforsmart.com/login';
          const nextUrl = encodeURIComponent(window.location.href.split('?')[0]); // Gunakan URL bersih tanpa query params
          window.location.href = `${authUrl}?redirect=${nextUrl}`;
        }
      }
    }
  }, [authLoading, isVerifying, activeUser]);

  if (isVerifying || (authLoading && !localUser) || checkingRegistration) {
    return (
      <div className="registration-view py-12 px-6 d-flex flex-column align-items-center justify-content-center text-center h-100" style={{ minHeight: "60vh" }}>
        <i className="ti ti-loader animate-spin display-five tcp-1 mb-4"></i>
        <h3 className="tcn-1">Memverifikasi Otorisasi Anda...</h3>
        <p className="tcn-6">Mohon tunggu sebentar, kami sedang menyiapkan sinkronisasi data Anda.</p>
      </div>
    );
  }

  // Jika sudah terdaftar, cegah form tampil dan beri info sukses/sudah daftar
  if (isAlreadyRegistered) {
    return (
      <div className="registration-view py-12 px-6 d-flex flex-column align-items-center justify-content-center text-center h-100" style={{ minHeight: "60vh" }}>
        <div className="mb-6 p-4 rounded-circle" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
          <i className="ti ti-circle-check display-five" style={{ color: '#22c55e' }}></i>
        </div>
        <h3 className="tcn-1 fw-bold mb-3">Telah Terdaftar</h3>
        <p className="tcn-6 max-w-md mx-auto mb-6">
          Anda sudah terdaftar sebagai peserta pada kompetisi <strong className="tcn-1">{competitionTitle}</strong>! Data registrasi Anda sudah tersimpan dengan aman di dalam sistem kami.
        </p>
        <Link 
          href={`/competitions`}
          className="btn-half-border position-relative d-inline-flex py-4 bgp-1 px-8 rounded-pill text-nowrap fw-bold transition-all hover-scale border-none text-white fs-five"
        >
          Lihat Kompetisi Lain
        </Link>
      </div>
    );
  }

  // Jika belum login: tampilkan loading jika auto-redirect akan terjadi, atau tombol manual jika sudah pernah redirect
  if (!activeUser) {
    const cameFromLogin = typeof window !== 'undefined' && sessionStorage.getItem("redirected_to_login") === "true";
    
    if (cameFromLogin) {
      // User sudah di-redirect ke login tapi masih gagal -> tampilkan tombol manual (TANPA auto-redirect lagi!)
      return (
        <div className="registration-view py-12 px-6 d-flex flex-column align-items-center justify-content-center text-center h-100" style={{ minHeight: "60vh" }}>
          <div className="mb-6 p-4 rounded-circle" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
            <i className="ti ti-lock display-five" style={{ color: '#f97316' }}></i>
          </div>
          <h3 className="tcn-1 fw-bold mb-3">Silakan Login Terlebih Dahulu</h3>
          <p className="tcn-6 max-w-md mx-auto mb-6">
            Anda perlu masuk ke akun Anda untuk mendaftar kompetisi ini.
          </p>
          <Button
            onClick={async () => {
              sessionStorage.removeItem("redirected_to_login"); // Hapus agar bisa klik manual ulang
              const authUrl = process.env.NEXT_PUBLIC_AUTH_BASE_URL || 'https://app.gameforsmart.com/login';
              const nextUrl = encodeURIComponent(window.location.href.split('?')[0]);
              window.location.href = `${authUrl}?redirect=${nextUrl}`;
            }}
            className="btn-half-border position-relative d-inline-flex py-4 bgp-1 px-8 rounded-pill text-nowrap fw-bold transition-all hover-scale border-none text-white fs-five"
          >
            Masuk Sekarang
          </Button>
        </div>
      );
    }
    
    // Belum pernah redirect -> tampilkan spinner (auto-redirect akan terjadi dari useEffect)
    return (
      <div className="registration-view py-12 px-6 d-flex flex-column align-items-center justify-content-center text-center h-100" style={{ minHeight: "60vh" }}>
        <i className="ti ti-loader animate-spin display-five tcp-1 mb-4"></i>
        <h3 className="tcn-1">Mengarahkan ke halaman login...</h3>
        <p className="tcn-6">Mohon tunggu sebentar.</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!activeUser) {
      alert("Sesi Anda tidak valid. Silakan login kembali.");
      handleLogin();
      return;
    }

    if (!profile) {
      alert("Data profil sedang dimuat, mohon coba sesaat lagi.");
      return;
    }

    if (!formData.category) {
      alert("Silakan pilih Kategori/Tingkat Pendidikan Anda.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create random XID/UUID string for ID (Math.random as simple alternative if no nanoid available)
      const partId = "p_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      
      const isPaid = fee === "Free Entry" || fee === "Gratis";

      const { error } = await supabase.from('competition_participants').insert({
        id: partId,
        competition_id: competitionSlug,
        user_id: profile.id,
        category: formData.category,
        is_paid: isPaid,
        registered_at: new Date().toISOString()
      });

      if (error) {
        console.error("Supabase Insert Error:", error);
        throw error;
      }

      setIsSuccess(true);
    } catch (err) {
      alert("Gagal mendaftar. Silakan coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className="registration-view py-12 px-6 d-flex flex-column align-items-center justify-content-center text-center h-100"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="success-icon mb-6 bgn-3 rounded-circle d-center"
          style={{
            width: "80px",
            height: "80px",
            border: "2px solid #72ff00",
            boxShadow: "0 0 20px rgba(114, 255, 0, 0.2)",
          }}
        >
          <i
            className="ti ti-check display-four"
            style={{ color: "#72ff00" }}
          ></i>
        </div>
        <h2 className="tcn-1 mb-4 fw-bold">Pendaftaran Berhasil!</h2>
        <p className="tcn-6 mb-8 max-w-lg mx-auto">
          Terima kasih telah mendaftar di <strong>{competitionTitle}</strong>.
          Tim kami akan segera menghubungi Anda melalui email atau WhatsApp
          untuk instruksi selanjutnya.
        </p>
        <Button
          asChild
          className="btn-half-border position-relative d-inline-flex py-5 bgp-1 px-8 rounded-pill text-nowrap fw-bold transition-all hover-scale border-none hover:bg-transparent text-white"
        >
          <Link href="/competitions">Kembali ke Kompetisi</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="registration-view py-lg-12 py-8 px-sm-6 px-4">
      <div className="container-fluid max-w-3xl mx-auto">
        <div className="mb-4">
        </div>
        {/* Back Button */}
        <div className="mb-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="rounded-circle p-0 transition-all hover-scale bg-orange-gradient neon-orange-glow border-none hover:bg-transparent"
            style={{ width: "40px", height: "40px" }}
            title="Kembali Sebelumnya"
          >
            <div className="d-inline-flex align-items-center justify-content-center w-100 h-100">
              <i className="ti ti-arrow-left fs-xl text-white"></i>
            </div>
          </Button>
        </div>

        <div className="registration-header text-center mb-10">
          <h2 className="display-five tcn-1 fw-bold mb-3">
            Formulir Pendaftaran
          </h2>
          {isVerifying ? (
            <div className="d-flex align-items-center justify-content-center gap-2 tcn-6 fs-five">
              <i className="ti ti-loader animate-spin tcp-1"></i>
              <span>Memverifikasi data Anda...</span>
            </div>
          ) : (
            <p className="tcn-6 fs-five">
              <span className="tcp-1 fw-bold">{competitionTitle}</span>
            </p>
          )}
        </div>

        <div className="registration-card bgn-4 p-md-8 p-6 rounded-4 border border-secondary border-opacity-10 shadow-lg position-relative overflow-hidden">
          <div
            className="custom-gradient-bg position-absolute top-0 start-0 w-100 h-100 opacity-25"
            style={{ pointerEvents: "none" }}
          ></div>

          <form
            onSubmit={handleSubmit}
            className="position-relative z-1 d-flex flex-column gap-6"
          >
            {/* Participant Info Section */}
            <div className="form-section">
              <h4 className="tcn-1 fs-six fw-bold mb-4 d-flex align-items-center gap-2">
                <i className="ti ti-user tcp-1"></i> Informasi Peserta
              </h4>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="tcn-1 fs-sm fw-medium mb-2 d-block">
                    Nama Lengkap <span className="tcp-1">*</span>
                  </label>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-100 py-3 px-4 bgn-3 rounded-3 tcn-1 border border-secondary border-opacity-10 focus-neon text-base h-12"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="tcn-1 fs-sm fw-medium mb-2 d-block">
                    Asal Sekolah / Institusi <span className="tcp-1">*</span>
                  </label>
                  <Input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-100 py-3 px-4 bgn-3 rounded-3 tcn-1 border border-secondary border-opacity-10 focus-neon text-base h-12"
                    placeholder="Nama instansi"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="hr-line line3 my-2 opacity-50"></div>

            {/* Contact Info Section */}
            <div className="form-section">
              <h4 className="tcn-1 fs-six fw-bold mb-4 d-flex align-items-center gap-2">
                <i className="ti ti-address-book tcp-1"></i> Informasi Kontak
              </h4>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="tcn-1 fs-sm fw-medium mb-2 d-block">
                    Email Aktif <span className="tcp-1">*</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-100 py-3 px-4 bgn-3 rounded-3 tcn-1 border border-secondary border-opacity-10 focus-neon text-base h-12"
                    placeholder="contoh@email.com"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="tcn-1 fs-sm fw-medium mb-2 d-block">
                    Kategori / Tingkat Pendidikan <span className="tcp-1">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange as any}
                    className="w-100 py-3 px-4 bgn-3 rounded-3 tcn-1 border border-secondary border-opacity-10 focus-neon text-base h-12"
                    required
                  >
                    <option value="" disabled hidden>Pilih Kategori</option>
                    <option value="SD">Sekolah Dasar (SD)</option>
                    <option value="SMP">Sekolah Menengah Pertama (SMP)</option>
                    <option value="SMA Sederajat">SMA / Sederajat</option>
                  </select>
                </div>
              </div>
            </div>

            {/* CAPTCHA Dihapus karena pengguna dijamin sudah login / verified */}

            {/* Summary & Submit */}
            <div className="mt-4 p-4 bgn-3 rounded-3 border border-secondary border-opacity-10 d-flex flex-wrap align-items-center justify-content-between gap-4">
              <div>
                <span className="tcn-6 fs-sm d-block mb-1">
                  Biaya Pendaftaran
                </span>
                <span className="tcn-1 fs-five fw-bold tcp-1">
                  {fee !== "Free Entry" ? fee.replace(/^Rp\./i, 'Rp ') : "Gratis"}
                </span>
              </div>
              <Button
                type="submit"
                className="btn-half-border position-relative d-inline-flex py-5 bgp-1 px-8 rounded-pill text-nowrap fw-bold transition-all hover-scale border-none hover:bg-transparent text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="d-flex align-items-center gap-2">
                    <i className="ti ti-loader animate-spin"></i> Memproses...
                  </span>
                ) : (
                  "Kirim"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .max-w-3xl {
          max-width: 800px;
        }
        .max-w-lg {
          max-width: 500px;
        }
        .focus-neon:focus {
          outline: none;
          border-color: var(--tcp-1) !important;
          box-shadow: 0 0 10px rgba(255, 140, 0, 0.2);
        }
        .form-section input {
          transition: all 0.3s ease;
        }
        .form-section input::placeholder {
          color: rgba(255, 255, 255, 0.2);
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
