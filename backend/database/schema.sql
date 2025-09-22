-- Создание базы данных
CREATE DATABASE IF NOT EXISTS it_company;
USE it_company;

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar VARCHAR(500) NULL,
    balance DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Таблица услуг
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заказов
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Таблица портфолио
CREATE TABLE IF NOT EXISTS portfolio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    category VARCHAR(100),
    technologies TEXT,
    project_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставляем тестовые данные услуг
INSERT IGNORE INTO services (id, name, description, price, category) VALUES
(1, 'Разработка сайта', 'Создание современного адаптивного сайта', 25000.00, 'development'),
(2, 'SEO-оптимизация', 'Продвижение сайта в поисковых системах', 15000.00, 'marketing'),
(3, 'Техническая поддержка', 'Обслуживание и поддержка сайта', 5000.00, 'support'),
(4, 'Дизайн интерфейса', 'Создание UI/UX дизайна', 12000.00, 'design');

-- Вставляем тестовые данные портфолио
INSERT IGNORE INTO portfolio (title, description, category, technologies) VALUES
('Корпоративный портал', 'Разработка CRM системы для компании', 'development', 'Vue.js, Node.js, MySQL'),
('Интернет-магазин', 'Создание платформы для онлайн-продаж', 'development', 'React, Express, MongoDB');

-- Создаем тестового пользователя (пароль: 123456)
INSERT IGNORE INTO users (email, password, name, balance) VALUES 
('test@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Тестовый пользователь', 5000.00);