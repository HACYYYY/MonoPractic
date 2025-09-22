import { defineStore } from 'pinia'
import { login, register, logout } from '@/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isLoading: false
  }),

  actions: {
  initializeAuth() {
    const token = localStorage.getItem('authToken')
    if (token) {
      this.isAuthenticated = true
      
      // Восстанавливаем данные пользователя
      const savedUser = localStorage.getItem('userData')
      if (savedUser) {
        try {
          this.user = JSON.parse(savedUser)
        } catch (error) {
          console.error('Ошибка восстановления пользователя:', error)
          // Создаем default пользователя если ошибка
          this.user = {
            name: 'Пользователь',
            email: 'user@example.com',
            balance: 0,
            avatar: ''
          }
        }
      }
    }
  },

    async loginUser(credentials) {
      this.isLoading = true
      try {
        // ВРЕМЕННО: Тестовая авторизация
        const userData = {
          id: 1,
          name: credentials.email.split('@')[0] || 'Пользователь',
          email: credentials.email,
          balance: 5000,
          avatar: ''
        }
        
        this.user = userData
        this.isAuthenticated = true
        
        // Сохраняем в localStorage
        localStorage.setItem('authToken', 'demo-token-' + Date.now())
        localStorage.setItem('userData', JSON.stringify(userData))
        
        return { user: userData, token: 'demo-token' }
      } catch (error) {
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async registerUser(userData) {
      this.isLoading = true
      try {
        // ВРЕМЕННО: Тестовая регистрация
        const newUser = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          balance: 0,
          avatar: ''
        }
        
        this.user = newUser
        this.isAuthenticated = true
        
        // Сохраняем в localStorage
        localStorage.setItem('authToken', 'demo-token-' + Date.now())
        localStorage.setItem('userData', JSON.stringify(newUser))
        
        return { user: newUser, token: 'demo-token' }
      } catch (error) {
        throw error
      } finally {
        this.isLoading = false
      }
    },

    logoutUser() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
    },

    setUser(userData) {
  this.user = userData
  this.isAuthenticated = true
  // Сохраняем в localStorage
  localStorage.setItem('userData', JSON.stringify(userData))
}
  },

  getters: {
  userName: (state) => state.user?.name || 'Пользователь',
  userBalance: (state) => {
    // Сначала пробуем из state.user
    if (state.user?.balance !== undefined) {
      return state.user.balance
    }
    // Если нет, пробуем из localStorage
    try {
      const savedUser = localStorage.getItem('userData')
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        return userData.balance || 0
      }
    } catch (error) {
      console.error('Ошибка чтения баланса:', error)
    }
    return 0
  },
  userAvatar: (state) => state.user?.avatar || ''
}
})