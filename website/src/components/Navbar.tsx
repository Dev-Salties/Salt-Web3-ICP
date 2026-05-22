import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import saltLogo from '../assets/salt-logo.webp'

const WHISTLEBLOWER_URL =
  'https://forms.office.com/pages/responsepage.aspx?id=61bD1ohhFk2VAW32Txcdwe-1NhKtDJBBvleHL3LxRudUOVZXM0pKRlpGM1NNSVpROU9NNTZXNlVVQy4u&web=1&wdLOR=cD13C2E29-8B26-4665-A8F4-6041786865EE'

const navItems: ({ to: string; label: string; href?: never } | { href: string; label: string; to?: never })[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/news', label: 'News' },
  { to: '/cats', label: 'CATS' },
  { to: '/seed', label: 'Seed' },
  { to: '/vacancies', label: 'Vacancies' },
  { href: WHISTLEBLOWER_URL, label: 'Whistleblower' },
  { to: '/shop', label: 'Shop' },
  { to: '/documents', label: 'Documents' },
]

const aboutSections = [
  { href: '/about',            label: 'About Salt'    },
  { href: '/about/values',     label: 'Our Values'    },
  { href: '/partners',         label: 'Partners'      },
  { href: '/about/milestones', label: 'Milestones'    },
  { href: '/about/awards',     label: 'Awards'        },
  { href: '/about/team',       label: 'Meet the Team' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const aboutRef = useRef<HTMLDivElement>(null)
  const aboutTriggerRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()

  // Close drawer on route change (cleanup runs before the next pathname takes effect)
  useEffect(() => {
    return () => {
      setMobileOpen(false)
    }
  }, [location.pathname])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close About dropdown on outside click or Escape
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && aboutOpen) {
        setAboutOpen(false)
        aboutTriggerRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [aboutOpen])

  const isAboutActive = location.pathname.startsWith('/about')

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        {/* Gradient accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1E3A8A] via-[#0064A8] to-[#0075C4]" />

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-3.5">

          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center">
            <img
              src={saltLogo}
              alt="Salt Essential IT logo"
              className="h-9 w-auto md:h-11"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              if (item.to === '/about') {
                return (
                  <div key={item.to} className="relative" ref={aboutRef}>
                    <button
                      ref={aboutTriggerRef}
                      type="button"
                      aria-expanded={aboutOpen}
                      aria-haspopup="true"
                      aria-controls="about-dropdown"
                      onClick={() => setAboutOpen((prev) => !prev)}
                      className={[
                        'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93C5FD] focus-visible:ring-offset-2',
                        isAboutActive
                          ? 'bg-[#EFF6FF] text-[#0064A8]'
                          : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0064A8]',
                      ].join(' ')}
                    >
                      <span>About</span>
                      <ChevronDown
                        className={[
                          'h-3.5 w-3.5 transition-transform duration-200',
                          aboutOpen ? 'rotate-180' : '',
                        ].join(' ')}
                      />
                    </button>

                    {aboutOpen && (
                      <div id="about-dropdown" className="absolute left-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-xl">
                        <Link
                          to="/about"
                          onClick={() => setAboutOpen(false)}
                          className="flex items-center gap-2 border-b border-[#F1F5F9] px-4 py-3 text-xs font-semibold text-[#0064A8] hover:bg-[#EFF6FF]"
                        >
                          About Salt
                        </Link>
                        {aboutSections.slice(1).map((section) => (
                          <Link
                            key={section.href}
                            to={section.href}
                            onClick={() => setAboutOpen(false)}
                            className="flex items-center px-4 py-2.5 text-sm text-[#374151] transition hover:bg-[#F8FAFC] hover:text-[#0064A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#93C5FD]"
                          >
                            {section.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              if (item.href) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium transition-colors text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0064A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93C5FD] focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </a>
                )
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to!}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    [
                      'rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93C5FD] focus-visible:ring-offset-2',
                      isActive
                        ? 'bg-[#EFF6FF] text-[#0064A8]'
                        : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0064A8]',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Link
              to="/contact"
              className="rounded-full bg-[#0064A8] px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition hover:bg-[#0075C4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93C5FD] focus-visible:ring-offset-2"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] bg-white p-2 text-[#0F172A] shadow-sm transition hover:bg-[#F8FAFC] md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile drawer — rendered outside header to avoid stacking context issues */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              className="fixed right-0 top-0 z-[70] flex h-auto max-h-[85vh] w-[300px] max-w-[85vw] flex-col rounded-bl-2xl bg-white shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-[#F1F5F9] px-5 py-4">
                <img src={saltLogo} alt="Salt Essential IT" className="h-8 w-auto" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-1.5 text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93C5FD]"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Mobile navigation">
                {navItems.map((item) => {
                  const active = location.pathname === item.to || (item.to === '/about' && isAboutActive)

                  if (item.to === '/about') {
                    return (
                      <div key={item.to}>
                        <div className="flex items-center gap-1">
                          <Link
                            to="/about"
                            className={[
                              'flex-1 rounded-lg px-3 py-3 text-sm font-semibold transition-colors',
                              active ? 'text-[#0064A8]' : 'text-[#0F172A]',
                            ].join(' ')}
                          >
                            About
                          </Link>
                          <button
                            type="button"
                            aria-expanded={mobileAboutOpen}
                            onClick={() => setMobileAboutOpen((prev) => !prev)}
                            className="rounded-lg p-2 text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#0064A8]"
                            aria-label="Toggle About sub-menu"
                          >
                            <ChevronDown
                              className={[
                                'h-4 w-4 transition-transform duration-200',
                                mobileAboutOpen ? 'rotate-180' : '',
                              ].join(' ')}
                            />
                          </button>
                        </div>

                        <AnimatePresence initial={false}>
                          {mobileAboutOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="mb-2 ml-3 flex flex-col gap-0.5 border-l-2 border-[#BFDBFE] pl-3">
                                {aboutSections.map((section) => (
                                  <Link
                                    key={section.href}
                                    to={section.href}
                                    className={[
                                      'flex items-center gap-1.5 rounded-md px-2 py-2 text-sm transition-colors',
                                      location.pathname === section.href
                                        ? 'font-semibold text-[#0064A8]'
                                        : 'text-[#64748B] hover:text-[#0064A8]',
                                    ].join(' ')}
                                  >
                                    <ChevronRight className="h-3 w-3 shrink-0 opacity-40" />
                                    {section.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  if (item.href) {
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className="flex items-center rounded-lg px-3 py-3 text-sm font-semibold transition-colors text-[#0F172A] hover:text-[#0064A8]"
                      >
                        {item.label}
                      </a>
                    )
                  }

                  return (
                    <Link
                      key={item.to}
                      to={item.to!}
                      className={[
                        'flex items-center rounded-lg px-3 py-3 text-sm font-semibold transition-colors',
                        active ? 'text-[#0064A8]' : 'text-[#0F172A] hover:text-[#0064A8]',
                      ].join(' ')}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              {/* CTA */}
              <div className="border-t border-[#F1F5F9] px-4 pb-8 pt-4">
                <Link
                  to="/contact"
                  className="flex w-full items-center justify-center rounded-full bg-[#0064A8] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-[#0075C4]"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
