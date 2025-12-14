const AuthService = require('../services/auth.service');

// 1. Đăng ký
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const userInfo = await AuthService.register(name, email, password);
    
    // 201 Created
    res.status(201).json(userInfo);
  } catch (error) {
    // Trả về 400 Bad Request nếu lỗi logic (trùng mail, thiếu data...)
    res.status(400).json({ message: error.message });
  }
};

// 2. Đăng nhập
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userInfo = await AuthService.login(email, password);
    
    res.json(userInfo);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};