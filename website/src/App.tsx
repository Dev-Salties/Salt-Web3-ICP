import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense, Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ZoltWidget from './components/ZoltWidget'
import CookieBanner from './components/CookieBanner'

const About        = lazy(() => import('./pages/About'))
const AboutValues  = lazy(() => import('./pages/about/Values'))
const AboutMilestones = lazy(() => import('./pages/about/Milestones'))
const AboutTeam    = lazy(() => import('./pages/about/Team'))
const AboutStory   = lazy(() => import('./pages/about/Story'))
const AboutAwards  = lazy(() => import('./pages/about/Awards'))
const CATs         = lazy(() => import('./pages/CATs'))
const Services     = lazy(() => import('./pages/Services'))
const Seed         = lazy(() => import('./pages/Seed'))
const Shop         = lazy(() => import('./pages/Shop'))
const Contact      = lazy(() => import('./pages/Contact'))
const Vacancies    = lazy(() => import('./pages/Vacancies'))
const Copyrights   = lazy(() => import('./pages/Copyrights'))
const UserAgreement = lazy(() => import('./pages/UserAgreement'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Partners     = lazy(() => import('./pages/Partners'))
const Documents    = lazy(() => import('./pages/Documents'))
const News         = lazy(() => import('./pages/News'))
const NewsArticle  = lazy(() => import('./pages/NewsArticle'))

// ── Error Boundary ──────────────────────────────────────────────────────────
interface ErrorBoundaryState { hasError: boolean }

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <p className="text-4xl font-extrabold text-[#0064A8]">Oops</p>
          <p className="mt-3 text-lg font-semibold text-[#0F172A]">Something went wrong</p>
          <p className="mt-2 text-sm text-[#64748B]">Try refreshing the page.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0064A8] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/30 transition hover:bg-[#0075C4]"
          >
            Refresh
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// ── Page loading spinner ─────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="flex min-h-[40vh] items-center justify-center"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E2E8F0] border-t-[#0064A8]" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

// ── Scroll restoration ───────────────────────────────────────────────────────
function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      })
      return
    }

    const id = hash.startsWith('#') ? hash.slice(1) : hash
    if (!id) return

    const el = document.getElementById(id)
    if (!el) return

    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [hash, pathname])

  return null
}

// ── 404 ──────────────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-extrabold text-[#0064A8]">404</h1>
      <p className="mt-4 text-xl font-semibold text-[#0F172A]">Page not found</p>
      <p className="mt-2 text-sm text-[#64748B]">
        The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0064A8] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/30 transition hover:bg-[#0075C4]"
      >
        Back to Home
      </a>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-[#F8FAFC] text-[#0F172A]">
          <ScrollToHash />
          <Navbar />
          <main className="flex-1">
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/"                  element={<Home />} />
                  <Route path="/about"             element={<About />} />
                  <Route path="/about/values"      element={<AboutValues />} />
                  <Route path="/about/milestones"  element={<AboutMilestones />} />
                  <Route path="/about/team"        element={<AboutTeam />} />
                  <Route path="/about/story"       element={<AboutStory />} />
                  <Route path="/about/awards"      element={<AboutAwards />} />
                  <Route path="/cats"              element={<CATs />} />
                  <Route path="/services"          element={<Services />} />
                  <Route path="/seed"              element={<Seed />} />
                  <Route path="/shop"              element={<Shop />} />
                  <Route path="/contact"           element={<Contact />} />
                  <Route path="/vacancies"         element={<Vacancies />} />
                  <Route path="/copyrights"        element={<Copyrights />} />
                  <Route path="/user-agreement"    element={<UserAgreement />} />
                  <Route path="/privacy-policy"    element={<PrivacyPolicy />} />
                  <Route path="/partners"          element={<Partners />} />
                  <Route path="/documents"         element={<Documents />} />
                  <Route path="/news"              element={<News />} />
                  <Route path="/news/:slug"        element={<NewsArticle />} />
                  <Route path="*"                  element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
          <ZoltWidget />
          <CookieBanner />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
