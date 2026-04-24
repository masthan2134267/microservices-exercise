import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../features/product/productSlice";
import { addToCart, clearCartMessage } from "../features/cart/cartSlice";
import ProductTable from "../components/ProductTable";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductPage = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productName = product.name || "";

      const matchesName = productName
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesPrice =
        maxPrice === "" || Number(product.price) <= Number(maxPrice);

      return matchesName && matchesPrice;
    });
  }, [products, searchText, maxPrice]);

  const handleAddToCart = (product) => {
    if (!product.stock || Number(product.stock) <= 0) {
      alert("This product has no stock. Cannot add to cart.");
      return;
    }

    dispatch(
      addToCart({
        cartId: 1,
        productId: product.id,
        quantity: 1
      })
    );
  };

  const handleClearFilters = () => {
    setSearchText("");
    setMaxPrice("");
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

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          marginBottom: "15px",
          flexWrap: "wrap"
        }}
      >
        <input
          type="text"
          placeholder="Search by product name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            padding: "8px",
            width: "240px"
          }}
        />

        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{
            padding: "8px",
            width: "160px"
          }}
        />

        <button onClick={handleClearFilters} style={{ padding: "8px 14px" }}>
          Clear Filters
        </button>
      </div>

      {loading && <LoadingSpinner text="Loading products..." />}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {cartSuccessMessage && (
        <p style={{ color: "green" }}>{cartSuccessMessage}</p>
      )}

      {cartError && <p style={{ color: "red" }}>{cartError}</p>}

      {!loading && !error && (
        <>
          <p>
            Showing <strong>{filteredProducts.length}</strong> of{" "}
            <strong>{products.length}</strong> products
          </p>

          <ProductTable
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            cartLoading={cartLoading}
          />
        </>
      )}
    </div>
  );
};

export default ProductPage;