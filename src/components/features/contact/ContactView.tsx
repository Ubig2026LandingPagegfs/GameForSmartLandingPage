"use client";

import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Footer from "@/components/shared/Footer";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const channels = [
    {
      id: "phone",
      label: "WhatsApp",
      value: "+62 812-3456-7890",
      hint: "Resp. dalam 1 jam",
      accent: "#ff8c00",
      accentBg: "rgba(255,140,0,0.08)",
      accentBorder: "rgba(255,140,0,0.2)",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.27 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8a16 16 0 0 0 7.91 7.91l.38-.38a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
    {
      id: "email",
      label: "Email",
      value: "info@gameforsmart.com",
      hint: "Resp. dalam 24 jam",
      accent: "#38bdf8",
      accentBg: "rgba(56,189,248,0.08)",
      accentBorder: "rgba(56,189,248,0.2)",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
    },
    {
      id: "instagram",
      label: "Instagram",
      value: "@gameforsmart",
      hint: "DM always open",
      accent: "#e879a0",
      accentBg: "rgba(232,121,160,0.08)",
      accentBorder: "rgba(232,121,160,0.2)",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
        </svg>
      ),
    },
  ];

  const fields = [
    { name: "name", label: "Nama", placeholder: "Nama lengkap kamu", type: "text" },
    { name: "email", label: "Email", placeholder: "email@kamu.com", type: "email" },
    { name: "subject", label: "Subjek", placeholder: "Topik pesan kamu", type: "text" },
  ];

  return (
    <>
      <style>{`
        .cv-root * { box-sizing: border-box; }

        .cv-root {
          font-family: 'Poppins', sans-serif;
          color: rgba(255,255,255,0.85);
        }

        .cv-page {
          animation: cv-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes cv-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cv-eyebrow {
          font-family: 'Poppins', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #ff8c00;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .cv-eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: #ff8c00;
          opacity: 0.6;
        }

        .cv-title {
          font-family: 'Chakra Petch', sans-serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -1.5px;
          line-height: 1.0;
          margin: 0 0 8px;
        }

        .cv-title span {
          color: #ff8c00;
        }

        .cv-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
          margin: 0;
          letter-spacing: 0.2px;
        }

        /* ── Form Card ── */
        .cv-form-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 36px;
          height: 100%;
          position: relative;
          overflow: hidden;
          animation: cv-fade-up 0.6s 0.1s cubic-bezier(0.16,1,0.3,1) both;
        }

        .cv-form-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,140,0,0.4), transparent);
        }

        .cv-form-heading {
          font-family: 'Chakra Petch', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 6px;
          letter-spacing: -0.3px;
        }

        .cv-form-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          font-weight: 300;
          margin: 0 0 28px;
          line-height: 1.6;
        }

        /* ── Field ── */
        .cv-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 20px;
        }

        .cv-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          transition: color 0.2s;
        }

        .cv-field.active .cv-label {
          color: #ff8c00;
        }

        .cv-input-wrap {
          position: relative;
        }

        .cv-input-wrap input,
        .cv-input-wrap textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          border-radius: 0;
          padding: 10px 0;
          color: #fff;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 400;
          outline: none;
          transition: border-color 0.2s;
          resize: none;
        }

        .cv-input-wrap input::placeholder,
        .cv-input-wrap textarea::placeholder {
          color: rgba(255,255,255,0.18);
          font-weight: 300;
        }

        .cv-input-line {
          position: absolute;
          bottom: 0; left: 0;
          height: 1px;
          width: 0;
          background: #ff8c00;
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
        }

        .cv-field.active .cv-input-line {
          width: 100%;
        }

        /* ── Submit ── */
        .cv-submit {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ff8c00;
          color: #fff;
          font-family: 'Chakra Petch', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.3px;
          padding: 13px 28px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
          margin-top: 8px;
        }

        .cv-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255,140,0,0.3);
        }

        .cv-submit:active {
          transform: translateY(0);
        }

        .cv-submit.sent {
          background: #22c55e;
          pointer-events: none;
        }

        .cv-submit-arrow {
          display: flex;
          align-items: center;
          transition: transform 0.2s;
        }

        .cv-submit:hover .cv-submit-arrow {
          transform: translate(3px, -3px);
        }

        /* ── Channels ── */
        .cv-channels {
          display: flex;
          flex-direction: column;
          gap: 14px;
          animation: cv-fade-up 0.6s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }

        .cv-channel {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 22px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          text-decoration: none;
        }

        .cv-channel:hover {
          background: rgba(255,255,255,0.04);
          transform: translateX(4px);
        }

        .cv-channel-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }

        .cv-channel:hover .cv-channel-icon {
          transform: scale(1.08);
        }

        .cv-channel-body {
          flex: 1;
          min-width: 0;
        }

        .cv-channel-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          display: block;
          margin-bottom: 3px;
        }

        .cv-channel-value {
          font-family: 'Chakra Petch', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cv-channel-hint {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          font-weight: 300;
          margin-top: 2px;
          display: block;
        }

        .cv-channel-chevron {
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s, transform 0.2s;
        }

        .cv-channel:hover .cv-channel-chevron {
          color: rgba(255,255,255,0.4);
          transform: translateX(2px);
        }

        /* ── Availability pill ── */
        .cv-avail {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          color: #4ade80;
          font-size: 11px;
          font-weight: 500;
          padding: 5px 12px;
          border-radius: 100px;
          margin-top: 20px;
        }

        .cv-avail-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (max-width: 768px) {
          .cv-form-card { padding: 24px; }
          .cv-title { font-size: 32px; }
        }
      `}</style>

      <Header />
      <main
        className="main-container container-fluid d-flex align-items-start pt-sm-20 pt-15 pb-20 px-0 position-relative"
        style={{ overflow: "visible" }}
      >
        <Sidebar />
        <article className="main-content mt-lg-10 cv-root">
          <section className="pb-120">
            <div className="container-fluid px-lg-15 px-md-10 px-6">

              {/* Header */}
              <div className="cv-page mb-12">
                <Breadcrumbs />
                <div className="mt-6">
                  <p className="cv-eyebrow">Hubungi Kami</p>
                  <h1 className="cv-title">
                    Ada yang bisa<br />kami <span>bantu?</span>
                  </h1>
                  <p className="cv-subtitle">Respon cepat, solusi nyata.</p>
                </div>
              </div>

              {/* Layout */}
              <div className="row g-6 align-items-start">

                {/* Form */}
                <div className="col-lg-7">
                  <div className="cv-form-card">
                    <h2 className="cv-form-heading">Kirim Pesan</h2>
                    <p className="cv-form-desc">
                      Isi form di bawah dan tim kami akan menghubungi kamu secepatnya.
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className="row g-0">
                        {fields.map((f) => (
                          <div key={f.name} className="col-12">
                            <div className={`cv-field ${focused === f.name ? "active" : ""}`}>
                              <label className="cv-label">{f.label}</label>
                              <div className="cv-input-wrap">
                                <Input
                                  type={f.type}
                                  name={f.name}
                                  value={formData[f.name as keyof typeof formData]}
                                  onChange={handleChange}
                                  onFocus={() => setFocused(f.name)}
                                  onBlur={() => setFocused(null)}
                                  placeholder={f.placeholder}
                                  required
                                  className="border-0 shadow-none ring-0 focus-visible:ring-0 p-0 h-auto"
                                  style={{
                                    background: "transparent",
                                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 0,
                                    padding: "10px 0",
                                    color: "#fff",
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: "14px",
                                  }}
                                />
                                <div className="cv-input-line" />
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="col-12">
                          <div className={`cv-field ${focused === "message" ? "active" : ""}`}>
                            <label className="cv-label">Pesan</label>
                            <div className="cv-input-wrap">
                              <Textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={() => setFocused("message")}
                                onBlur={() => setFocused(null)}
                                placeholder="Tuliskan pesanmu di sini..."
                                required
                                rows={4}
                                className="border-0 shadow-none ring-0 focus-visible:ring-0"
                                style={{
                                  background: "transparent",
                                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                                  borderRadius: 0,
                                  padding: "10px 0",
                                  color: "#fff",
                                  fontFamily: "'Poppins', sans-serif",
                                  fontSize: "14px",
                                  resize: "none",
                                  minHeight: "100px",
                                }}
                              />
                              <div className="cv-input-line" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className={`cv-submit ${submitted ? "sent" : ""}`}
                      >
                        {submitted ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            Terkirim!
                          </>
                        ) : (
                          <>
                            Kirim Sekarang
                            <span className="cv-submit-arrow">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                              </svg>
                            </span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Channels */}
                <div className="col-lg-5">
                  <div className="cv-channels">
                    {channels.map((ch) => (
                      <a key={ch.id} href="#" className="cv-channel" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                        <div
                          className="cv-channel-icon"
                          style={{
                            background: ch.accentBg,
                            border: `1px solid ${ch.accentBorder}`,
                            color: ch.accent,
                          }}
                        >
                          {ch.icon}
                        </div>
                        <div className="cv-channel-body">
                          <span className="cv-channel-label">{ch.label}</span>
                          <span className="cv-channel-value">{ch.value}</span>
                          <span className="cv-channel-hint">{ch.hint}</span>
                        </div>
                        <span className="cv-channel-chevron">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"/>
                          </svg>
                        </span>
                      </a>
                    ))}

                    <div className="cv-avail">
                      <span className="cv-avail-dot" />
                      Tim kami aktif · Senin–Sabtu, 09.00–18.00 WIB
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
