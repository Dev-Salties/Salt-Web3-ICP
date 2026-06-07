import { useEffect, useState } from "react";
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  type TeamMember,
} from "../lib/team";

function emptyForm(): TeamMember {
  return {
    id: "",
    name: "",
    role: "",
    motto: "",
    whyLove: "",
    bestPart: "",
    photoUrl: "",
    order: 0n,
    createdAt: 0n,
    updatedAt: 0n,
  };
}

type TeamPageProps = {
  onNotify?: (message: string) => void;
  onCountChange?: (count: number) => void;
};

export default function TeamPage({
  onNotify,
  onCountChange,
}: TeamPageProps) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<TeamMember>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const data = await getTeamMembers();
      setMembers(data);
      onCountChange?.(data.length);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load team members");
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

      const payload: TeamMember = {
        ...form,
        id: editingId ?? crypto.randomUUID(),
        createdAt: editingId ? form.createdAt : now,
        updatedAt: now,
      };

      const res = editingId
        ? await updateTeamMember(payload)
        : await createTeamMember(payload);

      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.(
          editingId
            ? "Team member updated successfully."
            : "Team member added successfully."
        );
        closeForm();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save team member");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(member: TeamMember) {
    setEditingId(member.id);
    setForm({ ...member });
    setIsFormOpen(true);
  }

  async function handleDelete(id: string) {
    const ok = window.confirm("Are you sure you want to delete this team member?");
    if (!ok) return;

    try {
      const res = await deleteTeamMember(id);

      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.("Team member deleted successfully.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete team member");
    }
  }

  const filteredMembers = members.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.motto.toLowerCase().includes(q) ||
      m.whyLove.toLowerCase().includes(q) ||
      m.bestPart.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-sm text-slate-500">
            Create and manage team members that will appear on the public website.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="rounded-lg bg-[#0064A8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0075C4]"
        >
          Add Team Member
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
              {editingId ? "Edit Team Member" : "Add Team Member"}
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
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Role / Position"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />

            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Photo URL"
              value={form.photoUrl}
              onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
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

            <textarea
              className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2 min-h-[100px]"
              placeholder="Personal Motto"
              value={form.motto}
              onChange={(e) => setForm({ ...form, motto: e.target.value })}
            />

            <textarea
              className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2 min-h-[120px]"
              placeholder="Why I love Salt"
              value={form.whyLove}
              onChange={(e) => setForm({ ...form, whyLove: e.target.value })}
            />

            <textarea
              className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2 min-h-[120px]"
              placeholder="What I love best about my work"
              value={form.bestPart}
              onChange={(e) => setForm({ ...form, bestPart: e.target.value })}
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
                ? "Update Team Member"
                : "Add Team Member"}
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
          placeholder="Search team members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Existing members */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Existing Team Members</h2>

        {loading ? (
          <div className="text-sm text-slate-500">Loading team members...</div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-sm text-slate-500">No team members found.</div>
        ) : (
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {member.name}
                    </div>
                    <div className="text-sm text-slate-500">{member.role}</div>
                    <div className="mt-1 text-xs text-slate-600">
                      Order: {member.order.toString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="rounded-md border border-slate-300 px-3 py-1 text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => void handleDelete(member.id)}
                      className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {member.motto && (
                  <p className="mt-3 text-sm text-slate-600">
                    <span className="font-semibold">Motto:</span> {member.motto}
                  </p>
                )}

                {member.whyLove && (
                  <p className="mt-2 text-sm text-slate-600">
                    <span className="font-semibold">Why I love Salt:</span>{" "}
                    {member.whyLove}
                  </p>
                )}

                {member.bestPart && (
                  <p className="mt-2 text-sm text-slate-600">
                    <span className="font-semibold">What I love best:</span>{" "}
                    {member.bestPart}
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