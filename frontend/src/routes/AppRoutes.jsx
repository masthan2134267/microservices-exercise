import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import AddProductPage from "../pages/AddProductPage";
import CartPage from "../pages/CartPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/add-product" element={<AddProductPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default AppRoutes;