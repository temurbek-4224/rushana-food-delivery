"use client";

/**
 * Holds the shared `categories` state so that:
 * - CategoryManager can add/rename/delete categories
 * - MenuItemManager immediately sees updated categories in its dropdown
 * (no page reload needed)
 */

import { useState } from "react";
import CategoryManager, { type Category } from "./CategoryManager";
import MenuItemManager from "./MenuItemManager";

type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
  categoryId: string;
};

type Props = {
  restaurantId: string;
  initialCategories: Category[];
  initialItems: MenuItem[];
};

export default function RestaurantManagementClient({
  restaurantId,
  initialCategories,
  initialItems,
}: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  return (
    <div className="flex flex-col gap-6">
      <CategoryManager
        restaurantId={restaurantId}
        categories={categories}
        onCategoriesChange={setCategories}
      />
      <MenuItemManager
        restaurantId={restaurantId}
        categories={categories}
        initialItems={initialItems}
      />
    </div>
  );
}
