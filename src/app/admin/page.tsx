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
    <div className="min-h-full bg-blue-50">
      <header className="sticky top-0 z-20 flex items-center justify-between bg-blue-900 px-4 py-3 shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-lg">
            ☕
          </div>
          <div>
            <h1 className="text-base font-bold text-white">Lavazza Admin</h1>
            <p className="text-xs text-blue-200">Menü yönetim paneli</p>
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-md bg-blue-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600"
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
