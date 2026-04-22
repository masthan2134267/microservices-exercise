import { useState } from "react";
import { createProductApi } from "../services/productApi";
import { useNavigate, Link } from "react-router-dom";

function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createProductApi({
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock)
      });

      setMessage("Product added successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Product</h1>

      <Link to="/">
        <button style={{ marginBottom: "15px" }}>Back to Product List</button>
      </Link>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Product Name: </label>
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

        <button type="submit">Add Product</button>
      </form>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}

export default AddProductPage;