// This single file handles ALL Auth.js endpoints:
// GET  /api/auth/session
// GET  /api/auth/providers
// GET  /api/auth/callback/google
// POST /api/auth/signin/google
// POST /api/auth/signout
// ...etc
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
