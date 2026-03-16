import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CategorySection from "@/components/menu/CategorySection";
import { MapPin, Phone, Clock } from "lucide-react";
import { T } from "@/components/ui/T";

type Props = {
  params: Promise<{ id: string }>;
};

async function getRestaurantMenu(id: string) {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: {
        categories: {
          orderBy: { createdAt: "asc" },
          include: {
            menuItems: {
              orderBy: { createdAt: "asc" },
            },
          },
        },
      },
    });

    if (!restaurant) return null;

    // Serialize Prisma Decimal → number so plain components receive a safe type
    return {
      ...restaurant,
      categories: restaurant.categories.map((cat) => ({
        ...cat,
        menuItems: cat.menuItems.map((item) => ({
          ...item,
          price: item.price.toNumber(),
        })),
      })),
    };
  } catch {
    return null;
  }
}

export default async function RestaurantMenuPage({ params }: Props) {
  const { id } = await params;
  const restaurant = await getRestaurantMenu(id);

  if (!restaurant) notFound();

  const totalItems = restaurant.categories.reduce(
    (sum, cat) => sum + cat.menuItems.length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <div className="relative h-56 sm:h-72 bg-orange-100 overflow-hidden">
        {restaurant.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-7xl">🍴</div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Restaurant title over image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
          <div className="container mx-auto flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {restaurant.name}
              </h1>
              {restaurant.description && (
                <p className="mt-1 text-sm text-white/80 max-w-xl line-clamp-2">
                  {restaurant.description}
                </p>
              )}
            </div>
            <span
              className={`flex-shrink-0 rounded-full px-3 py-1 text-sm font-semibold shadow ${
                restaurant.isOpen
                  ? "bg-green-500 text-white"
                  : "bg-gray-400 text-white"
              }`}
            >
              {restaurant.isOpen ? <T k="openNow" /> : <T k="closed" />}
            </span>
          </div>
        </div>
      </div>

      {/* ── Info bar ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-orange-400 flex-shrink-0" />
            {restaurant.address}
          </span>
          {restaurant.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-orange-400 flex-shrink-0" />
              {restaurant.phone}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-orange-400 flex-shrink-0" />
            {restaurant.categories.length} <T k="categoriesUnit" /> · {totalItems} <T k="itemsUnit" />
          </span>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Category sidebar / quick nav */}
        {restaurant.categories.length > 1 && (
          <aside className="lg:w-52 flex-shrink-0">
            <div className="sticky top-20 rounded-xl bg-white border border-gray-100 shadow-sm p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                <T k="menuSidebarTitle" />
              </p>
              <nav className="flex flex-col gap-1">
                {restaurant.categories.map((cat) => (
                  <a
                    key={cat.id}
                    href={`#category-${cat.id}`}
                    className="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    {cat.name}
                    <span className="ml-1 text-xs text-gray-400">
                      ({cat.menuItems.length})
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Menu sections */}
        <div className="flex-1 flex flex-col gap-10">
          {restaurant.categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-5xl mb-4">🍽️</p>
              <p className="text-xl font-semibold text-gray-600 mb-1">
                <T k="noMenuYet" />
              </p>
              <p className="text-gray-400 text-sm">
                <T k="noMenuDesc" />
              </p>
            </div>
          ) : (
            restaurant.categories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
