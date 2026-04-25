import React from "react";
import { Link } from "react-router-dom";
import CartTable from "../components/CartTable";
import { useCart } from "../hooks/useCart";

const CartPage = () => {
  const { cartItems, cartError } = useCart();

  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto", padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ marginBottom: "15px" }}>Cart Page</h2>

      <Link to="/products">
        <button style={{ marginBottom: "15px", padding: "8px 14px" }}>
          Back to Product List
        </button>
      </Link>

      {cartError && <p style={{ color: "red" }}>{cartError}</p>}

      <CartTable cartItems={cartItems} />
    </div>
  );
};

export default CartPage;