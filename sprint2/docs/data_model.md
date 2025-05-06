# Data Model – Sprint 2

## 1. Admin
| Trường         | Kiểu dữ liệu   | Mô tả                       |
|---------------|---------------|-----------------------------|
| id            | INT, PK, AI    | Mã admin                    |
| name          | VARCHAR(255)   | Tên admin                   |
| email         | VARCHAR(255)   | Email, unique               |
| password_hash | VARCHAR(255)   | Hash mật khẩu               |
| role          | ENUM           | Quyền (superadmin, admin)   |
| created_at    | DATETIME       | Ngày tạo                    |
| updated_at    | DATETIME       | Ngày cập nhật               |

## 2. Hotel
| Trường         | Kiểu dữ liệu   | Mô tả                       |
|---------------|---------------|-----------------------------|
| id            | INT, PK, AI    | Mã khách sạn                |
| name          | VARCHAR(255)   | Tên khách sạn               |
| address       | VARCHAR(255)   | Địa chỉ                     |
| status        | ENUM           | Trạng thái (pending, active, rejected) |
| owner_id      | INT            | admin_id chủ sở hữu         |
| created_at    | DATETIME       | Ngày tạo                    |
| updated_at    | DATETIME       | Ngày cập nhật               |

## 3. Room
| Trường         | Kiểu dữ liệu   | Mô tả                       |
|---------------|---------------|-----------------------------|
| id            | INT, PK, AI    | Mã phòng                    |
| hotel_id      | INT            | Mã khách sạn                |
| type          | VARCHAR(255)   | Loại phòng                  |
| price         | DECIMAL(10,2)  | Giá phòng                   |
| status        | ENUM           | Trạng thái (available, booked, maintenance) |
| amenities     | TEXT           | Tiện nghi                   |
| created_at    | DATETIME       | Ngày tạo                    |
| updated_at    | DATETIME       | Ngày cập nhật               |

## 4. Mapping migration SQL
- Tất cả các trường đều được mapping chuẩn với MySQL, có index/unique phù hợp.
- Sử dụng ENUM cho các trường trạng thái, role.
- Tham chiếu khóa ngoại (owner_id, hotel_id) với bảng liên quan.

## 5. Ghi chú mở rộng
- Có thể bổ sung các trường metadata, audit log, soft delete nếu cần.
- Đảm bảo chuẩn hóa schema, dễ mở rộng cho các sprint tiếp theo. 