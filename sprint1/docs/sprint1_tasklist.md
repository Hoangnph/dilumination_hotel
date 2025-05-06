# Sprint 1 Task List

## 1. Thiết Kế Model/Schema
- [x] Hotel (id, name, address, description, ...)
- [ ] Room (id, hotel_id, type, price, status, ...)
- [ ] Booking (id, user_id, room_id, checkin, checkout, status, ...)
- [ ] User (id, name, email, password_hash, role, ...)

## 2. Xây Dựng API Endpoint
- [x] CRUD Hotel: /hotels
- [ ] CRUD Room: /rooms
- [ ] CRUD Booking: /bookings
- [ ] CRUD User: /users
- [ ] Auth: /auth/login, /auth/register, /auth/logout

## 3. Business Logic & Middleware
- [ ] Kiểm tra phòng trống khi booking
- [ ] Tính toán giá booking
- [ ] Middleware xác thực, phân quyền

## 4. Testing & Code Quality
- [x] Áp dụng Test-Driven Development (TDD): viết test trước, code sau (hotel)
- [x] Đảm bảo code tuân thủ CLEAN code (hotel)
- [x] Unit test cho model, service (hotel)
- [x] Integration test cho API endpoint (hotel)
- [x] Test case cho edge case (hotel)
- [ ] Room, Booking, User, Auth (chưa thực hiện)

## 5. Documentation
- [x] Cập nhật README về API mới (hotel)
- [ ] Room, Booking, User, Auth (chưa thực hiện)
- [ ] Tạo file OpenAPI/Swagger
- [ ] Hướng dẫn sử dụng API
- [ ] Xác nhận sử dụng MySQL, Redis (kế thừa từ Sprint 0)

## Progress Tracking
- Total Tasks: 21
- Completed: 7
- Remaining: 14
- Progress: 33%

## Notes
- Đã nghiệm thu hotel microservice: test pass, coverage > 80% 