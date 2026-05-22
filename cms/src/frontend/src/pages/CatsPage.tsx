/**
 * CATS Links page — manage Cybersecurity Awareness Training Session recordings.
 * Sessions are upserted by (year, week) key. Old years can be archived
 * (hidden from the public website) without losing on-chain history.
 */
import { useState, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Archive, ArchiveRestore, Trash2, Pencil } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { updateActor, queryActor } from '../lib/canister'

type CatSession = {
  id: string; year: string; week: number; weekLabel: string
  title: string; topic: string; date: string
  imageUrl: string; youtubeUrl: string; archived: boolean; order: number
}

const EMPTY: Omit<CatSession, 'id'> = {
  year: new Date().getFullYear().toString(), week: 1, weekLabel: 'Week 1',
  title: '', topic: '', date: '', imageUrl: '', youtubeUrl: '', archived: false, order: 1,
}

export default function CatsPage() {
  const { identity } = useAuth()
  const qc = useQueryClient()
  const [editing, setEditing] = useState<CatSession | 'new' | null>(null)
  const [showArchived, setShowArchived] = useState(false)

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['cats-admin'],
    queryFn: async () => {
      const actor = await updateActor(identity!)
      if (!actor) return []
      return actor.getAllCatSessions() as Promise<CatSession[]>
    },
    enabled: Boolean(identity),
  })

  const archive = useMutation({
    mutationFn: async ({ id, archived }: { id: string; archived: boolean }) => {
      const actor = await updateActor(identity!)
      if (!actor) throw new Error('No actor')
      return archived ? actor.unarchiveCatSession(id) : actor.archiveCatSession(id)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cats-admin'] }),
  })

  const del = useMutation({
    mutationFn: async (id: string) => {
      if (!window.confirm('Hard-delete this session? Archive is safer.')) return
      const actor = await updateActor(identity!)
      if (!actor) throw new Error('No actor')
      return actor.deleteCatSession(id)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cats-admin'] }),
  })

  const visible = showArchived ? sessions : sessions.filter((s) => !s.archived)

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">CATS Links</h1>
          <p className="mt-1 text-sm text-slate-500">Cybersecurity Awareness Training Session recordings</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowArchived((v) => !v)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {showArchived ? 'Hide archived' : 'Show archived'}
          </button>
          <button
            type="button"
            onClick={() => setEditing('new')}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0064A8] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0075C4]"
          >
            <Plus className="h-3.5 w-3.5" /> New session
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              {['Year', 'Week', 'Title', 'YouTube', 'Status', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">Loading…</td></tr>
            )}
            {!isLoading && visible.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No sessions yet.</td></tr>
            )}
            {visible.map((s) => (
              <tr key={s.id} className={s.archived ? 'opacity-50' : 'hover:bg-slate-50'}>
                <td className="px-4 py-3 font-mono text-xs">{s.year}</td>
                <td className="px-4 py-3">{s.weekLabel}</td>
                <td className="px-4 py-3 font-medium text-slate-900">{s.title}</td>
                <td className="max-w-[180px] truncate px-4 py-3 font-mono text-xs text-slate-500">
                  {s.youtubeUrl || <span className="text-slate-300">—</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={[
                    'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                    s.archived ? 'bg-slate-100 text-slate-500'
                      : s.youtubeUrl ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700',
                  ].join(' ')}>
                    {s.archived ? 'Archived' : s.youtubeUrl ? 'Live' : 'No recording'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2 text-slate-400">
                    <button title="Edit" onClick={() => setEditing(s)} className="hover:text-[#0064A8]"><Pencil className="h-3.5 w-3.5" /></button>
                    <button title={s.archived ? 'Restore' : 'Archive'} onClick={() => archive.mutate({ id: s.id, archived: s.archived })} className="hover:text-amber-600">
                      {s.archived ? <ArchiveRestore className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
                    </button>
                    <button title="Hard delete" onClick={() => del.mutate(s.id)} className="hover:text-rose-600"><Trash2 className="h-3.5 w-3.5" /></button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <CatModal
          initial={editing === 'new' ? null : editing}
          identity={identity!}
          onClose={() => setEditing(null)}
          onSaved={() => { qc.invalidateQueries({ queryKey: ['cats-admin'] }); setEditing(null) }}
        />
      )}
    </div>
  )
}

function CatModal({ initial, identity, onClose, onSaved }: {
  initial: CatSession | null
  identity: NonNullable<ReturnType<typeof useAuth>['identity']>
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState<Omit<CatSession, 'id'>>({
    year:       initial?.year       ?? EMPTY.year,
    week:       initial?.week       ?? EMPTY.week,
    weekLabel:  initial?.weekLabel  ?? EMPTY.weekLabel,
    title:      initial?.title      ?? '',
    topic:      initial?.topic      ?? '',
    date:       initial?.date       ?? '',
    imageUrl:   initial?.imageUrl   ?? '',
    youtubeUrl: initial?.youtubeUrl ?? '',
    archived:   initial?.archived   ?? false,
    order:      initial?.order      ?? 1,
  })
  const [busy, setBusy]   = useState(false)
  const [error, setError] = useState<string | null>(null)

  const save = async () => {
    if (!form.title.trim() || !form.year.trim()) { setError('Year and title are required'); return }
    setBusy(true); setError(null)
    try {
      const actor = await updateActor(identity)
      if (!actor) throw new Error('Canister not configured')
      const id = initial?.id ?? `${form.year}-week${form.week}`
      const session = { ...form, id, week: Number(form.week), order: Number(form.order) }
      const res: unknown = initial
        ? await actor.updateCatSession(session)
        : await actor.upsertCatSession(session)
      if (res && typeof res === 'object' && 'err' in res) throw new Error(String((res as { err: unknown }).err))
      onSaved()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">{initial ? 'Edit session' : 'New CAT session'}</h2>
          <button type="button" onClick={onClose} className="text-sm text-slate-400 hover:text-slate-700">Close</button>
        </div>

        {error && <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Year',          key: 'year',      placeholder: '2025' },
            { label: 'Week number',   key: 'week',      placeholder: '1' },
            { label: 'Week label',    key: 'weekLabel', placeholder: 'Week 1' },
            { label: 'Display order', key: 'order',     placeholder: '1' },
            { label: 'Title',         key: 'title',     placeholder: 'Know Your Enemy', span: true },
            { label: 'Topic',         key: 'topic',     placeholder: 'Threats and Vulnerabilities…', span: true },
            { label: 'Date',          key: 'date',      placeholder: '21 Feb 2025' },
            { label: 'Image URL',     key: 'imageUrl',  placeholder: '/CATs/week1.jpg' },
            { label: 'YouTube URL',   key: 'youtubeUrl',placeholder: 'https://youtu.be/…', span: true },
          ].map(({ label, key, placeholder, span }) => (
            <label key={key} className={`block text-xs font-semibold text-slate-600 ${span ? 'sm:col-span-2' : ''}`}>
              {label}
              <input
                value={String(form[key as keyof typeof form])}
                onChange={set(key as keyof typeof form)}
                placeholder={placeholder}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </label>
          ))}
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 sm:col-span-2">
            <input type="checkbox" checked={form.archived} onChange={(e) => setForm((f) => ({ ...f, archived: e.target.checked }))} />
            Archived (hidden from website — use to retire old years without hard-deleting)
          </label>
        </div>

        <div className="mt-6 flex gap-2">
          <button type="button" disabled={busy} onClick={() => void save()}
            className="rounded-full bg-[#0064A8] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0075C4] disabled:opacity-50">
            {busy ? 'Saving…' : 'Save'}
          </button>
          <button type="button" onClick={onClose}
            className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
