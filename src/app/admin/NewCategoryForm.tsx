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
        className="rounded-md bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-800"
      >
        + Yeni Kategori Ekle
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex flex-wrap items-center gap-2 rounded-lg border border-stone-300 bg-white p-3"
    >
      <input
        name="name"
        required
        placeholder="Kategori adı (örn: Tatlılar)"
        className="flex-1 rounded-md border border-stone-300 px-3 py-1.5 text-sm outline-none focus:border-amber-600"
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-800 disabled:opacity-60"
      >
        {isPending ? "Ekleniyor..." : "Ekle"}
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="rounded-md border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-100"
      >
        İptal
      </button>
    </form>
  );
}
