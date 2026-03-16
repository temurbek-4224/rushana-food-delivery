import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * Shared admin auth guard.
 * Call at the top of every admin server component / route handler.
 * Returns the session so callers can access session.user.id etc.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/");
  return session;
}
