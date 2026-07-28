import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-full items-center justify-center bg-stone-100 px-4">
      <form
        action={login}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md"
      >
        <h1 className="mb-1 text-xl font-bold text-stone-900">Admin Girişi</h1>
        <p className="mb-6 text-sm text-stone-500">
          Lavazza menü yönetim paneli
        </p>

        {error && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <label className="mb-1 block text-sm font-medium text-stone-700">
          Şifre
        </label>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="mb-6 w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-600"
        />

        <button
          type="submit"
          className="w-full rounded-md bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-800"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
