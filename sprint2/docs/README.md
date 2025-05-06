# Sprint 2: Admin & Hotel Management Services

> **Lưu ý quan trọng:**
> - Mọi thành viên phải tuân thủ nghiêm ngặt tiêu chuẩn **CLEAN code** (code rõ ràng, dễ đọc, không lặp, tách biệt concern, đặt tên rõ nghĩa, validate input/output, middleware/schema/API contract chuẩn hóa).
> - Áp dụng **TDD**: Viết test case trước khi code, test unit/integration bao phủ logic, edge case, security, concurrency. Không merge code chưa pass test, chưa đủ coverage, chưa seed/test isolation.

## 1. Tổng Quan
Sprint 2 tập trung mở rộng hệ thống với các dịch vụ quản trị (Admin), quản lý khách sạn, quản lý phòng, và các tính năng nâng cao cho API Gateway. Mục tiêu là hoàn thiện các nghiệp vụ quản trị, quản lý khách sạn, chuẩn hóa quy trình test, seed/test, và tài liệu hóa đầy đủ.

## 2. Mục Tiêu
- Xây dựng các service quản trị (Admin), quản lý khách sạn, quản lý phòng.
- Mở rộng API Gateway: routing, rate limiting, validation, error handling, monitoring.
- Đảm bảo test coverage ≥ 80% cho các service mới.
- Chuẩn hóa migration, seed/test, phân quyền, tài liệu hóa.
- Bổ sung test security, performance, concurrency.

## 3. Deliverables
- Model/schema cho Admin, Hotel, Room, các workflow quản trị.
- API endpoint CRUD cho Admin, Hotel, Room, các workflow approval.
- Middleware xác thực, phân quyền, rate limiting, monitoring.
- Test unit/integration cho các API mới.
- Tài liệu API (OpenAPI/Swagger, README, test_plan).
- Hướng dẫn migration, seed/test, CI/CD, checklist nghiệm thu.

## 4. Checklist thực hiện
- [ ] Thiết kế model/schema cho Admin, Hotel, Room (mở rộng)
- [ ] CRUD API cho Admin, Hotel, Room, approval workflow
- [ ] Migration SQL, seed dữ liệu mẫu
- [ ] Middleware: xác thực, phân quyền, rate limiting, monitoring
- [ ] Test unit/integration, test coverage ≥ 80%
- [ ] Test security, performance, concurrency
- [ ] Chuẩn hóa API contract, response, status code
- [ ] Tài liệu README, test_plan, hướng dẫn migration, seed/test
- [ ] CI/CD: test, build, coverage, alert
- [ ] Checklist nghiệm thu, báo cáo tiến độ

## 5. Quy trình làm việc
1. Thiết kế model/schema, migration, seed dữ liệu mẫu
2. Xây dựng API endpoint CRUD, workflow approval
3. Bổ sung middleware xác thực, phân quyền, rate limiting, monitoring
4. Viết test unit/integration, test security/performance/concurrency
5. Chuẩn hóa API contract, response, status code
6. Cập nhật tài liệu README, test_plan, hướng dẫn migration, seed/test
7. Đảm bảo test coverage ≥ 80%, pass 100% trên MySQL thật
8. Checklist nghiệm thu, báo cáo tiến độ

## 6. Đề xuất mở rộng
- Tích hợp monitoring, logging, alert cho các service mới
- Bổ sung test security, performance, concurrency nâng cao
- Mở rộng CI/CD: deploy, rollback, alert, coverage
- Chuẩn bị cho các sprint tiếp theo: Frontend, PWA, Portal

---
**Tài liệu này tổng hợp quy trình, checklist, hướng dẫn thực hiện Sprint 2 dựa trên các chuẩn hóa từ Sprint 1. Đảm bảo mọi thành viên đều tuân thủ quy trình, checklist, và cập nhật tiến độ định kỳ.** 