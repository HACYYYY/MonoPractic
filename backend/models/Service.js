const { pool } = require('../config/database');

class Service {
  // Получить все активные услуги
  static async findAll() {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM services WHERE is_active = true ORDER BY created_at DESC'
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Найти услугу по ID
  static async findById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM services WHERE id = ? AND is_active = true',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Получить услуги по категории
  static async findByCategory(category) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM services WHERE category = ? AND is_active = true',
        [category]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Service;