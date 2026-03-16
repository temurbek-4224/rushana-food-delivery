export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import { T } from "@/components/ui/T";

async function getRestaurants() {
  try {
    return await prisma.restaurant.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { categories: true } } },
    });
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const restaurants = await getRestaurants();

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            <T k="heroTitle" />
          </h1>
          <p className="text-orange-100 text-lg mb-8 max-w-md mx-auto">
            <T k="heroSubtitle" />
          </p>
          <a
            href="#restaurants"
            className="inline-block rounded-xl bg-white px-8 py-3 text-orange-600 font-semibold hover:bg-orange-50 transition-colors shadow-lg"
          >
            <T k="orderNow" />
          </a>
        </div>
      </section>

      {/* ── Restaurant List ───────────────────────────────────────────────── */}
      <section id="restaurants" className="container mx-auto px-4 py-12">

        {/* DB offline */}
        {restaurants === null && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-5xl mb-4">🔌</p>
            <p className="text-xl font-semibold text-gray-700 mb-2">
              <T k="dbOffline" />
            </p>
            <p className="text-gray-400 max-w-sm">
              <T k="dbOfflineDesc" />
            </p>
          </div>
        )}

        {/* DB connected but empty */}
        {restaurants !== null && restaurants.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-5xl mb-4">🍽️</p>
            <p className="text-xl font-semibold text-gray-600 mb-2">
              <T k="noRestaurantsYet" />
            </p>
            <p className="text-gray-400">
              <T k="noRestaurantsDesc" />
            </p>
          </div>
        )}

        {/* Restaurant grid */}
        {restaurants !== null && restaurants.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              <T k="restaurantsNearYou" />
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </>
        )}

      </section>
    </div>
  );
}
