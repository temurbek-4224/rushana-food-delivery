import type { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  // Tells Auth.js that the User object coming from the adapter has a role field
  interface User {
    role: Role;
  }
}
