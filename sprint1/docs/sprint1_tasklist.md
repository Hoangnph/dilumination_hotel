# Sprint 1 – Task List

## Checklist
- [x] Hotel CRUD, REST, test pass 100%
- [x] Room CRUD, REST, test pass 100%
- [x] Booking CRUD, REST, test pass 100%
- [x] User/Auth CRUD, register, login, verify, role, test pass 100%, phân quyền
- [x] Migration SQL, seed, test isolation, reset AUTO_INCREMENT
- [x] Test security, performance, concurrency, stress, edge case
- [x] Chuẩn hóa API contract, data model, test plan, workflow, báo cáo
- [x] CI/CD, hướng dẫn nghiệm thu, checklist production-ready
- [x] Báo cáo nghiệm thu, checklist, tài liệu hóa đầy đủ

## 1. Thiết Kế Model/Schema
- [x] Hotel (id, name, address, description, ...)
- [x] Room (id, hotel_id, type, price, status, ...)
- [x] Booking (id, user_id, room_id, checkin, checkout, status, ...)
- [x] User (id, name, email, password_hash, role, ...)

## 2. Xây Dựng API Endpoint
- [x] CRUD Hotel: /hotels
- [x] CRUD Room: /rooms
- [x] CRUD Booking: /bookings
- [x] CRUD User: /users
- [x] Auth: /auth/login, /auth/register, /auth/verify

## 3. Business Logic & Middleware
- [x] Kiểm tra phòng trống khi booking
- [x] Tính toán giá booking
- [x] Middleware xác thực, phân quyền

## 4. Testing & Code Quality
- [x] Áp dụng Test-Driven Development (TDD): viết test trước, code sau
- [x] Đảm bảo code tuân thủ CLEAN code
- [x] Unit test cho model, service
- [x] Integration test cho API endpoint
- [x] Test case cho edge case
- [x] Test security, performance, concurrency, stress

## 5. Documentation
- [x] Cập nhật README về API mới
- [x] Tạo file OpenAPI/Swagger
- [x] Hướng dẫn sử dụng API
- [x] Xác nhận sử dụng MySQL, Redis (kế thừa từ Sprint 0)
- [x] Checklist production-ready, hướng dẫn nghiệm thu

## Progress Tracking
- Total Tasks: 21
- Completed: 21
- Remaining: 0
- Progress: 100%

## Notes
- Đã nghiệm thu toàn bộ microservice: test pass, coverage > 80%, production-ready 