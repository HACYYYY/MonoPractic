const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  let connection;
  
  try {
    // Используем обычное подключение вместо prepared statements
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // укажи пароль если установлен
      multipleStatements: true // Разрешаем множественные запросы
    });

    console.log('🔗 Подключение к MySQL...');

    // Подключаемся к базе данных
    connection.connect();

    // Создаем базу данных
    await new Promise((resolve, reject) => {
      connection.query('CREATE DATABASE IF NOT EXISTS it_company', (error) => {
        if (error) reject(error);
        else {
          console.log('✅ База данных it_company создана/проверена');
          resolve();
        }
      });
    });

    // Используем базу данных
    await new Promise((resolve, reject) => {
      connection.query('USE it_company', (error) => {
        if (error) reject(error);
        else {
          console.log('✅ Используем базу данных it_company');
          resolve();
        }
      });
    });

    // Читаем SQL файл с схемой
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

    // Выполняем весь SQL скрипт
    await new Promise((resolve, reject) => {
      connection.query(schemaSQL, (error, results) => {
        if (error) reject(error);
        else {
          console.log('✅ Все SQL запросы выполнены успешно');
          resolve(results);
        }
      });
    });

    console.log('🎉 База данных успешно настроена!');
    console.log('📊 Таблицы: users, services, orders, portfolio');
    console.log('🧪 Тестовые данные добавлены');

  } catch (error) {
    console.error('❌ Ошибка настройки базы данных:', error.message);
    
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

// Запускаем настройку если файл вызван напрямую
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;