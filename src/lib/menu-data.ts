import { createClient } from "@/lib/supabase/server";
import type { MenuCategory } from "@/types/menu";

export async function getMenuData(): Promise<MenuCategory[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(
      "id, name, sort_order, menu_items(id, name, sort_order, menu_item_sizes(id, label, price, sort_order))"
    )
    .order("sort_order");

  if (error || !data) {
    console.error("Menü verisi alınamadı:", error);
    return [];
  }

  const categories = data as unknown as MenuCategory[];

  return categories
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((category) => ({
      ...category,
      menu_items: category.menu_items
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((item) => ({
          ...item,
          menu_item_sizes: item.menu_item_sizes
            .slice()
            .sort((a, b) => a.sort_order - b.sort_order),
        })),
    }));
}
