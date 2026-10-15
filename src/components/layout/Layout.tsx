import { Outlet } from 'react-router'
import { Header } from './Header'
import { Footer } from './Footer'
import { useTheme } from '@/hooks/useTheme'

// Каркас сторінки: фіксована шапка, основна область (Outlet) та підвал.
// Тема керується тут, щоб бути спільною для всіх сторінок.
export function Layout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex min-h-screen flex-col">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
