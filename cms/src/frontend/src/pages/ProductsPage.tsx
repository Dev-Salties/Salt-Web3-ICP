import { useEffect, useState } from "react";
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

export default function ProductsPage({
  onNotify,
  onCountChange,
}: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
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
      const data = await getAllProducts();
      setProducts(data);
      onCountChange?.(data.length);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load products");
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
  }

  function openCreateForm() {
    resetForm();
    setIsFormOpen(true);
  }

  function closeForm() {
    resetForm();
    setIsFormOpen(false);
  }

  async function handleSubmit() {
    setSaving(true);
    setError(null);

    try {
      const now = BigInt(Date.now()) * 1_000_000n;

      const payload: Product = {
        ...form,
        id: editingId ?? crypto.randomUUID(),
        createdAt: editingId ? form.createdAt : now,
        updatedAt: now,
      };

      const res = editingId
        ? await updateProduct(payload)
        : await createProduct(payload);

      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.(
          editingId
            ? "Product updated successfully."
            : "Product added successfully."
        );
        closeForm();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(product: Product) {
    setEditingId(product.id);
    setForm({ ...product });
    setIsFormOpen(true);
  }

  async function handleDelete(id: string) {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (!ok) return;

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
      {/* Header row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-slate-500">
            Create and manage products that will appear on the public website.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="rounded-lg bg-[#0064A8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0075C4]"
        >
          Add Product
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      {isFormOpen && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>

            <button
              onClick={closeForm}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Price (e.g. N$38.00)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />

            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <input
              className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
              placeholder="Enquiry URL (optional)"
              value={form.enquiryUrl}
              onChange={(e) => setForm({ ...form, enquiryUrl: e.target.value })}
            />

            <textarea
              className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2 min-h-[140px]"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm({ ...form, active: e.target.checked })
                }
              />
              Active
            </label>
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
                ? "Update Product"
                : "Add Product"}
            </button>

            <button
              onClick={closeForm}
              className="rounded-lg border border-slate-300 px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Existing products */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Existing Products</h2>

        {loading ? (
          <div className="text-sm text-slate-500">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-sm text-slate-500">No products found.</div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-slate-500">
                      {product.category}
                    </div>
                    <div className="mt-1 text-xs text-slate-600">
                      {product.price} • {product.active ? "Active" : "Inactive"}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="rounded-md border border-slate-300 px-3 py-1 text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => void handleDelete(product.id)}
                      className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {product.description && (
                  <p className="mt-3 text-sm text-slate-600">
                    {product.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
