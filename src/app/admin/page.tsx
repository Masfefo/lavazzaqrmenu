import { getMenuData } from "@/lib/menu-data";
import { logout } from "./login/actions";
import { CategoryBlock } from "./CategoryBlock";
import { NewCategoryForm } from "./NewCategoryForm";
import { QrCodeCard } from "./QrCodeCard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const menu = await getMenuData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return (
    <div className="min-h-full bg-stone-100">
      <header className="sticky top-0 z-20 flex items-center justify-between bg-stone-900 px-4 py-3 shadow-md">
        <div>
          <h1 className="text-base font-bold text-amber-50">Lavazza Admin</h1>
          <p className="text-xs text-stone-300">Menü yönetim paneli</p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-md bg-stone-700 px-3 py-1.5 text-xs font-medium text-stone-100 hover:bg-stone-600"
          >
            Çıkış Yap
          </button>
        </form>
      </header>

      <main className="mx-auto max-w-2xl space-y-4 px-4 py-6">
        <QrCodeCard url={siteUrl} />

        <NewCategoryForm />

        {menu.map((category) => (
          <CategoryBlock key={category.id} category={category} />
        ))}
      </main>
    </div>
  );
}
