# Sprint 1 Microservices Integration

## Tổng Quan
Dự án sử dụng kiến trúc microservices với các service chính:
- **hotel**: Quản lý thông tin khách sạn (CRUD)
- **room**: Quản lý thông tin phòng (CRUD)
- **api-gateway**: Đóng vai trò gateway, proxy request đến các service hotel, room

Tất cả service được đóng gói, tích hợp và kiểm thử tự động bằng Docker Compose.

---

## Quy Trình Tích Hợp & Tự Động Hóa

### 1. Scaffold & Build
- Mỗi service có cấu trúc độc lập, sử dụng Express, TypeScript, Jest (TDD), Dockerfile riêng.
- API Gateway sử dụng http-proxy-middleware để forward request tới các service.
- Docker Compose quản lý toàn bộ vòng đời service, build, run, networking.

### 2. Fix & Tối Ưu Tích Hợp
- Đảm bảo body parser (`express.json()`) chỉ dùng ở service, KHÔNG dùng ở API Gateway để tránh lỗi proxy body.
- Thêm logic chờ service sẵn sàng (`wait-on`) trong test tích hợp.
- Đảm bảo health check endpoint trả về 200 khi service thực sự sẵn sàng.
- Build lại image, restart toàn bộ hệ thống khi có thay đổi.

### 3. Test Tích Hợp
- Test tích hợp chạy trong container api-gateway, gọi lần lượt các API CRUD qua gateway.
- Test sẽ chờ các service sẵn sàng trước khi thực thi.
- Kết quả: 100% test pass, xác nhận hệ thống hoạt động đúng.

---

## Hướng Dẫn Sử Dụng

### Build & Khởi Động Toàn Bộ Hệ Thống
```bash
cd sprint1/@sprint1
docker compose up -d --build
```

### Chạy Test Tích Hợp
```bash
docker compose exec api-gateway npm test
```

### Kết Quả Mong Đợi
- Tất cả test pass, xác nhận tích hợp thành công.
- Có thể mở rộng cho các service tiếp theo (booking, user, auth, ...).

---

## Lưu Ý Kỹ Thuật
- Không dùng body parser ở API Gateway khi proxy request có body.
- Đảm bảo health check endpoint thực sự phản ánh trạng thái sẵn sàng của service.
- Sử dụng Docker Compose để đảm bảo môi trường nhất quán, dễ CI/CD.

---

## Đóng Góp & Mở Rộng
- Có thể thêm healthcheck, monitoring, logging, CI/CD pipeline cho production.
- Có thể mở rộng gateway cho rate limiting, auth, validation, ...

---

## Người thực hiện
- Tự động hóa bởi AI, kiểm thử và tối ưu theo chuẩn CLEAN code, TDD, DevOps. 