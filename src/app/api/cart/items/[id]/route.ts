import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

type Params = { params: Promise<{ id: string }> };

// ── PATCH /api/cart/items/[id]  — update quantity ────────────────────────────
export async function PATCH(req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { quantity } = (await req.json()) as { quantity: number };

  if (typeof quantity !== "number" || quantity < 1) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
  }

  // Verify item belongs to this user's cart
  const existing = await prisma.cartItem.findFirst({
    where: { id, cart: { userId: session.user.id } },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.cartItem.update({
    where: { id },
    data: { quantity },
    include: { menuItem: true },
  });

  return NextResponse.json(updated);
}

// ── DELETE /api/cart/items/[id]  — remove item ───────────────────────────────
export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Verify item belongs to this user's cart
  const existing = await prisma.cartItem.findFirst({
    where: { id, cart: { userId: session.user.id } },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.cartItem.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
