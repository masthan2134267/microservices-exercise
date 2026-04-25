import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import AddProductPage from "../pages/AddProductPage";
import CartPage from "../pages/CartPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/add-product" element={<AddProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  );
};

export default AppRoutes;