import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

async function isAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}

// PATCH /api/admin/categories/[id] — rename
export async function PATCH(req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const name = String(
    ((await req.json().catch(() => ({}))) as Record<string, unknown>).name ?? ""
  ).trim();

  if (!name)
    return NextResponse.json(
      { error: "Category name is required." },
      { status: 400 }
    );

  const category = await prisma.category.update({ where: { id }, data: { name } });
  return NextResponse.json({ category });
}

// DELETE /api/admin/categories/[id] — delete (blocked if menu items have been ordered)
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;

  try {
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Cannot delete: this category has items that have been ordered." },
      { status: 409 }
    );
  }
}
