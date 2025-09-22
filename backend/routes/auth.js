const express = require('express');
const AuthController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register - Регистрация
router.post('/register', AuthController.register);

// POST /api/auth/login - Вход
router.post('/login', AuthController.login);

// GET /api/auth/me - Получить текущего пользователя (требует аутентификации)
router.get('/me', authenticateToken, AuthController.getMe);

module.exports = router;