import type { ReactNode } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import {
  LayoutDashboard, Newspaper, Package, Briefcase,
  Users, ShieldCheck, Settings, LogOut, ChevronRight,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NAV = [
  { to: '/',           label: 'Overview',   icon: LayoutDashboard },
  { to: '/articles',   label: 'Articles',   icon: Newspaper },
  { to: '/products',   label: 'Products',   icon: Package },
  { to: '/vacancies',  label: 'Vacancies',  icon: Briefcase },
  { to: '/team',       label: 'Team',       icon: Users },
  { to: '/cats',       label: 'CATS Links', icon: ShieldCheck },
  { to: '/settings',   label: 'Settings',   icon: Settings },
]

export default function Layout({ children }: { children: ReactNode }) {
  const { principal, logout } = useAuth()
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-[#0B1F33] text-white">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0064A8] text-xs font-black">S</div>
          <div>
            <p className="text-sm font-extrabold">Salt CMS</p>
            <p className="text-[10px] text-blue-200/70">Web3 content</p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || (to !== '/' && pathname.startsWith(to))
            return (
              <Link
                key={to}
                to={to}
                className={[
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white',
                ].join(' ')}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
                {active && <ChevronRight className="ml-auto h-3 w-3 opacity-60" />}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <p className="truncate text-[10px] font-mono text-white/40">{principal.slice(0, 10)}…</p>
          <button
            type="button"
            onClick={() => void logout()}
            className="mt-2 flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
