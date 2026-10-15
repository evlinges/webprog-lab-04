import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { Loading } from '@/components/common/Loading'

// Обгортка маршруту, що вимагає аутентифікації. Поки перевіряється сесія —
// показує індикатор; якщо користувач не ввійшов — перенаправляє на /login.
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="grid place-items-center py-24">
        <Loading size="lg" label="Перевірка сесії…" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
