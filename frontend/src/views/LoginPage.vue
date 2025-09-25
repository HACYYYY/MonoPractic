<template>
  <div class="login-page">
    <div class="login-form">
      <h2>Вход в систему</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="form.email" required placeholder="your@email.com" />
        </div>

        <div class="form-group">
          <label>Пароль:</label>
          <input type="password" v-model="form.password" required placeholder="Введите пароль" />
        </div>

        <button type="submit" :disabled="authStore.isLoading" class="login-btn">
          {{ authStore.isLoading ? "Вход..." : "Войти" }}
        </button>

        <p class="register-link">Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "LoginPage",

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },

  methods: {
    async handleLogin() {
      // Показываем что идет загрузка
      this.authStore.isLoading = true;

      try {
        console.log("Пытаемся войти с:", this.form);

        // РЕАЛЬНЫЙ ЗАПРОС К СЕРВЕРУ
        const response = await this.authStore.loginUser(this.form);
        console.log("Успешный вход:", response);

        // Переходим в профиль
        this.$router.push("/profile");
      } catch (error) {
        console.error("Ошибка входа:", error);

        // РЕАЛЬНЫЕ ОШИБКИ ОТ СЕРВЕРА
        let errorMessage = "Ошибка сервера";

        if (error.message) {
          errorMessage = error.message;
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }

        alert("Ошибка входа: " + errorMessage);
      } finally {
        this.authStore.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-form {
  background: #2c2c2c;
  padding: 40px;
  border-radius: 10px;
  border: 2px solid #0dff00;
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  color: #0dff00;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 0 0 10px #0dff00;
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
  border-color: #0dff00;
  box-shadow: 0 0 10px #0dff00;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(45deg, #0dff00, #296300);
  color: #000;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(13, 255, 0, 0.4);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  color: #fff;
}

.register-link a {
  color: #0dff00;
  text-decoration: none;
}

.register-link a:hover {
  text-shadow: 0 0 5px #0dff00;
}
</style>
