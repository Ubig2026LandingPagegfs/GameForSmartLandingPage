"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MathCaptcha from "@/components/shared/MathCaptcha";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaOk, setCaptchaOk] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
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

  const { user, isLoggedIn, loading: authLoading, handleLogin } = useAuth();

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
      supabase.auth.getUser(cleanToken).then(({ data, error }) => {
        if (error) {
           setDebugMsg("Error verifikasi token: " + error.message);
        } else if (data?.user) {
          setDebugMsg("Token valid. User: " + data.user.email);
          setLocalUser(data.user);
          setFormData(prev => ({
            ...prev,
            fullName: data.user.user_metadata?.full_name || data.user.user_metadata?.name || "",
            email: data.user.email || "",
          }));
          // Bersihkan token 
          window.history.replaceState({}, '', window.location.pathname);
        } else {
           setDebugMsg("Tidak ada error tapi user kosong?");
        }
        setIsVerifying(false);
      }).catch(err => {
         setDebugMsg("Exception: " + err.message);
         setIsVerifying(false);
      });
    }
  }, []);

  const activeUser = user || localUser;

  // Hapus tanda redirect jika user berhasil login, sehingga dia bisa di-redirect otomatis lagi di masa depan jika logout
  useEffect(() => {
    if (activeUser) {
      sessionStorage.removeItem("gfs_login_redirected");
    }
  }, [activeUser]);

  // Redirect otomatis dengan pencegahan infinite loop
  useEffect(() => {
    // Tunggu sampai loading context selesai dan cek lokal verifikasi selesai
    if (!authLoading && !isVerifying && !activeUser) {
      // Cek apakah URL masih punya token (jika iya, kita sedang proses)
      if (typeof window !== 'undefined' && !new URLSearchParams(window.location.search).has("token")) {
        const hasRedirected = sessionStorage.getItem("gfs_login_redirected");
        
        if (!hasRedirected) {
          // Tandai bahwa kita pernah redirect dia
          sessionStorage.setItem("gfs_login_redirected", "true");
          // Lakukan redirect
          handleLogin();
        }
      }
    }
  }, [authLoading, isVerifying, activeUser, handleLogin]);

  if (isVerifying || (authLoading && !localUser)) {
    return (
      <div className="registration-view py-12 px-6 d-flex flex-column align-items-center justify-content-center text-center h-100" style={{ minHeight: "60vh" }}>
        <i className="ti ti-loader animate-spin display-five tcp-1 mb-4"></i>
        <h3 className="tcn-1">Memverifikasi Otorisasi Anda...</h3>
        <p className="tcn-6">Mohon tunggu sebentar, kami sedang menyiapkan sesi aman Anda.</p>
      </div>
    );
  }

  // Blokir jika sama sekali tidak ada activeUser 
  const hasRedirected = typeof window !== 'undefined' ? sessionStorage.getItem("gfs_login_redirected") : false;

  if (!activeUser && typeof window !== 'undefined') {
    return (
      <div className="registration-view py-12 px-6 d-flex flex-column align-items-center justify-content-center text-center h-100" style={{ minHeight: "60vh" }}>
        
        {!hasRedirected ? (
           <>
             <i className="ti ti-loader animate-spin display-five tcp-1 mb-4"></i>
             <h3 className="tcn-1">Membuka Portal Login...</h3>
             <p className="tcn-6">Mengarahkan Anda secara otomatis ke halaman login.</p>
           </>
        ) : (
           <>
            <div className="mb-6 p-4 rounded-circle" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
              <i className="ti ti-lock display-five" style={{ color: '#f97316' }}></i>
            </div>
            <h3 className="tcn-1 fw-bold mb-3">Login Gagal / Sesi Ditolak</h3>
            <p className="tcn-6 max-w-md mx-auto mb-4">Sistem gagal memasukkan Anda ke kompetisi secara otomatis. Anda harus masuk (login) secara manual untuk memastikan keamanan data Anda.</p>
            
            {/* DEBUGGING TEXT */}
            {debugMsg && (
              <div className="mb-6 p-4 rounded" style={{ backgroundColor: "#2a1508", border: "1px dashed #f97316", color: "#ffa266", width: "100%", maxWidth: "500px", wordBreak: "break-all", textAlign: "left" }}>
                <span className="d-block fw-bold mb-2"><i className="ti ti-bug"></i> Terminal Lacak Debug:</span>
                <small className="d-block font-monospace">{debugMsg}</small>
              </div>
            )}

            <Button
              onClick={handleLogin}
              className="btn-half-border position-relative d-inline-flex py-4 bgp-1 px-8 rounded-pill text-nowrap fw-bold transition-all hover-scale border-none text-white fs-five"
            >
              Coba Masuk Lagi
            </Button>
           </>
        )}
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

    if (!formData.category) {
      alert("Silakan pilih Kategori/Tingkat Pendidikan Anda.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const isPaid = fee === "Free Entry" || fee === "Gratis";

      const { error } = await supabase.from('competition_participants').insert({
        competition_id: competitionSlug,
        user_id: activeUser.id,
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
          <Breadcrumbs customCrumbs={customCrumbs} />
        </div>
        {/* Back Button */}
        <div className="mb-8">
          <Button
            asChild
            variant="outline"
            className="rounded-circle p-0 transition-all hover-scale bg-orange-gradient neon-orange-glow border-none hover:bg-transparent"
            style={{ width: "40px", height: "40px" }}
            title="Kembali ke Detail"
          >
            <Link
              href={`/competitions/${competitionSlug}`}
              className="d-inline-flex align-items-center justify-content-center"
            >
              <i className="ti ti-arrow-left fs-xl text-white"></i>
            </Link>
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
                  {fee !== "Free Entry" ? fee : "Gratis"}
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
                  "Konfirmasi Pendaftaran"
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
