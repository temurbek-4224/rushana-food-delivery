import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// ── GET /api/orders  — current user's order history ──────────────────────────
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { restaurant: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}

// ── POST /api/orders  — place a new order from the current cart ───────────────
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { address, notes } = (await req.json()) as {
    address: string;
    notes?: string;
  };

  if (!address?.trim()) {
    return NextResponse.json(
      { error: "Delivery address is required" },
      { status: 400 }
    );
  }

  // ── 1. Fetch cart with full item details ────────────────────────────────────
  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          menuItem: {
            include: { category: true }, // needed to get restaurantId
          },
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
  }

  // ── 2. Validate all items belong to one restaurant ──────────────────────────
  const restaurantIds = [
    ...new Set(cart.items.map((i) => i.menuItem.category.restaurantId)),
  ];

  if (restaurantIds.length > 1) {
    return NextResponse.json(
      { error: "All cart items must be from the same restaurant" },
      { status: 400 }
    );
  }

  const restaurantId = restaurantIds[0];

  // ── 3. Calculate total ──────────────────────────────────────────────────────
  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.menuItem.price.toNumber() * item.quantity,
    0
  );

  // ── 4. Create Order + OrderItems + clear cart — all in one transaction ──────
  const order = await prisma.$transaction(async (tx) => {
    // Create the order
    const newOrder = await tx.order.create({
      data: {
        userId: session.user.id,
        restaurantId,
        address: address.trim(),
        notes: notes?.trim() || null,
        totalAmount,
        status: "PENDING",
        items: {
          create: cart.items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            unitPrice: item.menuItem.price, // snapshot price at order time
          })),
        },
      },
      include: {
        restaurant: true,
        items: { include: { menuItem: true } },
      },
    });

    // Clear the cart items (keep the Cart row so the user's cart persists)
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return newOrder;
  });

  return NextResponse.json(order, { status: 201 });
}
