/**
 * Internet Identity auth context.
 * Wrap the app in <AuthProvider> to get useAuth() anywhere.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { AuthClient } from '@dfinity/auth-client'
import type { Identity } from '@dfinity/agent'

const DFX_NETWORK = (import.meta.env.VITE_DFX_NETWORK as string) ?? 'local'

// Prefer env override; fallback to mainnet II (works even during local dev)
const II_URL =
  (import.meta.env.VITE_II_URL as string) ??
  (DFX_NETWORK === 'local'
    ? 'https://identity.ic0.app'
    : 'https://identity.ic0.app')

type AuthState = {
  identity:   Identity | null
  principal:  string
  isAuth:     boolean
  authReady:  boolean
  login:      () => Promise<void>
  logout:     () => Promise<void>
}

const AuthContext = createContext<AuthState>({
  identity:  null,
  principal: '',
  isAuth:    false,
  authReady: false,
  login:     async () => {},
  logout:    async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [client,   setClient]   = useState<AuthClient | null>(null)
  const [identity, setIdentity] = useState<Identity | null>(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    AuthClient.create().then(async (c) => {
      setClient(c)
      if (await c.isAuthenticated()) setIdentity(c.getIdentity())
      setAuthReady(true)
    })
  }, [])

  const login = async () => {
    if (!client) return
    await new Promise<void>((res, rej) =>
      client.login({
        identityProvider: II_URL,
        onSuccess: () => { setIdentity(client.getIdentity()); res() },
        onError:   (e) => rej(e ?? new Error('II login failed')),
      }),
    )
  }

  const logout = async () => {
    await client?.logout()
    setIdentity(null)
  }

  return (
    <AuthContext.Provider value={{
      identity,
      principal: identity?.getPrincipal().toText() ?? '',
      isAuth:    Boolean(identity),
      authReady,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)