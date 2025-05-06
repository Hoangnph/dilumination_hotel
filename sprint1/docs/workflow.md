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
- Scaffold model, migration SQL, .env cho từng service.
- Refactor service layer sang thao tác DB thực (mysql2/promise, Sequelize).
- Viết test CRUD, isolation, double booking, update, delete.
- Build & test pass 100% với MySQL thật.

## 2. Migration & cấu hình
- Đặt .env đúng biến môi trường DB.
- Chạy migration SQL tạo bảng trước khi test/dev.

## 3. Test & nghiệm thu
- Chạy npm test cho từng service.
- Đảm bảo test CRUD, isolation, double booking đều pass.
- Báo cáo nghiệm thu, cập nhật tài liệu.

## 4. Vận hành & mở rộng
- Khởi động từng service bằng npm run dev/start.
- Tích hợp CI/CD, logging, monitoring nếu cần.
- Mở rộng service room, bổ sung test khi hoàn thiện CRUD DB thực. 