export interface MenuItemSize {
  id: string;
  label: string;
  price: number;
  sort_order: number;
}

export interface MenuItem {
  id: string;
  name: string;
  image_url: string | null;
  sort_order: number;
  menu_item_sizes: MenuItemSize[];
}

export interface MenuCategory {
  id: string;
  name: string;
  sort_order: number;
  menu_items: MenuItem[];
}
