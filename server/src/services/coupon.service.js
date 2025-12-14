const Coupon = require('../models/coupon.model');

class CouponService {
  
  // Tạo mã
  async createCoupon(data) {
    const { name, expiry, discount } = data;
    
    // Logic check trùng
    const existingCoupon = await Coupon.findOne({ name: name.toUpperCase() });
    if (existingCoupon) {
      throw new Error("Mã giảm giá này đã tồn tại!");
    }
    
    return await new Coupon({ name, expiry, discount }).save();
  }

  // Lấy danh sách
  async listCoupons() {
    return await Coupon.find({}).sort({ createdAt: -1 });
  }

  // Xóa mã
  async deleteCoupon(id) {
    return await Coupon.findByIdAndDelete(id);
  }

  // Kiểm tra & Áp dụng mã (Logic quan trọng)
  async applyCoupon(codeName) {
    const coupon = await Coupon.findOne({ name: codeName.toUpperCase() });

    if (!coupon) throw new Error("Mã giảm giá không hợp lệ!");

    // Logic check hết hạn
    if (new Date() > new Date(coupon.expiry)) {
      throw new Error("Mã giảm giá đã hết hạn!");
    }

    return {
        discount: coupon.discount,
        code: coupon.name,
        message: `Đã áp dụng mã ${coupon.name}! Bạn được giảm ${coupon.discount}%` 
    };
  }
}

module.exports = new CouponService();