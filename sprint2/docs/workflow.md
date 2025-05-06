# Workflow – Sprint 2

> **Lưu ý:**
> - Mọi bước phát triển phải tuân thủ **CLEAN code** (code rõ ràng, không lặp, tách biệt concern, validate input/output, chuẩn hóa schema/API contract).
> - Áp dụng **TDD**: Viết test trước khi code, test isolation, coverage ≥ 80%, không merge code chưa pass test.

## 1. Quy trình phát triển
1. Thiết kế model/schema, migration SQL, seed dữ liệu mẫu
2. Xây dựng API endpoint CRUD, workflow approval cho admin, hotel, room
3. Bổ sung middleware xác thực, phân quyền, rate limiting, monitoring
4. Viết test unit/integration, test security/performance/concurrency
5. Chuẩn hóa API contract, response, status code
6. Cập nhật tài liệu README, test_plan, api_contract, hướng dẫn migration, seed/test
7. Đảm bảo test coverage ≥ 80%, pass 100% trên MySQL thật
8. Checklist nghiệm thu, báo cáo tiến độ

## 2. Migration & seed/test
- Viết migration SQL cho admin, hotel, room
- Tạo script seed dữ liệu mẫu (admin, hotel, room)
- Chạy seed trước khi test tích hợp:
```
npx ts-node ../api-gateway/tests/seed_admin_user.ts
```
- Có thể mở rộng script seed cho các entity mới

## 3. CI/CD & kiểm thử
- Chạy toàn bộ test: `npm run lint && npm run build && npm test -- --runInBand`
- Đảm bảo pass trên local và CI/CD pipeline
- Báo cáo coverage, log lỗi, alert nếu fail

## 4. Checklist nghiệm thu
- [ ] CRUD cho admin, hotel, room, approval workflow
- [ ] Migration SQL, seed/test chuẩn hóa
- [ ] Test coverage ≥ 80%, pass 100% trên MySQL thật
- [ ] Phân quyền, security, performance, concurrency
- [ ] Tài liệu README, test_plan, api_contract, hướng dẫn migration, seed/test
- [ ] Đã nghiệm thu production-ready, sẵn sàng cho Sprint 3

## 5. Báo cáo tiến độ
- Định kỳ cập nhật tài liệu, checklist, báo cáo tiến độ
- Chuẩn bị cho các sprint tiếp theo: Frontend, PWA, Portal, monitoring, CI/CD nâng cao 