import { useQuery } from '@tanstack/react-query'
import { Newspaper, Package, Briefcase, Users, ShieldCheck, Activity } from 'lucide-react'
import { queryActor } from '../lib/canister'

function StatCard({ label, value, icon: Icon, accent }: {
  label: string; value: number | string; icon: typeof Newspaper; accent: string
}) {
  const colors: Record<string, string> = {
    blue:    'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber:   'bg-amber-50 text-amber-600',
    violet:  'bg-violet-50 text-violet-600',
    rose:    'bg-rose-50 text-rose-600',
    slate:   'bg-slate-100 text-slate-600',
  }
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className={`inline-flex rounded-lg p-2 ${colors[accent] ?? colors.slate}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-3 text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="text-xs font-medium text-slate-500">{label}</p>
    </div>
  )
}

export default function OverviewPage() {
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
    <div className="p-8">
      <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">Salt Essential CMS · on-chain content overview</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Articles"  value={extract('articles')}  icon={Newspaper}   accent="blue" />
        <StatCard label="Products"  value={extract('products')}  icon={Package}     accent="emerald" />
        <StatCard label="Vacancies" value={extract('vacancies')} icon={Briefcase}   accent="amber" />
        <StatCard label="Team"      value={extract('team')}      icon={Users}       accent="violet" />
        <StatCard label="CATS"      value={extract('cats')}      icon={ShieldCheck} accent="rose" />
      </div>

      {health && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
            <Activity className="h-3.5 w-3.5" /> Canister health
          </div>
          <p className="mt-2 font-mono text-xs text-slate-700">{health}</p>
        </div>
      )}
    </div>
  )
}
