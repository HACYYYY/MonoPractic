import { defineStore } from 'pinia'
import { getServices, createOrder } from '@/api/services'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [],
    loading: false,
    error: null,
    selectedService: null
  }),

  actions: {
    // Убедись что этот метод есть!
    async loadServices() {
      this.loading = true
      this.error = null
      
      try {
        const services = await getServices()
        this.services = services
        console.log('Services loaded:', services)
      } catch (error) {
        this.error = error.message
        console.error('Error loading services:', error)
      } finally {
        this.loading = false
      }
    },

    setSelectedService(service) {
      this.selectedService = service
    },

    async makeOrder(orderData) {
      try {
        const result = await createOrder(orderData)
        return result
      } catch (error) {
        throw error
      }
    }
  },

  getters: {
    getServiceById: (state) => (id) => {
      return state.services.find(service => service.id === id)
    },
    
    servicesByCategory: (state) => (category) => {
      return state.services.filter(service => service.category === category)
    },
    
    featuredServices: (state) => {
      return state.services.slice(0, 3)
    }
  }
})