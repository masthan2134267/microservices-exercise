import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  addProduct,
  clearProductMessage
} from "../features/product/productSlice";
import LoadingSpinner from "../components/LoadingSpinner";

function AddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage } = useSelector(
    (state) => state.product
  );

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: ""
  });

  // ✅ AFTER ADD → REDIRECT TO /products
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearProductMessage());
        navigate("/products"); // ✅ FIXED
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      addProduct({
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock)
      })
    );
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <h1>Add Product</h1>

      {/* ✅ FIXED ROUTE */}
      <Link to="/products">
        <button style={{ marginBottom: "15px", padding: "8px 14px" }}>
          Back to Product List
        </button>
      </Link>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>Product Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "250px", padding: "6px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Price: </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            style={{ width: "180px", padding: "6px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Stock: </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            style={{ width: "180px", padding: "6px" }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ padding: "8px 14px" }}>
          Add Product
        </button>
      </form>

      {loading && <LoadingSpinner text="Adding product..." />}

      {successMessage && (
        <p style={{ marginTop: "15px", color: "green" }}>
          {successMessage}
        </p>
      )}

      {error && (
        <p style={{ marginTop: "15px", color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default AddProductPage;