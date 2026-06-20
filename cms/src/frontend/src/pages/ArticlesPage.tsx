import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ImageUpload from "../components/ImageUpload";
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

function StatusBadge({ status }: { status: Article["status"] }) {
  if ("published" in status) return <span className="badge-published">Published</span>;
  if ("scheduled" in status) return <span className="badge-scheduled">Scheduled</span>;
  return <span className="badge-draft">Draft</span>;
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

type ArticlesPageProps = {
  onNotify?: (message: string) => void;
  onCountChange?: (count: number) => void;
};

export default function ArticlesPage({ onNotify, onCountChange }: ArticlesPageProps) {
  const { identity } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Article>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [search, setSearch] = useState("");

  async function load() {
    if (!identity) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAllArticles(identity);
      setArticles(data);
      onCountChange?.(data.length);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load articles");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, [identity]);

  const resetForm = () => { setEditingId(null); setForm(emptyForm()); };
  const openCreateForm = () => { resetForm(); setIsFormOpen(true); };
  const closeForm = () => { resetForm(); setIsFormOpen(false); };

  const handleSubmit = async () => {
    if (!identity) return;
    setSaving(true);
    setError(null);
    try {
      const now = BigInt(Date.now()) * 1_000_000n;
      const payload: Article = {
        ...form,
        id: editingId ?? crypto.randomUUID(),
        createdAt: editingId ? form.createdAt : now,
        updatedAt: now,
        tags: Array.isArray(form.tags)
          ? form.tags
          : (form.tags as unknown as string).split(",").map((t) => t.trim()).filter(Boolean),
      };
      const res = editingId ? await updateArticle(identity, payload) : await createArticle(identity, payload);
      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.(editingId ? "Article updated successfully." : "Article created successfully.");
        closeForm();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save article");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (a: Article) => { setEditingId(a.id); setForm({ ...a }); setIsFormOpen(true); };

  const handlePublishToggle = async (a: Article) => {
    if (!identity) return;
    try {
      if ("published" in a.status) {
        await unpublishArticle(identity, a.id);
      } else {
        await publishArticle(identity, a.id);
      }
      await load();
      onNotify?.("Article publish status updated.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update publish state");
    }
  };

  const handleDelete = async (id: string) => {
    if (!identity) return;
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await deleteArticle(identity, id);
      await load();
      onNotify?.("Article deleted successfully.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete article");
    }
  };

  const filteredArticles = articles.filter((a) => {
    const q = search.toLowerCase();
    return a.title.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Articles</h1>
          <p className="page-subtitle">Create and manage articles that will appear on the public website.</p>
        </div>
        <button onClick={openCreateForm} className="btn-primary">
          + Add Article
        </button>
      </div>

      {error && <div className="error-box">{error}</div>}

      {/* Form */}
      {isFormOpen && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title mb-0">{editingId ? "Edit Article" : "Create Article"}</h2>
            <button onClick={closeForm} className="btn-secondary btn-sm">Close</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Title</label>
              <input className="input" placeholder="Article title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Slug</label>
              <input className="input" placeholder="url-friendly-slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <ImageUpload label="Image" value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} />
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Date</label>
              <input className="input" placeholder="YYYY-MM-DD" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-600">Description</label>
              <input className="input" placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-600">Tags (comma separated)</label>
              <input className="input" placeholder="tag1, tag2, tag3" value={Array.isArray(form.tags) ? form.tags.join(", ") : ""} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Author</label>
              <input className="input" placeholder="Author name" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </div>
            <ImageUpload label="OG Image" value={form.ogImage} onChange={(url) => setForm({ ...form, ogImage: url })} />
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-600">Meta Description</label>
              <input className="input" placeholder="SEO meta description" value={form.metaDesc} onChange={(e) => setForm({ ...form, metaDesc: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-600">Body (HTML)</label>
              <textarea className="input min-h-[140px]" placeholder="Article body content..." value={form.body ?? ""} onChange={(e) => setForm({ ...form, body: e.target.value })} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => void handleSubmit()} disabled={saving} className="btn-primary">
              {saving ? "Saving..." : editingId ? "Update Article" : "Create Article"}
            </button>
            <button onClick={closeForm} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Search */}
      <input type="search" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="input" />

      {/* List */}
      <div className="card">
        <h2 className="section-title">Existing Articles</h2>
        {loading ? (
          <p className="text-sm text-slate-500">Loading articles...</p>
        ) : filteredArticles.length === 0 ? (
          <p className="text-sm text-slate-500">No articles found.</p>
        ) : (
          <div className="space-y-3">
            {filteredArticles.map((a) => (
              <div key={a.id} className="list-item">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-900">{a.title}</div>
                    <div className="text-xs text-slate-400">{a.slug}</div>
                    <StatusBadge status={a.status} />
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => handleEdit(a)} className="btn-secondary btn-sm">Edit</button>
                    <button onClick={() => void handlePublishToggle(a)} className="btn-secondary btn-sm">
                      {"published" in a.status ? "Unpublish" : "Publish"}
                    </button>
                    <button onClick={() => void handleDelete(a.id)} className="btn-danger btn-sm">Delete</button>
                  </div>
                </div>
                {a.description && <p className="mt-2 text-sm text-slate-600">{a.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
