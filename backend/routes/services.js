const express = require('express');
const Service = require('../models/Service');

const router = express.Router();

// GET /api/services - Получить все услуги
router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Ошибка получения услуг:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении услуг'
    });
  }
});

// GET /api/services/:id - Получить услугу по ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Услуга не найдена'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Ошибка получения услуги:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении услуги'
    });
  }
});

// GET /api/services/category/:category - Получить услуги по категории
router.get('/category/:category', async (req, res) => {
  try {
    const services = await Service.findByCategory(req.params.category);
    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Ошибка получения услуг по категории:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении услуг'
    });
  }
});

module.exports = router;