const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên người review
  rating: { type: Number, required: true }, // Số sao (1-5)
  comment: { type: String, required: true }, // Nội dung
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Ai viết?
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' } // Viết cho sản phẩm nào?
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);