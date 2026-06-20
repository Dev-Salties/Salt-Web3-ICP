import { useEffect, useState } from "react";
import { getCategories, type Category } from "../lib/categories";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type Product,
} from "../lib/products";

function emptyForm(): Product {
  return {
    id: "",
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",
    enquiryUrl: "",
    active: true,
    createdAt: 0n,
    updatedAt: 0n,
  };
}

type ProductsPageProps = {
  onNotify?: (message: string) => void;
  onCountChange?: (count: number) => void;
};

export default function ProductsPage({ onNotify, onCountChange }: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Product>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      onCountChange?.(productsData.length);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  function resetForm() { setEditingId(null); setForm(emptyForm()); }
  function openCreateForm() { resetForm(); setIsFormOpen(true); }
  function closeForm() { resetForm(); setIsFormOpen(false); }

  async function handleSubmit() {
    setSaving(true);
    setError(null);
    try {
      if (!form.category.trim()) { setError("Please select a category."); return; }
      const now = BigInt(Date.now()) * 1_000_000n;
      const payload: Product = {
        ...form,
        id: editingId ?? crypto.randomUUID(),
        createdAt: editingId ? form.createdAt : now,
        updatedAt: now,
      };
      const res = editingId ? await updateProduct(payload) : await createProduct(payload);
      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.(editingId ? "Product updated successfully." : "Product added successfully.");
        closeForm();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(product: Product) { setEditingId(product.id); setForm({ ...product }); setIsFormOpen(true); }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await deleteProduct(id);
      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.("Product deleted successfully.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete product");
    }
  }

  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.price.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">Create and manage products that will appear on the public website.</p>
        </div>
        <button onClick={openCreateForm} className="btn-primary">+ Add Product</button>
      </div>

      {error && <div className="error-box">{error}</div>}

      {/* Form */}
      {isFormOpen && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title mb-0">{editingId ? "Edit Product" : "Add Product"}</h2>
            <button onClick={closeForm} className="btn-secondary btn-sm">Close</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Product Name</label>
              <input className="input" placeholder="e.g. Microsoft 365 Business" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Price</label>
              <input className="input" placeholder="e.g. N$38.00" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Image URL</label>
              <input className="input" placeholder="https://..." value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Category</label>
              <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-600">Enquiry URL (optional)</label>
              <input className="input" placeholder="https://..." value={form.enquiryUrl} onChange={(e) => setForm({ ...form, enquiryUrl: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-600">Description</label>
              <textarea className="input min-h-[140px]" placeholder="Product description..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" className="accent-[#0064A8]" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
              Active
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => void handleSubmit()} disabled={saving} className="btn-primary">
              {saving ? "Saving..." : editingId ? "Update Product" : "Add Product"}
            </button>
            <button onClick={closeForm} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Search */}
      <input type="search" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="input" />

      {/* List */}
      <div className="card">
        <h2 className="section-title">Existing Products</h2>
        {loading ? (
          <p className="text-sm text-slate-500">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-sm text-slate-500">No products found.</p>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="list-item">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-900">{product.name}</div>
                    <div className="text-sm text-slate-500">{product.category}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-600">{product.price}</span>
                      <span className={product.active ? "badge-active" : "badge-inactive"}>
                        {product.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => handleEdit(product)} className="btn-secondary btn-sm">Edit</button>
                    <button onClick={() => void handleDelete(product.id)} className="btn-danger btn-sm">Delete</button>
                  </div>
                </div>
                {product.description && <p className="mt-2 text-sm text-slate-600">{product.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
