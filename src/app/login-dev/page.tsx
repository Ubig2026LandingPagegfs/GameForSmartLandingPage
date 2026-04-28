"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginDevPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("Logging in...");
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMsg("Error: " + error.message);
      } else {
        setMsg("Success! Anda berhasil login di localhost.");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch (err: any) {
      setMsg("Exception: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="main-container container-fluid d-flex align-items-center justify-content-center pt-20 pb-12" style={{ minHeight: "80vh" }}>
        <div className="registration-card bgn-4 p-md-8 p-6 rounded-4 border border-secondary border-opacity-10 shadow-lg w-100 max-w-md" style={{ maxWidth: "500px" }}>
          <h2 className="tcn-1 fs-four fw-bold mb-6 text-center">Local Dev Login</h2>
          
          <div className="mb-6 p-4 rounded-3" style={{ backgroundColor: "rgba(249, 115, 22, 0.1)", border: "1px solid rgba(249, 115, 22, 0.3)" }}>
            <p className="tcn-6 fs-sm mb-0">
              <i className="ti ti-info-circle tcp-1 me-2"></i>
              Halaman ini khusus untuk mempermudah login saat development di localhost agar tidak perlu copy-paste token lagi.
            </p>
          </div>

          <form onSubmit={handleLogin} className="d-flex flex-column gap-4">
            <div>
              <label className="tcn-1 fs-sm fw-medium mb-2 d-block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-100 py-3 px-4 bgn-3 rounded-3 tcn-1 border border-secondary border-opacity-10 focus-neon text-base h-12"
                placeholder="Email akun Anda"
                required
              />
            </div>
            
            <div>
              <label className="tcn-1 fs-sm fw-medium mb-2 d-block">Password</label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-100 py-3 px-4 bgn-3 rounded-3 tcn-1 border border-secondary border-opacity-10 focus-neon text-base h-12"
                placeholder="Password"
                required
              />
            </div>

            <Button
              type="submit"
              className="btn-half-border position-relative d-inline-flex py-4 bgp-1 px-8 rounded-pill text-nowrap fw-bold transition-all hover-scale border-none hover:bg-transparent text-white w-100 justify-content-center mt-2"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Login via Supabase"}
            </Button>
          </form>

          {msg && (
            <div className={`mt-6 p-4 rounded-3 text-center ${msg.includes('Error') || msg.includes('Exception') ? 'text-danger bg-danger bg-opacity-10' : 'text-success bg-success bg-opacity-10'}`}>
              {msg}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
