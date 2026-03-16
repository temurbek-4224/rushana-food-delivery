import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

async function isAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}

// POST /api/admin/restaurants/[id]/categories — add category to a restaurant
export async function POST(req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id: restaurantId } = await params;
  const body = await req.json().catch(() => ({}));
  const name = String((body as Record<string, unknown>).name ?? "").trim();

  if (!name)
    return NextResponse.json(
      { error: "Category name is required." },
      { status: 400 }
    );

  const category = await prisma.category.create({
    data: { name, restaurantId },
  });

  return NextResponse.json({ category }, { status: 201 });
}
