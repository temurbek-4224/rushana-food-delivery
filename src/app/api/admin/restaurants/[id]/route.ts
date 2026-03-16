import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

async function isAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}

// PATCH /api/admin/restaurants/[id] — update
export async function PATCH(req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const { name, description, address, phone, imageUrl, isOpen } = body as Record<string, unknown>;

  if (!String(name ?? "").trim() || !String(address ?? "").trim())
    return NextResponse.json(
      { error: "Name and address are required." },
      { status: 400 }
    );

  const restaurant = await prisma.restaurant.update({
    where: { id },
    data: {
      name:        String(name).trim(),
      description: description ? String(description).trim() || null : null,
      address:     String(address).trim(),
      phone:       phone       ? String(phone).trim()       || null : null,
      imageUrl:    imageUrl    ? String(imageUrl).trim()    || null : null,
      isOpen:      typeof isOpen === "boolean" ? isOpen : true,
    },
  });

  return NextResponse.json({ restaurant });
}

// DELETE /api/admin/restaurants/[id] — delete (blocked if orders exist)
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;

  const orderCount = await prisma.order.count({ where: { restaurantId: id } });
  if (orderCount > 0)
    return NextResponse.json(
      { error: `Cannot delete: this restaurant has ${orderCount} order(s).` },
      { status: 409 }
    );

  await prisma.restaurant.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
