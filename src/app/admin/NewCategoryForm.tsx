"use client";

import { useRef, useState, useTransition } from "react";
import { createCategory } from "./actions";

export function NewCategoryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await createCategory(formData);
      formRef.current?.reset();
      setOpen(false);
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-blue-950 hover:bg-yellow-300"
      >
        + Yeni Kategori Ekle
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex flex-wrap items-center gap-2 rounded-xl border border-blue-200 bg-white p-3 shadow-sm"
    >
      <input
        name="name"
        required
        placeholder="Kategori adı (örn: Tatlılar)"
        className="flex-1 rounded-lg border border-blue-200 px-3 py-1.5 text-sm outline-none focus:border-blue-600"
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
      >
        {isPending ? "Ekleniyor..." : "Ekle"}
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50"
      >
        İptal
      </button>
    </form>
  );
}
