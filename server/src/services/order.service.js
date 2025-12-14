const Order = require('../models/order.model');
const Product = require('../models/product.model');

class OrderService {
  
  // 1. Tạo đơn hàng (Kèm logic trừ kho)
  async createOrder(orderData) {
    const { items } = orderData;

    // Kiểm tra và trừ tồn kho
    // Dùng vòng lặp for...of để có thể dùng await bên trong
    for (const item of items) {
      // Tìm sản phẩm theo TÊN (vì Frontend gửi lên trường 'title')
      // xác nhận frontend dùng item.title
      const product = await Product.findOne({ title: item.title });
      
      // Nếu không tìm thấy sản phẩm trong DB
      if (!product) {
        throw new Error(`Sản phẩm "${item.title}" không tồn tại trong hệ thống`);
      }
      
      // Kiểm tra số lượng tồn kho
      if (product.countInStock < item.qty) {
        throw new Error(`Sản phẩm "${product.title}" không đủ hàng (Hiện còn: ${product.countInStock})`);
      }
      
      // Trừ kho và lưu lại
      product.countInStock -= item.qty;
      await product.save();
    }

    // Sau khi check kho xong xuôi thì mới tạo đơn hàng
    const order = new Order(orderData);
    return await order.save();
  }

  // 2. Lấy đơn hàng của một user cụ thể (Sắp xếp mới nhất lên đầu)
  async getOrdersByUserEmail(email) {
    return await Order.find({ "customer.email": email }).sort({ createdAt: -1 });
  }

  // 3. Lấy tất cả đơn hàng (Dành cho Admin)
  async getAllOrders() {
    return await Order.find({}).sort({ createdAt: -1 });
  }

  // 4. Lấy chi tiết đơn hàng theo ID
  async getOrderById(orderId) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Không tìm thấy đơn hàng');
    return order;
  }

  // 5. Cập nhật trạng thái đơn hàng (Admin)
  async updateStatus(orderId, status) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Không tìm thấy đơn hàng');
    
    order.status = status;
    return await order.save();
  }
}

module.exports = new OrderService();