const User = require('../models/user.model');

class UserService {

  // 1. Cập nhật hồ sơ
  async updateProfile(userId, updateData) {
    const user = await User.findById(userId);
    if (!user) throw new Error('Không tìm thấy người dùng');

    // Cập nhật tên
    if (updateData.name) user.name = updateData.name;
    
    // Cập nhật mật khẩu (nếu có)
    // Lưu ý: Model User cần có middleware 'pre save' để hash password
    if (updateData.password) {
      user.password = updateData.password;
    }

    return await user.save();
  }

  // 2. Thêm địa chỉ mới
  async addAddress(userId, addressData) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const { street, city, phone } = addressData;

    // Thêm vào đầu mảng
    // Logic: Nếu chưa có địa chỉ nào thì cái đầu tiên là mặc định
    const isDefault = user.addresses.length === 0;
    
    user.addresses.unshift({ street, city, phone, isDefault });
    
    await user.save();
    return user.addresses;
  }

  // 3. Xóa địa chỉ
  async deleteAddress(userId, addressId) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
    
    await user.save();
    return user.addresses;
  }
}

module.exports = new UserService();