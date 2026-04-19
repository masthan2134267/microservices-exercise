import { useState } from 'react';
import ProductForm from '../components/ProductForm';
import { createProductApi } from '../services/productApi';

function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCreateProduct = async (productData) => {
    try {
      setLoading(true);
      setMessage('');
      setError('');

      await createProductApi(productData);

      setMessage('Product created successfully');
    } catch (err) {
      console.error(err);
      setError('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <h1>Add Product</h1>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ProductForm onSubmit={handleCreateProduct} loading={loading} />
    </div>
  );
}

export default AddProductPage;