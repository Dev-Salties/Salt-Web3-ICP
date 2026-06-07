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

export default function CatsPage({
  onNotify,
  onCountChange,
}: CatsPageProps) {
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
      const generatedId =
        form.id && form.id.trim().length > 0
          ? form.id
          : `${form.year}-week${form.week.toString()}`;

      const payload: CatSession = {
        ...form,
        id: editingId ?? generatedId,
      };

      const res = editingId
        ? await updateCatSession(payload)
        : await createCatSession(payload);

      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.(
          editingId
            ? "CATS session updated successfully."
            : "CATS session created successfully."
        );
        resetForm();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save CATS session");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(session: CatSession) {
    setEditingId(session.id);
    setForm({ ...session });
    setShowForm(true);
  }

  async function handleArchiveToggle(session: CatSession) {
    try {
      const res = session.archived
        ? await unarchiveCatSession(session.id)
        : await archiveCatSession(session.id);

      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.(
          session.archived
            ? "CATS session unarchived successfully."
            : "CATS session archived successfully."
        );
      }
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Failed to update archive status for CATS session"
      );
    }
  }

  async function handleDelete(id: string) {
    const ok = window.confirm("Are you sure you want to delete this CATS session?");
    if (!ok) return;

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

  const filteredSessions = sessions.filter((session) => {
    const q = search.toLowerCase();
    return (
      session.title.toLowerCase().includes(q) ||
      session.topic.toLowerCase().includes(q) ||
      session.year.toLowerCase().includes(q) ||
      session.weekLabel.toLowerCase().includes(q) ||
      session.date.toLowerCase().includes(q) ||
      session.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">CATS Links</h1>
          <p className="text-sm text-slate-500">
            Create and manage CATS sessions and public YouTube links.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="rounded-lg bg-[#0064A8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0075C4]"
        >
          Add Session
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
            {editingId ? "Edit CATS Session" : "Add CATS Session"}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Year (e.g. 2025)"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />

            <input
              type="number"
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Week Number"
              value={form.week.toString()}
              onChange={(e) =>
                setForm({
                  ...form,
                  week: BigInt(e.target.value || "0"),
                })
              }
            />

            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Week Label (e.g. Week 1)"
              value={form.weekLabel}
              onChange={(e) => setForm({ ...form, weekLabel: e.target.value })}
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

            <input
              className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
              placeholder="Session Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
              placeholder="Topic"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
            />

            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Date (human-readable)"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />

            <input
              className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
              placeholder="YouTube URL"
              value={form.youtubeUrl}
              onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
            />

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.archived}
                onChange={(e) => setForm({ ...form, archived: e.target.checked })}
              />
              Archived
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
                ? "Update Session"
                : "Add Session"}
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
        <h2 className="text-lg font-semibold mb-4">Existing CATS Sessions</h2>

        <div className="mb-4">
          <input
            type="search"
            placeholder="Search CATS sessions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        {loading ? (
          <div className="text-sm text-slate-500">Loading CATS sessions...</div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-sm text-slate-500">No CATS sessions found.</div>
        ) : (
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {session.title}
                    </div>
                    <div className="text-sm text-slate-500">
                      {session.year} • {session.weekLabel}
                    </div>
                    <div className="mt-1 text-xs text-slate-600">
                      {session.topic}
                    </div>
                    <div className="mt-1 text-xs text-slate-600">
                      {session.date} • {session.archived ? "Archived" : "Active"}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(session)}
                      className="rounded-md border border-slate-300 px-3 py-1 text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => void handleArchiveToggle(session)}
                      className="rounded-md border border-amber-300 px-3 py-1 text-sm text-amber-700"
                    >
                      {session.archived ? "Unarchive" : "Archive"}
                    </button>

                    <button
                      onClick={() => void handleDelete(session.id)}
                      className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-3 space-y-1 text-xs text-slate-500">
                  <div>
                    <span className="font-semibold text-slate-700">Order:</span>{" "}
                    {session.order.toString()}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Image:</span>{" "}
                    {session.imageUrl || "—"}
                  </div>
                  <div className="break-all">
                    <span className="font-semibold text-slate-700">YouTube:</span>{" "}
                    {session.youtubeUrl || "—"}
                  </div>
                  <div className="break-all font-mono text-[11px] text-slate-400">
                    ID: {session.id}
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