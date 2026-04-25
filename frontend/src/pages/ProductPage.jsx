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
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [sortBy] = useState("id");

  const {
    products,
    loading,
    error,
    totalPages,
    totalElements
  } = useSelector((state) => state.product);

  const {
    successMessage: cartSuccessMessage,
    error: cartError,
    loading: cartLoading
  } = useSelector((state) => state.cart);

  // 🔹 Fetch products (pagination)
  useEffect(() => {
    dispatch(fetchProducts({ page, size, sortBy }));
  }, [dispatch, page, size, sortBy]);

  // 🔹 Clear cart messages after 2.5 sec
  useEffect(() => {
    if (cartSuccessMessage || cartError) {
      const timer = setTimeout(() => {
        dispatch(clearCartMessage());
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [cartSuccessMessage, cartError, dispatch]);

  // 🔹 Filtering (search + max price)
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

  // 🔹 Add to cart
  const handleAddToCart = (product) => {
    if (!product.stock || Number(product.stock) <= 0) {
      alert("No stock available");
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

  // 🔹 Clear filters
  const handleClearFilters = () => {
    setSearchText("");
    setMaxPrice("");
  };

  // 🔹 Pagination
  const goToPreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const goToNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <h2>Product List</h2>

      {/* 🔹 Navigation Buttons (2H Routing) */}
      <div style={{ marginBottom: "15px" }}>
        <Link to="/add-product">
          <button style={{ marginRight: "10px", padding: "8px 14px" }}>
            Add Product
          </button>
        </Link>

        <Link to="/cart">
          <button style={{ padding: "8px 14px" }}>
            View Cart
          </button>
        </Link>
      </div>

      {/* 🔹 Filters */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px"
        }}
      >
        <input
          type="text"
          placeholder="Search by product name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ padding: "8px", width: "240px" }}
        />

        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ padding: "8px", width: "160px" }}
        />

        <button onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>

      {/* 🔹 Loading */}
      {loading && <LoadingSpinner text="Loading products..." />}

      {/* 🔹 Errors */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🔹 Cart Messages */}
      {cartSuccessMessage && (
        <p style={{ color: "green" }}>{cartSuccessMessage}</p>
      )}
      {cartError && <p style={{ color: "red" }}>{cartError}</p>}

      {/* 🔹 Table */}
      {!loading && !error && (
        <>
          <p>
            Showing <strong>{filteredProducts.length}</strong> products.
            Total products: <strong>{totalElements}</strong>
          </p>

          <ProductTable
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            cartLoading={cartLoading}
          />

          {/* 🔹 Pagination */}
          <div style={{ marginTop: "20px" }}>
            <button onClick={goToPreviousPage} disabled={page === 0}>
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                style={{
                  margin: "0 5px",
                  fontWeight: page === index ? "bold" : "normal"
                }}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={goToNextPage}
              disabled={page === totalPages - 1}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;