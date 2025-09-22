import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ServicesPage from '@/views/Catalogs.vue'
import AboutPage from '@/views/FAQ.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'

import TestConnection from '@/views/TestConnection.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/services',
    name: 'Services',
    component: ServicesPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/test-connection',
    name: 'TestConnection',
    component: TestConnection
  },
  {
  path: '/catalogs', // Обрати внимание на маленькую букву 'c'
  name: 'Catalogs',
  component: () => import('@/views/Catalogs.vue')
},
{
  path: '/portfolio',
  name: 'Portfolio', 
  component: () => import('@/views/portfolio.vue') // Создай этот файл или удали роут
},
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      // Простая проверка для гостей
      const token = localStorage.getItem('authToken')
      if (token) {
        next('/') // Если уже авторизован - на главную
      } else {
        next() // Если гость - пропускаем
      }
    }
  },
  {
    path: '/register',
    name: 'Register', 
    component: RegisterPage,
    beforeEnter: (to, from, next) => {
      // Простая проверка для гостей
      const token = localStorage.getItem('authToken')
      if (token) {
        next('/') // Если уже авторизован - на главную
      } else {
        next() // Если гость - пропускаем
      }
    }
  },
  {
  path: '/profile',
  name: 'Profile',
  component: () => import('@/views/ProfilePage.vue'), // ИЗМЕНИТЬ на ProfilePage.vue
  beforeEnter: (to, from, next) => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router