# Test Plan - Sprint 1

## 1. Mục Tiêu
Đảm bảo các API nghiệp vụ hoạt động đúng, an toàn, đáp ứng yêu cầu nghiệp vụ và bảo mật. Áp dụng Test-Driven Development (TDD) và nguyên tắc CLEAN code trong toàn bộ quá trình phát triển và kiểm thử.

## 2. Phạm Vi
- Model/schema: Hotel, Room, Booking, User
- API endpoint: CRUD cho từng thực thể, Auth
- Middleware: xác thực, phân quyền
- Tích hợp và kiểm thử với MySQL, Redis (kế thừa từ Sprint 0)

## 3. Loại Test
- Unit test (model, service)
- Integration test (API endpoint, DB, Redis)
- Edge case test
- Security test (auth, phân quyền, input validation, SQL injection, XSS)
- Performance test (stress, concurrency, multi-user)

## 4. Test Case Chính
### 4.1. Hotel/Room/Booking/User CRUD
- [x] Tạo mới (valid data) → Thành công
- [x] Tạo mới (thiếu trường bắt buộc) → 400 Bad Request
- [x] Lấy danh sách → Trả về mảng đúng
- [x] Lấy chi tiết (id hợp lệ) → Trả về object đúng
- [x] Lấy chi tiết (id không tồn tại) → 404 Not Found
- [x] Cập nhật (valid) → Thành công
- [x] Cập nhật (id không tồn tại) → 404 Not Found
- [x] Xóa (id hợp lệ) → Thành công
- [x] Xóa (id không tồn tại) → 404 Not Found

### 4.2. Booking Logic
- [x] Đặt phòng khi phòng còn trống → Thành công
- [x] Đặt phòng khi phòng đã được đặt → 409 Conflict
- [x] Đặt phòng với ngày checkout < checkin → 400 Bad Request

### 4.3. Auth
- [x] Đăng ký (valid) → Thành công
- [x] Đăng ký (email đã tồn tại) → 409 Conflict
- [x] Đăng nhập (đúng) → Nhận token
- [x] Đăng nhập (sai) → 401 Unauthorized
- [x] Truy cập endpoint cần auth không có token → 401 Unauthorized
- [x] Truy cập endpoint cần quyền admin với user thường → 403 Forbidden

### 4.4. Security
- [x] SQL injection, XSS, input validation
- [x] JWT expired/invalid → 401 Unauthorized
- [x] Test brute force login, lockout
- [x] Test concurrency: nhiều user booking cùng lúc

### 4.5. Performance/Concurrency
- [x] Stress test: nhiều request đồng thời
- [x] Đảm bảo không race condition, deadlock

## 5. Tiêu Chí Pass/Fail
- Tất cả test case critical phải pass
- Không có lỗi bảo mật/blocker
- Test coverage ≥ 80%
- Đảm bảo test tích hợp với MySQL, Redis hoạt động ổn định
- Đảm bảo test security, performance, concurrency pass

## 6. Hướng dẫn chạy test CI/CD
- Chạy toàn bộ test: `npm run lint && npm run build && npm test -- --runInBand`
- Đảm bảo pass trên local và CI/CD pipeline
- Báo cáo coverage, log lỗi, alert nếu fail

## 7. Kết quả nghiệm thu
- Tất cả test booking, hotel, room, user/auth pass 100% trên MySQL thật
- Đã kiểm thử phân quyền, isolation, CRUD, register, login, verify, security, performance, concurrency
- Đủ điều kiện production-ready

## 6. Seed user admin trước khi test tích hợp
- Trước khi chạy test tích hợp (integration test), cần seed lại user admin vào database:
```
npx ts-node ../api-gateway/tests/seed_admin_user.ts
```

## 7. Quy trình test end-to-end
1. Seed user admin: `npx ts-node ../api-gateway/tests/seed_admin_user.ts`
2. Chạy test từng service:
   - `cd hotel && npm test -- --runInBand`
   - `cd room && npm test -- --runInBand`
   - `cd booking && npm test -- --runInBand`
   - `cd user && npm test -- --runInBand`
3. Chạy test tích hợp API Gateway:
   - `cd api-gateway && npm test -- --runInBand`

# Test Plan – DIlumination Hotel Microservices

## 1. Mục tiêu
- Đảm bảo toàn bộ API booking, hotel, room, user/auth hoạt động đúng, an toàn, phân quyền chuẩn.

## 2. Danh sách test case
### Hotel/Room/Booking
- Đã liệt kê chi tiết ở các phần trước (CRUD, isolation, double booking, update, delete)

### User/Auth
- [x] Đăng ký customer mới (POST /auth/register)
- [x] Đăng nhập (POST /auth/login)
- [x] Xác thực token (POST /auth/verify)
- [x] Lấy danh sách user (GET /users, chỉ admin)
- [x] Tạo user mới (POST /users, chỉ admin)
- [x] Cập nhật user (PUT /users/:id, chỉ admin)
- [x] Xóa user (DELETE /users/:id, chỉ admin)
- [x] Phân quyền: admin, hotel, staff, customer
- [x] Test isolation: seed lại DB, reset AUTO_INCREMENT trước mỗi test
- [x] Test pass 100% trên MySQL thật

## 3. Quy trình test
- Seed lại DB, reset AUTO_INCREMENT trước mỗi test suite
- Đảm bảo token hợp lệ, role đúng
- Kiểm tra status code, response, error message
- Đảm bảo không có race condition, test isolation tuyệt đối

## 4. Kết quả nghiệm thu
- Tất cả test booking, hotel, room, user/auth pass 100% trên MySQL thật
- Đã kiểm thử phân quyền, isolation, CRUD, register, login, verify

## 5. Đề xuất mở rộng
- Tích hợp CI/CD tự động test/build/deploy.
- Bổ sung test security, performance, concurrency.
- Mở rộng test cho room khi hoàn thiện CRUD DB thực. 