import { useEffect, useState } from "react";
import {
  getAllCatSessions,
  createCatSession,
  updateCatSession,
  archiveCatSession,
  unarchiveCatSession,
  deleteCatSession,
  type CatSession,
} from "../lib/cats";

type CatsPageProps = {
  onNotify?: (message: string) => void;
  onCountChange?: (count: number) => void;
};

function emptyForm(): CatSession {
  return {
    id: "",
    year: "",
    week: 0n,
    weekLabel: "",
    title: "",
    topic: "",
    date: "",
    imageUrl: "",
    youtubeUrl: "",
    archived: false,
    order: 0n,
  };
}

export default function CatsPage({ onNotify, onCountChange }: CatsPageProps) {
  const [sessions, setSessions] = useState<CatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<CatSession>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCatSessions();
      setSessions(data);
      onCountChange?.(data.length);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load CATS sessions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  function resetForm() { setEditingId(null); setForm(emptyForm()); setShowForm(false); }
  function handleAddNew() { setEditingId(null); setForm(emptyForm()); setShowForm(true); }
  function handleEdit(session: CatSession) { setEditingId(session.id); setForm({ ...session }); setShowForm(true); }

  async function handleSubmit() {
    setSaving(true);
    setError(null);
    try {
      const generatedId = form.id?.trim().length > 0 ? form.id : `${form.year}-week${form.week.toString()}`;
      const payload: CatSession = { ...form, id: editingId ?? generatedId };
      const res = editingId ? await updateCatSession(payload) : await createCatSession(payload);
      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.(editingId ? "CATS session updated successfully." : "CATS session created successfully.");
        resetForm();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save CATS session");
    } finally {
      setSaving(false);
    }
  }

  async function handleArchiveToggle(session: CatSession) {
    try {
      const res = session.archived ? await unarchiveCatSession(session.id) : await archiveCatSession(session.id);
      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.(session.archived ? "CATS session unarchived." : "CATS session archived.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update archive status");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this CATS session?")) return;
    try {
      const res = await deleteCatSession(id);
      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.("CATS session deleted successfully.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete CATS session");
    }
  }

  const filteredSessions = sessions.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.topic.toLowerCase().includes(q) ||
      s.year.toLowerCase().includes(q) ||
      s.weekLabel.toLowerCase().includes(q) ||
      s.date.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">CATS Links</h1>
          <p className="page-subtitle">Create and manage CATS sessions and public YouTube links.</p>
        </div>
        <button onClick={handleAddNew} className="btn-primary">+ Add Session</button>
      </div>

      {error && <div className="error-box">{error}</div>}

      {/* Form */}
      {showForm && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title mb-0">{editingId ? "Edit CATS Session" : "Add CATS Session"}</h2>
            <button onClick={resetForm} className="btn-secondary btn-sm">Close</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Year</label>
              <input className="input" placeholder="e.g. 2025" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Week Number</label>
              <input type="number" className="input" placeholder="e.g. 1" value={form.week.toString()} onChange={(e) => setForm({ ...form, week: BigInt(e.target.value || "0") })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Week Label</label>
              <input className="input" placeholder="e.g. Week 1" value={form.weekLabel} onChange={(e) => setForm({ ...form, weekLabel: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Display Order</label>
              <input type="number" className="input" placeholder="0" value={form.order.toString()} onChange={(e) => setForm({ ...form, order: BigInt(e.target.value || "0") })} />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-600">Session Title</label>
              <input className="input" placeholder="e.g. Introduction to Cloud" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-600">Topic</label>
              <input className="input" placeholder="e.g. Cloud Computing Basics" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Date</label>
              <input className="input" placeholder="e.g. 14 March 2025" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Image URL</label>
              <input className="input" placeholder="https://..." value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-600">YouTube URL</label>
              <input className="input" placeholder="https://youtube.com/watch?v=..." value={form.youtubeUrl} onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })} />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" className="accent-[#0064A8]" checked={form.archived} onChange={(e) => setForm({ ...form, archived: e.target.checked })} />
              Archived
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => void handleSubmit()} disabled={saving} className="btn-primary">
              {saving ? "Saving..." : editingId ? "Update Session" : "Add Session"}
            </button>
            <button onClick={resetForm} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Search + List */}
      <div className="card">
        <h2 className="section-title">Existing CATS Sessions</h2>

        <input type="search" placeholder="Search CATS sessions..." value={search} onChange={(e) => setSearch(e.target.value)} className="input mb-4" />

        {loading ? (
          <p className="text-sm text-slate-500">Loading CATS sessions...</p>
        ) : filteredSessions.length === 0 ? (
          <p className="text-sm text-slate-500">No CATS sessions found.</p>
        ) : (
          <div className="space-y-3">
            {filteredSessions.map((session) => (
              <div key={session.id} className="list-item">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-900">{session.title}</div>
                    <div className="text-sm text-slate-500">{session.year} · {session.weekLabel}</div>
                    <div className="text-xs text-slate-600">{session.topic}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{session.date}</span>
                      <span className={session.archived ? "badge-draft" : "badge-active"}>
                        {session.archived ? "Archived" : "Active"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <button onClick={() => handleEdit(session)} className="btn-secondary btn-sm">Edit</button>
                    <button onClick={() => void handleArchiveToggle(session)} className="btn btn-sm border border-amber-300 text-amber-700 hover:bg-amber-50">
                      {session.archived ? "Unarchive" : "Archive"}
                    </button>
                    <button onClick={() => void handleDelete(session.id)} className="btn-danger btn-sm">Delete</button>
                  </div>
                </div>
                <div className="mt-2 space-y-0.5 text-xs text-slate-400">
                  {session.imageUrl && <div>Image: {session.imageUrl}</div>}
                  {session.youtubeUrl && <div className="break-all">YouTube: {session.youtubeUrl}</div>}
                  <div className="font-mono text-[11px]">ID: {session.id}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
