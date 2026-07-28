// Lavazza kahve menüsü - başlangıç verisi
// Not: İleride bu veriler Supabase veritabanından çekilecek (admin panelden yönetilecek).
// Şimdilik statik veri olarak tutuluyor.

export interface MenuItemSize {
  label: string; // örn: "S", "M", "L" veya "Standart"
  price: number; // TL
}

export interface MenuItem {
  id: string;
  name: string;
  sizes: MenuItemSize[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

function single(price: number): MenuItemSize[] {
  return [{ label: "Standart", price }];
}

function sml(s: number, m: number, l: number): MenuItemSize[] {
  return [
    { label: "S", price: s },
    { label: "M", price: m },
    { label: "L", price: l },
  ];
}

function ml(m: number, l: number): MenuItemSize[] {
  return [
    { label: "M", price: m },
    { label: "L", price: l },
  ];
}

export const menu: MenuCategory[] = [
  {
    id: "espresso-coffees",
    name: "Espresso Coffee's",
    items: [
      { id: "espresso", name: "Espresso", sizes: single(120) },
      { id: "espresso-macchiato", name: "Espresso Macchiato", sizes: single(140) },
      { id: "espresso-conpana", name: "Espresso Conpana", sizes: single(150) },
      { id: "cortado", name: "Cortado", sizes: single(150) },
      { id: "lungo", name: "Lungo", sizes: single(150) },
      { id: "americano", name: "Americano", sizes: sml(130, 150, 170) },
      { id: "long-black", name: "Long Black", sizes: sml(130, 150, 170) },
      { id: "caffe-latte", name: "Caffe Latte", sizes: sml(150, 170, 190) },
      { id: "cappuccino", name: "Cappuccino", sizes: sml(150, 170, 190) },
      { id: "flat-white", name: "Flat White", sizes: sml(150, 170, 190) },
    ],
  },
  {
    id: "sicak-icecekler",
    name: "Sıcak İçecekler",
    items: [
      { id: "sicak-cikolata", name: "Sıcak Çikolata", sizes: sml(170, 180, 190) },
      { id: "beyaz-cikolata", name: "Beyaz Çikolata", sizes: sml(170, 180, 190) },
      { id: "chai-tea-latte", name: "Chai Tea Latte", sizes: sml(170, 180, 190) },
      { id: "turk-kahvesi", name: "Türk Kahvesi", sizes: single(100) },
      { id: "cay", name: "Çay", sizes: single(140) },
    ],
  },
  {
    id: "cold-bar",
    name: "Cold Bar",
    items: [
      { id: "summer-lime", name: "Summer Lime", sizes: single(230) },
      { id: "hibiscus-brezze", name: "Hibiscus Brezze", sizes: single(230) },
      { id: "orange-mango", name: "Orange Mango", sizes: single(230) },
      { id: "pink-pattaya", name: "Pink Pattaya", sizes: single(230) },
      { id: "cucumber-lime", name: "Cucumber Lime", sizes: single(230) },
    ],
  },
  {
    id: "brew-coffee",
    name: "Brew Coffee",
    items: [
      { id: "filtre-kahve", name: "Filtre Kahve", sizes: sml(130, 150, 170) },
      { id: "v60-demleme", name: "V60 Demleme", sizes: sml(130, 150, 170) },
      { id: "chemex", name: "Chemex", sizes: sml(130, 150, 170) },
    ],
  },
  {
    id: "cold-coffees",
    name: "Cold Coffee's",
    items: [
      { id: "cold-brew", name: "Cold Brew", sizes: ml(190, 200) },
      { id: "iced-americano", name: "Iced Americano", sizes: ml(170, 190) },
      { id: "iced-latte", name: "Iced Latte", sizes: ml(170, 190) },
      { id: "iced-caramel-latte", name: "Iced Caramel Latte", sizes: ml(200, 220) },
      { id: "iced-vanilla-latte", name: "Iced Vanilla Latte", sizes: ml(200, 220) },
      { id: "iced-salded-caramel-latte", name: "Iced Salded Caramel Latte", sizes: ml(200, 220) },
      { id: "iced-cookie-latte", name: "Iced Cookie Latte", sizes: ml(200, 220) },
      { id: "iced-pumpkin-spice-latte", name: "Iced Pumpkin Spice Latte", sizes: ml(200, 220) },
      { id: "iced-toffe-nut-latte", name: "Iced Toffe Nut Latte", sizes: ml(200, 220) },
      { id: "iced-spanish-latte", name: "Iced Spanish Latte", sizes: ml(200, 220) },
      { id: "iced-mocha", name: "Iced Mocha", sizes: ml(210, 230) },
      { id: "iced-white-mocha", name: "Iced White Mocha", sizes: ml(210, 230) },
      { id: "iced-golden-mocha", name: "Iced Golden Mocha", sizes: ml(210, 230) },
    ],
  },
  {
    id: "frozens",
    name: "Frozen's",
    items: [
      { id: "strawberry-frozen", name: "Strawberry Frozen", sizes: single(230) },
      { id: "mango-frozen", name: "Mango Frozen", sizes: single(230) },
      { id: "black-mulbery-frozen", name: "Black Mulbery Frozen", sizes: single(230) },
      { id: "red-bery-frozen", name: "Red Bery Frozen", sizes: single(230) },
      { id: "lemon-fruit", name: "Lemon Fruit", sizes: single(230) },
      { id: "pashion-fruit", name: "Pashion Fruit", sizes: single(230) },
    ],
  },
  {
    id: "hot-matcha-bar",
    name: "Hot Matcha Bar",
    items: [
      { id: "matcha-latte", name: "Matcha Latte", sizes: single(250) },
      { id: "vanilla-matcha-latte", name: "Vanilla Matcha Latte", sizes: single(250) },
      { id: "mango-matcha-latte", name: "Mango Matcha Latte", sizes: single(250) },
    ],
  },
  {
    id: "special-coffees",
    name: "Special Coffee's",
    items: [
      { id: "vanillia-latte", name: "Vanillia Latte", sizes: sml(180, 200, 220) },
      { id: "caramel-latte", name: "Caramel Latte", sizes: sml(180, 200, 220) },
      { id: "findik-latte", name: "Fındık Latte", sizes: sml(180, 200, 220) },
      { id: "salted-caramel-latte", name: "Salted Caramel Latte", sizes: sml(180, 200, 220) },
      { id: "toffe-nut-latte", name: "Toffe Nut Latte", sizes: sml(180, 200, 220) },
      { id: "pumpkin-spice-latte", name: "Pumpkin Spice Latte", sizes: sml(180, 200, 220) },
      { id: "cookie-latte", name: "Cookie Latte", sizes: sml(180, 200, 220) },
      { id: "lotus-latte", name: "Lotus Latte", sizes: sml(180, 200, 220) },
      { id: "pistachio-latte", name: "Pistachio Latte", sizes: sml(180, 200, 220) },
      { id: "spanish-latte", name: "Spanish Latte", sizes: sml(180, 200, 220) },
      { id: "cinnamon-vanilla-latte", name: "Cinnamon Vanilla Latte", sizes: sml(180, 200, 220) },
      { id: "honey-dry-latte", name: "Honey Dry Latte", sizes: sml(190, 210, 230) },
      { id: "mocha", name: "Mocha", sizes: sml(190, 210, 230) },
      { id: "white-mocha", name: "White Mocha", sizes: sml(190, 210, 230) },
    ],
  },
  {
    id: "milkshake",
    name: "Milkshake",
    items: [
      { id: "chocolate-milkshake", name: "Chocolate Milkshake", sizes: single(220) },
      { id: "vanillia-milkshake", name: "Vanillia Milkshake", sizes: single(220) },
      { id: "strawberry-milkshake", name: "Strawberry Milkshake", sizes: single(220) },
      { id: "oreo-milkshake", name: "Oreo Milkshake", sizes: single(220) },
      { id: "smoothies-milkshake", name: "Smoothies Milkshake", sizes: single(220) },
    ],
  },
  {
    id: "fresh-icecekler",
    name: "Fresh İçeçekler",
    items: [
      { id: "soda", name: "Soda", sizes: single(45) },
      { id: "meyveli-soda", name: "Meyveli Soda", sizes: single(65) },
      { id: "lemonade", name: "Lemonade", sizes: single(150) },
      { id: "bubble-tea", name: "Bubble Tea", sizes: single(250) },
      { id: "mojito", name: "Mojito", sizes: single(250) },
      { id: "pineaple-mojito", name: "Pineaple Mojito", sizes: single(250) },
    ],
  },
];
