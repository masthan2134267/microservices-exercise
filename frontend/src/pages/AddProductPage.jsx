import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addProduct, clearProductMessage } from "../features/product/productSlice";

function AddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: ""
  });

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearProductMessage());
        navigate("/");
      }, 1000);

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

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {successMessage && <p style={{ marginTop: "15px", color: "green" }}>{successMessage}</p>}
      {error && <p style={{ marginTop: "15px", color: "red" }}>{error}</p>}
    </div>
  );
}

export default AddProductPage;