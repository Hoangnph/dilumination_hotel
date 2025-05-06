# API Contract - Sprint 1

## 1. Hotel
### GET /hotels
- Lấy danh sách khách sạn
- Response: `[Hotel]`

### POST /hotels
- Tạo khách sạn mới
- Request: `{ name, address, description }`
- Response: `Hotel`

### GET /hotels/:id
- Lấy thông tin chi tiết khách sạn
- Response: `Hotel`

### PUT /hotels/:id
- Cập nhật thông tin khách sạn
- Request: `{ name?, address?, description? }`
- Response: `Hotel`

### DELETE /hotels/:id
- Xóa khách sạn
- Response: `{ success: boolean }`

---

## 2. Room
### GET /rooms
- Lấy danh sách phòng
- Query: `hotel_id?`
- Response: `[Room]`

### POST /rooms
- Tạo phòng mới
- Request: `{ hotel_id, type, price, status }`
- Response: `Room`

### GET /rooms/:id
- Lấy thông tin chi tiết phòng
- Response: `Room`

### PUT /rooms/:id
- Cập nhật thông tin phòng
- Request: `{ type?, price?, status? }`
- Response: `Room`

### DELETE /rooms/:id
- Xóa phòng
- Response: `{ success: boolean }`

---

## 3. Booking
### GET /bookings
- Lấy danh sách booking
- Query: `user_id? room_id?`
- Response: `[Booking]`

### POST /bookings
- Tạo booking mới
- Request:
```json
{
  "user_id": 1,
  "room_id": 2,
  "checkin": "2025-05-10",
  "checkout": "2025-05-12",
  "status": "pending"
}
```
- Response: 201 Created, trả về booking vừa tạo
- Error: 409 nếu double booking, 400 nếu input lỗi

### GET /bookings/:id
- Lấy chi tiết booking
- Response: 200, object booking; 404 nếu không tồn tại

### PUT /bookings/:id
- Cập nhật booking
- Request: partial update
- Response: 200, object booking; 404 nếu không tồn tại

### DELETE /bookings/:id
- Xóa booking
- Response: 204 No Content; 404 nếu không tồn tại

---

## 4. User
### GET /users
- Lấy danh sách user
- Response: `[User]`

### POST /users
- Tạo user mới
- Request: `{ name, email, password, role }`
- Response: `User`

### GET /users/:id
- Lấy chi tiết user
- Response: `User`

### PUT /users/:id
- Cập nhật user
- Request: `{ name?, email?, password?, role? }`
- Response: `User`

### DELETE /users/:id
- Xóa user
- Response: `{ success: boolean }`

---

## 5. Auth
### POST /auth/register
- Đăng ký tài khoản
- Request: `{ name, email, password }`
- Response: `User`

### POST /auth/login
- Đăng nhập
- Request: `{ email, password }`
- Response: `{ token, user }`

### POST /auth/logout
- Đăng xuất
- Request: `{}`
- Response: `{ success: boolean }`

## 6. Response format
- Thành công: object hoặc array, status code chuẩn REST
- Lỗi: `{ "error": "message" }`, status code 400/404/409 tuỳ trường hợp 