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
  return { id: "", name: "", order: 0n };
}

export default function CategoriesPage({ onNotify, onCountChange }: CategoriesPageProps) {
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

  useEffect(() => { void load(); }, []);

  function resetForm() { setEditingId(null); setForm(emptyForm()); setShowForm(false); }
  function handleAddNew() { setEditingId(null); setForm(emptyForm()); setShowForm(true); }

  async function handleSubmit() {
    setSaving(true);
    setError(null);
    try {
      const payload: Category = { ...form, id: editingId ?? crypto.randomUUID() };
      const res = editingId ? await updateCategory(payload) : await createCategory(payload);
      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.(editingId ? "Category updated successfully." : "Category created successfully.");
        resetForm();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(category: Category) { setEditingId(category.id); setForm({ ...category }); setShowForm(true); }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
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

  const filteredCategories = categories.filter((c) => {
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Categories</h1>
          <p className="page-subtitle">Create and manage product categories used across the CMS.</p>
        </div>
        <button onClick={handleAddNew} className="btn-primary">+ Add Category</button>
      </div>

      {error && <div className="error-box">{error}</div>}

      {/* Form */}
      {showForm && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title mb-0">{editingId ? "Edit Category" : "Add Category"}</h2>
            <button onClick={resetForm} className="btn-secondary btn-sm">Close</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Category Name</label>
              <input className="input" placeholder="e.g. Networking" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Display Order</label>
              <input type="number" className="input" placeholder="0" value={form.order.toString()} onChange={(e) => setForm({ ...form, order: BigInt(e.target.value || "0") })} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => void handleSubmit()} disabled={saving} className="btn-primary">
              {saving ? "Saving..." : editingId ? "Update Category" : "Add Category"}
            </button>
            <button onClick={resetForm} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Search + List */}
      <div className="card">
        <h2 className="section-title">Existing Categories</h2>

        <input type="search" placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="input mb-4" />

        {loading ? (
          <p className="text-sm text-slate-500">Loading categories...</p>
        ) : filteredCategories.length === 0 ? (
          <p className="text-sm text-slate-500">No categories found.</p>
        ) : (
          <div className="space-y-3">
            {filteredCategories.map((category) => (
              <div key={category.id} className="list-item">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-900">{category.name}</div>
                    <div className="text-xs text-slate-400">Order: {category.order.toString()}</div>
                    <div className="text-xs text-slate-300 font-mono break-all">ID: {category.id}</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => handleEdit(category)} className="btn-secondary btn-sm">Edit</button>
                    <button onClick={() => void handleDelete(category.id)} className="btn-danger btn-sm">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
