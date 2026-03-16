import { notFound } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import RestaurantForm from "@/components/admin/RestaurantForm";
import RestaurantManagementClient from "@/components/admin/RestaurantManagementClient";
import { T } from "@/components/ui/T";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminRestaurantDetailPage({ params }: Props) {
  await requireAdmin();

  const { id } = await params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { id },
    include: {
      categories: {
        orderBy: { createdAt: "asc" },
        include: {
          menuItems: { orderBy: { name: "asc" } },
        },
      },
    },
  });

  if (!restaurant) notFound();

  // Serialize Decimal prices before passing to client components
  const categories = restaurant.categories.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  const items = restaurant.categories.flatMap((c) =>
    c.menuItems.map((m) => ({
      id:          m.id,
      name:        m.name,
      description: m.description,
      price:       m.price.toNumber(),
      imageUrl:    m.imageUrl,
      isAvailable: m.isAvailable,
      categoryId:  m.categoryId,
    }))
  );

  return (
    <div className="p-8 max-w-4xl">
      {/* Back */}
      <Link
        href="/admin/restaurants"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <T k="backToRestaurants" />
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{restaurant.name}</h1>
        <p className="text-sm text-gray-500 mt-1">
          <T k="manageRestaurantDesc" />
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* ── Restaurant info form ─────────────────────────────────────── */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-5">
            <T k="restaurantInfo" />
          </h2>
          <RestaurantForm
            restaurant={{
              id:          restaurant.id,
              name:        restaurant.name,
              description: restaurant.description,
              address:     restaurant.address,
              phone:       restaurant.phone,
              imageUrl:    restaurant.imageUrl,
              isOpen:      restaurant.isOpen,
            }}
          />
        </div>

        {/* ── Categories + Menu Items (shared categories state) ────────── */}
        <RestaurantManagementClient
          restaurantId={restaurant.id}
          initialCategories={categories}
          initialItems={items}
        />
      </div>
    </div>
  );
}
