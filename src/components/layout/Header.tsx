import { Link, NavLink } from 'react-router'
import { APP_NAME, NAV_LINKS } from '@/constants'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'
import type { Theme } from '@/hooks/useTheme'
import { cn } from '@/utils/cn'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

// Шапка з логотипом, навігацією, перемиканням теми та станом авторизації.
export function Header({ theme, onToggleTheme }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-500 text-white">
            🏅
          </span>
          <span>{APP_NAME}</span>
        </Link>

        <nav className="hidden gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300'
                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Перемкнути тему"
            className="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-neutral-500 sm:inline dark:text-neutral-400">
                {user?.fullName}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                Вийти
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm">Увійти</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
