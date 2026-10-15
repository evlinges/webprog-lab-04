// Провайдер аутентифікації. Тримає поточного користувача, відновлює сесію з
// токена при завантаженні та надає методи login/logout через контекст.
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './auth-context'
import type { User } from '@/types/api.types'
import { login as loginRequest, getMe } from '@/services/auth.service'
import { TOKEN_KEY } from '@/constants'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // При старті: якщо є збережений токен — підвантажуємо профіль.
  useEffect(() => {
    let active = true
    const restore = async () => {
      const token = localStorage.getItem(TOKEN_KEY)
      if (!token) {
        if (active) setLoading(false)
        return
      }
      try {
        const me = await getMe()
        if (active) setUser(me)
      } catch {
        localStorage.removeItem(TOKEN_KEY)
      } finally {
        if (active) setLoading(false)
      }
    }
    void restore()
    return () => {
      active = false
    }
  }, [])

  const login = async (email: string, password: string) => {
    const result = await loginRequest(email, password)
    localStorage.setItem(TOKEN_KEY, result.accessToken)
    setUser(result.user)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
