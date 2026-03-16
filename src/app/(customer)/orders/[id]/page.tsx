import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import { T } from "@/components/ui/T";
import { MapPin, FileText, ArrowLeft, Store, ImageOff, Calendar } from "lucide-react";

type Props = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { id } = await params;

  const order = await prisma.order.findFirst({
    where: {
      id,
      userId: session.user.id, // ensure user owns this order
    },
    include: {
      restaurant: true,
      items: {
        include: { menuItem: true },
        orderBy: { id: "asc" },
      },
    },
  });

  if (!order) notFound();

  const total = order.totalAmount.toNumber();

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Back */}
      <Link
        href="/orders"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <T k="backToOrders" />
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            <T k="orderDetailsTitle" />
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            #{order.id.slice(-8).toUpperCase()}
          </p>
        </div>
        <OrderStatusBadge status={order.status} className="self-start sm:self-auto text-sm px-3 py-1" />
      </div>

      <div className="flex flex-col gap-4">
        {/* ── Restaurant + meta info ───────────────────────────────────── */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
              <Store className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">
                <T k="restaurantLabel" />
              </p>
              <p className="font-semibold text-gray-900">{order.restaurant.name}</p>
              <p className="text-sm text-gray-500">{order.restaurant.address}</p>
            </div>
          </div>

          <div className="border-t border-gray-50" />

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
              <Calendar className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">
                <T k="placedOn" />
              </p>
              <p className="font-medium text-gray-800">{formatDate(order.createdAt)}</p>
            </div>
          </div>

          <div className="border-t border-gray-50" />

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
              <MapPin className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">
                <T k="deliveryAddressLabel" />
              </p>
              <p className="font-medium text-gray-800">{order.address}</p>
            </div>
          </div>

          {order.notes && (
            <>
              <div className="border-t border-gray-50" />
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
                  <FileText className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">
                    <T k="notesLabel" />
                  </p>
                  <p className="font-medium text-gray-800">{order.notes}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── Ordered items ────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-900 mb-4">
            <T k="orderedItems" />{" "}
            <span className="text-gray-400 font-normal text-sm">
              ({order.items.length})
            </span>
          </h2>

          <div className="flex flex-col divide-y divide-gray-50">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                {/* Image */}
                <div className="h-14 w-14 flex-shrink-0 rounded-xl overflow-hidden bg-orange-50">
                  {item.menuItem.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.menuItem.imageUrl}
                      alt={item.menuItem.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-300">
                      <ImageOff className="h-5 w-5" />
                    </div>
                  )}
                </div>

                {/* Name + qty */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {item.menuItem.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatPrice(item.unitPrice.toString())} <T k="eachUnit" />
                  </p>
                </div>

                {/* Qty × price */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    {formatPrice(
                      item.unitPrice.toNumber() * item.quantity
                    )}
                  </p>
                  <p className="text-xs text-gray-400">×{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-gray-700">
              <T k="total" />
            </span>
            <span className="font-bold text-xl text-orange-500">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        {/* ── Actions ──────────────────────────────────────────────────── */}
        <div className="flex gap-3">
          <Link
            href={`/restaurants/${order.restaurantId}`}
            className="flex-1 rounded-xl border border-orange-200 px-4 py-3 text-center text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
          >
            <T k="orderAgain" />
          </Link>
          <Link
            href="/orders"
            className="flex-1 rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
          >
            <T k="allOrders" />
          </Link>
        </div>
      </div>
    </div>
  );
}
