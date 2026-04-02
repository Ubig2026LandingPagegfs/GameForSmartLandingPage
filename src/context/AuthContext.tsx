"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: any;
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const clearAuth = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("token_time");
    setUser(null);
    setIsLoggedIn(false);
  };

  const handleLogout = () => {
    clearAuth();
    const redirectUrl = window.location.origin;
    window.location.href = `${AUTH_BASE_URL}/login?redirect=${encodeURIComponent(redirectUrl)}`;
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
      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token_time", Date.now().toString());
      
      setUser(userData);
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
      
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get("token");

      if (tokenFromUrl) {
        // 1. Read token → 2. Verify with Supabase → 3. Save session
        const verifiedUser = await verifyToken(tokenFromUrl);
        
        if (verifiedUser) {
          // 4. Remove token from URL AFTER successful verification
          const url = new URL(window.location.href);
          url.searchParams.delete("token");
          window.history.replaceState({}, '', url.toString());
        }
      } else {
        // Session Persistence logic
        const accessToken = localStorage.getItem("access_token");
        const savedUser = localStorage.getItem("user");
        const tokenTime = localStorage.getItem("token_time");

        if (accessToken && savedUser && tokenTime) {
          const hoursSinceLogin = (Date.now() - parseInt(tokenTime)) / (1000 * 60 * 60);
          
          if (hoursSinceLogin < 24) {
            // Re-verify token again with Supabase to ensure it's still valid
            const { data } = await supabase.auth.getUser(accessToken);
            if (data?.user) {
              setUser(data.user);
              setIsLoggedIn(true);
            } else {
              clearAuth();
            }
          } else {
            // Expired after 24 hours
            clearAuth();
          }
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const handleLogin = () => {
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
      isLoggedIn, 
      loading, 
      handleLogin, 
      handleRegister, 
      handleLogout,
      login: handleLogin, // Map legacy login to SSO
      logout: handleLogout // Map legacy logout to SSO
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
