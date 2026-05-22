import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import OverviewPage from './pages/OverviewPage'
import CatsPage from './pages/CatsPage'
// @ts-ignore
import './index.css'

/**
 * Minimal router — swap for @tanstack/react-router or react-router-dom
 * once dfx generate has run and you want full type-safe routing.
 */
function Router() {
  const path = window.location.pathname
  if (path === '/cats')      return <CatsPage />
  if (path === '/articles')  return <div className="p-8 text-slate-500">Articles — coming soon</div>
  if (path === '/products')  return <div className="p-8 text-slate-500">Products — coming soon</div>
  if (path === '/vacancies') return <div className="p-8 text-slate-500">Vacancies — coming soon</div>
  if (path === '/team')      return <div className="p-8 text-slate-500">Team — coming soon</div>
  if (path === '/settings')  return <div className="p-8 text-slate-500">Settings — coming soon</div>
  return <OverviewPage />
}

function App() {
  const { isAuth, authReady } = useAuth()

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#0064A8]" />
      </div>
    )
  }

  if (!isAuth) return <LoginPage />

  return (
    <Layout>
      <Router />
    </Layout>
  )
}

const qc = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
