export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  const key = anonKey && !isPlaceholder(anonKey) ? anonKey : publishableKey;

  return {
    url,
    key,
    isConfigured: Boolean(url && isValidUrl(url) && key && !isPlaceholder(url) && !isPlaceholder(key)),
  };
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".supabase.co");
  } catch {
    return false;
  }
}

function isPlaceholder(value: string) {
  return /your-project-id|your-anon-key|your-supabase|placeholder|example/i.test(value);
}