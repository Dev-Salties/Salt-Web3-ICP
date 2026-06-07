import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type Category,
} from "../lib/categories";

type CategoriesPageProps = {
  onNotify?: (message: string) => void;
  onCountChange?: (count: number) => void;
};

function emptyForm(): Category {
  return {
    id: "",
    name: "",
    order: 0n,
  };
}

export default function CategoriesPage({
  onNotify,
  onCountChange,
}: CategoriesPageProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Category>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const data = await getCategories();
      setCategories(data);
      onCountChange?.(data.length);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm());
    setShowForm(false);
  }

  function handleAddNew() {
    setEditingId(null);
    setForm(emptyForm());
    setShowForm(true);
  }

  async function handleSubmit() {
    setSaving(true);
    setError(null);

    try {
      const payload: Category = {
        ...form,
        id: editingId ?? crypto.randomUUID(),
      };

      const res = editingId
        ? await updateCategory(payload)
        : await createCategory(payload);

      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.(
          editingId
            ? "Category updated successfully."
            : "Category created successfully."
        );
        resetForm();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(category: Category) {
    setEditingId(category.id);
    setForm({ ...category });
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    const ok = window.confirm("Are you sure you want to delete this category?");
    if (!ok) return;

    try {
      const res = await deleteCategory(id);

      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.("Category deleted successfully.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete category");
    }
  }

  const filteredCategories = categories.filter((category) => {
    const q = search.toLowerCase();
    return (
      category.name.toLowerCase().includes(q) ||
      category.id.toLowerCase().includes(q) ||
      category.order.toString().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-sm text-slate-500">
            Create and manage product categories used across the CMS.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="rounded-lg bg-[#0064A8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0075C4]"
        >
          Add Category
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {showForm && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit Category" : "Add Category"}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Category Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="number"
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Display Order"
              value={form.order.toString()}
              onChange={(e) =>
                setForm({
                  ...form,
                  order: BigInt(e.target.value || "0"),
                })
              }
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => void handleSubmit()}
              disabled={saving}
              className="rounded-lg bg-[#0064A8] px-4 py-2 text-white disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Category"
                : "Add Category"}
            </button>

            <button
              onClick={resetForm}
              className="rounded-lg border border-slate-300 px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Existing Categories</h2>

        <div className="mb-4">
          <input
            type="search"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        {loading ? (
          <div className="text-sm text-slate-500">Loading categories...</div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-sm text-slate-500">No categories found.</div>
        ) : (
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {category.name}
                    </div>
                    <div className="mt-1 text-xs text-slate-600">
                      Order: {category.order.toString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="rounded-md border border-slate-300 px-3 py-1 text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => void handleDelete(category.id)}
                      className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-400 font-mono break-all">
                  ID: {category.id}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}