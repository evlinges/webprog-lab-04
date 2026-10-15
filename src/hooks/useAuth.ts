import { useContext } from 'react'
import { AuthContext } from './auth-context'

// Доступ до стану аутентифікації. Кидає помилку, якщо викликано поза провайдером.
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth має використовуватись усередині <AuthProvider>')
  }
  return ctx
}
