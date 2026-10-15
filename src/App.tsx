import { BrowserRouter, Routes, Route } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Login } from '@/pages/Login'
import { Orders } from '@/pages/Orders'
import { NotFound } from '@/pages/NotFound'

// Кореневий компонент: маршрутизація SPA. Усі сторінки — усередині спільного
// каркаса Layout (шапка/підвал). Сторінка замовлень захищена ProtectedRoute.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
