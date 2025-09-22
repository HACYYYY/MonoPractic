<template>
  <div class="profile-payments">
    <div class="payments-header">
      <h2>💰 История платежей</h2>
      <div class="payments-stats">
        <span class="stat">Всего операций: {{ payments.length }}</span>
        <span class="stat">Общая сумма: {{ totalAmount }} ₽</span>
      </div>
    </div>

    <!-- Фильтры и период -->
    <div class="payments-controls">
      <div class="filters">
        <select v-model="filterType" class="filter-select">
          <option value="all">Все операции</option>
          <option value="topup">Пополнения</option>
          <option value="payment">Оплаты заказов</option>
          <option value="refund">Возвраты</option>
        </select>
        
        <select v-model="filterPeriod" class="filter-select">
          <option value="all">За все время</option>
          <option value="week">За неделю</option>
          <option value="month">За месяц</option>
          <option value="year">За год</option>
        </select>
      </div>
      
      <div class="export-section">
        <button @click="exportToCSV" class="export-btn">
          📊 Экспорт в CSV
        </button>
      </div>
    </div>

    <!-- График платежей (упрощенный) -->
    <div class="payments-chart">
      <h3>График платежей</h3>
      <div class="chart-bars">
        <div 
          v-for="(item, index) in chartData" 
          :key="index"
          class="chart-bar"
          :style="{ height: item.height + 'px' }"
          :title="`${item.month}: ${item.amount} ₽`"
        >
          <span class="bar-label">{{ item.amount }}₽</span>
        </div>
      </div>
    </div>

    <!-- Список платежей -->
    <div class="payments-list">
      <div 
        v-for="payment in filteredPayments" 
        :key="payment.id"
        class="payment-item"
        :class="payment.type"
      >
        <div class="payment-icon">
          <span v-if="payment.type === 'topup'">⬆️</span>
          <span v-else-if="payment.type === 'payment'">⬇️</span>
          <span v-else>↩️</span>
        </div>
        
        <div class="payment-info">
          <div class="payment-main">
            <h4>{{ payment.description }}</h4>
            <span class="payment-date">{{ formatDate(payment.date) }}</span>
          </div>
          <div class="payment-details">
            <span class="payment-id">ID: {{ payment.id }}</span>
            <span v-if="payment.order_id" class="order-id">
              Заказ #{{ payment.order_id }}
            </span>
          </div>
        </div>
        
        <div class="payment-amount" :class="payment.type">
          <span v-if="payment.type === 'topup'">+{{ payment.amount }} ₽</span>
          <span v-else-if="payment.type === 'refund'">+{{ payment.amount }} ₽</span>
          <span v-else>-{{ payment.amount }} ₽</span>
        </div>
        
        <div class="payment-status" :class="payment.status">
          {{ getStatusText(payment.status) }}
        </div>
      </div>
    </div>

    <!-- Пустой список -->
    <div v-if="filteredPayments.length === 0" class="empty-payments">
      <div class="empty-icon">💰</div>
      <h3>Платежей пока нет</h3>
      <p>После пополнения баланса или оплаты заказов здесь появятся операции</p>
    </div>

    <!-- Сводка -->
    <div class="payments-summary">
      <div class="summary-item">
        <span class="summary-label">Пополнено:</span>
        <span class="summary-amount positive">+{{ totalTopup }} ₽</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Потрачено:</span>
        <span class="summary-amount negative">-{{ totalSpent }} ₽</span>
      </div>
      <div class="summary-item total">
        <span class="summary-label">Итого:</span>
        <span class="summary-amount">{{ netAmount }} ₽</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePayments',
  
  data() {
    return {
      payments: [],
      filterType: 'all',
      filterPeriod: 'all',
      loading: false
    }
  },

  computed: {
    filteredPayments() {
      let filtered = this.payments

      // Фильтр по типу
      if (this.filterType !== 'all') {
        filtered = filtered.filter(payment => payment.type === this.filterType)
      }

      // Фильтр по периоду
      if (this.filterPeriod !== 'all') {
        const now = new Date()
        let startDate
        
        switch (this.filterPeriod) {
          case 'week':
            startDate = new Date(now.setDate(now.getDate() - 7))
            break
          case 'month':
            startDate = new Date(now.setMonth(now.getMonth() - 1))
            break
          case 'year':
            startDate = new Date(now.setFullYear(now.getFullYear() - 1))
            break
        }
        
        filtered = filtered.filter(payment => new Date(payment.date) >= startDate)
      }

      return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    },

    totalAmount() {
      return this.payments.reduce((sum, payment) => sum + payment.amount, 0)
    },

    totalTopup() {
      return this.payments
        .filter(p => p.type === 'topup')
        .reduce((sum, payment) => sum + payment.amount, 0)
    },

    totalSpent() {
      return this.payments
        .filter(p => p.type === 'payment')
        .reduce((sum, payment) => sum + payment.amount, 0)
    },

    netAmount() {
      return this.totalTopup - this.totalSpent
    },

    chartData() {
      // Упрощенный график по месяцам
      const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
      return months.map((month, index) => {
        const amount = Math.random() * 10000 + 5000 // Случайные данные для демо
        return {
          month,
          amount: Math.round(amount),
          height: (amount / 15000) * 100 // Макс высота 100px
        }
      })
    }
  },

  async mounted() {
    await this.loadPayments()
  },

  methods: {
    async loadPayments() {
      this.loading = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Тестовые данные
        this.payments = [
          {
            id: 'PAY-001',
            type: 'topup',
            amount: 5000,
            description: 'Пополнение баланса',
            date: '2024-01-25T14:30:00Z',
            status: 'completed'
          },
          {
            id: 'PAY-002',
            type: 'payment',
            amount: 2500,
            description: 'Оплата заказа #3',
            order_id: 3,
            date: '2024-01-20T11:15:00Z',
            status: 'completed'
          },
          {
            id: 'PAY-003',
            type: 'topup',
            amount: 10000,
            description: 'Пополнение баланса',
            date: '2024-01-15T09:45:00Z',
            status: 'completed'
          },
          {
            id: 'PAY-004',
            type: 'payment',
            amount: 15000,
            description: 'Оплата заказа #2',
            order_id: 2,
            date: '2024-01-10T16:20:00Z',
            status: 'completed'
          },
          {
            id: 'PAY-005',
            type: 'refund',
            amount: 5000,
            description: 'Возврат средств',
            date: '2024-01-05T13:10:00Z',
            status: 'completed'
          }
        ]
      } catch (error) {
        console.error('Error loading payments:', error)
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
        completed: 'Завершено',
        pending: 'В обработке',
        failed: 'Ошибка'
      }
      return statusMap[status] || status
    },

    exportToCSV() {
      const headers = ['Дата', 'Тип', 'Описание', 'Сумма', 'Статус']
      const csvData = this.filteredPayments.map(payment => [
        this.formatDate(payment.date),
        this.getTypeText(payment.type),
        payment.description,
        payment.amount + ' ₽',
        this.getStatusText(payment.status)
      ])
      
      const csvContent = [headers, ...csvData]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `payments_${new Date().toISOString().split('T')[0]}.csv`
      link.click()
      URL.revokeObjectURL(url)
      
      alert('Данные экспортированы в CSV файл')
    },

    getTypeText(type) {
      const typeMap = {
        topup: 'Пополнение',
        payment: 'Оплата',
        refund: 'Возврат'
      }
      return typeMap[type] || type
    }
  }
}
</script>

