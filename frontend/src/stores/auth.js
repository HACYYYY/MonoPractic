import { defineStore } from 'pinia'
import { login, register, logout } from '@/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isLoading: false
  }),

  actions: {
    async loginUser(credentials) {
      this.isLoading = true
      try {
        const response = await login(credentials)
        this.user = response.user
        this.isAuthenticated = true
        localStorage.setItem('authToken', response.token)
        return response
      } catch (error) {
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async registerUser(userData) {
      this.isLoading = true
      try {
        const response = await register(userData)
        return response
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
    },

    setUser(userData) {
      this.user = userData
      this.isAuthenticated = true
    }
  },

  getters: {
    userName: (state) => state.user?.name || 'Пользователь',
    userBalance: (state) => state.user?.balance || 0,
    userAvatar: (state) => state.user?.avatar || ''
  }
})