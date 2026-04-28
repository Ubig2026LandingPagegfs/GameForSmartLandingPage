"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Profile {
  id: string
  username: string
  email: string
  nickname?: string
  fullname?: string
  avatar_url?: string
  auth_user_id: string
  role?: string
}

interface AuthContextType {
  user: any;
  profile: Profile | null;
  isLoggedIn: boolean;
  loading: boolean;
  isRestoringSession: boolean;
  handleLogin: () => void;
  handleRegister: () => void;
  handleLogout: () => void;
  login: () => void; // Legacy support
  logout: () => void; // Legacy support
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL || "https://app.gameforsmart.com";

// Retry helper dengan exponential backoff seperti di Axiom
async function ensureProfileWithRetry(
  currentUser: any,
  onSuccess: (profile: Profile) => void,
  onFallback: (profile: Profile) => void,
  maxRetries = 3
) {
  let retryCount = 0
  const baseDelay = 500

  const attempt = async (): Promise<void> => {
    try {
      const { data: existing, error: selectError } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_user_id', currentUser.id)
        .single()

      if (selectError && selectError.code !== 'PGRST116') throw selectError

      if (existing) {
        onSuccess(existing)
        return
      }

      const profileData = {
        auth_user_id: currentUser.id,
        username: currentUser.user_metadata?.username || currentUser.email?.split('@')[0] || 'user',
        email: currentUser.email || '',
        fullname: currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || '',
        avatar_url: currentUser.user_metadata?.avatar_url || currentUser.user_metadata?.picture || '',
        updated_at: new Date().toISOString()
      }

      const { data, error: insertError } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single()

      if (insertError) throw insertError

      onSuccess(data)
    } catch (error: any) {
      retryCount++
      if (retryCount < maxRetries) {
        const delay = baseDelay * Math.pow(2, retryCount - 1)
        await new Promise(resolve => setTimeout(resolve, delay))
        return attempt()
      }
      onFallback({
        id: 'fallback-' + currentUser.id,
        username: currentUser.email?.split('@')[0] || 'user',
        email: currentUser.email || '',
        nickname: '',
        fullname: '',
        avatar_url: '',
        auth_user_id: currentUser.id
      })
    }
  }

  return attempt()
}

// Helper: fetch profile lalu set state
async function loadProfile(
  currentUser: any,
  setProfile: (p: Profile | null) => void,
  setIsLoggedIn: (v: boolean) => void,
  setLoading?: (v: boolean) => void
) {
  await ensureProfileWithRetry(
    currentUser,
    (profile) => {
      setProfile(profile)
      setIsLoggedIn(true)
      if (setLoading) setLoading(false)
    },
    (fallbackProfile) => {
      setProfile(fallbackProfile)
      setIsLoggedIn(true)
      if (setLoading) setLoading(false)
    }
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRestoringSession, setIsRestoringSession] = useState(true);

  useEffect(() => {
    let currentUserId: string | null | undefined = undefined;

    const getUser = async () => {
      try {
        // 1. Cek local sesi
        let { data: { session } } = await supabase.auth.getSession()

        // 2. Fallback baca SSO Token di URL (dari sistem legacy landing page)
        const urlParams = new URLSearchParams(window.location.search);
        const rawToken = urlParams.get("token");
        
        let tokenFromUrl = rawToken;
        let refreshTokenFromUrl = rawToken;

        if (rawToken) {
          // Jika token adalah string JSON yang berisi access_token dan refresh_token
          if (rawToken.startsWith("{") && rawToken.includes("access_token")) {
            try {
              const parsed = JSON.parse(rawToken);
              if (parsed.access_token) {
                tokenFromUrl = parsed.access_token;
                refreshTokenFromUrl = parsed.refresh_token || parsed.access_token;
              }
            } catch (e) {}
          }
        }

        if (tokenFromUrl && !session) {
          const { data, error } = await supabase.auth.getUser(tokenFromUrl);
          if (!error && data?.user) {
            // PENTING: Gunakan setSession agar supabase tercatat fully login
            await supabase.auth.setSession({ access_token: tokenFromUrl, refresh_token: refreshTokenFromUrl as string })
            const url = new URL(window.location.href);
            url.searchParams.delete("token");
            window.history.replaceState({}, '', url.toString());
            const localSessionInfo = await supabase.auth.getSession()
            session = localSessionInfo.data.session
          }
        }

        const currentUser = session?.user ?? null
        currentUserId = currentUser?.id || null;
        setUser(currentUser)

        if (currentUser && session) {
          await loadProfile(currentUser, setProfile, setIsLoggedIn, setLoading)
        } else {
          setUser(null)
          setProfile(null)
          setIsLoggedIn(false)
          setLoading(false)
        }
      } catch (error) {
        setUser(null)
        setProfile(null)
        setIsLoggedIn(false)
        setLoading(false)
      }
      setIsRestoringSession(false)
    }
    getUser()

    const checkSession = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const newUserId = user?.id || null;

        if (currentUserId !== undefined && newUserId !== currentUserId) {
          console.log("[AuthContext] Session change detected across tabs/subdomains! Reloading...");
          window.location.reload();
        }
      } catch (err) {
        console.error("[AuthContext] Error checking session:", err);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkSession();
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", checkSession);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (event === 'SIGNED_IN' && currentUser) {
          loadProfile(currentUser, setProfile, setIsLoggedIn).catch(console.error)
          checkSession();
        } else if (!currentUser || event === 'SIGNED_OUT') {
          setProfile(null)
          setIsLoggedIn(false)
          checkSession();
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", checkSession);
    }
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut(); // invalidate di server juga
    } catch (e) { }

    setUser(null);
    setProfile(null);
    setIsLoggedIn(false);

    const redirectUrl = window.location.origin;
    window.location.href = `${AUTH_BASE_URL}/login?redirect=${encodeURIComponent(redirectUrl)}`;
  };

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
      isRestoringSession,
      handleLogin,
      handleRegister,
      handleLogout,
      login: handleLogin,
      logout: handleLogout
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