<style scoped>
.profile-payments {
  max-width: 900px;
}

.payments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #0DFF00;
}

.payments-stats {
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

.payments-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
}

.filters {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.filter-select {
  background: #1A1A1A;
  border: 1px solid #296300;
  border-radius: 5px;
  padding: 10px;
  color: #fff;
  min-width: 180px;
}

.export-btn {
  background: #296300;
  color: #0DFF00;
  border: 1px solid #0DFF00;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.export-btn:hover {
  background: #0DFF00;
  color: #000;
}

.payments-chart {
  background: #1A1A1A;
  border: 1px solid #296300;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 25px;
}

.payments-chart h3 {
  color: #0DFF00;
  margin-bottom: 20px;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 120px;
  padding: 10px 0;
}

.chart-bar {
  background: linear-gradient(to top, #0DFF00, #296300);
  border-radius: 4px 4px 0 0;
  min-width: 40px;
  position: relative;
  flex: 1;
  transition: all 0.3s ease;
}

.chart-bar:hover {
  background: linear-gradient(to top, #296300, #0DFF00);
}

.bar-label {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #0DFF00;
  white-space: nowrap;
}

.payments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}

.payment-item {
  display: flex;
  align-items: center;
  gap: 15px;
  background: #1A1A1A;
  border: 1px solid #296300;
  border-radius: 8px;
  padding: 15px;
  transition: all 0.3s ease;
}

.payment-item:hover {
  border-color: #0DFF00;
  transform: translateX(5px);
}

.payment-icon {
  font-size: 24px;
  width: 40px;
  text-align: center;
}

.payment-info {
  flex: 1;
}

.payment-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5px;
}

.payment-main h4 {
  color: #fff;
  margin: 0;
  font-size: 1em;
}

.payment-date {
  color: #888;
  font-size: 0.9em;
}

.payment-details {
  display: flex;
  gap: 15px;
  font-size: 0.85em;
  color: #aaa;
}

.payment-amount {
  font-size: 1.2em;
  font-weight: bold;
  min-width: 100px;
  text-align: right;
}

.payment-amount.topup, .payment-amount.refund {
  color: #0DFF00;
  text-shadow: 0 0 5px #0DFF00;
}

.payment-amount.payment {
  color: #ff4444;
}

.payment-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: bold;
  min-width: 100px;
  text-align: center;
}

.payment-status.completed {
  background: #296300;
  color: #0DFF00;
}

.payment-status.pending {
  background: #664400;
  color: #ffaa00;
}

.payment-status.failed {
  background: #630000;
  color: #ff4444;
}

.empty-payments {
  text-align: center;
  padding: 60px 20px;
  color: #888;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.payments-summary {
  background: #1A1A1A;
  border: 1px solid #0DFF00;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  flex-wrap: wrap;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.summary-item.total {
  border-left: 2px solid #0DFF00;
  border-right: 2px solid #0DFF00;
  padding: 0 20px;
}

.summary-label {
  color: #ccc;
  font-size: 0.9em;
}

.summary-amount {
  font-size: 1.3em;
  font-weight: bold;
}

.summary-amount.positive {
  color: #0DFF00;
  text-shadow: 0 0 5px #0DFF00;
}

.summary-amount.negative {
  color: #ff4444;
}

@media (max-width: 768px) {
  .payment-item {
    flex-wrap: wrap;
  }
  
  .payments-controls {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>