// Налаштований екземпляр Axios для всіх запитів до REST API.
// Interceptor запиту додає JWT-токен, interceptor відповіді централізовано
// обробляє 401 (недійсний токен → вихід і перехід на сторінку входу).
import axios from 'axios'
import { API_URL, TOKEN_KEY } from '@/constants'

export const api = axios.create({
  baseURL: API_URL,
  // Бекенд на безкоштовному хостингу може «прокидатися» до хвилини.
  timeout: 45000,
})

// Interceptor запиту: підставляє заголовок Authorization, якщо є токен.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor відповіді: 401 → очищаємо токен і відправляємо на /login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      if (window.location.pathname !== '/login') {
        window.location.assign('/login')
      }
    }
    return Promise.reject(error)
  },
)

// Витягує зрозуміле повідомлення про помилку з відповіді Axios.
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error?.message ?? error.message
  }
  return error instanceof Error ? error.message : 'Невідома помилка'
}
