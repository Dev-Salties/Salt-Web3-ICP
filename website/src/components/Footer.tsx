import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import saltLogo from '../assets/salt-logo.webp'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073C24 5.445 18.627 0 12 0S0 5.445 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.932-1.956 1.888v2.263h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.9 2H22l-6.8 7.77L23.2 22h-6.7l-4.17-5.3L7.5 22H4.4l7.37-8.42L2 2h6.8l3.76 4.79L18.9 2Zm-1.2 18h1.72L6.07 3.92H4.25L17.7 20Z" />
    </svg>
  )
}

const linkClass =
  'text-[#94A3B8] transition-colors hover:text-white focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0F172A] text-white">
      {/* Top gradient accent — mirrors the navbar bottom border */}
      <div className="h-[2px] bg-gradient-to-r from-[#1E3A8A] via-[#0064A8] to-[#0075C4]" />

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">

        {/* Main grid — brand gets double width */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="mb-4 inline-flex items-center focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
            >
              <img
                src={saltLogo}
                alt="Salt Essential IT logo"
                className="h-10 w-auto md:h-12"
              />
            </Link>
            <p className="mt-3 text-sm font-medium text-[#CBD5E1]">
              Our business enables yours.
            </p>
            <p className="mt-1 text-xs text-[#94A3B8]">
              Essential IT since 1998.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2.5">
              {[
                { href: 'https://www.instagram.com/saltessentialit/', label: 'Salt on Instagram', Icon: InstagramIcon },
                { href: 'https://www.facebook.com/saltessentialit', label: 'Salt on Facebook', Icon: FacebookIcon },
                { href: 'https://www.linkedin.com/company/salt-essential-it-pty-ltd-/', label: 'Salt on LinkedIn', Icon: LinkedInIcon },
                { href: 'https://www.youtube.com/channel/UCwh4TX_q4W05h0yOpz1D_hw', label: 'Salt on YouTube', Icon: YouTubeIcon },
                { href: 'https://twitter.com/saltessentialit', label: 'Salt on X', Icon: XIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-[#94A3B8] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0064A8] hover:bg-[#0064A8] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60A5FA]">
              Company
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/partners', label: 'Partners' },
                { to: '/news', label: 'News & Insights' },
                { to: '/vacancies', label: 'Vacancies' },
                { to: '/seed', label: 'SEED Programme' },
                { to: '/shop', label: 'Shop' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60A5FA]">
              Services
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/services#cloud-services', label: 'Cloud Services' },
                { to: '/services#digital-security', label: 'Digital Security' },
                { to: '/services#support-services', label: 'Support Services' },
                { to: '/services#business-consulting', label: 'Business Consulting' },
                { to: '/services#collaboration', label: 'Collaboration' },
                { to: '/services#hardware-devices', label: 'Hardware & Devices' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60A5FA]">
              Contact
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#3B82F6]" />
                <a href="tel:+264614339900" className={linkClass}>
                  +264 61 433 9900
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#3B82F6]" />
                <a href="mailto:contact@salt.na" className={linkClass}>
                  contact@salt.na
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#3B82F6]" />
                <a href="mailto:sales@salt.na" className={linkClass}>
                  sales@salt.na
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#3B82F6]" />
                <a
                  href="https://www.google.com/maps?q=-22.5789907,17.0920381"
                  target="_blank"
                  rel="noreferrer noopener"
                  className={linkClass}
                >
                  8 Ballot Street
                  <br />
                  Windhoek, Namibia
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/8 pt-6 text-xs text-[#64748B] md:flex-row md:items-center">
          <p>© {year} Salt Essential IT (Pty) Ltd. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/copyrights" className={linkClass}>Copyrights</Link>
            <Link to="/user-agreement" className={linkClass}>User Agreement</Link>
            <Link to="/privacy-policy" className={linkClass}>Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
