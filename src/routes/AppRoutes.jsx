import React from "react";
import { Routes, Route } from "react-router-dom";

// 1. Import Layout
import MainLayout from "../layouts/MainLayout";
import AdminLayout from '../layouts/AdminLayout';

import HomePage from "../modules/core/pages/HomePage";
import AboutPage from "../modules/core/pages/AboutPage";
import ContactPage from "../modules/core/pages/ContactPage";
import NotFoundPage from "../modules/core/pages/NotFoundPage";
import OrderDetailPage from "../modules/orders/pages/OrderDetailPage";
import LoginPage from "../modules/Auth/pages/LoginPage";
import RegisterPage from "../modules/Auth/pages/RegisterPage";
import ProfilePage from "../modules/Auth/pages/ProfilePage";

import ProductListPage from "../modules/products/pages/ProductListPage";
import ProductDetailPage from "../modules/products/pages/ProductDetailPage";

import CartPage from "../modules/orders/pages/CartPage";
import CheckoutPage from "../modules/orders/pages/CheckoutPage";
import OrderHistoryPage from "../modules/orders/pages/OrderHistoryPage";
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import AdminProductPage from "../modules/admin/pages/AdminProductPage";
import AdminCouponPage from "../modules/admin/pages/AdminCouponPage";
import PrivateRoute from "../components/PrivateRoute";
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route element={<PrivateRoute />}>
           <Route path="/my-orders" element={<OrderHistoryPage />} />
           <Route path="/orders/:id" element={<OrderDetailPage />} />
        </Route>

        <Route element={<PrivateRoute adminOnly={true} />}>
           <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute adminOnly={true} />}>
        <Route element={<AdminLayout />}> 
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProductPage />} />
            <Route path="/admin/coupons" element={<AdminCouponPage />} />
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;