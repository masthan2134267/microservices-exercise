import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTable from "../components/CartTable";

const CartPage = () => {
  const { cartItems, error } = useSelector((state) => state.cart);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>Cart Page</h2>

      {/* ✅ FIXED ROUTE */}
      <Link to="/products">
        <button style={{ marginBottom: "15px", padding: "8px 14px" }}>
          Back to Product List
        </button>
      </Link>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <CartTable cartItems={cartItems} />
    </div>
  );
};

export default CartPage;