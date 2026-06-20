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

export default function TeamPage({ onNotify, onCountChange }: TeamPageProps) {
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

  useEffect(() => { void load(); }, []);

  function resetForm() { setEditingId(null); setForm(emptyForm()); }
  function openCreateForm() { resetForm(); setIsFormOpen(true); }
  function closeForm() { resetForm(); setIsFormOpen(false); }

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
      const res = editingId ? await updateTeamMember(payload) : await createTeamMember(payload);
      if ("err" in res && res.err) {
        setError(res.err);
      } else {
        await load();
        onNotify?.(editingId ? "Team member updated successfully." : "Team member added successfully.");
        closeForm();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save team member");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(member: TeamMember) { setEditingId(member.id); setForm({ ...member }); setIsFormOpen(true); }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this team member?")) return;
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
      m.motto.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Team</h1>
          <p className="page-subtitle">Create and manage team members that will appear on the public website.</p>
        </div>
        <button onClick={openCreateForm} className="btn-primary">+ Add Team Member</button>
      </div>

      {error && <div className="error-box">{error}</div>}

      {/* Form */}
      {isFormOpen && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title mb-0">{editingId ? "Edit Team Member" : "Add Team Member"}</h2>
            <button onClick={closeForm} className="btn-secondary btn-sm">Close</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Full Name</label>
              <input className="input" placeholder="e.g. Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Role / Position</label>
              <input className="input" placeholder="e.g. Senior Engineer" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Photo URL</label>
              <input className="input" placeholder="https://..." value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Display Order</label>
              <input type="number" className="input" placeholder="0" value={form.order.toString()} onChange={(e) => setForm({ ...form, order: BigInt(e.target.value || "0") })} />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-600">Personal Motto</label>
              <textarea className="input" placeholder="A personal motto or quote..." value={form.motto} onChange={(e) => setForm({ ...form, motto: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-600">Why I love Salt</label>
              <textarea className="input min-h-[120px]" placeholder="What they love about working at Salt..." value={form.whyLove} onChange={(e) => setForm({ ...form, whyLove: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-600">What I love best about my work</label>
              <textarea className="input min-h-[120px]" placeholder="What they enjoy most about their role..." value={form.bestPart} onChange={(e) => setForm({ ...form, bestPart: e.target.value })} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => void handleSubmit()} disabled={saving} className="btn-primary">
              {saving ? "Saving..." : editingId ? "Update Team Member" : "Add Team Member"}
            </button>
            <button onClick={closeForm} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Search */}
      <input type="search" placeholder="Search team members..." value={search} onChange={(e) => setSearch(e.target.value)} className="input" />

      {/* List */}
      <div className="card">
        <h2 className="section-title">Existing Team Members</h2>
        {loading ? (
          <p className="text-sm text-slate-500">Loading team members...</p>
        ) : filteredMembers.length === 0 ? (
          <p className="text-sm text-slate-500">No team members found.</p>
        ) : (
          <div className="space-y-3">
            {filteredMembers.map((member) => (
              <div key={member.id} className="list-item">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-900">{member.name}</div>
                    <div className="text-sm text-slate-500">{member.role}</div>
                    <div className="text-xs text-slate-400">Order: {member.order.toString()}</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => handleEdit(member)} className="btn-secondary btn-sm">Edit</button>
                    <button onClick={() => void handleDelete(member.id)} className="btn-danger btn-sm">Delete</button>
                  </div>
                </div>
                {member.motto && <p className="mt-2 text-sm text-slate-600"><span className="font-medium">Motto:</span> {member.motto}</p>}
                {member.whyLove && <p className="mt-1 text-sm text-slate-600"><span className="font-medium">Why I love Salt:</span> {member.whyLove}</p>}
                {member.bestPart && <p className="mt-1 text-sm text-slate-600"><span className="font-medium">What I love best:</span> {member.bestPart}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
