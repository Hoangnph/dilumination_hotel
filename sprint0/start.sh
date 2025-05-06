#!/bin/bash

# Tạo .env nếu chưa có
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env file from .env.example"
fi

# Cài đặt dependencies
echo "Installing dependencies..."
npm install

# Khởi động services
echo "Starting services..."
docker-compose up -d

# Chờ services khởi động
echo "Waiting for services to start..."
sleep 10

# Kiểm tra kết nối database
echo "Checking database connection..."
docker-compose exec api npm run db:check

# Kiểm tra kết nối Redis
echo "Checking Redis connection..."
docker-compose exec api npm run redis:check

echo "Development environment is ready!" 