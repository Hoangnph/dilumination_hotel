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
- Security test (auth, phân quyền, input validation)

## 4. Test Case Chính
### 4.1. Hotel/Room/Booking/User CRUD
- [ ] Tạo mới (valid data) → Thành công
- [ ] Tạo mới (thiếu trường bắt buộc) → 400 Bad Request
- [ ] Lấy danh sách → Trả về mảng đúng
- [ ] Lấy chi tiết (id hợp lệ) → Trả về object đúng
- [ ] Lấy chi tiết (id không tồn tại) → 404 Not Found
- [ ] Cập nhật (valid) → Thành công
- [ ] Cập nhật (id không tồn tại) → 404 Not Found
- [ ] Xóa (id hợp lệ) → Thành công
- [ ] Xóa (id không tồn tại) → 404 Not Found

### 4.2. Booking Logic
- [ ] Đặt phòng khi phòng còn trống → Thành công
- [ ] Đặt phòng khi phòng đã được đặt → 409 Conflict
- [ ] Đặt phòng với ngày checkout < checkin → 400 Bad Request

### 4.3. Auth
- [ ] Đăng ký (valid) → Thành công
- [ ] Đăng ký (email đã tồn tại) → 409 Conflict
- [ ] Đăng nhập (đúng) → Nhận token
- [ ] Đăng nhập (sai) → 401 Unauthorized
- [ ] Truy cập endpoint cần auth không có token → 401 Unauthorized
- [ ] Truy cập endpoint cần quyền admin với user thường → 403 Forbidden

### 4.4. Security
- [ ] SQL injection, XSS, input validation
- [ ] JWT expired/invalid → 401 Unauthorized

## 5. Tiêu Chí Pass/Fail
- Tất cả test case critical phải pass
- Không có lỗi bảo mật/blocker
- Test coverage ≥ 80%
- Đảm bảo test tích hợp với MySQL, Redis hoạt động ổn định 

# Test Plan – DIlumination Hotel Microservices

## 1. Phạm vi
- Test nghiệm thu cho booking, hotel, room microservice.
- Tích hợp MySQL thực, kiểm thử CRUD, isolation, double booking, update, delete.

## 2. Chuẩn bị
- Đảm bảo đã migrate DB, cấu hình .env đúng.
- Dùng Jest + Supertest cho API test.

## 3. Kịch bản test
### 3.1. Booking
- Tạo booking mới (POST /bookings)
- Không cho phép double booking (409)
- Lấy danh sách booking (GET /bookings)
- Lấy chi tiết booking (GET /bookings/:id)
- Cập nhật booking (PUT /bookings/:id)
- Xóa booking (DELETE /bookings/:id)
- Test isolation: reset DB trước/sau test

### 3.2. Hotel
- Tạo hotel mới (POST /hotels)
- Lấy danh sách hotel (GET /hotels)
- Lấy chi tiết hotel (GET /hotels/:id)
- Cập nhật hotel (PUT /hotels/:id)
- Xóa hotel (DELETE /hotels/:id)
- Test isolation: reset DB trước/sau test

### 3.3. Room
- Tạo room mới (POST /rooms)
- Lấy danh sách room (GET /rooms)
- Lấy chi tiết room (GET /rooms/:id)
- Cập nhật room (PUT /rooms/:id)
- Xóa room (DELETE /rooms/:id)
- Test isolation: reset DB trước/sau test

## 4. Kết quả nghiệm thu
- **Booking:** 7/7 test pass, CRUD, double booking, isolation OK.
- **Hotel:** 7/7 test pass, CRUD, isolation OK.
- **Room:** Đã scaffold, sẽ tự động hóa tiếp nếu cần.

## 5. Đề xuất mở rộng
- Tích hợp CI/CD tự động test/build/deploy.
- Bổ sung test security, performance, concurrency.
- Mở rộng test cho room khi hoàn thiện CRUD DB thực. 