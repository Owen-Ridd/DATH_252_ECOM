const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // 1. Thông tin khách hàng (Mở rộng thêm State, Zip)
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String }, // <--- MỚI: Bang/Tỉnh
    zip: { type: String }    // <--- MỚI: Mã bưu điện
  },

  // 2. Danh sách hàng
  items: [
    {
      product_title: String,
      price: Number,
      qty: Number,
      image: String,
      selectedFabric: String // Lưu thêm loại vải khách chọn
    }
  ],

  // 3. Thanh toán
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: "credit_card" }, // credit_card, paypal, cod
  paymentOption: { type: String, default: "full" },        // <--- MỚI: "full" hoặc "deposit" (trả cọc)
  
  status: { type: String, default: "Pending" }, // Pending, Processing, Delivered, Cancelled
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);