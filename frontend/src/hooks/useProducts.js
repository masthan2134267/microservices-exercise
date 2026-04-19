import { useCallback, useState } from 'react';
import { getAllProductsApi } from '../services/productApi';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllProductsApi();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  return { products, loading, error, loadProducts };
}