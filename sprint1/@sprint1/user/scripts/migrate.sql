-- Migration: Tạo bảng users cho User/Auth microservice
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'hotel', 'staff', 'customer') NOT NULL DEFAULT 'customer',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed user mẫu cho từng role
INSERT INTO users (name, email, password_hash, role)
VALUES
  ('Admin User', 'admin@dilumination.com', '$2b$10$adminhash', 'admin'),
  ('Hotel Owner', 'hotel@dilumination.com', '$2b$10$hotelhash', 'hotel'),
  ('Staff User', 'staff@dilumination.com', '$2b$10$staffhash', 'staff'),
  ('Customer User', 'customer@dilumination.com', '$2b$10$customerhash', 'customer')
ON DUPLICATE KEY UPDATE name=VALUES(name); 