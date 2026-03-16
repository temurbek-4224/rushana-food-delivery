import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Store, Pencil } from "lucide-react";
import DeleteRestaurantButton from "@/components/admin/DeleteRestaurantButton";
import { T } from "@/components/ui/T";

export const dynamic = "force-dynamic";

export default async function AdminRestaurantsPage() {
  await requireAdmin();

  const restaurants = await prisma.restaurant.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { categories: true, orders: true } },
    },
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            <T k="restaurants" />
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {restaurants.length} restaurant{restaurants.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/restaurants/new"
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <T k="addRestaurant" />
        </Link>
      </div>

      {/* Empty state */}
      {restaurants.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Store className="h-16 w-16 text-gray-200 mb-4" />
          <h2 className="text-lg font-semibold text-gray-600 mb-1">
            <T k="noRestaurantsYet" />
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            <T k="noRestaurantsAdminDesc" />
          </p>
          <Link
            href="/admin/restaurants/new"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <T k="addRestaurant" />
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs text-gray-500 font-semibold px-5 py-3.5">
                  <T k="restaurants" />
                </th>
                <th className="text-left text-xs text-gray-500 font-semibold px-5 py-3.5">
                  <T k="colAddress" />
                </th>
                <th className="text-left text-xs text-gray-500 font-semibold px-5 py-3.5">
                  <T k="colPhone" />
                </th>
                <th className="text-center text-xs text-gray-500 font-semibold px-5 py-3.5">
                  <T k="colCategories" />
                </th>
                <th className="text-center text-xs text-gray-500 font-semibold px-5 py-3.5">
                  <T k="colOrders" />
                </th>
                <th className="text-left text-xs text-gray-500 font-semibold px-5 py-3.5">
                  <T k="statusLabel" />
                </th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {restaurants.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/60 transition-colors">
                  {/* Name */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* Thumbnail */}
                      <div className="h-10 w-10 flex-shrink-0 rounded-xl overflow-hidden bg-orange-50 flex items-center justify-center">
                        {r.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={r.imageUrl}
                            alt={r.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Store className="h-5 w-5 text-orange-300" />
                        )}
                      </div>
                      <span className="font-semibold text-gray-900">{r.name}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-600 max-w-[200px]">
                    <p className="truncate">{r.address}</p>
                  </td>

                  <td className="px-5 py-4 text-gray-500">
                    {r.phone ?? <span className="text-gray-300">—</span>}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-700 font-medium">
                    {r._count.categories}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-700 font-medium">
                    {r._count.orders}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        r.isOpen
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {r.isOpen ? <T k="openNow" /> : <T k="closed" />}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/restaurants/${r.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:border-orange-200 hover:text-orange-600 transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <T k="editBtn" />
                      </Link>
                      <DeleteRestaurantButton
                        restaurantId={r.id}
                        restaurantName={r.name}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
