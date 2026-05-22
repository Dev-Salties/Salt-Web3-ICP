import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const chapters = [
  { label: 'What We Do', path: '/about/story' },
  { label: 'Our Values', path: '/about/values' },
  { label: 'Our Journey', path: '/about/milestones' },
  { label: 'Awards', path: '/about/awards' },
  { label: 'The Team', path: '/about/team' },
]

export default function AboutFlow() {
  const { pathname } = useLocation()
  const current = chapters.findIndex((c) => c.path === pathname)

  return (
    <div className="border-b border-[#E2E8F0] bg-white overflow-x-auto">
      <div className="mx-auto flex max-w-6xl items-center gap-1 px-4 py-2.5 whitespace-nowrap">
        <Link
          to="/about"
          className="shrink-0 flex items-center gap-1 text-xs font-medium text-[#94A3B8] hover:text-[#0064A8] transition pr-3 border-r border-[#E2E8F0] mr-2"
        >
          <ArrowLeft className="h-3 w-3" />
          About
        </Link>
        {chapters.map((c, i) => (
          <Link
            key={c.path}
            to={c.path}
            className={`shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
              i === current
                ? 'bg-[#0F172A] text-white'
                : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
            }`}
          >
            <span className={`text-[10px] ${i === current ? 'text-white/50' : 'text-[#CBD5E1]'}`}>
              {}
            </span>
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export function AboutFlowFooter() {
  const { pathname } = useLocation()
  const current = chapters.findIndex((c) => c.path === pathname)
  const prev = current > 0 ? chapters[current - 1] : null
  const next = current < chapters.length - 1 ? chapters[current + 1] : null

  return (
    <div className="mt-14 border-t border-[#E2E8F0] pt-6 flex items-center justify-between gap-4">
      {prev ? (
        <Link
          to={prev.path}
          className="text-sm font-semibold text-[#64748B] hover:text-[#0064A8] transition"
        >
          {prev.label}
        </Link>
      ) : (
        <Link
          to="/about"
          className="text-sm font-semibold text-[#64748B] hover:text-[#0064A8] transition"
        >
          About Salt
        </Link>
      )}

      {next ? (
        <Link
          to={next.path}
          className="text-sm font-semibold text-[#64748B] hover:text-[#0064A8] transition"
        >
          {next.label}
        </Link>
      ) : (
        <Link
          to="/contact"
          className="text-sm font-semibold text-[#64748B] hover:text-[#0064A8] transition"
        >
          Get in Touch
        </Link>
      )}
    </div>
  )
}
