import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../features/product/productSlice";
import { addToCart, clearCartMessage } from "../features/cart/cartSlice";
import ProductTable from "../components/ProductTable";

const ProductPage = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);
  const {
    successMessage: cartSuccessMessage,
    error: cartError,
    loading: cartLoading
  } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (cartSuccessMessage || cartError) {
      const timer = setTimeout(() => {
        dispatch(clearCartMessage());
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [cartSuccessMessage, cartError, dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(
      addToCart({
        cartId: 1,
        productId: productId,
        quantity: 1
      })
    );
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>Product List</h2>

      <div style={{ marginBottom: "15px" }}>
        <Link to="/add-product">
          <button style={{ marginRight: "10px", padding: "8px 14px" }}>
            Add Product
          </button>
        </Link>

        <Link to="/cart">
          <button style={{ padding: "8px 14px" }}>View Cart</button>
        </Link>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {cartSuccessMessage && <p style={{ color: "green" }}>{cartSuccessMessage}</p>}
      {cartError && <p style={{ color: "red" }}>{cartError}</p>}

      {!loading && !error && (
        <ProductTable
          products={products}
          onAddToCart={handleAddToCart}
          cartLoading={cartLoading}
        />
      )}
    </div>
  );
};

export default ProductPage;