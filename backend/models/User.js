const { pool } = require('../config/database');

class User {
  // Найти пользователя по email
  static async findByEmail(email) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Найти пользователя по ID
  static async findById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, email, name, avatar, balance, created_at FROM users WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Создать нового пользователя
  static async create(userData) {
    try {
      const { email, password, name } = userData;
      const [result] = await pool.execute(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
        [email, password, name]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Обновить баланс пользователя
  static async updateBalance(userId, newBalance) {
    try {
      await pool.execute(
        'UPDATE users SET balance = ? WHERE id = ?',
        [newBalance, userId]
      );
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;