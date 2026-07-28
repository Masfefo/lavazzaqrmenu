"use client";

import { useState, useTransition } from "react";
import { saveItem, deleteItem, renameCategory, deleteCategory } from "./actions";
import type { MenuItem } from "@/types/menu";

interface SizeRow {
  label: string;
  price: string;
}

function ItemForm({
  categoryId,
  item,
  onDone,
}: {
  categoryId: string;
  item?: MenuItem;
  onDone: () => void;
}) {
  const [name, setName] = useState(item?.name ?? "");
  const [sizes, setSizes] = useState<SizeRow[]>(
    item && item.menu_item_sizes.length > 0
      ? item.menu_item_sizes.map((s) => ({ label: s.label, price: String(s.price) }))
      : [{ label: "Standart", price: "" }]
  );
  const [isPending, startTransition] = useTransition();

  function updateSize(index: number, field: "label" | "price", value: string) {
    setSizes((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function addSizeRow() {
    setSizes((prev) => [...prev, { label: "", price: "" }]);
  }

  function removeSizeRow(index: number) {
    setSizes((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(formData: FormData) {
    formData.set(
      "sizes",
      JSON.stringify(sizes.map((s) => ({ label: s.label, price: Number(s.price) })))
    );
    startTransition(async () => {
      await saveItem(formData);
      onDone();
    });
  }

  return (
    <form
      action={handleSubmit}
      className="mt-2 space-y-3 rounded-lg border border-blue-200 bg-blue-50/60 p-3"
    >
      <input type="hidden" name="categoryId" value={categoryId} />
      <input type="hidden" name="itemId" value={item?.id ?? ""} />

      <div>
        <label className="mb-1 block text-xs font-medium text-blue-700">
          Ürün adı
        </label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-md border border-blue-200 px-2 py-1.5 text-sm outline-none focus:border-blue-600"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-blue-700">
          Boyutlar / Fiyatlar
        </label>
        <div className="space-y-2">
          {sizes.map((size, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                placeholder="Etiket (Standart / S / M / L)"
                value={size.label}
                onChange={(e) => updateSize(index, "label", e.target.value)}
                required
                className="w-1/2 rounded-md border border-blue-200 px-2 py-1.5 text-sm outline-none focus:border-blue-600"
              />
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Fiyat"
                value={size.price}
                onChange={(e) => updateSize(index, "price", e.target.value)}
                required
                className="w-1/3 rounded-md border border-blue-200 px-2 py-1.5 text-sm outline-none focus:border-blue-600"
              />
              {sizes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSizeRow(index)}
                  className="text-xs font-medium text-red-600 hover:underline"
                >
                  Sil
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addSizeRow}
          className="mt-2 text-xs font-medium text-blue-700 hover:underline"
        >
          + Boyut ekle
        </button>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-bold text-blue-950 hover:bg-yellow-300 disabled:opacity-60"
        >
          {isPending ? "Kaydediliyor..." : "Kaydet"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-md border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50"
        >
          İptal
        </button>
      </div>
    </form>
  );
}

export function CategoryBlock({ category }: { category: import("@/types/menu").MenuCategory }) {
  const [addingItem, setAddingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);
  const [isPending, startTransition] = useTransition();

  function handleDeleteItem(id: string) {
    if (!confirm("Bu ürünü silmek istediğine emin misin?")) return;
    const formData = new FormData();
    formData.set("id", id);
    startTransition(async () => {
      await deleteItem(formData);
    });
  }

  function handleRenameCategory() {
    const formData = new FormData();
    formData.set("id", category.id);
    formData.set("name", categoryName);
    startTransition(async () => {
      await renameCategory(formData);
      setEditingCategoryName(false);
    });
  }

  function handleDeleteCategory() {
    if (
      !confirm(
        `"${category.name}" kategorisini ve içindeki TÜM ürünleri silmek istediğine emin misin?`
      )
    )
      return;
    const formData = new FormData();
    formData.set("id", category.id);
    startTransition(async () => {
      await deleteCategory(formData);
    });
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-blue-100">
      <div className="mb-3 flex items-center justify-between gap-2">
        {editingCategoryName ? (
          <div className="flex flex-1 items-center gap-2">
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="flex-1 rounded-md border border-blue-200 px-2 py-1 text-sm outline-none focus:border-blue-600"
            />
            <button
              onClick={handleRenameCategory}
              disabled={isPending}
              className="text-xs font-semibold text-blue-700 hover:underline"
            >
              Kaydet
            </button>
            <button
              onClick={() => {
                setCategoryName(category.name);
                setEditingCategoryName(false);
              }}
              className="text-xs font-medium text-blue-400 hover:underline"
            >
              İptal
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-base font-bold text-blue-950">{category.name}</h2>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => setEditingCategoryName(true)}
                className="text-xs font-medium text-blue-700 hover:underline"
              >
                Adını Değiştir
              </button>
              <button
                onClick={handleDeleteCategory}
                disabled={isPending}
                className="text-xs font-medium text-red-600 hover:underline disabled:opacity-60"
              >
                Kategoriyi Sil
              </button>
            </div>
          </>
        )}
      </div>

      <ul className="divide-y divide-blue-100">
        {category.menu_items.map((item) => (
          <li key={item.id} className="py-2">
            {editingItemId === item.id ? (
              <ItemForm
                categoryId={category.id}
                item={item}
                onDone={() => setEditingItemId(null)}
              />
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-blue-950">{item.name}</p>
                  <p className="text-xs text-blue-400">
                    {item.menu_item_sizes
                      .map((s) => `${s.label}: ${s.price}\u20ba`)
                      .join(" · ")}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => setEditingItemId(item.id)}
                    className="text-xs font-medium text-blue-700 hover:underline"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    disabled={isPending}
                    className="text-xs font-medium text-red-600 hover:underline disabled:opacity-60"
                  >
                    Sil
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {addingItem ? (
        <ItemForm categoryId={category.id} onDone={() => setAddingItem(false)} />
      ) : (
        <button
          onClick={() => setAddingItem(true)}
          className="mt-3 text-xs font-semibold text-blue-700 hover:underline"
        >
          + Yeni Ürün Ekle
        </button>
      )}
    </div>
  );
}
