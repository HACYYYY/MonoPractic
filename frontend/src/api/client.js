import axios from 'axios'

// Настройка настоящего API клиента
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Наш настоящий бэкенд
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Добавляем токен к каждому запросу
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Обрабатываем ошибки
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      // Перенаправляем на логин только если мы не на странице логина
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default API