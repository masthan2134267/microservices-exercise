import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AddProductPage from '../pages/AddProductPage';
import CartPage from '../pages/CartPage';
import ProductPage from '../pages/ProductPage';

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default AppRoutes;