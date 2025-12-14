LUXURIA - Luxury Furniture E-Commerce 🛋️
Dự án website thương mại điện tử chuyên về nội thất cao cấp, được xây dựng theo kiến trúc MERN Stack (MongoDB, Express, React, Node.js).
Dự án này áp dụng các tiêu chuẩn kỹ thuật nâng cao:
Backend: Kiến trúc Layered Architecture (Controller - Service - Model) chuẩn SOLID.
Frontend: Sử dụng Custom Hooks để tách biệt logic và giao diện, Redux Toolkit để quản lý trạng thái.
UI/UX: Phong cách thiết kế Minimalist Luxury.
🚀 Công Nghệ Sử Dụng
Frontend: ReactJS, Redux Toolkit, Axios, Bootstrap 5, Framer Motion, React Router v6.
Backend: Node.js, Express.js.
Database: MongoDB (Mongoose ODM).
Authentication: JWT (JSON Web Token), Bcrypt.js.
Tools: Postman (API Testing), MongoDB Atlas (Cloud DB).
✨ Tính Năng Nổi Bật
👤 Khách Hàng (Storefront)
Tìm kiếm & Lọc: Tìm theo tên, danh mục, khoảng giá, sắp xếp đa dạng.
Giỏ hàng thông minh: Selective Checkout (Chọn từng món để thanh toán), tăng giảm số lượng theo tồn kho thực tế.
Thanh toán: Giao diện Checkout chia đôi màn hình, tự động điền thông tin từ Profile, hỗ trợ mã giảm giá (Coupon).
Cá nhân hóa: Quản lý hồ sơ, Sổ địa chỉ (Address Book), Lịch sử đơn hàng & Theo dõi trạng thái (Order Tracking).
Sản phẩm: Xem chi tiết với tùy chọn biến thể (Màu sắc/Vải), Sản phẩm liên quan, Đánh giá & Bình luận.
🛡️ Quản Trị Viên (Admin Portal)
Dashboard: Biểu đồ thống kê doanh thu, số lượng đơn hàng, khách hàng.
Quản lý Sản phẩm: Thêm/Sửa/Xóa sản phẩm, Quản lý tồn kho (Inventory), Upload thông tin kỹ thuật.
Quản lý Đơn hàng: Xem danh sách, Cập nhật trạng thái đơn (Pending -> Shipping -> Delivered).
Marketing: Tạo và quản lý mã giảm giá (Coupon).
🛠️ Hướng Dẫn Cài Đặt & Chạy (Cho Developer)
Yêu cầu: Đã cài đặt Node.js và có tài khoản MongoDB Atlas.
Bước 1: Clone dự án
git clone <LINK_GITHUB_CUA_BAN>
cd <TEN_THU_MUC_DU_AN>


Bước 2: Cài đặt thư viện (Dependencies)
Bạn cần mở 2 cửa sổ Terminal để cài đặt cho cả Server và Client.

Terminal 1 - Backend:
cd server
npm install


Terminal 2 - Frontend:
npm install


Bước 3: Cấu hình biến môi trường (.env) 
Tạo một file tên là .env nằm trong thư mục server/. Copy nội dung dưới đây và điền thông tin của bạn vào:

# Kết nối Database 
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/luxuria_shop?retryWrites=true&w=majority

# Bảo mật (Tự điền một chuỗi bí mật bất kỳ)
JWT_SECRET=bi_mat_khong_the_bat_mi_123

Bước 4: Khởi chạy dự án
Terminal 1 (Chạy Backend):
cd server
npm run dev


Dấu hiệu thành công: 🚀 Server chạy tại http://localhost:5001 và ✅ Đã kết nối MongoDB.
Terminal 2 (Chạy Frontend):
# Tại thư mục gốc Frontend
npm start


Trình duyệt sẽ tự động mở tại http://localhost:3000.

