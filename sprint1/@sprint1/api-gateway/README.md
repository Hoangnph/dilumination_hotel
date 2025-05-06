# API Gateway Microservice

## Mục Tiêu
- Đóng vai trò gateway cho toàn bộ hệ thống microservices
- Proxy request đến các service hotel, room, booking, user/auth

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
- Khởi động hotel service (port 3001), room service (port 3002), booking service (port 3003), user/auth service (port 3004)
- Khởi động api-gateway (port 3000)
- Gọi các endpoint:
  - `POST /api/hotels`, `GET /api/hotels`, ... → proxy đến hotel service
  - `POST /api/rooms`, `GET /api/rooms`, ... → proxy đến room service
  - `POST /api/bookings`, `GET /api/bookings`, ... → proxy đến booking service
  - `POST /api/users`, `GET /api/users`, ... → proxy đến user/auth service
  - `POST /api/auth/login`, `POST /api/auth/register`, ... → proxy đến user/auth service

## Ví dụ cấu hình .env
```
PORT=3000
HOTEL_SERVICE_URL=http://localhost:3001
ROOM_SERVICE_URL=http://localhost:3002
BOOKING_SERVICE_URL=http://localhost:3003
USER_SERVICE_URL=http://localhost:3004
```

## Test nghiệm thu
- Chạy: `npm run test` để kiểm thử proxy đủ 4 service
- Đảm bảo các endpoint CRUD, auth, booking đều hoạt động qua gateway 