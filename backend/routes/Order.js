const { pool } = require('../config/database');

class Order {
  // Создать новый заказ
  static async create(orderData) {
    try {
      const { user_id, service_id, quantity, total_price, comments } = orderData;
      
      const [result] = await pool.execute(
        `INSERT INTO orders (user_id, service_id, quantity, total_price, comments) 
         VALUES (?, ?, ?, ?, ?)`,
        [user_id, service_id, quantity, total_price, comments]
      );
      
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Получить заказы пользователя
  static async findByUserId(userId) {
    try {
      const [rows] = await pool.execute(
        `SELECT o.*, s.name as service_name, s.price as service_price 
         FROM orders o 
         JOIN services s ON o.service_id = s.id 
         WHERE o.user_id = ? 
         ORDER BY o.created_at DESC`,
        [userId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Получить заказ по ID
  static async findById(orderId) {
    try {
      const [rows] = await pool.execute(
        `SELECT o.*, s.name as service_name, s.price as service_price 
         FROM orders o 
         JOIN services s ON o.service_id = s.id 
         WHERE o.id = ?`,
        [orderId]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Order;