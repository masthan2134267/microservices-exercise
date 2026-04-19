import { useEffect } from 'react';
import Loader from '../components/Loader';
import ProductTable from '../components/ProductTable';
import { useProducts } from '../hooks/useProducts';

function ProductPage() {
  const { products, loading, error, loadProducts } = useProducts();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div style={{ padding: '16px' }}>
      <h1>Product List</h1>

      {loading && <Loader />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <ProductTable products={products} />}
    </div>
  );
}

export default ProductPage;