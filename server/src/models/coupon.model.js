const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true, // Tự động viết hoa (VD: "summer" -> "SUMMER")
    trim: true 
  },
  expiry: { 
    type: Date, 
    required: true 
  },
  discount: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 100 // Giảm từ 1% đến 100%
  }, 
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);