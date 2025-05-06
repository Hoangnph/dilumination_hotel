# Workflow - Sprint 1

## 1. Quy Tắc Code
- Sử dụng TypeScript, tuân thủ code style, đặt tên rõ ràng
- Áp dụng nguyên tắc CLEAN code (đặt tên rõ ràng, hàm ngắn gọn, tránh lặp code, tách biệt concern, comment hợp lý)
- Ưu tiên function thuần, hạn chế class nếu không cần thiết
- Tách biệt rõ model, route, controller, service, middleware
- Áp dụng Test-Driven Development (TDD): viết test trước, code sau
- Đảm bảo code có test, tài liệu

## 2. Quy Trình Review & Merge
- Mỗi PR phải có mô tả rõ ràng, checklist task
- Phải có ít nhất 1 reviewer approve trước khi merge
- PR phải pass CI (lint, test, build)
- Không merge code chưa có test hoặc tài liệu

## 3. CI/CD
- Tự động chạy lint, test, build trên mỗi PR
- Chạy test coverage, báo cáo coverage
- Build Docker image (nếu cần)

## 4. Test & Demo
- Áp dụng TDD: test phải được viết trước khi code
- Test local trước khi tạo PR
- Đảm bảo test coverage ≥ 80%
- Demo/tổng kết cuối sprint: trình bày API, test, tài liệu

## 5. Tiêu Chí Hoàn Thành (Definition of Done)
- Code sạch, pass lint, test, build
- Đủ test case, pass test coverage
- Có tài liệu cập nhật (README, API, data model)
- Được review và approve
- Được demo/tổng kết cuối sprint

# Workflow – DIlumination Hotel Microservices

## 1. Quy trình phát triển
- Thiết kế data model, migration SQL cho từng service (hotel, room, booking, user/auth)
- Scaffold codebase, chuẩn hóa API contract, phân quyền, role
- Cấu hình .env, migration DB, seed dữ liệu mẫu
- Viết test CRUD, isolation, phân quyền, register, login, verify
- Đảm bảo test isolation: seed/reset DB, reset AUTO_INCREMENT trước mỗi test suite
- Đảm bảo phân quyền: chỉ admin thao tác user, các role khác giới hạn quyền
- Review code, merge, test coverage, chuẩn hóa tài liệu @docs

## 2. Quy trình nghiệm thu
- Chạy migration, seed lại DB trên MySQL thật
- Chạy toàn bộ test suite (npm test -- --runInBand)
- Đảm bảo pass 100% booking, hotel, room, user/auth
- Kiểm tra phân quyền, isolation, CRUD, register, login, verify
- Cập nhật tài liệu: README, api_contract, data_model, test_plan, báo cáo

## 3. CI/CD & vận hành
- Tích hợp pipeline tự động test/build/deploy
- Báo cáo coverage, log, monitor, alert
- Định kỳ cập nhật tài liệu, checklist, báo cáo tiến độ 