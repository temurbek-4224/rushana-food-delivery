import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

async function isAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}

// PATCH /api/admin/menu-items/[id] — update
export async function PATCH(req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const { name, description, price, imageUrl, isAvailable, categoryId } = body;

  if (!String(name ?? "").trim() || !categoryId)
    return NextResponse.json(
      { error: "Name and category are required." },
      { status: 400 }
    );

  const priceNum = parseFloat(String(price ?? ""));
  if (isNaN(priceNum) || priceNum < 0)
    return NextResponse.json(
      { error: "Price must be a valid non-negative number." },
      { status: 400 }
    );

  const menuItem = await prisma.menuItem.update({
    where: { id },
    data: {
      name:        String(name).trim(),
      description: description ? String(description).trim() || null : null,
      price:       priceNum,
      imageUrl:    imageUrl    ? String(imageUrl).trim()    || null : null,
      isAvailable: typeof isAvailable === "boolean" ? isAvailable : true,
      categoryId:  String(categoryId),
    },
  });

  return NextResponse.json({ menuItem });
}

// DELETE /api/admin/menu-items/[id] — delete (blocked if item has been ordered)
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;

  try {
    await prisma.menuItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Cannot delete: this item has been ordered." },
      { status: 409 }
    );
  }
}
