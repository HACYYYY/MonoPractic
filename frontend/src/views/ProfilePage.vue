<template>
  <div class="profile-page">
    <!-- Заголовок -->
    <div class="profile-header">
      <h1>👤 Личный кабинет</h1>
      <button @click="handleLogout" class="logout-btn">Выйти</button>
    </div>

    <!-- Вкладки -->
    <div class="profile-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="{ active: activeTab === tab.id }"
        class="tab-btn"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Содержимое вкладок -->
    <div class="tab-content">
      <!-- Основная информация -->
      <div v-if="activeTab === 'main'" class="tab-pane">
        <ProfileMain 
  :user="userData"
  @profile-updated="handleProfileUpdate"
/>
      </div>

      <!-- История заказов -->
      <div v-if="activeTab === 'orders'" class="tab-pane">
        <ProfileOrders />
      </div>

      <!-- История платежей -->
      <div v-if="activeTab === 'payments'" class="tab-pane">
        <ProfilePayments />
      </div>

      <!-- Пополнение баланса -->
      <div v-if="activeTab === 'topup'" class="tab-pane">
        <ProfileTopUp @balance-updated="handleBalanceUpdate" />
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import ProfileMain from './Profile/ProfileMain.vue'
import ProfileOrders from './Profile/ProfileOrders.vue'
import ProfilePayments from './Profile/ProfilePayments.vue'
import ProfileTopUp from './Profile/ProfileTopUp.vue'

export default {
  name: 'ProfilePage',
  
  components: {
    ProfileMain,
    ProfileOrders,
    ProfilePayments,
    ProfileTopUp
  },

  data() {
    return {
      activeTab: 'main',
      tabs: [
        { id: 'main', name: '👤 Основное' },
        { id: 'orders', name: '📦 Заказы' },
        { id: 'payments', name: '💰 Платежи' },
        { id: 'topup', name: '💳 Пополнить' }
      ]
    }
  },
  computed: {
  userData() {
    // Защита от null - если user отсутствует, создаем объект с default значениями
    return this.authStore.user || {
      name: this.authStore.userName || 'Пользователь',
      email: 'user@example.com',
      balance: this.authStore.userBalance || 0,
      avatar: ''
    }
  }
},

  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },

  methods: {
    handleLogout() {
      this.authStore.logoutUser()
      this.$router.push('/login')
    },

    handleProfileUpdate(updatedData) {
      // Здесь будет обновление данных пользователя
      console.log('Данные обновлены:', updatedData)
    },

    handleBalanceUpdate(newBalance) {
      // Здесь будет обновление баланса
      console.log('Баланс обновлен:', newBalance)
    }
  }
}
</script>

<style scoped>
.profile-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  color: #fff;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #0DFF00;
}

.profile-header h1 {
  color: #0DFF00;
  text-shadow: 0 0 10px #0DFF00;
}

.logout-btn {
  background: #ff4444;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.logout-btn:hover {
  background: #cc0000;
}

.profile-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.tab-btn {
  background: #2C2C2C;
  border: 1px solid #296300;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.tab-btn:hover {
  border-color: #0DFF00;
  transform: translateY(-2px);
}

.tab-btn.active {
  background: #0DFF00;
  color: #000;
  border-color: #0DFF00;
}

.tab-content {
  min-height: 400px;
}

.tab-pane {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .profile-tabs {
    flex-direction: column;
  }
  
  .tab-btn {
    text-align: center;
  }
}
</style>