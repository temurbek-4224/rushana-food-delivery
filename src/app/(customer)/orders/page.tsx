import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import { T } from "@/components/ui/T";
import { ClipboardList, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { restaurant: true },
    orderBy: { createdAt: "desc" },
  });

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <ClipboardList className="h-20 w-20 text-gray-200 mb-6" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          <T k="noOrdersYet" />
        </h2>
        <p className="text-gray-400 mb-8">
          <T k="noOrdersDesc" />
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        <T k="myOrdersTitle" />
      </h1>

      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="group flex items-center justify-between gap-4 rounded-2xl bg-white border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-orange-100 transition-all"
          >
            {/* Left info */}
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-gray-900 text-sm">
                  {order.restaurant.name}
                </span>
                <OrderStatusBadge status={order.status} />
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>#{order.id.slice(-8).toUpperCase()}</span>
                <span>·</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>
            </div>

            {/* Right: total + arrow */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="font-bold text-orange-500">
                {formatPrice(order.totalAmount.toString())}
              </span>
              <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-orange-400 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
