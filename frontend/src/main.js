import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import "@/css/main.css"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
authStore.initializeAuth()
app.mount('#app')