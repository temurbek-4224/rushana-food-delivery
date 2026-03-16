import { NextResponse } from "next/server";
import { auth } from "@/auth";

// Used by legacy client code — returns the current Auth.js session user.
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({ user: session.user });
}
