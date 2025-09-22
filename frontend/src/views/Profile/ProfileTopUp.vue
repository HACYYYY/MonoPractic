<template>
  <div class="profile-topup">
    <!-- Заголовок -->
    <div class="topup-header">
      <h2>💳 Пополнение баланса</h2>
      <div class="current-balance">
        Текущий баланс: <span class="balance-amount">{{ actualBalance }} ₽</span>
      </div>
    </div>

    <!-- Способы оплаты -->
    <div class="topup-options">
      <h3>Выберите способ оплаты:</h3>
      
      <div class="payment-methods">
        <label class="payment-method">
          <input type="radio" v-model="paymentMethod" value="card" />
          <span>💳 Банковская карта</span>
        </label>
        
        <label class="payment-method">
          <input type="radio" v-model="paymentMethod" value="qiwi" />
          <span>🥝 QIWI Кошелек</span>
        </label>
        
        <label class="payment-method">
          <input type="radio" v-model="paymentMethod" value="yoomoney" />
          <span>💸 ЮMoney</span>
        </label>
      </div>
    </div>

    <!-- Выбор суммы -->
    <div class="amount-selection">
      <h3>Сумма пополнения:</h3>
      
      <!-- Быстрые суммы -->
      <div class="amount-buttons">
        <button 
          v-for="amount in presetAmounts" 
          :key="amount"
          @click="selectedAmount = amount"
          :class="{ active: selectedAmount === amount }"
          class="amount-btn"
        >
          {{ amount }} ₽
        </button>
      </div>
      
      <!-- Своя сумма -->
      <div class="custom-amount">
        <label>Или введите свою сумму:</label>
        <input 
          type="number" 
          v-model.number="customAmount"
          placeholder="500"
          min="100"
          max="50000"
        >
      </div>
    </div>

    <!-- Итоги -->
    <div class="topup-summary">
      <div class="summary-item">
        <span>Сумма пополнения:</span>
        <strong>{{ finalAmount }} ₽</strong>
      </div>
      <div class="summary-item">
        <span>Способ оплаты:</span>
        <strong>{{ getPaymentMethodText(paymentMethod) }}</strong>
      </div>
      <div class="summary-item total">
        <span>Баланс после пополнения:</span>
        <strong class="new-balance">{{ actualBalance + finalAmount }} ₽</strong>
      </div>
    </div>

    <!-- Кнопка оплаты -->
    <button 
      @click="processPayment" 
      :disabled="!canProceed"
      class="pay-button"
    >
      {{ isLoading ? 'Обработка...' : `Оплатить ${finalAmount} ₽` }}
    </button>

    <!-- Сообщение об успехе -->
    <div v-if="paymentSuccess" class="success-message">
      <div class="success-icon">✅</div>
      <h3>Оплата прошла успешно!</h3>
      <p>На ваш баланс зачислено {{ finalAmount }} ₽</p>
      <button @click="resetForm" class="again-btn">Пополнить еще</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileTopUp',
  
  data() {
    return {
      // Текущий баланс (позже подключим к реальным данным)
      currentBalance: 1500,
      
      // Выбранный способ оплаты
      paymentMethod: 'card',
      
      // Быстрые суммы для выбора
      presetAmounts: [500, 1000, 2000, 5000, 10000],
      
      // Выбранная сумма из быстрых кнопок
      selectedAmount: 1000,
      
      // Своя сумма
      customAmount: null,
      
      // Загрузка
      isLoading: false,
      
      // Успешная оплата
      paymentSuccess: false
    }
  },

  computed: {
  // Итоговая сумма пополнения
  finalAmount() {
    return this.customAmount || this.selectedAmount
  },

  // Можно ли продолжить
  canProceed() {
    return this.finalAmount >= 100 && this.paymentMethod && !this.isLoading
  },

  // АКТУАЛЬНЫЙ БАЛАНС (всегда свежий)
  actualBalance() {
    return this.getCurrentBalance()
  }
},

  methods: {
    // Текст для способа оплаты (ЭТОТ МЕТОД ОТСУТСТВОВАЛ)
  getPaymentMethodText(method) {
    const methods = {
      card: '💳 Банковская карта',
      qiwi: '🥝 QIWI Кошелек', 
      yoomoney: '💸 ЮMoney'
    }
    return methods[method] || method
  },

  // ПОЛУЧАЕМ АКТУАЛЬНЫЙ БАЛАНС
  getCurrentBalance() {
    // 1. Пробуем из store
    if (this.authStore?.userBalance) {
      return this.authStore.userBalance
    }
    
    // 2. Пробуем из localStorage
    const savedUser = localStorage.getItem('userData')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        return userData.balance || 0
      } catch (error) {
        console.error('Ошибка чтения localStorage:', error)
      }
    }
    
    // 3. Возвращаем значение по умолчанию
    return this.currentBalance
  },

  // ОБНОВЛЯЕМ БАЛАНС ВО ВСЕХ МЕСТАХ
  updateBalanceEverywhere(newBalance) {
    // 1. Обновляем в текущем компоненте
    this.currentBalance = newBalance
    
    // 2. Обновляем в store
    if (this.authStore && this.authStore.user) {
      this.authStore.user.balance = newBalance
    }
    
    // 3. Обновляем в localStorage
    const savedUser = localStorage.getItem('userData')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        userData.balance = newBalance
        localStorage.setItem('userData', JSON.stringify(userData))
        console.log('Баланс обновлен в localStorage:', newBalance)
      } catch (error) {
        console.error('Ошибка обновления localStorage:', error)
      }
    }
  },

  // ПОПОЛНЕНИЕ БАЛАНСА
  async processPayment() {
    if (!this.canProceed) return
    
    this.isLoading = true
    
    try {
      // Имитация задержки оплаты
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // РАСЧЕТ НОВОГО БАЛАНСА
      const currentBalance = parseInt(this.getCurrentBalance())
      const newBalance = currentBalance + this.finalAmount
      
      console.log('Пополнение баланса:', {
        текущий: currentBalance,
        пополнение: this.finalAmount,
        новый: newBalance
      })

      // ОБНОВЛЯЕМ БАЛАНС
      this.updateBalanceEverywhere(newBalance)
      
      this.paymentSuccess = true
      this.$emit('balance-updated', newBalance)
      
    } catch (error) {
      console.error('Ошибка пополнения:', error)
      alert('Ошибка при пополнении баланса')
    } finally {
      this.isLoading = false
    }
  },

  // СБРОС ФОРМЫ
  resetForm() {
    this.paymentSuccess = false
    this.selectedAmount = 1000
    this.customAmount = null
    this.paymentMethod = 'card'
  }

  }
}
</script>

