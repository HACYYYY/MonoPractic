<template>
  <div class="register-page">
    <div class="register-form">
      <h2>Регистрация</h2>
      
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Имя и фамилия:</label>
          <input 
            type="text" 
            v-model="form.fullName"
            required
            placeholder="Иван Иванов"
          >
        </div>

        <div class="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            v-model="form.email"
            required
            placeholder="your@email.com"
          >
        </div>

        <div class="form-group">
          <label>Пароль:</label>
          <input 
            type="password" 
            v-model="form.password"
            required
            placeholder="Не менее 6 символов"
            minlength="6"
          >
        </div>

        <div class="form-group">
          <label>Подтвердите пароль:</label>
          <input 
            type="password" 
            v-model="form.confirmPassword"
            required
            placeholder="Повторите пароль"
          >
          <span v-if="form.password !== form.confirmPassword" class="error-text">Пароли не совпадают</span>
        </div>

        <button 
          type="submit" 
          :disabled="authStore.isLoading || form.password !== form.confirmPassword"
          class="register-btn"
        >
          {{ authStore.isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>

        <p class="login-link">
          Уже есть аккаунт? <router-link to="/login">Войти</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'RegisterPage',
  
  data() {
    return {
      form: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },

  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },

  methods: {
    async handleRegister() {
      if (this.form.password !== this.form.confirmPassword) {
        alert('Пароли не совпадают')
        return
      }

      try {
        await this.authStore.registerUser({
          name: this.form.fullName,
          email: this.form.email,
          password: this.form.password
        })
        
        alert('Регистрация успешна! Теперь войдите в систему.')
        this.$router.push('/login')
        
      } catch (error) {
        alert('Ошибка регистрации: ' + (error.message || 'Попробуйте другой email'))
      }
    }
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.register-form {
  background: #2C2C2C;
  padding: 40px;
  border-radius: 10px;
  border: 2px solid #0DFF00;
  width: 100%;
  max-width: 400px;
}

.register-form h2 {
  color: #0DFF00;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 0 0 10px #0DFF00;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #fff;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #296300;
  border-radius: 5px;
  background: #000;
  color: #fff;
  font-size: 16px;
}

.form-group input:focus {
  outline: none;
  border-color: #0DFF00;
  box-shadow: 0 0 10px #0DFF00;
}

.error-text {
  color: #ff4444;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

.register-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(45deg, #0DFF00, #296300);
  color: #000;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.register-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(13, 255, 0, 0.4);
}

.register-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #fff;
}

.login-link a {
  color: #0DFF00;
  text-decoration: none;
}

.login-link a:hover {
  text-shadow: 0 0 5px #0DFF00;
}
</style>