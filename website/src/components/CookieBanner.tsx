import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

const STORAGE_KEY = 'salt_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed bottom-6 left-4 right-4 z-[60] mx-auto max-w-2xl rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xl md:left-6 md:right-auto md:max-w-md"
        >
          <button
            type="button"
            onClick={decline}
            aria-label="Close cookie banner"
            className="absolute right-3 top-3 rounded-md p-1 text-[#94A3B8] transition hover:bg-[#F8FAFC] hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4]"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#0064A8]">
              <Cookie className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">
                Cookie & Privacy Notice
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                We use cookies to improve your experience on our website. In accordance
                with the{' '}
                <span className="font-medium text-[#0F172A]">
                  Namibia Data Protection Act (NDPA)
                </span>{' '}
                and{' '}
                <span className="font-medium text-[#0F172A]">POPIA</span>, we process
                your data responsibly. Read our{' '}
                <Link
                  to="/privacy-policy"
                  className="font-medium text-[#0064A8] underline underline-offset-2 hover:text-[#0075C4] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0075C4]"
                >
                  Privacy Policy
                </Link>{' '}
                for full details.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={accept}
                  className="rounded-full bg-[#0064A8] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0075C4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={decline}
                  className="rounded-full border border-[#E2E8F0] bg-white px-4 py-1.5 text-xs font-semibold text-[#374151] transition hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
