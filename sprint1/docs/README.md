# Sprint 1: Xây Dựng Nghiệp Vụ Cốt Lõi

## Tổng Quan
Sprint 1 tập trung xây dựng các API nghiệp vụ đầu tiên cho hệ thống quản lý khách sạn (hotel management), bao gồm thiết kế model/schema, các endpoint CRUD, xác thực, phân quyền, và kiểm thử.

**Hạ tầng đã có (từ Sprint 0):**
- MySQL 8.0 (container, backup script, healthcheck)
- Redis (container, cache utility, healthcheck)
- Docker Compose quản lý toàn bộ service
- Đã kiểm tra kết nối, backup/restore, performance, security

## Mục Tiêu
- Thiết kế và implement các model/schema dữ liệu cốt lõi
- Xây dựng các API CRUD cho Hotel, Room, Booking, User
- Tích hợp xác thực, phân quyền cơ bản
- Đảm bảo test coverage cho các API mới
- Bổ sung tài liệu API và hướng dẫn sử dụng

## Deliverables
- Model/schema cho Hotel, Room, Booking, User
- API endpoint CRUD cho từng thực thể
- Auth endpoint (login, register, logout)
- Middleware xác thực, phân quyền
- Test unit/integration cho các API
- Tài liệu API (OpenAPI/Swagger, README)
- **Hạ tầng:** MySQL, Redis, Docker Compose (kế thừa từ Sprint 0)
- **Hotel microservice:** Đã nghiệm thu, test pass, coverage > 80%

## Công Nghệ Sử Dụng
- Node.js, TypeScript
- Express/Fastify (tùy chọn)
- MySQL, Redis
- Jest
- Docker

## Cấu Trúc Thư Mục Đề Xuất
```
sprint1/
├── docs/
├── src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   └── utils/
└── tests/
```

## Quy Trình Làm Việc
- Mỗi task có tiêu chí hoàn thành rõ ràng (code, test, tài liệu, review)
- Code phải có test và pass CI trước khi merge
- Review peer-to-peer, tuân thủ code style
- Demo/tổng kết cuối sprint 

# DIlumination Hotel Microservices

## 1. Tổng quan
- Hệ thống gồm các microservice: **booking**, **hotel**, **room**, **user/auth**.
- Tất cả đều tích hợp MySQL thực, chuẩn RESTful, test pass 100%, phân quyền đầy đủ.

## 2. Cấu hình môi trường (`.env`)
Đặt file `.env` trong mỗi thư mục service:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=admin@123
DB_NAME=hotel_db
JWT_SECRET=your-secret-key
```

## 3. Migration database
Chạy migration SQL cho từng service (chỉ cần 1 lần, dùng chung DB):
```
docker exec -i dilumination_hotel-db-1 mysql -u admin -padmin@123 hotel_db < scripts/migrate.sql
```

## 4. Build & test từng service
```
npm install
npm run build
npm test
```

## 5. Khởi động service
```
npm run dev
# hoặc
npm start
```
- booking: 3003, hotel: 3001, room: 3002, user/auth: 3004

## 6. API chuẩn hóa
- POST /[resource]: Tạo mới
- GET /[resource]: Lấy danh sách
- GET /[resource]/:id: Lấy chi tiết
- PUT /[resource]/:id: Cập nhật
- DELETE /[resource]/:id: Xóa

## 7. Phân quyền & role
- `admin`: Toàn quyền quản trị, CRUD user, phân quyền
- `hotel`: Quản lý khách sạn, phòng, booking liên quan
- `staff`: Quản lý phòng, housekeeping
- `customer`: Đặt phòng, quản lý booking cá nhân

## 8. Test nghiệm thu & production-ready
- Đã kiểm thử CRUD, isolation, double booking, update, delete, phân quyền, security, performance, concurrency với DB thật.
- Test pass 100% cho booking, hotel, room, user/auth.
- Đảm bảo test coverage ≥ 80%, không lỗi bảo mật/blocker.

## 9. CI/CD & vận hành
- Chạy toàn bộ test: `npm run lint && npm run build && npm test -- --runInBand`
- Đảm bảo pass trên local và CI/CD pipeline
- Báo cáo coverage, log lỗi, alert nếu fail
- Định kỳ cập nhật tài liệu, checklist, báo cáo tiến độ

## 10. Khuyến nghị
- Ưu tiên bổ sung test security, performance, concurrency.
- Tích hợp CI/CD nâng cao, logging, monitoring, cache Redis, tối ưu DB.
- Mở rộng service nếu cần. 

## 11. Seed user admin trước khi test tích hợp
- Để đảm bảo các test phân quyền và tích hợp luôn pass, cần seed lại user admin vào database trước khi test:
```
npx ts-node ../api-gateway/tests/seed_admin_user.ts
```

## 12. Quy trình test end-to-end
1. Seed user admin: `npx ts-node ../api-gateway/tests/seed_admin_user.ts`
2. Chạy test từng service:
   - `cd hotel && npm test -- --runInBand`
   - `cd room && npm test -- --runInBand`
   - `cd booking && npm test -- --runInBand`
   - `cd user && npm test -- --runInBand`
3. Chạy test tích hợp API Gateway:
   - `cd api-gateway && npm test -- --runInBand` 