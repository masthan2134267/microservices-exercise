import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../features/product/productSlice";
import ProductTable from "../components/ProductTable";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product List</h2>

      <Link to="/add-product">
        <button style={{ marginBottom: "15px" }}>Add Product</button>
      </Link>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <ProductTable products={products} />}
    </div>
  );
};

export default ProductPage;