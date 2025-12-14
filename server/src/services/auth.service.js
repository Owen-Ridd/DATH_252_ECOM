const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

class AuthService {
  
  // Helper: Sinh Token (Private method)
  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '30d' });
  }

  // 1. Đăng ký
  async register(name, email, password) {
    // Kiểm tra trùng
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('Email này đã được sử dụng');
    }

    // Tạo User
    const user = await User.create({ name, email, password });

    if (user) {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: this.generateToken(user._id)
      };
    } else {
      throw new Error('Dữ liệu người dùng không hợp lệ');
    }
  }

  // 2. Đăng nhập
  async login(email, password) {
    const user = await User.findOne({ email });

    // Kiểm tra user và pass (hàm matchPassword nằm trong User Model)
    if (user && (await user.matchPassword(password))) {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: this.generateToken(user._id)
      };
    } else {
      throw new Error('Sai email hoặc mật khẩu');
    }
  }
}

module.exports = new AuthService();