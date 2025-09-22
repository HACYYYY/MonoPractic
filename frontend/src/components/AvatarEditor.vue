<template>
  <div class="avatar-editor">
    <div class="avatar-section">
      <div class="avatar-preview">
        <img 
          :src="avatarUrl" 
          alt="Аватар"
          class="avatar-image"
          @error="handleImageError"
        >
        <div v-if="uploadProgress" class="upload-progress">
          Загрузка: {{ uploadProgress }}%
        </div>
      </div>
      
      <div class="avatar-controls">
        <label class="upload-btn">
          📷 Выбрать фото
          <input 
            type="file" 
            accept="image/*"
            @change="handleFileUpload"
            style="display: none"
          >
        </label>
        
        <button 
          v-if="!isDefaultAvatar"
          @click="removeAvatar"
          class="remove-btn"
        >
          ❌ Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvatarEditor',
  
  props: {
    currentAvatar: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      uploadedAvatar: null,
      uploadProgress: 0
    }
  },

  computed: {
    avatarUrl() {
      if (this.uploadedAvatar) {
        return URL.createObjectURL(this.uploadedAvatar)
      }
      return this.currentAvatar || '/default-avatar.png'
    },

    isDefaultAvatar() {
      return !this.currentAvatar && !this.uploadedAvatar
    }
  },

  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      // Проверяем размер файла (макс 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер: 5MB')
        return
      }

      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение')
        return
      }

      // Имитируем загрузку
      this.uploadProgress = 0
      const interval = setInterval(() => {
        this.uploadProgress += 10
        if (this.uploadProgress >= 100) {
          clearInterval(interval)
          this.uploadedAvatar = file
          this.$emit('avatar-changed', file)
          setTimeout(() => {
            this.uploadProgress = 0
          }, 1000)
        }
      }, 100)
    },

    removeAvatar() {
      this.uploadedAvatar = null
      this.$emit('avatar-changed', null)
    },

    handleImageError(event) {
      event.target.src = '/default-avatar.png'
    }
  }
}
</script>

<style scoped>
.avatar-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.avatar-preview {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #0DFF00;
  box-shadow: 0 0 20px rgba(13, 255, 0, 0.3);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0DFF00;
  font-weight: bold;
}

.avatar-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.upload-btn {
  background: linear-gradient(45deg, #0DFF00, #296300);
  color: #000;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.upload-btn:hover {
  transform: translateY(-2px);
}

.remove-btn {
  background: #ff4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.remove-btn:hover {
  background: #cc0000;
}
</style>