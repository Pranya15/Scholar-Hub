export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  const key = anonKey || publishableKey;

  return {
    url,
    key,
    isConfigured: Boolean(url && key && isValidSupabaseUrl(url) && !isPlaceholder(key)),
  };
}

function isValidSupabaseUrl(value: string) {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === "https:" && parsedUrl.hostname.endsWith(".supabase.co");
  } catch {
    return false;
  }
}

function isPlaceholder(value: string) {
  return /your-project|your-anon-key|your-supabase|placeholder|example/i.test(value);
}

export function requireSupabaseConfig() {
  const config = getSupabaseConfig();

  if (!config.isConfigured) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and either NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local, then restart the development server."
    );
  }

  return {
    url: config.url as string,
    key: config.key as string,
  };
}
