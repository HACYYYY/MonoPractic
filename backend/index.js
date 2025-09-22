const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');

// Импортируем роуты
const authRoutes = require('./routes/auth');
const servicesRoutes = require('./routes/services');
const ordersRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Подключаем роуты
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/orders', ordersRoutes);

// Тестовый роут для проверки работы
app.get('/api/test', async (req, res) => {
  try {
    const dbConnected = await testConnection();
    
    res.json({ 
      message: 'Сервер работает!', 
      timestamp: new Date().toISOString(),
      database: dbConnected ? 'Connected ✅' : 'Disconnected ❌',
      endpoints: {
        auth: ['POST /api/auth/register', 'POST /api/auth/login', 'GET /api/auth/me'],
        services: ['GET /api/services', 'GET /api/services/:id'],
        orders: ['POST /api/orders', 'GET /api/orders/my', 'GET /api/orders/:id']
      }
    });
  } catch (error) {
    res.json({
      message: 'Сервер работает!',
      database: 'Error: ' + error.message
    });
  }
});

// Корневой маршрут
app.get('/', (req, res) => {
  res.json({
    message: 'IT Company API Server',
    version: '1.0.0',
    documentation: 'Visit /api/test for available endpoints'
  });
});

// Обработка 404 - исправленная версия
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint не найден',
    path: req.path,
    method: req.method
  });
});

// Обработка ошибок
app.use((error, req, res, next) => {
  console.error('Ошибка сервера:', error);
  res.status(500).json({
    success: false,
    message: 'Внутренняя ошибка сервера'
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🎯 Сервер запущен на порту ${PORT}`);
  console.log(`📡 API доступно по: http://localhost:${PORT}/api`);
  console.log(`🏠 Главная страница: http://localhost:${PORT}/`);
  console.log(`🧪 Тестовый endpoint: http://localhost:${PORT}/api/test`);
  console.log('\n📋 Доступные endpoints:');
  console.log('🔐 Auth: POST /api/auth/register, POST /api/auth/login');
  console.log('🛍️ Services: GET /api/services, GET /api/services/:id');
  console.log('📦 Orders: POST /api/orders, GET /api/orders/my');
});

// Обработка graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Сервер останавливается...');
  process.exit(0);
});