<style scoped>
.profile-topup {
  max-width: 600px;
  margin: 0 auto;
}

.topup-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #0DFF00;
}

.topup-header h2 {
  color: #0DFF00;
  margin-bottom: 10px;
}

.current-balance {
  font-size: 1.2em;
}

.balance-amount {
  color: #0DFF00;
  font-weight: bold;
  text-shadow: 0 0 5px #0DFF00;
}

.topup-options {
  background: #1A1A1A;
  border: 1px solid #296300;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.topup-options h3 {
  color: #0DFF00;
  margin-bottom: 15px;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.payment-method {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #296300;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-method:hover {
  border-color: #0DFF00;
  background: #296300;
}

.payment-method input {
  margin: 0;
}

.amount-selection {
  background: #1A1A1A;
  border: 1px solid #296300;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.amount-selection h3 {
  color: #0DFF00;
  margin-bottom: 15px;
}

.amount-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.amount-btn {
  background: #2C2C2C;
  border: 1px solid #296300;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 80px;
}

.amount-btn:hover {
  border-color: #0DFF00;
}

.amount-btn.active {
  background: #0DFF00;
  color: #000;
  border-color: #0DFF00;
}

.custom-amount {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.custom-amount label {
  color: #fff;
}

.custom-amount input {
  background: #2C2C2C;
  border: 1px solid #296300;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
}

.custom-amount input:focus {
  outline: none;
  border-color: #0DFF00;
}

.topup-summary {
  background: #1A1A1A;
  border: 1px solid #0DFF00;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.summary-item.total {
  border-top: 1px solid #0DFF00;
  padding-top: 10px;
  margin-top: 10px;
  font-size: 1.1em;
}

.new-balance {
  color: #0DFF00;
  text-shadow: 0 0 5px #0DFF00;
}

.pay-button {
  width: 100%;
  background: linear-gradient(45deg, #0DFF00, #296300);
  color: #000;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pay-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(13, 255, 0, 0.4);
}

.pay-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.success-message {
  background: #1A3C1A;
  border: 2px solid #0DFF00;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  margin-top: 20px;
}

.success-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.success-message h3 {
  color: #0DFF00;
  margin-bottom: 10px;
}

.again-btn {
  background: #296300;
  color: #0DFF00;
  border: 1px solid #0DFF00;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 15px;
  cursor: pointer;
}

.again-btn:hover {
  background: #0DFF00;
  color: #000;
}
</style>