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

## 4. User/Auth
### POST /auth/register
- Đăng ký tài khoản (customer)
- Request:
```json
{
  "name": "Customer Test",
  "email": "customer_test@dilumination.com",
  "password": "test123"
}
```
- Response: 201 Created, trả về user vừa tạo
- Error: 409 nếu email đã tồn tại

### POST /auth/login
- Đăng nhập
- Request:
```json
{
  "email": "customer_test@dilumination.com",
  "password": "test123"
}
```
- Response: 200, `{ token, user }`; 401 nếu sai thông tin

### POST /auth/verify
- Xác thực token
- Request: `{ token }`
- Response: 200, `{ id, role }`; 401 nếu token không hợp lệ

### GET /users (admin)
- Lấy danh sách user (chỉ admin)
- Header: `Authorization: Bearer <token>`
- Response: 200, array user

### POST /users (admin)
- Tạo user mới (chỉ admin)
- Request: `{ name, email, password_hash, role }`
- Response: 201, user

### PUT /users/:id (admin)
- Cập nhật user (chỉ admin)
- Request: partial update
- Response: 200, user

### DELETE /users/:id (admin)
- Xóa user (chỉ admin)
- Response: 204 No Content

### Role & phân quyền
- `admin`: Toàn quyền quản trị, CRUD user, phân quyền
- `hotel`: Quản lý khách sạn, phòng, booking liên quan
- `staff`: Quản lý phòng, housekeeping
- `customer`: Đặt phòng, quản lý booking cá nhân

---

## 5. Response format
- Thành công: object hoặc array, status code chuẩn REST
- Lỗi: `{ "error": "message" }`, status code 400/401/403/404/409 tuỳ trường hợp 