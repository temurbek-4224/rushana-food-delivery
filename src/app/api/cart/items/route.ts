import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { menuItemId, quantity = 1 } = body as {
    menuItemId: string;
    quantity: number;
  };

  if (!menuItemId) {
    return NextResponse.json({ error: "menuItemId is required" }, { status: 400 });
  }

  // Get or create cart for this user
  const cart = await prisma.cart.upsert({
    where: { userId: session.user.id },
    create: { userId: session.user.id },
    update: {},
  });

  // Upsert cart item — increment quantity if already exists
  const cartItem = await prisma.cartItem.upsert({
    where: { cartId_menuItemId: { cartId: cart.id, menuItemId } },
    create: { cartId: cart.id, menuItemId, quantity },
    update: { quantity: { increment: quantity } },
    include: { menuItem: true },
  });

  return NextResponse.json(cartItem, { status: 200 });
}
