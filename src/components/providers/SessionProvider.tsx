"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

// Thin client wrapper — receives the server-side session so the
// client doesn't need an extra round-trip to hydrate auth state.
export default function SessionProvider({ children, session }: Props) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
