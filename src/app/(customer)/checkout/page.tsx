import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ShoppingBag } from "lucide-react";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { T } from "@/components/ui/T";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          menuItem: { include: { category: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  const items = (cart?.items ?? []).map((item) => ({
    ...item,
    menuItem: {
      ...item.menuItem,
      price: item.menuItem.price.toNumber(),
      category: item.menuItem.category,
    },
  }));

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <ShoppingBag className="h-20 w-20 text-gray-200 mb-6" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          <T k="cartEmpty" />
        </h2>
        <p className="text-gray-400 mb-8">
          <T k="checkoutEmptyDesc" />
        </p>
        <Link
          href="/"
          className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
        >
          <T k="browseRestaurants" />
        </Link>
      </div>
    );
  }

  return <CheckoutForm items={items} />;
}
