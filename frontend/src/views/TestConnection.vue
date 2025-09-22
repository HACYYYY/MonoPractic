<template>
  <div class="test-connection">
    <div class="container">
      <h1>🧪 Тестирование подключения к серверу</h1>
      
      <!-- Статус сервера -->
      <div class="status-card">
        <h3>Статус сервера:</h3>
        <div class="status-indicator" :class="serverStatus">
          {{ serverStatusText }}
        </div>
        <button @click="checkServerStatus" class="test-btn">
          Проверить подключение
        </button>
      </div>

      <!-- Тестовые запросы -->
      <div class="tests-section">
        <h3>Тестовые запросы к API:</h3>
        
        <div class="test-buttons">
          <button @click="testGetServices" class="test-btn" :disabled="loading.getServices">
            {{ loading.getServices ? 'Загрузка...' : 'Получить услуги' }}
          </button>
          
          <button @click="testCreateOrder" class="test-btn" :disabled="loading.createOrder">
            {{ loading.createOrder ? 'Загрузка...' : 'Создать заказ' }}
          </button>
          
          <button @click="testAuth" class="test-btn" :disabled="loading.auth">
            {{ loading.auth ? 'Загрузка...' : 'Тест авторизации' }}
          </button>
        </div>

        <!-- Результаты -->
        <div class="results">
          <h4>Результаты:</h4>
          <pre class="result-data">{{ JSON.stringify(results, null, 2) }}</pre>
        </div>

        <!-- Логи -->
        <div class="logs">
          <h4>Лог запросов:</h4>
          <div class="log-entries">
            <div v-for="(log, index) in logs" :key="index" class="log-entry" :class="log.type">
              [{{ log.time }}] {{ log.message }}
            </div>
          </div>
        </div>
      </div>

      <!-- Информация о текущем пользователе -->
      <div class="user-info" v-if="authStore.isAuthenticated">
        <h3>📊 Текущий пользователь:</h3>
        <p><strong>Имя:</strong> {{ authStore.userName }}</p>
        <p><strong>Email:</strong> {{ authStore.user?.email }}</p>
        <p><strong>Баланс:</strong> {{ authStore.userBalance }} ₽</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { getServices } from '@/api/services' // Только getServices
import { createOrder } from '@/api/orders'    // createOrder из другого файла
import { login } from '@/api/auth'

export default {
  name: 'TestConnection',
  
  data() {
    return {
      serverStatus: 'unknown',
      serverStatusText: 'Не проверен',
      loading: {
        getServices: false,
        createOrder: false,
        auth: false
      },
      results: {},
      logs: []
    }
  },

  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },

  async mounted() {
    await this.checkServerStatus()
  },

  methods: {
    addLog(message, type = 'info') {
      this.logs.unshift({
        time: new Date().toLocaleTimeString(),
        message,
        type
      })
      // Ограничиваем лог 20 записями
      if (this.logs.length > 20) this.logs.pop()
    },

    async checkServerStatus() {
      this.addLog('Проверка статуса сервера...')
      
      try {
        const response = await fetch('http://localhost:5000/api/test')
        if (response.ok) {
          this.serverStatus = 'success'
          this.serverStatusText = 'Сервер работает ✅'
          this.addLog('Сервер доступен и отвечает', 'success')
        } else {
          this.serverStatus = 'error'
          this.serverStatusText = 'Сервер не отвечает ❌'
          this.addLog(`Ошибка сервера: ${response.status}`, 'error')
        }
      } catch (error) {
        this.serverStatus = 'error'
        this.serverStatusText = 'Сервер недоступен ❌'
        this.addLog(`Ошибка подключения: ${error.message}`, 'error')
      }
    },

    async testGetServices() {
      this.loading.getServices = true
      this.addLog('Запрос списка услуг...')
      
      try {
        const services = await getServices()
        this.results.services = services
        this.addLog(`Получено услуг: ${services.length}`, 'success')
      } catch (error) {
        this.results.servicesError = error.message
        this.addLog(`Ошибка получения услуг: ${error.message}`, 'error')
      } finally {
        this.loading.getServices = false
      }
    },

    async testCreateOrder() {
      this.loading.createOrder = true
      this.addLog('Создание тестового заказа...')
      
      try {
        const orderData = {
          serviceId: 1,
          quantity: 1,
          comments: 'Тестовый заказ из панели тестирования'
        }
        
        const order = await createOrder(orderData)
        this.results.order = order
        this.addLog(`Заказ создан: ID ${order.orderId}`, 'success')
      } catch (error) {
        this.results.orderError = error.message
        this.addLog(`Ошибка создания заказа: ${error.message}`, 'error')
      } finally {
        this.loading.createOrder = false
      }
    },

    async testAuth() {
      this.loading.auth = true
      this.addLog('Тест авторизации...')
      
      try {
        const credentials = {
          email: 'test@example.com',
          password: 'test123'
        }
        
        const result = await login(credentials)
        this.results.auth = result
        this.addLog('Авторизация успешна', 'success')
      } catch (error) {
        this.results.authError = error.message
        this.addLog(`Ошибка авторизации: ${error.message}`, 'error')
      } finally {
        this.loading.auth = false
      }
    },

    clearLogs() {
      this.logs = []
      this.addLog('Логи очищены')
    }
  }
}
</script>

<style scoped>
.test-connection {
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding: 20px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  color: #0DFF00;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 0 0 10px #0DFF00;
}

.status-card, .tests-section, .user-info {
  background: #2C2C2C;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid #296300;
}

.status-indicator {
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  margin: 10px 0;
}

.status-indicator.success {
  background: #296300;
  color: #0DFF00;
  border: 1px solid #0DFF00;
}

.status-indicator.error {
  background: #630000;
  color: #ff4444;
  border: 1px solid #ff4444;
}

.status-indicator.unknown {
  background: #333;
  color: #888;
  border: 1px solid #888;
}

.test-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 15px 0;
}

.test-btn {
  background: linear-gradient(45deg, #0DFF00, #296300);
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.test-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(13, 255, 0, 0.4);
}

.test-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.results, .logs {
  margin-top: 20px;
}

.result-data {
  background: #1A1A1A;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  font-size: 12px;
  max-height: 300px;
  overflow-y: auto;
}

.log-entries {
  max-height: 200px;
  overflow-y: auto;
}

.log-entry {
  padding: 5px 10px;
  margin: 2px 0;
  border-left: 3px solid #296300;
  font-family: monospace;
  font-size: 12px;
}

.log-entry.success {
  border-left-color: #0DFF00;
  color: #0DFF00;
}

.log-entry.error {
  border-left-color: #ff4444;
  color: #ff4444;
}

.log-entry.info {
  border-left-color: #296300;
  color: #fff;
}

.user-info {
  background: #1A3C1A;
  border-color: #0DFF00;
}

.user-info p {
  margin: 5px 0;
}
</style>