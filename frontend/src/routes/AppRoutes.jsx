import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import AddProductPage from "../pages/AddProductPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/add-product" element={<AddProductPage />} />
    </Routes>
  );
};

export default AppRoutes;