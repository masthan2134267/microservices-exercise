function ProductTable({ products }) {
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: '16px', width: '100%' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;