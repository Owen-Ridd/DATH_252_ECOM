const Product = require('../models/product.model');
const Review = require('../models/review.model');
const productData = require('../data/product.json');
const mongoose = require('mongoose');

class ProductService {

  // 1. Lấy danh sách (Xử lý bộ lọc Filter/Search/Sort)
  async getAllProducts(query) {
    const { category, keyword, minPrice, maxPrice, sort } = query;
    let dbQuery = {};

    // Logic lọc
    if (category && category !== 'all') dbQuery.category = category;
    if (keyword) dbQuery.title = { $regex: keyword, $options: 'i' };
    if (minPrice || maxPrice) {
      dbQuery.price = {};
      if (minPrice) dbQuery.price.$gte = Number(minPrice);
      if (maxPrice) dbQuery.price.$lte = Number(maxPrice);
    }

    // Logic sắp xếp
    let sortOptions = { createdAt: -1 };
    if (sort === 'price_asc') sortOptions = { price: 1 };
    if (sort === 'price_desc') sortOptions = { price: -1 };
    if (sort === 'bestseller') sortOptions = { isBestSeller: -1 };

    return await Product.find(dbQuery).sort(sortOptions);
  }

  // 2. Lấy chi tiết (Xử lý ID số cũ và ID MongoDB mới)
  async getProductById(id) {
    let product;
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    } else {
      product = await Product.findOne({ id: parseInt(id) });
    }
    
    if (!product) throw new Error('Product not found');
    return product;
  }

  // 3. Tạo sản phẩm
  async createProduct(productData) {
    const product = new Product({
      ...productData,
      countInStock: productData.countInStock || 0
    });
    return await product.save();
  }

  // 4. Cập nhật sản phẩm
  async updateProduct(id, updateData) {
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');

    // Gán dữ liệu mới đè lên dữ liệu cũ
    Object.assign(product, updateData);

    return await product.save();
  }

  // 5. Xóa sản phẩm
  async deleteProduct(id) {
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');
    return await product.deleteOne();
  }

  // 6. Seed Data
  async seedProducts() {
    await Product.deleteMany({});
    await Product.insertMany(productData);
    return { message: "Database seeded successfully" };
  }

  // 7. Thêm Review (Logic phức tạp: Check trùng -> Tạo Review -> Tính lại điểm TB)
  async addReview(userId, userName, productIdParam, rating, comment) {
    // Tìm product (bao gồm cả logic check ID cũ/mới)
    const product = await this.getProductById(productIdParam);

    // Check xem user đã review chưa
    const alreadyReviewed = await Review.findOne({
      user: userId,
      product: product._id
    });

    if (alreadyReviewed) throw new Error('You have already reviewed this product');

    // Tạo review
    const review = new Review({
      name: userName,
      rating: Number(rating),
      comment,
      user: userId,
      product: product._id
    });
    await review.save();

    // Tính toán lại rating trung bình cho Product
    const reviews = await Review.find({ product: product._id });
    product.rating.count = reviews.length;
    product.rating.rate = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await product.save();
    return { message: 'Review added successfully' };
  }

  // 8. Lấy Review
  async getReviews(productIdParam) {
    const product = await this.getProductById(productIdParam);
    return await Review.find({ product: product._id }).sort({ createdAt: -1 });
  }
}

module.exports = new ProductService();