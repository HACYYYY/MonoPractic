<template>
  <div class="profile-orders">
    <div class="orders-header">
      <h2>📦 История заказов</h2>
      <div class="orders-stats">
        <span class="stat">Всего заказов: {{ orders.length }}</span>
        <span class="stat">Выполнено: {{ completedOrders }}</span>
      </div>
    </div>

    <!-- Фильтры -->
    <div class="orders-filters">
      <select v-model="filterStatus" class="filter-select">
        <option value="all">Все статусы</option>
        <option value="pending">В обработке</option>
        <option value="in_progress">В работе</option>
        <option value="completed">Завершено</option>
        <option value="cancelled">Отменено</option>
      </select>
      
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="Поиск по услугам..."
        class="search-input"
      >
    </div>

    <!-- Список заказов -->
    <div v-if="filteredOrders.length > 0" class="orders-list">
      <div 
        v-for="order in filteredOrders" 
        :key="order.id"
        class="order-item"
        :class="order.status"
      >
        <div class="order-header">
          <div class="order-info">
            <h3>{{ order.service_name }}</h3>
            <span class="order-date">{{ formatDate(order.created_at) }}</span>
          </div>
          <div class="order-price">{{ order.total_price }} ₽</div>
        </div>
        
        <div class="order-details">
          <div class="order-meta">
            <span class="order-id">Заказ #{{ order.id }}</span>
            <span class="order-quantity">Количество: {{ order.quantity }}</span>
            <span class="order-status" :class="order.status">
              {{ getStatusText(order.status) }}
            </span>
          </div>
          
          <div v-if="order.comments" class="order-comments">
            <strong>Комментарий:</strong> {{ order.comments }}
          </div>
        </div>
        
        <div class="order-actions">
          <button v-if="order.status === 'pending'" class="action-btn cancel-btn">
            Отменить заказ
          </button>
          <button class="action-btn details-btn">
            Подробнее
          </button>
        </div>
      </div>
    </div>

    <!-- Пустой список -->
    <div v-else class="empty-orders">
      <div class="empty-icon">📦</div>
      <h3>Заказов пока нет</h3>
      <p>Перейдите в каталог услуг чтобы сделать первый заказ</p>
      <router-link to="/services" class="catalog-link">
        Перейти в каталог
      </router-link>
    </div>

    <!-- Пагинация -->
    <div v-if="filteredOrders.length > itemsPerPage" class="pagination">
      <button 
        @click="currentPage--" 
        :disabled="currentPage === 1"
        class="page-btn"
      >
        Назад
      </button>
      
      <span class="page-info">Страница {{ currentPage }} из {{ totalPages }}</span>
      
      <button 
        @click="currentPage++" 
        :disabled="currentPage === totalPages"
        class="page-btn"
      >
        Вперед
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileOrders',
  
  data() {
    return {
      orders: [],
      filterStatus: 'all',
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 5,
      loading: false
    }
  },

  computed: {
    filteredOrders() {
      let filtered = this.orders

      // Фильтр по статусу
      if (this.filterStatus !== 'all') {
        filtered = filtered.filter(order => order.status === this.filterStatus)
      }

      // Поиск по названию услуги
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(order => 
          order.service_name.toLowerCase().includes(query)
        )
      }

      // Пагинация
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      
      return filtered.slice(start, end)
    },

    totalPages() {
      return Math.ceil(this.orders.length / this.itemsPerPage)
    },

    completedOrders() {
      return this.orders.filter(order => order.status === 'completed').length
    }
  },

  async mounted() {
    await this.loadOrders()
  },

  methods: {
    async loadOrders() {
      this.loading = true
      
      // Имитируем загрузку заказов с сервера
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Тестовые данные (позже заменим на реальные)
        this.orders = [
          {
            id: 1,
            service_name: 'Разработка сайта',
            total_price: 25000,
            quantity: 1,
            status: 'completed',
            created_at: '2024-01-15T10:30:00Z',
            comments: 'Нужен адаптивный дизайн'
          },
          {
            id: 2,
            service_name: 'SEO-оптимизация',
            total_price: 15000,
            quantity: 1,
            status: 'in_progress',
            created_at: '2024-01-20T14:20:00Z',
            comments: ''
          },
          {
            id: 3,
            service_name: 'Техническая поддержка',
            total_price: 5000,
            quantity: 3,
            status: 'pending',
            created_at: '2024-01-25T09:15:00Z',
            comments: 'Ежемесячное обслуживание'
          }
        ]
      } catch (error) {
        console.error('Error loading orders:', error)
      } finally {
        this.loading = false
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    getStatusText(status) {
      const statusMap = {
        pending: 'В обработке',
        in_progress: 'В работе',
        completed: 'Завершено',
        cancelled: 'Отменено'
      }
      return statusMap[status] || status
    }
  },

  watch: {
    filterStatus() {
      this.currentPage = 1
    },
    searchQuery() {
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
.profile-orders {
  max-width: 800px;
}

.orders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #0DFF00;
}

.orders-stats {
  display: flex;
  gap: 20px;
}

.stat {
  background: #296300;
  color: #0DFF00;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
}

.orders-filters {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.filter-select, .search-input {
  background: #1A1A1A;
  border: 1px solid #296300;
  border-radius: 5px;
  padding: 10px;
  color: #fff;
  min-width: 200px;
}

.search-input {
  flex: 1;
  min-width: 250px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.order-item {
  background: #1A1A1A;
  border: 1px solid #296300;
  border-radius: 10px;
  padding: 20px;
  transition: all 0.3s ease;
}

.order-item:hover {
  border-color: #0DFF00;
  transform: translateY(-2px);
}

.order-item.completed {
  border-left: 4px solid #0DFF00;
}

.order-item.in_progress {
  border-left: 4px solid #ffaa00;
}

.order-item.pending {
  border-left: 4px solid #66ccff;
}

.order-item.cancelled {
  border-left: 4px solid #ff4444;
  opacity: 0.7;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.order-info h3 {
  color: #0DFF00;
  margin-bottom: 5px;
  font-size: 1.1em;
}

.order-date {
  color: #888;
  font-size: 0.9em;
}

.order-price {
  color: #0DFF00;
  font-size: 1.3em;
  font-weight: bold;
  text-shadow: 0 0 5px #0DFF00;
}

.order-details {
  margin-bottom: 15px;
}

.order-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.order-meta span {
  background: #2C2C2C;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.order-status {
  font-weight: bold;
}

.order-status.completed {
  color: #0DFF00;
}

.order-status.in_progress {
  color: #ffaa00;
}

.order-status.pending {
  color: #66ccff;
}

.order-status.cancelled {
  color: #ff4444;
}

.order-comments {
  background: #2C2C2C;
  padding: 10px;
  border-radius: 5px;
  border-left: 3px solid #0DFF00;
}

.order-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.3s ease;
}

.details-btn {
  background: #296300;
  color: #0DFF00;
}

.cancel-btn {
  background: #630000;
  color: #ff4444;
}

.action-btn:hover {
  transform: translateY(-1px);
}

.empty-orders {
  text-align: center;
  padding: 60px 20px;
  color: #888;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.catalog-link {
  color: #0DFF00;
  text-decoration: none;
  font-weight: bold;
  margin-top: 15px;
  display: inline-block;
}

.catalog-link:hover {
  text-decoration: underline;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #296300;
}

.page-btn {
  background: #296300;
  color: #0DFF00;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #ccc;
}
</style>