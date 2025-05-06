# Thiết Lập Môi Trường Phát Triển (MVP)

## 1. Yêu Cầu Hệ Thống

### 1.1 Phần Cứng Tối Thiểu
- CPU: 2 cores
- RAM: 4GB
- Ổ cứng: 10GB trống

### 1.2 Hệ Điều Hành
- macOS 10.15+
- Ubuntu 20.04+
- Windows 10/11 với WSL2

## 2. Cài Đặt Docker

### 2.1 Cài Đặt Docker Desktop
```bash
# macOS (sử dụng Homebrew)
brew install --cask docker

# Ubuntu
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Kiểm tra cài đặt
docker --version
docker-compose --version
```

## 3. Thiết Lập Môi Trường Phát Triển

### 3.1 Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  # API Service
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=mysql://user:password@db:3306/hotel_db
      - REDIS_URL=redis://redis:6379
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
      - redis

  # Database
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: hotel_db
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  # Redis Cache
  redis:
    image: redis:7.0-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  mysql_data:
  redis_data:
```

### 3.2 Dockerfile
```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

### 3.3 Environment Variables
```env
# .env
NODE_ENV=development
PORT=3000
DB_HOST=db
DB_PORT=3306
DB_NAME=hotel_db
DB_USER=user
DB_PASSWORD=password
REDIS_URL=redis://redis:6379
```

### 3.4 Script Khởi Động
```bash
#!/bin/bash
# start.sh

# Tạo .env nếu chưa có
if [ ! -f .env ]; then
  cp .env.example .env
fi

# Khởi động services
docker-compose up -d

# Chạy migrations
npm run migrate

# Khởi động development server
npm run dev
```

## 4. Cấu Hình IDE

### 4.1 VS Code Extensions
- Docker
- ESLint
- Prettier
- TypeScript and JavaScript Language Features

### 4.2 VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## 5. Kiểm Tra Cài Đặt

### 5.1 Script Kiểm Tra
```bash
#!/bin/bash
# check.sh

echo "Checking Docker installation..."
docker --version
docker-compose --version

echo "Checking Docker containers..."
docker ps

echo "Checking Node.js in container..."
docker-compose exec api node --version
docker-compose exec api npm --version
```

## 6. Troubleshooting

### 6.1 Các Vấn Đề Thường Gặp
1. **Docker không khởi động được**
   - Kiểm tra Docker daemon: `sudo systemctl status docker`
   - Kiểm tra logs: `journalctl -u docker`

2. **Container không thể kết nối với nhau**
   - Kiểm tra container logs: `docker-compose logs`

3. **Volume permissions issues**
   - Sửa quyền nếu cần: `sudo chown -R $USER:$USER .`

### 6.2 Liên Hệ Hỗ Trợ
- Tạo issue trên GitHub repository
- Liên hệ team lead 