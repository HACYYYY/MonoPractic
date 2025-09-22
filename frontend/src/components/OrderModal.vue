<template>
  <div v-if="service" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Оформление заказа</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      
      <div class="modal-body">
        <div class="service-info">
          <h3>{{ serviceName }}</h3>
          <p class="service-price">{{ servicePrice }} ₽</p>
        </div>
        <form @submit.prevent="submitOrder" class="order-form">
          <div class="form-group">
            <label>Количество:</label>
            <input 
              type="number" 
              v-model.number="form.quantity" 
              min="1" 
              max="10"
              required
            >
          </div>
          
          <div class="form-group">
            <label>Комментарий к заказу:</label>
            <textarea 
              v-model="form.comments" 
              placeholder="Дополнительные пожелания..."
              rows="3"
            ></textarea>
          </div>
          
          <div class="order-summary">
            <p>Итого: <strong>{{ totalPrice }} ₽</strong></p>
          </div>
          
          <button 
            type="submit" 
            :disabled="loading"
            class="submit-btn"
          >
            {{ loading ? 'Оформление...' : 'Оформить заказ' }}
          </button>
        </form>
      </div>
    </div>
  </div>
      
</template>

<script>
import { createOrder } from '@/api/services'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'OrderModal',
  
  props: {
    service: {
      type: Object,
      default: () => ({ // Защита по умолчанию
        id: 0,
        name: 'Услуга',
        price: 0,
        description: ''
      })
    }
  },

  emits: ['close', 'order-created'],

  data() {
    return {
      form: {
        quantity: 1,
        comments: ''
      },
      loading: false
    }
  },

  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },

  computed: {
    totalPrice() {
      return (this.service?.price || 0) * this.form.quantity
    },
    
    // Защищенное имя услуги
    serviceName() {
      return this.service?.name || 'Услуга'
    },
    
    // Защищенная цена
    servicePrice() {
      return this.service?.price || 0
    }
  },

  methods: {
    async submitOrder() {
      if (!this.authStore.isAuthenticated) {
        alert('Для оформления заказа необходимо войти в систему')
        this.$emit('close')
        this.$router.push('/login')
        return
      }

      // Дополнительная проверка service
      if (!this.service?.id) {
        alert('Ошибка: данные услуги не загружены')
        return
      }

      this.loading = true
      
      try {
        const orderData = {
          serviceId: this.service.id,
          quantity: this.form.quantity,
          comments: this.form.comments,
          totalPrice: this.totalPrice
        }
        
        const result = await createOrder(orderData)
        this.$emit('order-created', result)
        alert('Заказ успешно создан!')
        this.$emit('close')
        
      } catch (error) {
        alert('Ошибка создания заказа: ' + error.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #2C2C2C;
  border: 2px solid #0DFF00;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #296300;
}

.modal-header h2 {
  color: #0DFF00;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
}

.close-btn:hover {
  color: #0DFF00;
}

.modal-body {
  padding: 20px;
}

.service-info {
  text-align: center;
  margin-bottom: 20px;
}

.service-info h3 {
  color: #0DFF00;
  margin-bottom: 10px;
}

.service-price {
  font-size: 20px;
  font-weight: bold;
  color: #0DFF00;
}

.order-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: #fff;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  padding: 10px;
  border: 1px solid #296300;
  border-radius: 5px;
  background: #000;
  color: #fff;
  font-size: 16px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0DFF00;
}

.order-summary {
  text-align: center;
  padding: 10px;
  background: #1A1A1A;
  border-radius: 5px;
  border: 1px solid #0DFF00;
}

.submit-btn {
  background: linear-gradient(45deg, #0DFF00, #296300);
  color: #000;
  border: none;
  padding: 12px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>