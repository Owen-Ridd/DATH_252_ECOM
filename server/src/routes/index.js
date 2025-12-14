const express = require('express');
const router = express.Router();

// Import Controllers
const { registerUser, loginUser } = require('../controllers/auth.controller');
const { getProducts, getProductById, seedProducts, createProduct, deleteProduct, updateProduct, createProductReview, getProductReviews } = require('../controllers/product.controller');
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus, getOrderById } = require('../controllers/order.controller');const { protect, admin } = require('../middlewares/authMiddleware');
const { getDashboardStats } = require('../controllers/stats.controller');
const { updateUserProfile, addAddress, deleteAddress } = require('../controllers/user.controller'); // Import mới
const { createCoupon, listCoupons, deleteCoupon, applyCoupon } = require('../controllers/coupon.controller');
// // --- AUTH ---
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// --- PRODUCTS ---
router.get('/products', getProducts);
router.get('/products/seed', protect, admin, seedProducts);
router.get('/products/:id', getProductById);
router.post('/products', protect, admin, createProduct);
router.delete('/products/:id', protect, admin, deleteProduct);
router.put('/products/:id', protect, admin, updateProduct);
router.route('/products/:id/reviews')
    .post(protect, createProductReview) // Phải đăng nhập mới được review
    .get(getProductReviews);

// --- ORDERS ---
router.post('/orders', createOrder);
router.get('/orders', protect, admin, getAllOrders);
router.put('/orders/:id/status', protect, admin, updateOrderStatus);
router.get('/orders/mine', protect, getMyOrders);
router.get('/orders/:id', protect, getOrderById);

// --- STATS ---
router.get('/stats', protect, admin, getDashboardStats);

// --- Users ---
router.put('/users/profile', protect, updateUserProfile);
router.post('/users/address', protect, addAddress);       // Thêm địa chỉ
router.delete('/users/address/:id', protect, deleteAddress);

// --- Coupons ---
router.post('/coupons/apply', applyCoupon);
router.post('/coupons', protect, admin, createCoupon);
router.get('/coupons', protect, admin, listCoupons);
router.delete('/coupons/:id', protect, admin, deleteCoupon);

module.exports = router;