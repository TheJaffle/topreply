import { createClient } from "@supabase/supabase-js";

export function hasSupabaseAdminEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

function getSupabaseAdminEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!supabaseServiceRoleKey) {
    throw new Error("Missing env.SUPABASE_SERVICE_ROLE_KEY");
  }

  return {
    supabaseUrl,
    supabaseServiceRoleKey
  };
}

export function createAdminClient() {
  const { supabaseUrl, supabaseServiceRoleKey } = getSupabaseAdminEnv();

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
