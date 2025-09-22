const express = require('express');
const Order = require('../models/Order');
const Service = require('../models/Service');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Все роуты требуют аутентификации
router.use(authenticateToken);

// POST /api/orders - Создать заказ
router.post('/', async (req, res) => {
  try {
    const { serviceId, quantity, comments } = req.body;
    const userId = req.user.userId;

    // Проверяем обязательные поля
    if (!serviceId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'ID услуги и количество обязательны'
      });
    }

    // Проверяем существует ли услуга
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Услуга не найдена'
      });
    }

    // Рассчитываем общую стоимость
    const totalPrice = service.price * quantity;

    // Создаем заказ
    const orderId = await Order.create({
      user_id: userId,
      service_id: serviceId,
      quantity,
      total_price: totalPrice,
      comments: comments || ''
    });

    // Получаем созданный заказ
    const order = await Order.findById(orderId);

    res.status(201).json({
      success: true,
      message: 'Заказ успешно создан',
      data: order
    });

  } catch (error) {
    console.error('Ошибка создания заказа:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при создании заказа'
    });
  }
});

// GET /api/orders/my - Получить заказы текущего пользователя
router.get('/my', async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.findByUserId(userId);

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error('Ошибка получения заказов:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении заказов'
    });
  }
});

// GET /api/orders/:id - Получить заказ по ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Заказ не найден'
      });
    }

    // Проверяем что заказ принадлежит пользователю
    if (order.user_id !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Доступ запрещен'
      });
    }

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error('Ошибка получения заказа:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении заказа'
    });
  }
});

module.exports = router;