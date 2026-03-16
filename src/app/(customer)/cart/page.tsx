import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import CartClient from "@/components/cart/CartClient";

export default async function CartPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: { menuItem: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  // Serialize Prisma Decimal → number before sending to client component
  const items = (cart?.items ?? []).map((item) => ({
    ...item,
    menuItem: {
      ...item.menuItem,
      price: item.menuItem.price.toNumber(),
    },
  }));

  return <CartClient initialItems={items} />;
}
