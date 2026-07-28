import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-b from-blue-800 via-blue-900 to-slate-950 px-4">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-2xl shadow-md">
            ☕
          </div>
          <h1 className="text-xl font-bold text-blue-950">Admin Girişi</h1>
          <p className="mt-1 text-sm text-blue-400">
            Lavazza menü yönetim paneli
          </p>
        </div>

        {error && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <label className="mb-1 block text-sm font-medium text-blue-900">
          Şifre
        </label>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="mb-6 w-full rounded-lg border border-blue-200 px-3 py-2 text-sm outline-none transition-colors focus:border-blue-600"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-bold text-blue-950 transition-colors hover:bg-yellow-300"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
