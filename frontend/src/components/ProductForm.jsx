import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../features/product/productSlice";

const ProductForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    const productData = {
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    const resultAction = await dispatch(addProduct(productData));

    if (addProduct.fulfilled.match(resultAction)) {
      setSuccessMessage("Product created successfully");
      setFormData({
        name: "",
        price: "",
        stock: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "10px" }}>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Price: </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Stock: </label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Product"}
      </button>

      {successMessage && (
        <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>
      )}

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </form>
  );
};

export default ProductForm;