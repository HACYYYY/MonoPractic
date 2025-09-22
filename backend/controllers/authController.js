const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class AuthController {
  // Регистрация пользователя
  static async register(req, res) {
    try {
      const { email, password, name } = req.body;

      // Проверяем обязательные поля
      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          message: 'Все поля обязательны для заполнения'
        });
      }

      // Проверяем существует ли пользователь
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Пользователь с таким email уже существует'
        });
      }

      // Хешируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      // Создаем пользователя
      const userId = await User.create({
        email,
        password: hashedPassword,
        name
      });

      // Создаем JWT токен
      const token = jwt.sign(
        { userId, email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Получаем данные пользователя
      const user = await User.findById(userId);

      res.status(201).json({
        success: true,
        message: 'Пользователь успешно зарегистрирован',
        token,
        user
      });

    } catch (error) {
      console.error('Ошибка регистрации:', error);
      res.status(500).json({
        success: false,
        message: 'Ошибка сервера при регистрации'
      });
    }
  }

  // Вход пользователя
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Проверяем обязательные поля
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email и пароль обязательны'
        });
      }

      // Ищем пользователя
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Неверный email или пароль'
        });
      }

      // Проверяем пароль
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Неверный email или пароль'
        });
      }

      // Создаем JWT токен
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Убираем пароль из ответа
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        success: true,
        message: 'Вход выполнен успешно',
        token,
        user: userWithoutPassword
      });

    } catch (error) {
      console.error('Ошибка входа:', error);
      res.status(500).json({
        success: false,
        message: 'Ошибка сервера при входе'
      });
    }
  }

  // Получить текущего пользователя
  static async getMe(req, res) {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Пользователь не найден'
        });
      }

      res.json({
        success: true,
        user
      });

    } catch (error) {
      console.error('Ошибка получения пользователя:', error);
      res.status(500).json({
        success: false,
        message: 'Ошибка сервера'
      });
    }
  }
}

module.exports = AuthController;