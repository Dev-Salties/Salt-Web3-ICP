import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Newspaper,
  Package,
  Users,
  ShieldCheck,
  Activity,
  User,
  Copy,
  Check,
} from 'lucide-react'
import { queryActor } from '../lib/canister'
import { useAuth } from '../context/AuthContext'

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string
  value: number | string
  icon: typeof Newspaper
  accent: string
}) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    violet: 'bg-violet-50 text-violet-600',
    rose: 'bg-rose-50 text-rose-600',
    slate: 'bg-slate-100 text-slate-600',
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`inline-flex rounded-lg p-2 ${colors[accent] ?? colors.slate}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-3 text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="text-xs font-medium text-slate-500">{label}</p>
    </div>
  )
}

export default function OverviewPage() {
  const { principal } = useAuth()
  const [copiedPrincipal, setCopiedPrincipal] = useState(false)

  async function handleCopyPrincipal() {
    if (!principal) return

    try {
      await navigator.clipboard.writeText(principal)
      setCopiedPrincipal(true)

      setTimeout(() => {
        setCopiedPrincipal(false)
      }, 1800)
    } catch (err) {
      console.error('Failed to copy principal:', err)
    }
  }

  const { data: health } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const actor = await queryActor()
      return actor ? String(await actor.health()) : 'canister not configured'
    },
    refetchInterval: 30_000,
  })

  const extract = (key: string) => {
    const m = health?.match(new RegExp(`${key}=(\\d+)`))
    return m ? Number(m[1]) : '–'
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-extrabold text-slate-900">CMS Dashboard</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Manage key public website content from one place using the sidebar navigation.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sections
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                Articles, Team, Products, CATS
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                Backend connected
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Mode
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                Content Management
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-[#0064A8]" />
              <div className="text-sm font-semibold text-slate-900">
                Your Principal
              </div>
            </div>

            <button
              type="button"
              onClick={() => void handleCopyPrincipal()}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {copiedPrincipal ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="mt-3 break-all rounded-lg bg-slate-50 px-3 py-3 font-mono text-xs text-slate-800">
            {principal}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Articles" value={extract('articles')} icon={Newspaper} accent="blue" />
        <StatCard label="Products" value={extract('products')} icon={Package} accent="emerald" />
        <StatCard label="Team" value={extract('team')} icon={Users} accent="violet" />
        <StatCard label="CATS" value={extract('cats')} icon={ShieldCheck} accent="rose" />
      </div>

      {health && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
            <Activity className="h-3.5 w-3.5" />
            Canister health
          </div>
          <p className="mt-2 font-mono text-xs text-slate-700">{health}</p>
        </div>
      )}
    </div>
  )
}