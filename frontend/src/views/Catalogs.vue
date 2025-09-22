<script>

import Cart from "@/components/cart.vue";
import OrderModal from '@/components/OrderModal.vue'
import { useServicesStore } from '@/stores/services'

export default {
  name: 'ServicesPage',
  
  components: {

    Cart,
    OrderModal
  },

  data() {
    return {
      selectedService: null
    }
  },

  setup() {
    const servicesStore = useServicesStore()
    return { servicesStore }
  },

  computed: {
    serviceGroups() {
      const groups = []
      const services = this.servicesStore.services
      
      for (let i = 0; i < services.length; i += 3) {
        groups.push(services.slice(i, i + 3))
      }
      
      while (groups.length < 4 && services.length > 0) {
        groups.push([])
      }
      
      return groups
    }
  },

  async mounted() {
    // Сбросим selectedService на всякий случай
    this.selectedService = null
    
    // Загружаем услуги при входе на страницу
    if (this.servicesStore.services.length === 0) {
      await this.loadServices()
    }
  },

  methods: {
    async loadServices() {
      await this.servicesStore.loadServices()
    },

    openOrderModal(service) {
      console.log('Opening modal with service:', service)
      if (service && service.id) {
        this.selectedService = service
      } else {
        console.error('Invalid service data:', service)
      }
    },

    handleCartClick(serviceData) {
      console.log('Cart clicked with data:', serviceData)
      this.openOrderModal(serviceData)
    },
    
    closeModal() {
      console.log('Closing modal')
      this.selectedService = null
    },
    
    handleOrderCreated(orderData) {
      console.log('Заказ создан:', orderData)
      alert('Заказ успешно создан!')
      this.closeModal()
    }
  }
}
</script>

<template>
  <main>
    <!-- Модальное окно заказа -->
    <OrderModal 
      v-if="selectedService"
      :service="selectedService"
      @close="closeModal"
      @order-created="handleOrderCreated" 
    />
    


    <!-- Состояние загрузки -->
    <div v-if="servicesStore.loading" class="loading-state">
      <div class="spinner"></div>
      <p>Загрузка услуг...</p>
    </div>

    <!-- Состояние ошибки -->
    <div v-else-if="servicesStore.error" class="error-state">
      <p>Ошибка загрузки: {{ servicesStore.error }}</p>
      <button @click="loadServices" class="retry-btn">Попробовать снова</button>
    </div>

    <!-- Успешная загрузка - динамические карточки -->
    <template v-else-if="servicesStore.services.length > 0">
      <div 
        v-for="(serviceGroup, index) in serviceGroups" 
        :key="index"
        class="cartBox-container"
      >
        <Cart
          v-for="service in serviceGroup"
          :key="service.id"
          class="cartOne"
          :service-data="service" 
          :ImageCart="service.image_url" 
          :text-one="service.name" 
          :text-two="service.description" 
          :price="service.price" 
          @cak="handleCartClick"
        />
        
        <!-- Заполнители для сохранения layout -->
        <div 
          v-for="n in 3 - serviceGroup.length" 
          :key="'placeholder-' + n"
          class="cart-placeholder"
        ></div>
      </div>
    </template>

    <!-- Если услуг нет -->
    <div v-else class="no-services">
      <p>Услуги временно недоступны</p>
    </div>

    <!-- InfoBox компонент -->
  </main>
</template>

<style scoped>
.cartBox-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2.292vw;
  justify-content: center;
  margin: 2rem 0;
}

.cart-placeholder {
  width: 19.792vw;
  visibility: hidden;
}

.loading-state, .error-state, .no-services {
  text-align: center;
  padding: 60px 20px;
  color: #fff;
}

.spinner {
  border: 4px solid #296300;
  border-left: 4px solid #0DFF00;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  background: #0DFF00;
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}

.error-state {
  color: #ff4444;
}

.no-services {
  color: #888;
}
</style>