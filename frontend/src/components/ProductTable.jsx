import React from "react";

const ProductTable = ({ products, onAddToCart, cartLoading }) => {
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
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product) => {
              const hasStock =
                product.stock !== null &&
                product.stock !== undefined &&
                Number(product.stock) > 0;

              return (
                <tr key={product.id}>
                  <td style={tdStyle}>{product.id}</td>
                  <td style={tdStyle}>{product.name}</td>
                  <td style={tdStyle}>{product.price}</td>
                  <td style={tdStyle}>{hasStock ? product.stock : "No stock"}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => onAddToCart(product)}
                      disabled={cartLoading || !hasStock}
                      style={{ padding: "6px 10px" }}
                    >
                      {!hasStock
                        ? "Out of Stock"
                        : cartLoading
                        ? "Adding..."
                        : "Add to Cart"}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td style={tdStyle} colSpan="5">
                No products found
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

export default ProductTable;