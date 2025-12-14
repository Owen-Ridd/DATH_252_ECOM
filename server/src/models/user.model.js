const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  addresses: [
    {
      street: String,
      city: String,
      phone: String,
      isDefault: { type: Boolean, default: false } // Đánh dấu đâu là địa chỉ mặc định
    }
  ],
  password: { type: String, required: true },
  role: { type: String, default: 'customer' },
}, { timestamps: true });

// Mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Hàm kiểm tra mật khẩu
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);