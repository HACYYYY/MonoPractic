<template>
  <div class="profile-main">
    <!-- Аватарка -->
    <div class="avatar-section">
      <h2>📷 Аватар профиля</h2>
      <div class="avatar-editor">
        <div class="avatar-preview">
          <img 
            :src="user.avatar || '/default-avatar.png'" 
            alt="Аватар"
            class="avatar-image"
          >
        </div>
        <div class="avatar-controls">
          <label class="upload-btn">
            📸 Выбрать фото
            <input 
              type="file" 
              @change="handleAvatarUpload"
              accept="image/*"
              style="display: none"
            >
          </label>
          <button 
            v-if="user.avatar"
            @click="removeAvatar"
            class="remove-btn"
          >
            ❌ Удалить
          </button>
        </div>
      </div>
    </div>

    <!-- Основная информация -->
    <div class="info-section">
      <h2>👤 Основная информация</h2>
      <form @submit.prevent="saveProfile" class="profile-form">
        <div class="form-group">
          <label>Имя и фамилия:</label>
          <input 
            v-model="editForm.name"
            type="text"
            required
            placeholder="Введите ваше имя"
          >
        </div>

        <div class="form-group">
          <label>Email:</label>
          <input 
            v-model="editForm.email"
            type="email"
            required
            placeholder="your@email.com"
          >
        </div>

        <div class="form-group">
          <label>Текущий баланс:</label>
          <div class="balance-display">
            <span class="balance-amount">{{ user.balance || 0 }} ₽</span>
            <button type="button" @click="$emit('switch-tab', 'topup')" class="topup-link">
              Пополнить баланс
            </button>
          </div>
        </div>

        <button type="submit" :disabled="!hasChanges" class="save-btn">
          💾 Сохранить изменения
        </button>
      </form>
    </div>

    <!-- Смена пароля -->
    <div class="password-section">
      <h2>🔐 Смена пароля</h2>
      <form @submit.prevent="changePassword" class="password-form">
        <div class="form-group">
          <label>Текущий пароль:</label>
          <input 
            v-model="passwordForm.currentPassword"
            type="password"
            placeholder="Введите текущий пароль"
          >
        </div>

        <div class="form-group">
          <label>Новый пароль:</label>
          <input 
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="Не менее 6 символов"
            minlength="6"
          >
        </div>

        <div class="form-group">
          <label>Подтвердите пароль:</label>
          <input 
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="Повторите новый пароль"
          >
          <span v-if="passwordForm.newPassword !== passwordForm.confirmPassword" class="error-text">
            Пароли не совпадают
          </span>
        </div>

        <button type="submit" :disabled="!isPasswordFormValid" class="password-btn">
          Сменить пароль
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'ProfileMain',
  
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },

  data() {
    return {
      editForm: {
        name: '',
        email: ''
      },
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  

  computed: {
    hasChanges() {
      return this.editForm.name !== this.user.name || 
             this.editForm.email !== this.user.email
    },

    isPasswordFormValid() {
      return this.passwordForm.newPassword &&
             this.passwordForm.confirmPassword &&
             this.passwordForm.newPassword === this.passwordForm.confirmPassword &&
             this.passwordForm.newPassword.length >= 6
    }
  },

  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        this.editForm.name = newUser.name || ''
        this.editForm.email = newUser.email || ''
      }
    }
  },


//   setup() {
//   const authStore = useAuthStore()
//   return { authStore }
// },

  methods: {
    handleAvatarUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      if (file.size > 5 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер: 5MB')
        return
      }

      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение')
        return
      }

      // Создаем временную ссылку для предпросмотра
      const reader = new FileReader()
      reader.onload = (e) => {
        this.$emit('avatar-changed', file)
        // Здесь можно сразу показать превью
        console.log('Аватар загружен:', file.name)
      }
      reader.readAsDataURL(file)
    },

    removeAvatar() {
      this.$emit('avatar-changed', null)
    },

    async saveProfile() {
    console.log('=== НАЧАЛО СОХРАНЕНИЯ ===')
    console.log('authStore:', this.authStore) // Проверим что store доступен
    
    try {
      // Проверяем что authStore существует
      if (!this.authStore) {
        throw new Error('authStore не доступен')
      }

      console.log('1. Текущий form данные:', this.editForm)
      console.log('2. Текущий user в props:', this.user)

      // Создаем обновленные данные
      const updatedUser = {
        id: this.user?.id || 1,
        name: this.editForm.name,
        email: this.editForm.email,
        balance: this.user?.balance || 0,
        avatar: this.user?.avatar || ''
      }

      console.log('3. Созданный updatedUser:', updatedUser)

      // Сохраняем в store (если доступен)
      if (this.authStore && this.authStore.setUser) {
        this.authStore.setUser(updatedUser)
        console.log('4. Данные сохранены в store')
      } else {
        console.warn('5. authStore.setUser не доступен, сохраняем только в localStorage')
      }

      // Сохраняем в localStorage
      localStorage.setItem('userData', JSON.stringify(updatedUser))
      console.log('6. Данные сохранены в localStorage')

      // Проверяем сохранение
      const savedData = localStorage.getItem('userData')
      console.log('7. Проверка localStorage:', savedData)

      this.$emit('profile-updated', updatedUser)
      alert('✅ Профиль успешно обновлен!')

    } catch (error) {
      console.error('❌ ОШИБКА СОХРАНЕНИЯ:', error)
      
      // Альтернативное сохранение если основное не работает
      try {
        const simpleData = {
          name: this.editForm.name,
          email: this.editForm.email,
          balance: this.user?.balance || 0
        }
        localStorage.setItem('userBackup', JSON.stringify(simpleData))
        alert('✅ Данные сохранены (резервный метод)')
      } catch (backupError) {
        alert('❌ Ошибка сохранения: ' + error.message)
      }
    }
  },
  setup() {
  const authStore = useAuthStore()
  return { authStore }
},

    async changePassword() {
      if (!this.isPasswordFormValid) {
        alert('Проверьте правильность ввода пароля')
        return
      }

      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        alert('Пароль успешно изменен!')
        this.passwordForm = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
      } catch (error) {
        alert('Ошибка при смене пароля')
      }
    }
  }
}
</script>

<style scoped>
.profile-main {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.avatar-section, .info-section, .password-section {
  background: #1A1A1A;
  border: 1px solid #296300;
  border-radius: 10px;
  padding: 25px;
}

h2 {
  color: #0DFF00;
  margin-bottom: 20px;
  font-size: 1.3em;
}

.avatar-editor {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.avatar-preview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #0DFF00;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.upload-btn, .remove-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.upload-btn {
  background: #296300;
  color: #0DFF00;
}

.remove-btn {
  background: #630000;
  color: #ff4444;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #fff;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  background: #2C2C2C;
  border: 1px solid #296300;
  border-radius: 5px;
  padding: 12px;
  color: #fff;
  font-size: 16px;
}

.form-group input:focus {
  outline: none;
  border-color: #0DFF00;
}

.balance-display {
  display: flex;
  align-items: center;
  gap: 15px;
}

.balance-amount {
  color: #0DFF00;
  font-size: 1.2em;
  font-weight: bold;
  text-shadow: 0 0 5px #0DFF00;
}

.topup-link {
  background: none;
  border: 1px solid #0DFF00;
  color: #0DFF00;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.save-btn, .password-btn {
  background: linear-gradient(45deg, #0DFF00, #296300);
  color: #000;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.save-btn:disabled, .password-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-text {
  color: #ff4444;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}
</style>