# Data Model - Sprint 1

## Hotel
| Field       | Type      | Required | Description         |
|-------------|-----------|----------|---------------------|
| id          | integer   | Yes      | Primary key         |
| name        | string    | Yes      | Tên khách sạn       |
| address     | string    | Yes      | Địa chỉ             |
| description | string    | No       | Mô tả               |
| created_at  | datetime  | Yes      | Thời gian tạo       |
| updated_at  | datetime  | Yes      | Thời gian cập nhật  |

## Room
| Field      | Type      | Required | Description         |
|------------|-----------|----------|---------------------|
| id         | integer   | Yes      | Primary key         |
| hotel_id   | integer   | Yes      | FK -> Hotel         |
| type       | string    | Yes      | Loại phòng          |
| price      | number    | Yes      | Giá phòng           |
| status     | string    | Yes      | available/booked    |
| created_at | datetime  | Yes      | Thời gian tạo       |
| updated_at | datetime  | Yes      | Thời gian cập nhật  |

## Booking
| Field      | Type      | Required | Description         |
|------------|-----------|----------|---------------------|
| id         | integer   | Yes      | Primary key         |
| user_id    | integer   | Yes      | FK -> User          |
| room_id    | integer   | Yes      | FK -> Room          |
| checkin    | date      | Yes      | Ngày nhận phòng     |
| checkout   | date      | Yes      | Ngày trả phòng      |
| status     | string    | Yes      | pending/confirmed/cancelled |
| created_at | datetime  | Yes      | Thời gian tạo       |
| updated_at | datetime  | Yes      | Thời gian cập nhật  |

## User
| Field         | Type      | Required | Description         |
|---------------|-----------|----------|---------------------|
| id            | integer   | Yes      | Primary key         |
| name          | string    | Yes      | Tên người dùng      |
| email         | string    | Yes      | Email (unique)      |
| password_hash | string    | Yes      | Mã hóa mật khẩu     |
| role          | string    | Yes      | user/admin          |
| created_at    | datetime  | Yes      | Thời gian tạo       |
| updated_at    | datetime  | Yes      | Thời gian cập nhật  |

## Mapping migration SQL
- Xem chi tiết trong scripts/migrate.sql của từng service.
- Tất cả trường mapping 1-1 với MySQL, chuẩn hóa kiểu dữ liệu, constraint. 