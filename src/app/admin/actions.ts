"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

interface SizeInput {
  label: string;
  price: number;
}

function refresh() {
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function createCategory(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const supabase = await createClient();
  const { data: last } = await supabase
    .from("categories")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextOrder = (last?.sort_order ?? 0) + 1;
  await supabase.from("categories").insert({ name, sort_order: nextOrder });
  refresh();
}

export async function renameCategory(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!id || !name) return;

  const supabase = await createClient();
  await supabase.from("categories").update({ name }).eq("id", id);
  refresh();
}

export async function deleteCategory(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("categories").delete().eq("id", id);
  refresh();
}

export async function saveItem(formData: FormData) {
  const itemId = String(formData.get("itemId") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const sizesRaw = String(formData.get("sizes") ?? "[]");

  let sizes: SizeInput[] = [];
  try {
    sizes = JSON.parse(sizesRaw);
  } catch {
    sizes = [];
  }
  sizes = sizes
    .map((s) => ({ label: String(s.label ?? "").trim(), price: Number(s.price) }))
    .filter((s) => s.label && Number.isFinite(s.price) && s.price >= 0);

  if (!name || !categoryId || sizes.length === 0) return;

  const supabase = await createClient();
  let finalItemId = itemId;

  if (itemId) {
    await supabase.from("menu_items").update({ name }).eq("id", itemId);
    await supabase.from("menu_item_sizes").delete().eq("item_id", itemId);
  } else {
    const { data: last } = await supabase
      .from("menu_items")
      .select("sort_order")
      .eq("category_id", categoryId)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextOrder = (last?.sort_order ?? 0) + 1;
    const { data: inserted, error } = await supabase
      .from("menu_items")
      .insert({ category_id: categoryId, name, sort_order: nextOrder })
      .select("id")
      .single();

    if (error || !inserted) return;
    finalItemId = inserted.id;
  }

  const rows = sizes.map((s, index) => ({
    item_id: finalItemId,
    label: s.label,
    price: s.price,
    sort_order: index + 1,
  }));
  await supabase.from("menu_item_sizes").insert(rows);

  refresh();
}

export async function deleteItem(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("menu_items").delete().eq("id", id);
  refresh();
}
