import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Store,
  Users,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import { formatDate } from "@/lib/utils";
import { T } from "@/components/ui/T";
import type { Translations } from "@/i18n/types";

export const dynamic = "force-dynamic";

type StatItem = {
  labelKey: keyof Translations;
  value: number | string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  wide?: boolean;
};

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [
    totalOrders,
    pendingOrders,
    deliveredOrders,
    cancelledOrders,
    totalRestaurants,
    totalCustomers,
    revenueResult,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "DELIVERED" } }),
    prisma.order.count({ where: { status: "CANCELLED" } }),
    prisma.restaurant.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: "DELIVERED" },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { restaurant: true, user: true },
    }),
  ]);

  const revenue = revenueResult._sum.totalAmount?.toNumber() ?? 0;

  const stats: StatItem[] = [
    {
      labelKey: "statTotalOrders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      labelKey: "statPendingOrders",
      value: pendingOrders,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-100",
    },
    {
      labelKey: "statDeliveredOrders",
      value: deliveredOrders,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
    },
    {
      labelKey: "statCancelled",
      value: cancelledOrders,
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-100",
    },
    {
      labelKey: "restaurants",
      value: totalRestaurants,
      icon: Store,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      labelKey: "statCustomers",
      value: totalCustomers,
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
    {
      labelKey: "statRevenue",
      value: formatPrice(revenue),
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
      wide: true,
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          <T k="dashboard" />
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          <T k="dashboardSubtitle" />
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ labelKey, value, icon: Icon, color, bg, border, wide }) => (
          <div
            key={labelKey}
            className={`rounded-2xl bg-white border ${border} shadow-sm p-5 flex items-center gap-4 ${
              wide ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <div
              className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${bg}`}
            >
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">
                <T k={labelKey} />
              </p>
              <p className={`text-xl font-bold ${color}`}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-900">
            <T k="recentOrders" />
          </h2>
          <Link
            href="/admin/orders"
            className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1"
          >
            <T k="viewAll" /> <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">
            <T k="noOrdersAdmin" />
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs text-gray-400 font-medium pb-3 pr-4">
                    <T k="colOrder" />
                  </th>
                  <th className="text-left text-xs text-gray-400 font-medium pb-3 pr-4">
                    <T k="colCustomer" />
                  </th>
                  <th className="text-left text-xs text-gray-400 font-medium pb-3 pr-4">
                    <T k="colRestaurant" />
                  </th>
                  <th className="text-left text-xs text-gray-400 font-medium pb-3 pr-4">
                    <T k="colStatus" />
                  </th>
                  <th className="text-right text-xs text-gray-400 font-medium pb-3 pr-4">
                    <T k="colTotal" />
                  </th>
                  <th className="text-left text-xs text-gray-400 font-medium pb-3">
                    <T k="colDate" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="group">
                    <td className="py-3 pr-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-mono text-xs text-gray-600 group-hover:text-orange-500 transition-colors"
                      >
                        #{order.id.slice(-8).toUpperCase()}
                      </Link>
                    </td>
                    <td className="py-3 pr-4">
                      <p className="text-gray-800 font-medium truncate max-w-[140px]">
                        {order.user.name ?? "—"}
                      </p>
                      <p className="text-xs text-gray-400 truncate max-w-[140px]">
                        {order.user.email}
                      </p>
                    </td>
                    <td className="py-3 pr-4 text-gray-700 truncate max-w-[120px]">
                      {order.restaurant.name}
                    </td>
                    <td className="py-3 pr-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="py-3 pr-4 text-right font-semibold text-orange-500">
                      {formatPrice(order.totalAmount.toNumber())}
                    </td>
                    <td className="py-3 text-xs text-gray-400">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
