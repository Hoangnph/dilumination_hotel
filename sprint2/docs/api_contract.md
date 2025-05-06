# API Contract – Sprint 2

## 1. Admin Service
### 1.1. Endpoints
- `POST /admin/accounts` – Tạo tài khoản admin
- `GET /admin/accounts` – Lấy danh sách admin
- `GET /admin/accounts/:id` – Lấy chi tiết admin
- `PUT /admin/accounts/:id` – Cập nhật admin
- `DELETE /admin/accounts/:id` – Xóa admin
- `POST /admin/config` – Cập nhật cấu hình hệ thống
- `GET /admin/config` – Lấy cấu hình hệ thống
- `POST /admin/system` – Thao tác hệ thống

### 1.2. Request/Response
- **Request:** JSON body, validate schema
- **Response:**
  - 200 OK: `{ data: ... }`
  - 201 Created: `{ data: ... }`
  - 400 Bad Request: `{ error: '...' }`
  - 401 Unauthorized: `{ error: '...' }`
  - 403 Forbidden: `{ error: '...' }`
  - 404 Not Found: `{ error: '...' }`
  - 409 Conflict: `{ error: '...' }`
  - 500 Internal Server Error: `{ error: '...' }`

## 2. Hotel Management Service
### 2.1. Endpoints
- `POST /admin/hotels` – Đăng ký khách sạn
- `GET /admin/hotels` – Lấy danh sách khách sạn
- `GET /admin/hotels/:id` – Lấy chi tiết khách sạn
- `PUT /admin/hotels/:id` – Cập nhật khách sạn
- `DELETE /admin/hotels/:id` – Xóa khách sạn
- `POST /admin/status` – Cập nhật trạng thái khách sạn
- `GET /admin/status` – Lấy trạng thái khách sạn
- `POST /admin/approvals` – Duyệt khách sạn

### 2.2. Request/Response
- **Request:** JSON body, validate schema
- **Response:**
  - 200 OK, 201 Created, 400, 401, 403, 404, 409, 500 (như trên)

## 3. Room Management Service
### 3.1. Endpoints
- `POST /hotel/rooms` – Tạo phòng
- `GET /hotel/rooms` – Lấy danh sách phòng
- `GET /hotel/rooms/:id` – Lấy chi tiết phòng
- `PUT /hotel/rooms/:id` – Cập nhật phòng
- `DELETE /hotel/rooms/:id` – Xóa phòng
- `POST /hotel/pricing` – Cập nhật giá phòng
- `GET /hotel/pricing` – Lấy thông tin giá phòng
- `POST /hotel/amenities` – Cập nhật tiện nghi
- `GET /hotel/amenities` – Lấy tiện nghi

### 3.2. Request/Response
- **Request:** JSON body, validate schema
- **Response:**
  - 200 OK, 201 Created, 400, 401, 403, 404, 409, 500 (như trên)

## 4. API Gateway (Mở rộng)
- Routing: `/api/admin/*`, `/api/hotel/*` → proxy đến service tương ứng
- Rate limiting: 429 Too Many Requests
- Error handling: Chuẩn hóa response `{ error: '...' }`, log lỗi
- Monitoring: endpoint `/api/monitor/metrics`

## 5. Error Handling & Status Codes
- 200 OK: Thành công
- 201 Created: Tạo mới thành công
- 400 Bad Request: Dữ liệu không hợp lệ
- 401 Unauthorized: Chưa xác thực
- 403 Forbidden: Không đủ quyền
- 404 Not Found: Không tìm thấy
- 409 Conflict: Trùng lặp, xung đột
- 429 Too Many Requests: Quá giới hạn
- 500 Internal Server Error: Lỗi hệ thống

## 6. Notes
- Tất cả endpoint đều yêu cầu xác thực JWT, phân quyền phù hợp
- Validate input/output bằng schema
- Response luôn có dạng `{ data: ... }` hoặc `{ error: '...' }`
- Đảm bảo idempotency cho các endpoint PUT/DELETE 