"use client";

import { useState } from "react";
import type { MenuCategory } from "@/types/menu";

function formatPrice(price: number) {
  return `${price}\u20ba`;
}

export function MenuExperience({ menu }: { menu: MenuCategory[] }) {
  const [showMenu, setShowMenu] = useState(false);

  if (!showMenu) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center bg-gradient-to-b from-blue-800 via-blue-900 to-slate-950 px-6 py-16 text-center">
        <div className="animate-fade-in flex flex-col items-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 text-4xl shadow-lg shadow-blue-950/40">
            ☕
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Lavazza&apos;ya Hoşgeldiniz
          </h1>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-blue-100">
            Taze demlenmiş kahveler ve lezzetli atıştırmalıklar sizi bekliyor.
          </p>
          <button
            onClick={() => setShowMenu(true)}
            className="mt-9 rounded-full bg-yellow-400 px-9 py-3 text-sm font-bold tracking-wide text-blue-950 shadow-lg shadow-yellow-500/20 transition-all hover:scale-105 hover:bg-yellow-300 active:scale-95"
          >
            Menüyü Gör
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in flex min-h-full flex-col bg-white text-blue-950">
      <header className="sticky top-0 z-20 bg-blue-900 shadow-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 pt-4">
          <button
            onClick={() => setShowMenu(false)}
            className="text-left"
            aria-label="Ana sayfaya dön"
          >
            <h1 className="text-xl font-bold tracking-wide text-white">Lavazza</h1>
            <p className="pb-3 text-xs text-blue-200">Kahve Menüsü</p>
          </button>
        </div>
        <nav className="no-scrollbar mx-auto max-w-2xl overflow-x-auto">
          <ul className="flex gap-2 whitespace-nowrap px-4 pb-3">
            {menu.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="inline-block rounded-full bg-blue-700/70 px-3 py-1.5 text-xs font-medium text-blue-50 transition-colors hover:bg-yellow-400 hover:text-blue-950"
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-16">
        {menu.length === 0 && (
          <p className="pt-10 text-center text-sm text-blue-400">
            Menü şu anda hazırlanıyor, lütfen daha sonra tekrar deneyin.
          </p>
        )}
        {menu.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-28 pt-6">
            <h2 className="mb-3 inline-block border-b-2 border-yellow-400 pb-1 text-lg font-bold text-blue-900">
              {category.name}
            </h2>
            <ul className="divide-y divide-blue-100">
              {category.menu_items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <span className="text-sm font-medium text-blue-950">
                    {item.name}
                  </span>
                  {item.menu_item_sizes.length === 1 ? (
                    <span className="whitespace-nowrap text-sm font-semibold text-blue-700">
                      {formatPrice(item.menu_item_sizes[0].price)}
                    </span>
                  ) : (
                    <div className="flex gap-1.5">
                      {item.menu_item_sizes.map((size) => (
                        <span
                          key={size.id}
                          className="flex flex-col items-center rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-[11px] leading-tight text-blue-800"
                        >
                          <span className="font-semibold">{size.label}</span>
                          <span className="whitespace-nowrap">
                            {formatPrice(size.price)}
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <footer className="border-t border-blue-100 bg-white py-6 text-center text-xs text-blue-400">
        Fiyatlara KDV dahildir.
      </footer>
    </div>
  );
}
