import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing in environment variables.');
}

const isProd = typeof window !== "undefined" && window.location.hostname.endsWith("gameforsmart.com");

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
  cookieOptions: {
    domain: isProd ? ".gameforsmart.com" : undefined,
    path: "/",
    sameSite: "lax",
    secure: isProd,
  }
});