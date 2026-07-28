import { getMenuData } from "@/lib/menu-data";

export const dynamic = "force-dynamic";

function formatPrice(price: number) {
  return `${price}\u20ba`;
}

export default async function Home() {
  const menu = await getMenuData();

  return (
    <div className="flex min-h-full flex-col bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-20 bg-stone-900 shadow-md">
        <div className="mx-auto max-w-2xl px-4 pt-4 text-center">
          <h1 className="text-xl font-bold tracking-wide text-amber-50">
            Lavazza
          </h1>
          <p className="pb-3 text-xs text-stone-300">Kahve Menüsü</p>
        </div>
        <nav className="no-scrollbar mx-auto max-w-2xl overflow-x-auto">
          <ul className="flex gap-2 whitespace-nowrap px-4 pb-3">
            {menu.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="inline-block rounded-full bg-stone-700/60 px-3 py-1.5 text-xs font-medium text-stone-100 transition-colors hover:bg-amber-600"
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
          <p className="pt-10 text-center text-sm text-stone-500">
            Menü şu anda hazırlanıyor, lütfen daha sonra tekrar deneyin.
          </p>
        )}
        {menu.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-28 pt-6">
            <h2 className="mb-3 border-b border-amber-200 pb-1 text-lg font-bold text-amber-800">
              {category.name}
            </h2>
            <ul className="divide-y divide-stone-200">
              {category.menu_items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <span className="text-sm font-medium text-stone-800">
                    {item.name}
                  </span>
                  {item.menu_item_sizes.length === 1 ? (
                    <span className="whitespace-nowrap text-sm font-semibold text-amber-700">
                      {formatPrice(item.menu_item_sizes[0].price)}
                    </span>
                  ) : (
                    <div className="flex gap-1.5">
                      {item.menu_item_sizes.map((size) => (
                        <span
                          key={size.id}
                          className="flex flex-col items-center rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] leading-tight text-amber-800"
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

      <footer className="border-t border-stone-200 bg-stone-100 py-6 text-center text-xs text-stone-500">
        Fiyatlara KDV dahildir.
      </footer>
    </div>
  );
}
