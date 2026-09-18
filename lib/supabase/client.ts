import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

export function isSupabaseConfigured() {
  return getSupabaseConfig().isConfigured;
}

export function createClient() {
  const { url, key, isConfigured } = getSupabaseConfig();

  if (!isConfigured) {
    console.error(
      "Supabase configuration is missing or invalid. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY before using authentication."
    );
  }

  return createBrowserClient(
    url || "https://placeholder-invalid-url.supabase.co",
    key || "placeholder-anon-key"
  );
}
