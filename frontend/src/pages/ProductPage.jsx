import React from "react";
import { Link } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import LoadingSpinner from "../components/LoadingSpinner";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";

const ProductPage = () => {
  const {
    filteredProducts,
    loading,
    error,
    totalPages,
    totalElements,
    page,
    searchText,
    maxPrice,
    setSearchText,
    setMaxPrice,
    clearFilters,
    goToPreviousPage,
    goToNextPage,
    goToPage
  } = useProducts();

  const {
    cartLoading,
    cartError,
    cartSuccessMessage,
    handleAddToCart
  } = useCart();

  return (
    <div style={{ maxWidth: "1100px", margin: "20px auto", padding: "20px", fontFamily: "Arial" }}>
      <h2>Product List</h2>

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

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
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

        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      {loading && <LoadingSpinner text="Loading products..." />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {cartSuccessMessage && <p style={{ color: "green" }}>{cartSuccessMessage}</p>}
      {cartError && <p style={{ color: "red" }}>{cartError}</p>}

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

            <button onClick={goToNextPage} disabled={page === totalPages - 1}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;