# Hệ Thống Quản Lý Khách Sạn - Kiến Trúc Giải Pháp (MVP)

## Tổng Quan Hệ Thống

Hệ thống quản lý khách sạn được thiết kế theo kiến trúc microservices đơn giản để đảm bảo khả năng mở rộng và bảo trì. Hệ thống tập trung vào các chức năng cốt lõi cần thiết cho khách sạn nhỏ.

## Thành Phần Kiến Trúc

### 1. Dịch Vụ API Gateway
- **Mục đích**: Điểm vào duy nhất cho tất cả các yêu cầu từ client
- **Trách nhiệm**:
  - Định tuyến yêu cầu
  - Xác thực cơ bản
  - Giới hạn tốc độ đơn giản
  - Tài liệu API (Swagger/OpenAPI)
- **Công nghệ**: Node.js với Express
- **Cơ sở dữ liệu**: Redis (cho bộ nhớ đệm cơ bản)

### 2. Dịch Vụ Xác Thực
- **Mục đích**: Xử lý xác thực và phân quyền người dùng
- **Trách nhiệm**:
  - Xác thực người dùng cơ bản
  - Quản lý token JWT
  - Kiểm soát truy cập đơn giản (Admin/Staff)
  - Quản lý phiên
- **Công nghệ**: Node.js với Express
- **Cơ sở dữ liệu**: MySQL

### 3. Dịch Vụ Quản Lý Khách Sạn
- **Mục đích**: Quản lý cấu hình cơ bản của khách sạn
- **Trách nhiệm**:
  - Quản lý hồ sơ khách sạn cơ bản
  - Quản lý phòng với các trạng thái:
    - Phòng Bận (Đang sử dụng/Đã đặt/Đang bảo trì)
    - Phòng Trống (Đã dọn xong)
    - Phòng Đang Dọn
    - Phòng Chưa Dọn
    - Phòng Bảo Trì
  - Quản lý giá đơn giản
  - Quản lý tiện nghi cơ bản
- **Công nghệ**: Node.js với Express
- **Cơ sở dữ liệu**: MySQL

### 4. Dịch Vụ Đặt Phòng
- **Mục đích**: Xử lý đặt chỗ và đặt phòng
- **Trách nhiệm**:
  - Quản lý đặt chỗ cơ bản
  - Kiểm tra tình trạng phòng
  - Tính toán giá đơn giản
  - Lịch sử đặt phòng
- **Công nghệ**: Node.js với Express
- **Cơ sở dữ liệu**: MySQL

### 5. Dịch Vụ Lễ Tân
- **Mục đích**: Quản lý hoạt động lễ tân
- **Trách nhiệm**:
  - Nhận/trả phòng
  - Đăng ký khách cơ bản
  - Phân công phòng
  - Lịch sử khách
  - Xử lý thanh toán đơn giản
  - Quản lý buồng phòng cơ bản
- **Công nghệ**: Node.js với Express
- **Cơ sở dữ liệu**: MySQL

### 6. Dịch Vụ Báo Cáo
- **Mục đích**: Tạo báo cáo cơ bản
- **Trách nhiệm**:
  - Báo cáo tỷ lệ lấp đầy
  - Báo cáo doanh thu đơn giản
  - Thống kê khách cơ bản
  - Xuất dữ liệu cơ bản
- **Công nghệ**: Node.js với Express
- **Cơ sở dữ liệu**: MySQL

### 7. Dịch Vụ Thông Báo
- **Mục đích**: Xử lý thông báo cơ bản
- **Trách nhiệm**:
  - Thông báo qua email
  - Thông báo trong ứng dụng
  - Cảnh báo tự động cơ bản
- **Công nghệ**: Node.js với Express
- **Cơ sở dữ liệu**: MySQL

## Thành Phần Cơ Sở Hạ Tầng

### 1. Tầng Bộ Nhớ Đệm
- **Mục đích**: Cải thiện hiệu suất cơ bản
- **Công nghệ**: Redis
- **Trường hợp sử dụng**:
  - Lưu trữ phiên
  - Bộ nhớ đệm phản hồi API cơ bản

### 2. Bộ Cân Bằng Tải
- **Mục đích**: Phân phối lưu lượng cơ bản
- **Công nghệ**: Nginx
- **Tính năng**:
  - Cân bằng tải cơ bản
  - Kết thúc SSL

### 3. Giám Sát & Ghi Nhật Ký
- **Mục đích**: Giám sát và ghi nhật ký cơ bản
- **Stack Công nghệ**:
  - Prometheus (số liệu cơ bản)
  - Grafana (trực quan hóa cơ bản)
  - ELK Stack (ghi nhật ký cơ bản)

## Kiến Trúc Cơ Sở Dữ Liệu

### Cơ Sở Dữ Liệu Chính (MySQL)
- Sao chép Master-Slave cơ bản
- Pool kết nối
- Tối ưu hóa truy vấn cơ bản
- Sao lưu tự động

### Chiến Lược Bộ Nhớ Đệm
- Redis cho dữ liệu phiên
- Redis cho bộ nhớ đệm phản hồi API cơ bản

## Kiến Trúc Bảo Mật

### 1. Xác Thực & Phân Quyền
- Xác thực dựa trên JWT
- Kiểm soát truy cập đơn giản
- Quản lý phiên

### 2. Bảo Mật Dữ Liệu
- Mã hóa dữ liệu cơ bản
- SSL/TLS
- Lưu trữ mật khẩu an toàn
- Ghi nhật ký kiểm toán

### 3. Bảo Mật Mạng
- Bảo mật API Gateway cơ bản
- Giới hạn tốc độ đơn giản
- Quy tắc tường lửa cơ bản

## Kiến Trúc Triển Khai

### 1. Điều Phối Container
- **Công nghệ**: Docker Compose
- **Tính năng**:
  - Điều phối container cơ bản
  - Cập nhật tuần tự

### 2. Pipeline CI/CD
- **Công cụ**:
  - GitHub Actions
  - Docker
- **Quy trình**:
  - Kiểm thử tự động cơ bản
  - Xây dựng container
  - Tự động triển khai

## Khả Năng Mở Rộng & Hiệu Suất

### 1. Mở Rộng Cơ Bản
- Sao chép dịch vụ cơ bản
- Cân bằng tải đơn giản

### 2. Tối Ưu Hóa Hiệu Suất
- Chiến lược bộ nhớ đệm cơ bản
- Tối ưu hóa cơ sở dữ liệu cơ bản
- Tối ưu hóa phản hồi API cơ bản

### 3. Tính Sẵn Sàng
- Sao lưu tự động
- Khôi phục cơ bản

## Hướng Dẫn Phát Triển

### 1. Tiêu Chuẩn Mã
- TypeScript cho tất cả dịch vụ
- Cấu hình ESLint
- Định dạng Prettier
- Tài liệu mã cơ bản

### 2. Tiêu Chuẩn API
- Thiết kế API RESTful cơ bản
- Tài liệu OpenAPI/Swagger
- Xử lý lỗi cơ bản

### 3. Chiến Lược Kiểm Thử
- Kiểm thử đơn vị
- Kiểm thử tích hợp cơ bản
- Kiểm thử end-to-end cơ bản 