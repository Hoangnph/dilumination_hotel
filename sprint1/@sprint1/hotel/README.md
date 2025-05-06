# Hotel Microservice

## Mục Tiêu
Quản lý thông tin khách sạn (CRUD), phục vụ cho hệ thống quản lý khách sạn.

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

## API CRUD Hotel

### Tạo khách sạn
- `POST /hotels`
- Request: `{ "name": "Hotel Name", "address": "123 Main St", "description": "Mô tả" }`
- Response: `{ id, name, address, description, created_at, updated_at }`

### Lấy danh sách khách sạn
- `GET /hotels`
- Response: `[{ id, name, address, ... }]`

### Lấy chi tiết khách sạn
- `GET /hotels/:id`
- Response: `{ id, name, address, ... }`

### Cập nhật khách sạn
- `PUT /hotels/:id`
- Request: `{ name?, address?, description? }`
- Response: `{ id, name, address, ... }`

### Xóa khách sạn
- `DELETE /hotels/:id`
- Response: `204 No Content` 