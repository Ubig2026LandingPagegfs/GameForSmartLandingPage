"use client";

import { useState, useEffect } from "react";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

type TabId = "info" | "edit" | "games" | "connected" | "security";

const TABS: { id: TabId; label: string }[] = [
  { id: "info", label: "Informasi" },
  { id: "edit", label: "Edit Profil" },
  { id: "games", label: "Gaming Accounts" },
  { id: "connected", label: "Connected Accounts" },
  { id: "security", label: "Keamanan" },
];

const GAMES = [
  { icon: "🎮", name: "Valorant" },
  { icon: "🚀", name: "Rocket League" },
  { icon: "⚔️", name: "Apex Legends" },
  { icon: "🌸", name: "Genshin Impact" },
  { icon: "🦋", name: "Hollow Knight" },
  { icon: "🌾", name: "Stardew Valley" },
  { icon: "💀", name: "Doom Eterna" },
  { icon: "🎯", name: "PUBG" },
  { icon: "🏎️", name: "Axie Origin" },
  { icon: "🌍", name: "Battlegrounds" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabId>("info");
  const [connectedGames, setConnectedGames] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  
  const { user, profile } = useAuth();
  
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || "User";
  let avatarUrl = profile?.avatar_url;
  // Ignore any local paths completely. A valid database/Google SSO avatar should always use an absolute HTTP/HTTPS URL.
  if (typeof avatarUrl !== 'string' || !avatarUrl.startsWith('http')) {
    avatarUrl = undefined;
  }

  useEffect(() => { document.title = "Profil | GameForSmart"; }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const toggleGame = (name: string) => {
    setConnectedGames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
        showToast(`${name} berhasil terhubung!`);
      }
      return next;
    });
  };

  return (
    <>
      <Header />
      <main
        className="main-container container-fluid d-flex align-items-start pt-md-20 pt-sm-10 pb-20 px-0 position-relative"
        style={{ overflow: "visible" }}
      >
        <Sidebar />
        <article className="main-content mt-10">
          <div className="profile-page-wrapper">
            <div className="mb-6">
              <Breadcrumbs />
            </div>
            {/* ── Page Header ── */}
            <div className="prof-page-header">
              <div>
                <h1 className="prof-page-title">My Profile</h1>
                <p className="prof-page-subtitle">
                  Kelola akun dan preferensi kamu
                </p>
              </div>
            </div>

            {/* ── Profile Header Card ── */}
            <div className="prof-card">
              <div className="prof-header-inner">
                <div className="prof-avatar-wrap">
                  <div className="prof-avatar d-flex align-items-center justify-content-center" style={{ backgroundColor: '#1e2130' }}>
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="avatar" style={{ objectFit: 'cover' }} />
                    ) : (
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center text-white fw-bold" style={{ background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)', fontSize: '32px' }}>
                        {getInitials(displayName)}
                      </div>
                    )}
                  </div>
                  <button
                    className="prof-avatar-edit"
                    onClick={() => showToast("Ganti foto diupload!")}
                  >
                    ✏️
                  </button>
                </div>

                <div className="prof-info">
                  <div className="prof-name">
                    {displayName}
                    <span className="prof-verified">✓</span>
                  </div>
                  <div className="prof-handle">
                    @{user?.user_metadata?.name || user?.email?.split('@')[0] || "member"} · Member sejak 2024
                  </div>
                  <div className="prof-socials">
                    {["𝑓", "𝕏", "📷", "💬"].map((icon, i) => (
                      <a key={i} className="prof-social-btn" href="#">
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="prof-actions">
                  <button
                    className="prof-btn prof-btn-outline"
                    onClick={() => setActiveTab("edit")}
                  >
                    ✏️ Edit Profil
                  </button>
                </div>
              </div>
            </div>

            {/* ── Balance Cards ── */}
            <div className="prof-balance-row">
              <div className="prof-balance-card">
                <div className="prof-balance-icon">💰</div>
                <div>
                  <div className="prof-balance-amount">$150.00</div>
                  <div className="prof-balance-label">Saldo tersedia</div>
                </div>
                <button
                  className="prof-claim-btn"
                  onClick={() => showToast("Saldo berhasil di-claim!")}
                >
                  ⚡ Claim
                </button>
              </div>

              <div className="prof-balance-card prof-balance-card--green">
                <div className="prof-balance-icon prof-balance-icon--green">
                  🏆
                </div>
                <div>
                  <div className="prof-balance-amount prof-balance-amount--green">
                    2,450
                  </div>
                  <div className="prof-balance-label">Total poin earned</div>
                </div>
              </div>
            </div>

            {/* ── Main Tabbed Card ── */}
            <div className="prof-card">
              {/* Tabs */}
              <div className="prof-tabs">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    className={`prof-tab ${activeTab === tab.id ? "prof-tab--active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ── INFO ── */}
              {activeTab === "info" && (
                <div className="prof-tab-panel">
                  <div className="prof-form-grid">
                    <div className="prof-form-group">
                      <label>NAMA LENGKAP</label>
                      <div className="prof-info-val">Mohammad Rony</div>
                    </div>
                    <div className="prof-form-group">
                      <label>USERNAME</label>
                      <div className="prof-info-val prof-info-val--muted">
                        @mohammadRony
                      </div>
                    </div>
                    <div className="prof-form-group">
                      <label>EMAIL</label>
                      <div className="prof-info-val">rony@example.com</div>
                    </div>
                    <div className="prof-form-group">
                      <label>NEGARA</label>
                      <div className="prof-info-val">🇮🇩 Indonesia</div>
                    </div>
                    <div className="prof-form-group prof-form-group--full">
                      <label>BIO</label>
                      <div className="prof-info-val prof-info-val--muted">
                        Belum ada bio. Klik Edit Profil untuk menambahkan.
                      </div>
                    </div>
                  </div>
                  <div className="prof-form-actions prof-form-actions--top-border">
                    <button
                      className="prof-btn prof-btn-primary"
                      onClick={() => setActiveTab("edit")}
                    >
                      ✏️ Edit Profil
                    </button>
                  </div>
                </div>
              )}

              {/* ── EDIT ── */}
              {activeTab === "edit" && (
                <div className="prof-tab-panel">
                  <div className="prof-form-grid">
                    <div className="prof-form-group">
                      <label>NAMA DEPAN</label>
                      <Input
                        type="text"
                        defaultValue="Mohammad"
                        placeholder="Nama depan"
                        className="prof-input"
                      />
                    </div>
                    <div className="prof-form-group">
                      <label>NAMA BELAKANG</label>
                      <Input
                        type="text"
                        defaultValue="Rony"
                        placeholder="Nama belakang"
                        className="prof-input"
                      />
                    </div>
                    <div className="prof-form-group">
                      <label>USERNAME</label>
                      <Input
                        type="text"
                        defaultValue="mohammadRony"
                        placeholder="username"
                        className="prof-input"
                      />
                    </div>
                    <div className="prof-form-group">
                      <label>EMAIL</label>
                      <Input
                        type="email"
                        defaultValue="rony@example.com"
                        placeholder="Email"
                        className="prof-input"
                      />
                    </div>
                    <div className="prof-form-group">
                      <label>NEGARA</label>
                      <select className="prof-select">
                        <option>🇮🇩 Indonesia</option>
                        <option>🇸🇬 Singapore</option>
                        <option>🇲🇾 Malaysia</option>
                      </select>
                    </div>
                    <div className="prof-form-group">
                      <label>TANGGAL LAHIR</label>
                      <Input
                        type="date"
                        defaultValue="1995-03-15"
                        className="prof-input"
                      />
                    </div>
                    <div className="prof-form-group prof-form-group--full">
                      <label>BIO</label>
                      <textarea
                        className="prof-textarea"
                        placeholder="Ceritakan sedikit tentang dirimu..."
                      />
                    </div>
                    <div className="prof-form-group">
                      <label>LINK FACEBOOK</label>
                      <Input
                        type="url"
                        placeholder="https://facebook.com/username"
                        className="prof-input"
                      />
                    </div>
                    <div className="prof-form-group">
                      <label>LINK TWITTER / X</label>
                      <Input
                        type="url"
                        placeholder="https://x.com/username"
                        className="prof-input"
                      />
                    </div>
                    <div className="prof-form-group">
                      <label>LINK INSTAGRAM</label>
                      <Input
                        type="url"
                        placeholder="https://instagram.com/username"
                        className="prof-input"
                      />
                    </div>
                    <div className="prof-form-group">
                      <label>LINK DISCORD</label>
                      <Input
                        type="text"
                        placeholder="username#1234"
                        className="prof-input"
                      />
                    </div>
                  </div>
                  <div className="prof-form-actions">
                    <button
                      className="prof-btn prof-btn-outline"
                      onClick={() => setActiveTab("info")}
                    >
                      Batal
                    </button>
                    <button
                      className="prof-btn prof-btn-primary"
                      onClick={() => showToast("Profil berhasil disimpan!")}
                    >
                      💾 Simpan
                    </button>
                  </div>
                </div>
              )}

              {/* ── GAMING ACCOUNTS ── */}
              {activeTab === "games" && (
                <div className="prof-tab-panel">
                  <p className="prof-section-hint">
                    Hubungkan akun gaming kamu untuk sinkronisasi data &amp;
                    reward otomatis.
                  </p>
                  <div className="prof-games-grid">
                    {GAMES.map((game) => {
                      const connected = connectedGames.has(game.name);
                      return (
                        <div key={game.name} className="prof-game-chip">
                          <div className="prof-chip-top">
                            <span className="prof-game-icon">{game.icon}</span>
                            <div>
                              <div className="prof-game-name">{game.name}</div>
                              <div
                                className={`prof-chip-status ${connected ? "prof-chip-status--connected" : ""}`}
                              >
                                {connected ? "Connected" : "Not connected"}
                              </div>
                            </div>
                          </div>
                          <button
                            className={`prof-connect-btn ${connected ? "prof-connect-btn--connected" : ""}`}
                            onClick={() => !connected && toggleGame(game.name)}
                          >
                            {connected ? "✓ Connected" : "Connect"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── CONNECTED ACCOUNTS ── */}
              {activeTab === "connected" && (
                <div className="prof-tab-panel prof-tab-panel--no-pad">
                  <div className="prof-connected-list">
                    {/* Google */}
                    <div className="prof-connected-item">
                      <div
                        className="prof-platform-icon"
                        style={{ background: "#fff1f1", fontSize: 22 }}
                      >
                        G
                      </div>
                      <div>
                        <div className="prof-platform-name">Google</div>
                        <div className="prof-platform-sub">rony@gmail.com</div>
                      </div>
                      <div className="prof-conn-status">
                        <span className="prof-conn-dot"></span>
                        <span className="prof-conn-text">Connected</span>
                        <button
                          className="prof-disconnect-btn"
                          onClick={() => showToast("Akun Google diputus.")}
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>

                    {/* Facebook */}
                    <div className="prof-connected-item prof-connected-item--dim">
                      <div
                        className="prof-platform-icon"
                        style={{
                          background: "#1877f2",
                          color: "#fff",
                          fontSize: 18,
                          fontWeight: 700,
                        }}
                      >
                        f
                      </div>
                      <div>
                        <div className="prof-platform-name">Facebook</div>
                        <div className="prof-platform-sub">Belum terhubung</div>
                      </div>
                      <div className="prof-conn-status">
                        <button
                          className="prof-btn prof-btn-outline prof-btn--sm"
                          onClick={() =>
                            showToast("Menghubungkan ke Facebook...")
                          }
                        >
                          Connect
                        </button>
                      </div>
                    </div>

                    {/* Twitter */}
                    <div className="prof-connected-item prof-connected-item--dim">
                      <div
                        className="prof-platform-icon"
                        style={{
                          background: "#000",
                          color: "#fff",
                          fontSize: 16,
                          fontWeight: 700,
                        }}
                      >
                        𝕏
                      </div>
                      <div>
                        <div className="prof-platform-name">Twitter / X</div>
                        <div className="prof-platform-sub">Belum terhubung</div>
                      </div>
                      <div className="prof-conn-status">
                        <button
                          className="prof-btn prof-btn-outline prof-btn--sm"
                          onClick={() =>
                            showToast("Menghubungkan ke Twitter...")
                          }
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SECURITY ── */}
              {activeTab === "security" && (
                <div className="prof-tab-panel">
                  <div className="prof-security-list">
                    <div className="prof-security-item">
                      <div className="prof-security-icon">🔑</div>
                      <div>
                        <div className="prof-security-label">Password</div>
                        <div className="prof-security-desc">
                          Terakhir diubah 3 bulan lalu
                        </div>
                      </div>
                      <button
                        className="prof-btn prof-btn-outline"
                        onClick={() => showToast("Buka form ganti password...")}
                      >
                        Ganti Password
                      </button>
                    </div>
                    <div className="prof-security-item">
                      <div className="prof-security-icon">📱</div>
                      <div>
                        <div className="prof-security-label">
                          Two-Factor Authentication
                        </div>
                        <div className="prof-security-desc">
                          Belum diaktifkan · Disarankan untuk keamanan ekstra
                        </div>
                      </div>
                      <button
                        className="prof-btn prof-btn-primary"
                        onClick={() => showToast("Setup 2FA dimulai...")}
                      >
                        Aktifkan 2FA
                      </button>
                    </div>
                    <div className="prof-security-item">
                      <div className="prof-security-icon">📋</div>
                      <div>
                        <div className="prof-security-label">Sesi Aktif</div>
                        <div className="prof-security-desc">
                          1 perangkat aktif saat ini
                        </div>
                      </div>
                      <button
                        className="prof-btn prof-btn-outline"
                        onClick={() => showToast("Membuka daftar sesi...")}
                      >
                        Lihat Semua
                      </button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="prof-danger-zone">
                    <div className="prof-danger-title">⚠️ Danger Zone</div>
                    <div className="prof-danger-row">
                      <div className="prof-danger-desc">
                        Hapus akun secara permanen. Tindakan ini tidak dapat
                        dibatalkan.
                      </div>
                      <button
                        className="prof-btn prof-btn-danger"
                        onClick={() =>
                          showToast("Konfirmasi penghapusan akun...")
                        }
                      >
                        Hapus Akun
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />

      {/* Toast */}
      {toast && (
        <div className="prof-toast">
          <span className="prof-toast-dot" />
          <span>{toast}</span>
        </div>
      )}

      <style jsx>{`
        .profile-page-wrapper {
          width: 100%;
          padding: 32px 40px 80px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* ───── PAGE HEADER ───── */
        .prof-page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .prof-page-title {
          font-family: "Chakra Petch", sans-serif;
          font-weight: 700;
          font-size: 22px;
          color: #f0f0f8;
        }
        .prof-page-subtitle {
          font-size: 13px;
          color: #6b6b80;
          margin-top: 2px;
        }

        /* ───── CARD ───── */
        .prof-card {
          background: #161920;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          overflow: hidden;
        }

        /* ───── PROFILE HEADER ───── */
        .prof-header-inner {
          padding: 28px 24px;
          display: flex;
          align-items: flex-start;
          gap: 24px;
          flex-wrap: wrap;
        }
        .prof-avatar-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .prof-avatar {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #1c1c27;
          box-shadow: 0 0 0 3px rgba(91, 110, 245, 0.25);
        }
        .prof-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .prof-avatar-edit {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #5b6ef5;
          border: 2px solid #161920;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 11px;
          color: #fff;
          transition: transform 0.2s;
        }
        .prof-avatar-edit:hover {
          transform: scale(1.1);
        }

        .prof-info {
          flex: 1;
          min-width: 0;
        }
        .prof-name {
          font-family: "Chakra Petch", sans-serif;
          font-weight: 700;
          font-size: 22px;
          color: #f0f0f8;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .prof-verified {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #5b6ef5;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: #fff;
          flex-shrink: 0;
        }
        .prof-handle {
          font-size: 13px;
          color: #6b6b80;
          margin-top: 2px;
        }
        .prof-socials {
          display: flex;
          gap: 8px;
          margin-top: 14px;
        }
        .prof-social-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #1c1c27;
          border: 1px solid rgba(255, 255, 255, 0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          cursor: pointer;
          color: #6b6b80;
          transition: all 0.2s;
          text-decoration: none;
        }
        .prof-social-btn:hover {
          border-color: #5b6ef5;
          color: #f0f0f8;
        }

        .prof-actions {
          display: flex;
          gap: 10px;
          margin-left: auto;
        }

        /* ───── BUTTONS ───── */
        .prof-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 10px;
          font-family: "DM Sans", "Poppins", sans-serif;
          font-weight: 500;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          white-space: nowrap;
        }
        .prof-btn-primary {
          background: #5b6ef5;
          color: #fff;
        }
        .prof-btn-primary:hover {
          background: #4a5de0;
          box-shadow: 0 4px 16px rgba(91, 110, 245, 0.35);
        }
        .prof-btn-outline {
          background: transparent;
          color: #f0f0f8;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .prof-btn-outline:hover {
          border-color: #5b6ef5;
          color: #5b6ef5;
        }
        .prof-btn-danger {
          background: transparent;
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .prof-btn-danger:hover {
          background: rgba(239, 68, 68, 0.1);
        }
        .prof-btn--sm {
          padding: 6px 14px;
          font-size: 12px;
        }

        /* ───── BALANCE ───── */
        .prof-balance-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .prof-balance-card {
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          border: 1px solid rgba(91, 110, 245, 0.3);
          border-radius: 14px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
          min-width: 220px;
        }
        .prof-balance-card--green {
          background: linear-gradient(135deg, #1a2a1a, #1a2e16);
          border-color: rgba(34, 197, 94, 0.3);
        }
        .prof-balance-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(91, 110, 245, 0.2);
          border: 1px solid #5b6ef5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .prof-balance-icon--green {
          background: rgba(34, 197, 94, 0.15);
          border-color: #22c55e;
        }
        .prof-balance-amount {
          font-family: "Chakra Petch", sans-serif;
          font-weight: 700;
          font-size: 26px;
          color: #f0f0f8;
        }
        .prof-balance-amount--green {
          color: #22c55e;
        }
        .prof-balance-label {
          font-size: 12px;
          color: #6b6b80;
          margin-top: 2px;
        }
        .prof-claim-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          border-radius: 10px;
          background: linear-gradient(135deg, #5b6ef5, #a855f7);
          color: #fff;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          border: none;
          transition: opacity 0.2s;
          white-space: nowrap;
          margin-left: auto;
        }
        .prof-claim-btn:hover {
          opacity: 0.85;
        }

        /* ───── TABS ───── */
        .prof-tabs {
          display: flex;
          gap: 2px;
          padding: 0 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .prof-tabs::-webkit-scrollbar {
          display: none;
        }
        .prof-tab {
          padding: 14px 16px;
          font-size: 13px;
          font-weight: 500;
          color: #6b6b80;
          cursor: pointer;
          border: none;
          background: none;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .prof-tab:hover {
          color: #f0f0f8;
        }
        .prof-tab--active {
          color: #5b6ef5;
          border-bottom-color: #5b6ef5;
        }

        /* ───── TAB PANELS ───── */
        .prof-tab-panel {
          padding: 24px;
        }
        .prof-tab-panel--no-pad {
          padding: 0;
        }
        .prof-section-hint {
          font-size: 13px;
          color: #6b6b80;
          margin-bottom: 16px;
        }

        /* ───── FORM ───── */
        .prof-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .prof-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .prof-form-group--full {
          grid-column: 1 / -1;
        }
        .prof-form-group label {
          font-size: 12px;
          color: #6b6b80;
          font-weight: 600;
          letter-spacing: 0.4px;
        }

        .prof-info-val {
          padding: 10px 14px;
          background: #1c1c27;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 10px;
          font-size: 14px;
          color: #f0f0f8;
        }
        .prof-info-val--muted {
          color: #6b6b80;
        }

        .prof-input {
          background: #1c1c27 !important;
          border: 1px solid rgba(255, 255, 255, 0.07) !important;
          border-radius: 10px !important;
          padding: 10px 14px !important;
          color: #f0f0f8 !important;
          font-size: 14px !important;
          outline: none !important;
          width: 100% !important;
        }
        .prof-input:focus {
          border-color: #5b6ef5 !important;
        }

        .prof-select {
          background: #1c1c27;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 10px;
          padding: 10px 14px;
          color: #f0f0f8;
          font-size: 14px;
          width: 100%;
          outline: none;
          appearance: none;
        }
        .prof-select:focus {
          border-color: #5b6ef5;
        }

        .prof-textarea {
          background: #1c1c27;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 10px;
          padding: 10px 14px;
          color: #f0f0f8;
          font-size: 14px;
          width: 100%;
          outline: none;
          resize: vertical;
          min-height: 80px;
          font-family: "Poppins", sans-serif;
        }
        .prof-textarea:focus {
          border-color: #5b6ef5;
        }
        .prof-textarea::placeholder {
          color: #6b6b80;
        }

        .prof-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }
        .prof-form-actions--top-border {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          padding-top: 16px;
          margin-top: 4px;
        }

        /* ───── GAMING CHIPS ───── */
        .prof-games-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px;
        }
        .prof-game-chip {
          background: #1c1c27;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color 0.2s;
        }
        .prof-game-chip:hover {
          border-color: rgba(91, 110, 245, 0.4);
        }
        .prof-chip-top {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .prof-game-icon {
          font-size: 28px;
          flex-shrink: 0;
        }
        .prof-game-name {
          font-weight: 600;
          font-size: 13px;
          color: #f0f0f8;
          line-height: 1.3;
        }
        .prof-chip-status {
          font-size: 11px;
          color: #6b6b80;
          margin-top: 2px;
        }
        .prof-chip-status--connected {
          color: #22c55e;
        }
        .prof-connect-btn {
          width: 100%;
          padding: 7px;
          border-radius: 8px;
          background: rgba(91, 110, 245, 0.2);
          border: 1px solid rgba(91, 110, 245, 0.3);
          color: #5b6ef5;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: "Poppins", sans-serif;
        }
        .prof-connect-btn:hover {
          background: #5b6ef5;
          color: #fff;
        }
        .prof-connect-btn--connected {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.3);
          color: #22c55e;
          cursor: default;
        }
        .prof-connect-btn--connected:hover {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        /* ───── CONNECTED ACCOUNTS ───── */
        .prof-connected-list {
          display: flex;
          flex-direction: column;
        }
        .prof-connected-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 24px;
          transition: background 0.15s;
        }
        .prof-connected-item:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        .prof-connected-item--dim {
          opacity: 0.6;
        }
        .prof-platform-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .prof-platform-name {
          font-weight: 500;
          font-size: 14px;
          color: #f0f0f8;
        }
        .prof-platform-sub {
          font-size: 12px;
          color: #6b6b80;
          margin-top: 2px;
        }
        .prof-conn-status {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .prof-conn-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
        }
        .prof-conn-text {
          font-size: 12px;
          color: #22c55e;
        }
        .prof-disconnect-btn {
          display: none;
          padding: 6px 12px;
          border-radius: 7px;
          background: transparent;
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #ef4444;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .prof-connected-item:hover .prof-disconnect-btn {
          display: block;
        }
        .prof-connected-item:hover .prof-conn-text,
        .prof-connected-item:hover .prof-conn-dot {
          display: none;
        }

        /* ───── SECURITY ───── */
        .prof-security-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 8px;
        }
        .prof-security-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        .prof-security-item:hover {
          background: #1c1c27;
          border-color: rgba(255, 255, 255, 0.07);
        }
        .prof-security-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #1c1c27;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .prof-security-label {
          font-size: 14px;
          font-weight: 500;
          color: #f0f0f8;
        }
        .prof-security-desc {
          font-size: 12px;
          color: #6b6b80;
          margin-top: 2px;
        }
        .prof-security-item .prof-btn {
          margin-left: auto;
        }

        /* ───── DANGER ZONE ───── */
        .prof-danger-zone {
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 12px;
          padding: 20px;
          background: rgba(239, 68, 68, 0.04);
          margin-top: 16px;
        }
        .prof-danger-title {
          font-family: "Chakra Petch", sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #ef4444;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .prof-danger-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .prof-danger-desc {
          font-size: 13px;
          color: #6b6b80;
        }

        /* ───── TOAST ───── */
        .prof-toast {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          background: #1c1c27;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 12px 20px;
          font-size: 13px;
          color: #f0f0f8;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: toastIn 0.3s ease;
        }
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        .prof-toast-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
        }

        /* ───── RESPONSIVE ───── */
        @media (max-width: 640px) {
          .prof-header-inner {
            flex-direction: column;
          }
          .prof-actions {
            margin-left: 0;
          }
          .prof-form-grid {
            grid-template-columns: 1fr;
          }
          .prof-form-group--full {
            grid-column: 1;
          }
          .prof-games-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .prof-balance-row {
            flex-direction: column;
          }
          .prof-claim-btn {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  );
}
