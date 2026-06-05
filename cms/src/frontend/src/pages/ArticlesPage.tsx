import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAllArticles,
  createArticle,
  updateArticle,
  publishArticle,
  unpublishArticle,
  deleteArticle,
  type Article,
} from "../lib/articles";

function getStatusLabel(status: Article["status"]) {
  if ("published" in status) return "Published";
  if ("scheduled" in status) return "Scheduled";
  return "Draft";
}

const emptyForm = (): Article => ({
  id: "",
  slug: "",
  title: "",
  description: "",
  body: "",
  date: new Date().toISOString().slice(0, 10),
  scheduledAt: [],
  tags: [],
  author: "",
  imageUrl: "",
  metaDesc: "",
  ogImage: "",
  status: { draft: null },
  createdAt: BigInt(0),
  updatedAt: BigInt(0),
});

export default function ArticlesPage() {
  const { identity } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Article>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    if (!identity) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAllArticles(identity);
      setArticles(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load articles");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, [identity]);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm());
  };

  const handleSubmit = async () => {
    if (!identity) return;
    setSaving(true);
    setError(null);

    try {
      // Use BigInt arithmetic to avoid float precision loss on nanosecond timestamps
      const now = BigInt(Date.now()) * 1_000_000n;

      const payload: Article = {
        ...form,
        id: editingId ?? crypto.randomUUID(),
        createdAt: editingId ? form.createdAt : now,
        updatedAt: now,
        tags: Array.isArray(form.tags)
          ? form.tags
          : (form.tags as unknown as string)
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
      };

      const res = editingId
        ? await updateArticle(identity, payload)
        : await createArticle(identity, payload);

      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        resetForm();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save article");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (a: Article) => {
    setEditingId(a.id);
    setForm({ ...a });
  };

  const handlePublishToggle = async (a: Article) => {
    if (!identity) return;
    try {
      if ("published" in a.status) {
        await unpublishArticle(identity, a.id);
      } else {
        await publishArticle(identity, a.id);
      }
      await load();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to update publish state"
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!identity) return;
    const ok = window.confirm("Are you sure you want to delete this article?");
    if (!ok) return;

    try {
      await deleteArticle(identity, id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete article");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Articles</h1>
        <p className="text-sm text-slate-500">
          Create and manage articles that will appear on the public website.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">
          {editingId ? "Edit Article" : "Create Article"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            className="rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />

          <input
            className="rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />

          <input
            className="rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Date (YYYY-MM-DD)"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
            placeholder="Tags (comma separated)"
            value={Array.isArray(form.tags) ? form.tags.join(", ") : ""}
            onChange={(e) =>
              setForm({
                ...form,
                tags: e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              })
            }
          />

          <input
            className="rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />

          <input
            className="rounded-lg border border-slate-300 px-3 py-2"
            placeholder="OG Image URL"
            value={form.ogImage}
            onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
          />

          <input
            className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
            placeholder="Meta Description"
            value={form.metaDesc}
            onChange={(e) => setForm({ ...form, metaDesc: e.target.value })}
          />

          <textarea
            className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2 min-h-[140px]"
            placeholder="Article body (HTML)"
            value={form.body ?? ""}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => void handleSubmit()}
            disabled={saving}
            className="rounded-lg bg-[#0064A8] px-4 py-2 text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : editingId ? "Update Article" : "Create Article"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="rounded-lg border border-slate-300 px-4 py-2"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Existing Articles</h2>

        {loading ? (
          <div className="text-sm text-slate-500">Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className="text-sm text-slate-500">No articles found.</div>
        ) : (
          <div className="space-y-4">
            {articles.map((a) => (
              <div
                key={a.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {a.title}
                    </div>
                    <div className="text-sm text-slate-500">{a.slug}</div>
                    <div className="mt-1 text-xs text-slate-600">
                      Status: {getStatusLabel(a.status)}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(a)}
                      className="rounded-md border border-slate-300 px-3 py-1 text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => void handlePublishToggle(a)}
                      className="rounded-md border border-slate-300 px-3 py-1 text-sm"
                    >
                      {"published" in a.status ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      onClick={() => void handleDelete(a.id)}
                      className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {a.description && (
                  <p className="mt-3 text-sm text-slate-600">
                    {a.description}
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