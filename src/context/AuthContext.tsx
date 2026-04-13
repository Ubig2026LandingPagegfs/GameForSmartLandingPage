"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, getSessionFromCookie } from "@/lib/supabase";

interface AuthContextType {
  user: any;
  profile: any;
  isLoggedIn: boolean;
  loading: boolean;
  handleLogin: () => void;
  handleRegister: () => void;
  handleLogout: () => void;
  login: () => void; // Legacy support
  logout: () => void; // Legacy support
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL || "https://app.gameforsmart.com";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const clearAuth = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    localStorage.removeItem("token_time");
    setUser(null);
    setProfile(null);
    setIsLoggedIn(false);
  };

  const handleLogout = () => {
    clearAuth();
    const redirectUrl = window.location.origin;
    window.location.href = `${AUTH_BASE_URL}/login?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("auth_user_id", userId)
        .single();
      if (!error && data) {
        return data;
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
    return null;
  };

  const verifyToken = async (token: string) => {
    try {
      const { data, error } = await supabase.auth.getUser(token);
      if (error || !data?.user) {
        console.error("Token verification failed:", error?.message);
        clearAuth();
        return null;
      }
      
      const userData = data.user;
      const userProfile = await fetchProfile(userData.id);

      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      if (userProfile) {
        localStorage.setItem("profile", JSON.stringify(userProfile));
      } else {
        localStorage.removeItem("profile");
      }
      localStorage.setItem("token_time", Date.now().toString());
      
      setUser(userData);
      setProfile(userProfile);
      setIsLoggedIn(true);
      return userData;
    } catch (err) {
      console.error("Error verifying token:", err);
      clearAuth();
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      
      const checkLocalFallback = async () => {
        const accessToken = localStorage.getItem("access_token");
        const savedUser = localStorage.getItem("user");
        const savedProfile = localStorage.getItem("profile");
        const tokenTime = localStorage.getItem("token_time");

        if (accessToken && savedUser && tokenTime) {
          const hoursPassed = (Date.now() - parseInt(tokenTime)) / (1000 * 60 * 60);
          
          if (hoursPassed < 24) {
            try {
              // Kita wajib menyetel ulang session ke dalam Supabase Client di sini!
              await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: accessToken // Gunakan token utama
              });
            } catch(e) {}

            setUser(JSON.parse(savedUser));
            if (savedProfile && savedProfile !== "undefined") {
              setProfile(JSON.parse(savedProfile));
            }
            setIsLoggedIn(true);
            return true;
          } else {
            clearAuth();
          }
        }
        return false;
      };

      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get("token");
      const cookieSession = getSessionFromCookie();

      if (tokenFromUrl) {
        const verifiedUser = await verifyToken(tokenFromUrl);
        
        if (verifiedUser) {
          const url = new URL(window.location.href);
          url.searchParams.delete("token");
          window.history.replaceState({}, '', url.toString());
        }
      } else if (cookieSession) {
        // Otomatis login menggunakan SSO Cookie (gfs-session) jika tersedia
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token: cookieSession.access_token,
            refresh_token: cookieSession.refresh_token
          });
          
          if (!error && data?.session?.user) {
            const userData = data.session.user;
            const userProfile = await fetchProfile(userData.id);
            
            setUser(userData);
            setProfile(userProfile);
            setIsLoggedIn(true);

            // Perbarui localStorage untuk sinkronisasi library lawas
            localStorage.setItem("access_token", data.session.access_token);
            localStorage.setItem("user", JSON.stringify(userData));
            if (userProfile) {
              localStorage.setItem("profile", JSON.stringify(userProfile));
            }
            localStorage.setItem("token_time", Date.now().toString());
          } else {
            await checkLocalFallback();
          }
        } catch (e) {
          await checkLocalFallback();
        }
      } else {
        await checkLocalFallback();
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const handleLogin = async () => {
    const currentUrl = window.location.href;
    window.location.href = `${AUTH_BASE_URL}/login?redirect=${encodeURIComponent(currentUrl)}`;
  };

  const handleRegister = () => {
    const currentUrl = window.location.href;
    window.location.href = `${AUTH_BASE_URL}/register?redirect=${encodeURIComponent(currentUrl)}`;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile,
      isLoggedIn, 
      loading, 
      handleLogin, 
      handleRegister, 
      handleLogout,
      login: handleLogin, // Legacy support
      logout: handleLogout // Legacy support
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
