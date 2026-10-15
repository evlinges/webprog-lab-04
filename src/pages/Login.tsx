import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useLocation, Link } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { Card } from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { getErrorMessage } from '@/services/api'

interface LocationState {
  from?: { pathname: string }
}

// Сторінка входу. Після успішної аутентифікації повертає користувача на
// сторінку, з якої його перенаправили (або на /orders).
export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as LocationState)?.from?.pathname ?? '/orders'

  const [email, setEmail] = useState('admin@rezanok.ua')
  const [password, setPassword] = useState('admin12345')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md py-10">
      <Card title="Вхід до системи">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Електронна пошта"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@rezanok.ua"
            required
          />
          <Input
            label="Пароль"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-300">
              {error}
            </p>
          )}
          <Button type="submit" isLoading={loading} className="w-full">
            Увійти
          </Button>
        </form>
        <div className="mt-4 rounded-lg bg-neutral-50 p-3 text-xs text-neutral-500 dark:bg-neutral-800/50 dark:text-neutral-400">
          Демо-доступ уже підставлено: <b>admin@rezanok.ua</b> / <b>admin12345</b>. Дані тягнуться з
          розгорнутого бекенду ЛР3.
        </div>
      </Card>
      <p className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
        <Link to="/" className="hover:text-primary-600">
          ← На головну
        </Link>
      </p>
    </div>
  )
}
