const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

class StatsService {
  
  async getDashboardStats() {
    // 1. Đếm tổng số đơn hàng
    const totalOrders = await Order.countDocuments();

    // 2. Đếm tổng số sản phẩm
    const totalProducts = await Product.countDocuments();

    // 3. Đếm tổng số khách hàng (trừ admin ra)
    const totalUsers = await User.countDocuments({ role: 'customer' });

    // 4. Tính tổng doanh thu (Logic phức tạp nhất nằm ở đây)
    // Dùng hàm aggregate của MongoDB để cộng dồn field totalAmount
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null, // Gom tất cả lại thành 1 nhóm
          totalRevenue: { $sum: "$totalAmount" } // Cộng dồn tiền
        }
      }
    ]);
    
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    return {
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue
    };
  }
}

module.exports = new StatsService();