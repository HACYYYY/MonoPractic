import { useAuthStore } from '@/stores/auth'

export const requireAuth = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated) {
    // Если не авторизован - перенаправляем на логин
    next('/login')
  } else {
    // Если авторизован - пропускаем
    next()
  }
}

export const requireGuest = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (authStore.isAuthenticated) {
    // Если уже авторизован - перенаправляем на главную
    next('/')
  } else {
    // Если гость - пропускаем
    next()
  }
}