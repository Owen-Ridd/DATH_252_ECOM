const ProductService = require('../services/product.service');

// 1. Get List
exports.getProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts(req.query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get Detail
exports.getProductById = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 3. Create
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await ProductService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Update
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 5. Delete
exports.deleteProduct = async (req, res) => {
  try {
    await ProductService.deleteProduct(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 6. Seed
exports.seedProducts = async (req, res) => {
  try {
    const result = await ProductService.seedProducts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. Create Review
exports.createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    // req.user lấy từ middleware auth
    await ProductService.addReview(req.user._id, req.user.name, req.params.id, rating, comment);
    res.status(201).json({ message: 'Review added' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 8. Get Reviews
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await ProductService.getReviews(req.params.id);
    res.json(reviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};