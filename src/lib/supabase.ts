import { createClient } from '@supabase/supabase-js';

/**
 * Simpan access_token + refresh_token ke shared cookie (.gameforsmart.com)
 * Format: access_token|refresh_token (~1.5KB, aman di bawah batas 4KB)
 */
export function syncSessionCookie(tokens: { access_token: string; refresh_token: string } | null) {
    if (typeof document === 'undefined') return;
    const hostname = window.location.hostname;
    const isGfs = hostname.endsWith('gameforsmart.com');
    const isHttps = window.location.protocol === 'https:';

    if (!tokens) {
        // Hapus cookie
        let cookieStr = `gfs-session=; path=/; max-age=0`;
        if (isGfs) cookieStr += `; domain=.gameforsmart.com`;
        document.cookie = cookieStr;
        return;
    }

    const value = `${tokens.access_token}|${tokens.refresh_token}`;
    const parts = [
        `gfs-session=${encodeURIComponent(value)}`,
        `path=/`,
        `max-age=${60 * 60 * 24 * 365}`,
        `SameSite=Lax`,
    ];
    if (isGfs) parts.push(`domain=.gameforsmart.com`);
    if (isHttps) parts.push(`Secure`);
    document.cookie = parts.join('; ');
}

/**
 * Baca access_token + refresh_token dari shared cookie
 */
export function getSessionFromCookie(): { access_token: string; refresh_token: string } | null {
    if (typeof document === 'undefined') return null;
    const cookies = document.cookie.split('; ');
    const found = cookies.find(c => c.startsWith('gfs-session='));
    if (!found) return null;
    try {
        const eqIndex = found.indexOf('=');
        const value = decodeURIComponent(found.substring(eqIndex + 1));
        const pipeIndex = value.indexOf('|');
        if (pipeIndex === -1) return null;
        const access_token = value.substring(0, pipeIndex);
        const refresh_token = value.substring(pipeIndex + 1);
        if (!access_token || !refresh_token) return null;
        return { access_token, refresh_token };
    } catch {
        return null;
    }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storageKey: 'gfs-auth-token',
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
});

// Listener untuk menyamakan/broadcasting token di Landing Page ke semua ekosistem gameforsmart
if (typeof window !== 'undefined') {
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
            if (session) {
                syncSessionCookie({
                    access_token: session.access_token,
                    refresh_token: session.refresh_token
                });
            }
        } else if (event === 'SIGNED_OUT') {
            syncSessionCookie(null);
        }
    });
}