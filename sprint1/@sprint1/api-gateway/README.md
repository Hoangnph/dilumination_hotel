# API Gateway Microservice

## Mục Tiêu
- Đóng vai trò gateway cho toàn bộ hệ thống microservices
- Proxy request đến các service hotel, room (và các service khác trong tương lai)

## Công Nghệ
- Node.js, TypeScript
- Express
- http-proxy-middleware
- Jest (test, TDD)

## Cấu Trúc Thư Mục
```
src/
tests/
README.md
package.json
tsconfig.json
.env.example
```

## Hướng Dẫn Sử Dụng
- Khởi động hotel service (port 3001) và room service (port 3002)
- Khởi động api-gateway (port 3000)
- Gọi các endpoint:
  - `POST /api/hotels`, `GET /api/hotels`, ... → proxy đến hotel service
  - `POST /api/rooms`, `GET /api/rooms`, ... → proxy đến room service

## Ví dụ cấu hình .env
```
PORT=3000
HOTEL_SERVICE_URL=http://localhost:3001
ROOM_SERVICE_URL=http://localhost:3002
``` 