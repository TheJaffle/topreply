import { cookies } from "next/headers";

export async function hasSupabaseAuthCookies() {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb-") && cookie.name.includes("auth-token"));
}
