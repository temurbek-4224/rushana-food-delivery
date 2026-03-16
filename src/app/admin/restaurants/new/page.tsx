import { requireAdmin } from "@/lib/adminAuth";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RestaurantForm from "@/components/admin/RestaurantForm";
import { T } from "@/components/ui/T";

export default async function NewRestaurantPage() {
  await requireAdmin();

  return (
    <div className="p-8 max-w-3xl">
      <Link
        href="/admin/restaurants"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <T k="backToRestaurants" />
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          <T k="addRestaurant" />
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          <T k="addRestaurantDesc" />
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
        <RestaurantForm />
      </div>
    </div>
  );
}
