import React from "react";

const CartTable = ({ cartItems }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px"
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Cart ID</th>
            <th style={thStyle}>Product ID</th>
            <th style={thStyle}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>{item.id}</td>
                <td style={tdStyle}>{item.cartId}</td>
                <td style={tdStyle}>{item.productId}</td>
                <td style={tdStyle}>{item.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={tdStyle} colSpan="4">
                No cart items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  border: "1px solid #999",
  padding: "10px",
  backgroundColor: "#f2f2f2",
  textAlign: "left"
};

const tdStyle = {
  border: "1px solid #999",
  padding: "10px"
};

export default CartTable;