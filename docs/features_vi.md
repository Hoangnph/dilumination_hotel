# Tính Năng Hệ Thống Quản Lý Khách Sạn (MVP)

## Phần Dành Cho Khách Hàng

### 1. Giao Diện Khách Hàng (Frontend)
- Giao diện đặt phòng trực tuyến
- Xem thông tin phòng và tiện nghi
- Đặt phòng và thanh toán
- Quản lý đặt chỗ cá nhân
- Nhận thông báo qua email
- Giao diện web di động (PWA)

### 2. Dịch Vụ Backend Cho Khách Hàng
- API đặt phòng
- API xem thông tin phòng
- API thanh toán
- API thông báo
- API quản lý đặt chỗ

## Phần Dành Cho Quản Lý

### 1. Giao Diện Quản Lý (Frontend)
- Dashboard quản trị
- Quản lý phòng và đặt phòng
- Quản lý lễ tân
- Báo cáo và thống kê
- Quản lý người dùng
- Cài đặt hệ thống

### 2. Dịch Vụ Backend Cho Quản Lý
- API Gateway
- Dịch vụ xác thực và phân quyền
- Dịch vụ quản lý khách sạn
- Dịch vụ quản lý đặt phòng
- Dịch vụ lễ tân
- Dịch vụ báo cáo
- Dịch vụ thông báo

## Tính Năng Chung

### 1. Quản Lý Người Dùng & Xác Thực
- Quản lý người dùng cơ bản
- Kiểm soát truy cập đơn giản (Admin/Staff/Customer)
- Xác thực người dùng cơ bản
- Quản lý và khôi phục mật khẩu
- Quản lý phiên đăng nhập

### 2. Quản Lý Khách Sạn
- Quản lý hồ sơ khách sạn cơ bản
- Quản lý phòng với các trạng thái:
  - Phòng Bận (Đang sử dụng/Đã đặt/Đang bảo trì)
  - Phòng Trống (Đã dọn xong)
  - Phòng Đang Dọn
  - Phòng Chưa Dọn
  - Phòng Bảo Trì
- Quản lý giá đơn giản
- Quản lý tiện nghi cơ bản

### 3. Hoạt Động Lễ Tân
- Quản lý nhận/trả phòng
- Đăng ký khách cơ bản
- Phân công phòng
- Lịch sử khách
- Xử lý thanh toán đơn giản
- Tạo hóa đơn cơ bản

### 4. Quản Lý Buồng Phòng
- Theo dõi trạng thái phòng chi tiết
- Phân công dọn dẹp phòng
- Yêu cầu bảo trì đơn giản
- Quản lý công việc cơ bản

### 5. Báo Cáo Cơ Bản
- Báo cáo tỷ lệ lấp đầy
- Báo cáo doanh thu đơn giản
- Thống kê khách cơ bản
- Xuất dữ liệu cơ bản

### 6. Thông Báo Cơ Bản
- Thông báo qua email
- Thông báo trong ứng dụng
- Cảnh báo tự động cơ bản

## Tính Năng Kỹ Thuật

### Frontend
- Thiết kế web đáp ứng
- Ứng dụng web tiến bộ (PWA) cơ bản
- Cập nhật thời gian thực cơ bản
- Tối ưu hóa hiệu suất cơ bản

### Backend
- Kiến trúc microservices đơn giản
- API Gateway cơ bản
- Hệ thống bộ nhớ đệm đơn giản
- Sao chép dữ liệu cơ bản

### Bảo Mật
- Mã hóa dữ liệu cơ bản
- SSL/TLS
- Bảo mật API cơ bản
- Ghi nhật ký kiểm toán
- Sao lưu dữ liệu cơ bản

### Tích Hợp
- Tích hợp cổng thanh toán cơ bản
- Tích hợp dịch vụ email
- Tích hợp SMS (tùy chọn)

### Giám Sát & Bảo Trì
- Giám sát hệ thống cơ bản
- Quản lý nhật ký cơ bản
- Sao lưu tự động
- Cập nhật hệ thống 