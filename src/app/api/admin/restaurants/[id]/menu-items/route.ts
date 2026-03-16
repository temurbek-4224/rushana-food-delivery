import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

async function isAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}

// POST /api/admin/restaurants/[id]/menu-items — create menu item
export async function POST(req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // restaurantId used for context; FK integrity is enforced by categoryId→restaurant
  await params; // consume params (restaurantId available if needed for validation)

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

  const menuItem = await prisma.menuItem.create({
    data: {
      name:        String(name).trim(),
      description: description ? String(description).trim() || null : null,
      price:       priceNum,
      imageUrl:    imageUrl    ? String(imageUrl).trim()    || null : null,
      isAvailable: typeof isAvailable === "boolean" ? isAvailable : true,
      categoryId:  String(categoryId),
    },
  });

  return NextResponse.json({ menuItem }, { status: 201 });
}
