import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { Adapter } from "next-auth/adapters";
import type { Role } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Cast needed: next-auth@beta bundles its own @auth/core, creating a type
  // mismatch with the external @auth/prisma-adapter. Runtime behaviour is correct.
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  // Persist sessions in the database (required when using Prisma adapter)
  session: { strategy: "database" },

  callbacks: {
    // Attach id and role to every session so client components can read them
    async session({ session, user }) {
      if (session.user) {
        session.user.id   = user.id;
        session.user.role = (user as { role: Role }).role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
