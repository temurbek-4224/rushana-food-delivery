"use client";

import { useLanguage } from "@/context/LanguageContext";
import MenuItemCard from "./MenuItemCard";

type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number | string;
  imageUrl: string | null;
  isAvailable: boolean;
};

type Category = {
  id: string;
  name: string;
  menuItems: MenuItem[];
};

type Props = {
  category: Category;
};

export default function CategorySection({ category }: Props) {
  const { t } = useLanguage();

  if (category.menuItems.length === 0) return null;

  return (
    <div id={`category-${category.id}`} className="scroll-mt-20">
      {/* Category header */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-bold text-gray-800">{category.name}</h2>
        <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-600">
          {category.menuItems.length} {t("itemsUnit")}
        </span>
      </div>

      {/* Menu items grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.menuItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
