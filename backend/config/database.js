const mysql = require('mysql2/promise');

// Настройки подключения к базе данных
const dbConfig = {
  host: 'localhost',
  user: 'root', // стандартный пользователь
  password: '', // если ставил пароль - укажи его здесь
  database: 'it_company',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Создаем pool подключений
const pool = mysql.createPool(dbConfig);

// Функция для проверки подключения
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Успешное подключение к MySQL');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Ошибка подключения к MySQL:', error.message);
    return false;
  }
}

// Функция для инициализации базы данных
async function initializeDatabase() {
  try {
    // Создаем подключение без выбора базы данных
    const tempConnection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });

    // Создаем базу данных если не существует
    await tempConnection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    console.log(`✅ База данных ${dbConfig.database} готова`);
    
    await tempConnection.end();
    return true;
  } catch (error) {
    console.error('❌ Ошибка инициализации базы данных:', error.message);
    return false;
  }
}

module.exports = {
  pool,
  testConnection,
  initializeDatabase
};