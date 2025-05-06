# Booking Microservice

## Mục Tiêu
- Quản lý đặt phòng khách sạn (CRUD)
- Kiểm tra phòng trống khi booking

## Công Nghệ
- Node.js, TypeScript
- Express
- MySQL (qua service tổng thể)
- Redis (cache, nếu cần)
- Jest (test, TDD)

## Cấu Trúc Thư Mục
```
src/
  models/
  routes/
  controllers/
  services/
  middleware/
  utils/
tests/
README.md
package.json
tsconfig.json
.env.example
```

## Quy Tắc Code
- Áp dụng CLEAN code: đặt tên rõ ràng, hàm ngắn gọn, tách biệt concern, tránh lặp code
- Ưu tiên function thuần, hạn chế class
- Áp dụng TDD: viết test trước, code sau
- Đảm bảo test coverage ≥ 80%
- Tách biệt rõ model, route, controller, service, middleware

## API CRUD Booking
- `POST /bookings` – Tạo booking mới, kiểm tra phòng trống
- `GET /bookings` – Lấy danh sách booking
- `GET /bookings/:id` – Lấy chi tiết booking
- `PUT /bookings/:id` – Cập nhật booking
- `DELETE /bookings/:id` – Hủy booking 