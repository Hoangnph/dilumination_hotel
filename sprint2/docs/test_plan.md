# Test Plan - Sprint 2

> **Lưu ý:**
> - Áp dụng nghiêm ngặt **TDD**: Viết test case trước khi code, test unit/integration phải bao phủ logic, edge case, security, concurrency.
> - Đảm bảo **CLEAN code**: Test phải rõ ràng, dễ đọc, không lặp, tách biệt concern, validate input/output, seed/test isolation.
> - Không merge code chưa pass test, chưa đủ coverage, chưa seed/test isolation.

## 1. Mục Tiêu
Đảm bảo các API quản trị, quản lý khách sạn, phòng, và các tính năng mở rộng của API Gateway hoạt động đúng, an toàn, đáp ứng yêu cầu nghiệp vụ và bảo mật. Áp dụng TDD, CLEAN code, chuẩn hóa seed/test, checklist nghiệm thu.

## 2. Phạm Vi
- Model/schema: Admin, Hotel, Room (mở rộng)
- API endpoint: CRUD cho từng thực thể, approval workflow
- Middleware: xác thực, phân quyền, rate limiting, monitoring
- API Gateway: routing, validation, error handling, monitoring
- Tích hợp và kiểm thử với MySQL, Redis

## 3. Loại Test
- Unit test (model, service)
- Integration test (API endpoint, DB, Redis)
- Edge case test
- Security test (auth, phân quyền, input validation, SQL injection, XSS)
- Performance test (stress, concurrency, multi-user)

## 4. Test Case Chính
### 4.1. Admin/Hotel/Room CRUD & Workflow
- [ ] Tạo mới (valid data) → Thành công
- [ ] Tạo mới (thiếu trường bắt buộc) → 400 Bad Request
- [ ] Lấy danh sách → Trả về mảng đúng
- [ ] Lấy chi tiết (id hợp lệ) → Trả về object đúng
- [ ] Lấy chi tiết (id không tồn tại) → 404 Not Found
- [ ] Cập nhật (valid) → Thành công
- [ ] Cập nhật (id không tồn tại) → 404 Not Found
- [ ] Xóa (id hợp lệ) → Thành công
- [ ] Xóa (id không tồn tại) → 404 Not Found
- [ ] Workflow approval: duyệt, từ chối, trạng thái hợp lệ

### 4.2. API Gateway
- [ ] Routing đúng service
- [ ] Rate limiting hoạt động
- [ ] Validation input/output
- [ ] Error handling chuẩn hóa
- [ ] Monitoring, logging

### 4.3. Security
- [ ] SQL injection, XSS, input validation
- [ ] JWT expired/invalid → 401 Unauthorized
- [ ] Test brute force, lockout
- [ ] Test concurrency: nhiều user thao tác đồng thời

### 4.4. Performance/Concurrency
- [ ] Stress test: nhiều request đồng thời
- [ ] Đảm bảo không race condition, deadlock

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
- Tất cả test admin, hotel, room, API Gateway pass 100% trên MySQL thật
- Đã kiểm thử phân quyền, isolation, CRUD, workflow, security, performance, concurrency
- Đủ điều kiện production-ready

## 8. Seed/test chuẩn hóa
- Trước khi chạy test tích hợp, cần seed lại dữ liệu mẫu (admin, hotel, room):
```
npx ts-node ../api-gateway/tests/seed_admin_user.ts
```
- Có thể mở rộng script seed cho các entity mới.

## 9. Quy trình test end-to-end
1. Seed dữ liệu mẫu: `npx ts-node ../api-gateway/tests/seed_admin_user.ts`
2. Chạy test từng service:
   - `cd admin && npm test -- --runInBand`
   - `cd hotel && npm test -- --runInBand`
   - `cd room && npm test -- --runInBand`
3. Chạy test tích hợp API Gateway:
   - `cd api-gateway && npm test -- --runInBand` 