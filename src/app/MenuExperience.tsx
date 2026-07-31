"use client";

import { useEffect, useRef, useState } from "react";
import type { MenuCategory, MenuItem } from "@/types/menu";

function formatPrice(price: number) {
  return `${price}\u20ba`;
}

function ItemThumbnail({ item, className }: { item: MenuItem; className: string }) {
  if (item.image_url) {
    return <img src={item.image_url} alt={item.name} className={className} />;
  }
  return (
    <div
      className={`${className} flex items-center justify-center bg-blue-50 text-blue-300`}
    >
      ☕
    </div>
  );
}

function ItemModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-fade-in w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-square w-full bg-blue-50">
          <ItemThumbnail item={item} className="h-full w-full object-cover" />
          <button
            onClick={onClose}
            aria-label="Kapat"
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-blue-900 shadow-md"
          >
            ×
          </button>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-blue-950">{item.name}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.menu_item_sizes.map((size) => (
              <span
                key={size.id}
                className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-900"
              >
                {item.menu_item_sizes.length > 1 && (
                  <span className="text-blue-500">{size.label}</span>
                )}
                <span className="text-yellow-600">{formatPrice(size.price)}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MenuExperience({ menu }: { menu: MenuCategory[] }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    menu[0]?.id ?? null
  );
  const headerRef = useRef<HTMLElement>(null);
  const pillRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    if (!showMenu || menu.length === 0) return;

    const headerHeight = headerRef.current?.offsetHeight ?? 0;
    const sections = menu
      .map((category) => document.getElementById(category.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveCategory(visible[0].target.id);
        }
      },
      { rootMargin: `-${headerHeight + 8}px 0px -65% 0px`, threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [showMenu, menu]);

  useEffect(() => {
    if (!activeCategory) return;
    pillRefs.current[activeCategory]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeCategory]);

  if (!showMenu) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-white px-6 py-16 text-center">
        <div className="animate-fade-in flex flex-col items-center">
          <img
            src="/lavazza-logo.png"
            alt="Lavazza"
            className="w-full max-w-sm"
          />
          <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-blue-950">
            Hoşgeldiniz
          </h1>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-blue-900/70">
            Taze demlenmiş kahveler ve lezzetli atıştırmalıklar sizi bekliyor.
          </p>
          <button
            onClick={() => setShowMenu(true)}
            className="mt-9 rounded-full bg-blue-950 px-9 py-3 text-sm font-bold tracking-wide text-white shadow-lg shadow-blue-950/20 transition-all hover:scale-105 hover:bg-blue-900 active:scale-95"
          >
            Menüyü Gör
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in flex min-h-dvh flex-col bg-white text-blue-950">
      <header ref={headerRef} className="sticky top-0 z-20 border-b border-blue-100 bg-white shadow-sm">
        <div className="mx-auto max-w-2xl px-4 pt-4 pb-3 text-center">
          <button
            onClick={() => setShowMenu(false)}
            className="inline-flex flex-col items-center"
            aria-label="Ana sayfaya dön"
          >
            <img src="/lavazza-logo.png" alt="Lavazza" className="h-20 w-72" />
            <p className="mt-1 text-xs text-blue-900/60">Kahve Menüsü</p>
          </button>
        </div>
        <nav className="no-scrollbar mx-auto max-w-2xl overflow-x-auto">
          <ul className="flex gap-2.5 whitespace-nowrap px-4 pb-4">
            {menu.map((category) => (
              <li key={category.id}>
                <a
                  ref={(el) => {
                    pillRefs.current[category.id] = el;
                  }}
                  href={`#${category.id}`}
                  className={`inline-block rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeCategory === category.id
                      ? "bg-blue-950 text-white shadow-sm"
                      : "bg-blue-50 text-blue-900 hover:bg-blue-100"
                  }`}
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
                <li key={item.id}>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex w-full items-center gap-3 py-3 text-left transition-colors hover:bg-blue-50"
                  >
                    <ItemThumbnail
                      item={item}
                      className="h-14 w-14 shrink-0 rounded-lg object-cover"
                    />
                    <span className="flex-1 text-sm font-medium text-blue-950">
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
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <footer className="border-t border-blue-100 bg-white py-6 text-center text-xs text-blue-400">
        Fiyatlara KDV dahildir.
      </footer>

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
