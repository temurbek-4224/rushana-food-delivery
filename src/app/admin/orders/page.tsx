import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, ShoppingBag } from "lucide-react";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import { T } from "@/components/ui/T";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  await requireAdmin();

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      restaurant: true,
      user: true,
      items: true,
    },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          <T k="allOrdersTitle" />
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {orders.length} order{orders.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-200 mb-4" />
          <h2 className="text-lg font-semibold text-gray-600 mb-1">
            <T k="noAdminOrders" />
          </h2>
          <p className="text-sm text-gray-400">
            <T k="noAdminOrdersDesc" />
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs text-gray-500 font-semibold px-5 py-3.5">
                    <T k="colOrderId" />
                  </th>
                  <th className="text-left text-xs text-gray-500 font-semibold px-5 py-3.5">
                    <T k="colCustomer" />
                  </th>
                  <th className="text-left text-xs text-gray-500 font-semibold px-5 py-3.5">
                    <T k="colRestaurant" />
                  </th>
                  <th className="text-left text-xs text-gray-500 font-semibold px-5 py-3.5">
                    <T k="colItems" />
                  </th>
                  <th className="text-left text-xs text-gray-500 font-semibold px-5 py-3.5">
                    <T k="colStatus" />
                  </th>
                  <th className="text-right text-xs text-gray-500 font-semibold px-5 py-3.5">
                    <T k="colTotal" />
                  </th>
                  <th className="text-left text-xs text-gray-500 font-semibold px-5 py-3.5">
                    <T k="colDate" />
                  </th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="group hover:bg-orange-50/40 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-gray-600 font-semibold">
                        #{order.id.slice(-8).toUpperCase()}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800 truncate max-w-[150px]">
                        {order.user.name ?? "—"}
                      </p>
                      <p className="text-xs text-gray-400 truncate max-w-[150px]">
                        {order.user.email}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-gray-700 truncate max-w-[130px]">
                      {order.restaurant.name}
                    </td>

                    <td className="px-5 py-4 text-gray-500 text-center">
                      {order.items.length}
                    </td>

                    <td className="px-5 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>

                    <td className="px-5 py-4 text-right font-bold text-orange-500">
                      {formatPrice(order.totalAmount.toNumber())}
                    </td>

                    <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-orange-500 hover:text-orange-700 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <T k="viewBtn" /> <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
