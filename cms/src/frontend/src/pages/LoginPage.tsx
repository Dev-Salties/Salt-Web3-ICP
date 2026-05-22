import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login, authReady } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      await login()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0064A8] text-xl font-black text-white">S</div>
        <h1 className="mt-5 text-2xl font-extrabold text-slate-900">Salt Essential CMS</h1>
        <p className="mt-1 text-sm text-slate-500">Sign in with Internet Identity to manage content.</p>

        {error && (
          <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
        )}

        <button
          type="button"
          disabled={!authReady || loading}
          onClick={() => void handleLogin()}
          className="mt-6 w-full rounded-full bg-[#0064A8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0075C4] disabled:opacity-50"
        >
          {loading ? 'Connecting…' : 'Sign in with Internet Identity'}
        </button>

        <p className="mt-4 text-center text-xs text-slate-400">
          Passwordless · Decentralised · Secured by ICP
        </p>
      </div>
    </div>
  )
}
