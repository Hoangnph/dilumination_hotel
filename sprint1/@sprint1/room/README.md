# Room Microservice

## Mục Tiêu
Quản lý thông tin phòng (CRUD), phục vụ cho hệ thống quản lý khách sạn.

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

## API CRUD Room

### Tạo phòng
- `POST /rooms`
- Request: `{ "hotel_id": 1, "type": "deluxe", "price": 120, "status": "available" }`
- Response: `{ id, hotel_id, type, price, status, created_at, updated_at }`

### Lấy danh sách phòng
- `GET /rooms`
- Response: `[{ id, hotel_id, type, ... }]`

### Lấy chi tiết phòng
- `GET /rooms/:id`
- Response: `{ id, hotel_id, type, ... }`

### Cập nhật phòng
- `PUT /rooms/:id`
- Request: `{ type?, price?, status? }`
- Response: `{ id, hotel_id, type, ... }`

### Xóa phòng
- `DELETE /rooms/:id`
- Response: `204 No Content` 