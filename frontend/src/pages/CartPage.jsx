import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTable from "../components/CartTable";
import LoadingSpinner from "../components/LoadingSpinner";

const CartPage = () => {
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>Cart Page</h2>

      <Link to="/">
        <button style={{ marginBottom: "15px", padding: "8px 14px" }}>
          Back to Product List
        </button>
      </Link>

      {loading && <LoadingSpinner text="Loading cart..." />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && <CartTable cartItems={cartItems} />}
    </div>
  );
};

export default CartPage;