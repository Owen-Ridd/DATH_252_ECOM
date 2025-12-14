const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// 1. Middleware: Yêu cầu phải đăng nhập (Có Token hợp lệ)
exports.protect = async (req, res, next) => {
  let token;

  // Kiểm tra xem header có gửi kèm token không (Dạng: Bearer abcxyz...)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Lấy token ra khỏi chuỗi "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

      // Tìm user tương ứng với token đó và gắn vào request
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Cho phép đi tiếp
    } catch (error) {
      res.status(401).json({ message: 'Token không hợp lệ, vui lòng đăng nhập lại' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Bạn chưa đăng nhập, không có quyền truy cập' });
  }
};

// 2. Middleware: Yêu cầu phải là Admin
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Là Admin -> Cho qua
  } else {
    res.status(403).json({ message: 'Chỉ Admin mới được thực hiện thao tác này' });
  }
};