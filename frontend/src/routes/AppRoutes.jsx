import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default AppRoutes;