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
| Field          | Type         | Null | Key | Default | Note                |
|----------------|--------------|------|-----|---------|---------------------|
| id             | int unsigned | NO   | PK  |         | Tự tăng, khóa chính |
| name           | varchar(100) | NO   |     |         | Tên user            |
| email          | varchar(100) | NO   | UNI |         | Email duy nhất      |
| password_hash  | varchar(255) | NO   |     |         | Hash mật khẩu       |
| role           | enum         | NO   |     | customer| customer, admin, hotel, staff |
| created_at     | datetime     | NO   |     | now()   | Thời điểm tạo       |
| updated_at     | datetime     | NO   |     | now()   | Thời điểm cập nhật  |

## Mapping migration SQL
- Xem chi tiết trong scripts/migrate.sql của từng service.
- Tất cả trường mapping 1-1 với MySQL, chuẩn hóa kiểu dữ liệu, constraint. 

### Mapping migration SQL
```sql
CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('customer','admin','hotel','staff') NOT NULL DEFAULT 'customer',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Mô tả role
- `admin`: Toàn quyền quản trị, CRUD user, phân quyền
- `hotel`: Quản lý khách sạn, phòng, booking liên quan
- `staff`: Quản lý phòng, housekeeping
- `customer`: Đặt phòng, quản lý booking cá nhân 