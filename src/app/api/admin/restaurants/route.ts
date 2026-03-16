import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function isAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}

// GET /api/admin/restaurants — list all
export async function GET() {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const restaurants = await prisma.restaurant.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { categories: true, orders: true } } },
  });

  return NextResponse.json({ restaurants });
}

// POST /api/admin/restaurants — create
export async function POST(req: NextRequest) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const { name, description, address, phone, imageUrl, isOpen } = body as Record<string, unknown>;

  if (!String(name ?? "").trim() || !String(address ?? "").trim())
    return NextResponse.json(
      { error: "Name and address are required." },
      { status: 400 }
    );

  const restaurant = await prisma.restaurant.create({
    data: {
      name:        String(name).trim(),
      description: description ? String(description).trim() || null : null,
      address:     String(address).trim(),
      phone:       phone       ? String(phone).trim()       || null : null,
      imageUrl:    imageUrl    ? String(imageUrl).trim()    || null : null,
      isOpen:      typeof isOpen === "boolean" ? isOpen : true,
    },
  });

  return NextResponse.json({ restaurant }, { status: 201 });
}
