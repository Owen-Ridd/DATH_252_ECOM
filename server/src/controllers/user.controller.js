const UserService = require('../services/user.service');

// 1. Cập nhật hồ sơ cá nhân
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Lấy từ middleware protect
    const { name, password } = req.body;

    const updatedUser = await UserService.updateProfile(userId, { name, password });

    // Trả về dữ liệu user mới kèm token cũ (để Frontend giữ trạng thái login)
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      addresses: updatedUser.addresses,
      token: req.headers.authorization.split(' ')[1] 
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 2. Thêm địa chỉ
exports.addAddress = async (req, res) => {
  try {
    const addresses = await UserService.addAddress(req.user._id, req.body);
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Xóa địa chỉ
exports.deleteAddress = async (req, res) => {
  try {
    const addresses = await UserService.deleteAddress(req.user._id, req.params.id);
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};