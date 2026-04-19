import axios from 'axios';
import { PRODUCT_SERVICE_BASE_URL } from '../utils/constants';

const productClient = axios.create({
  baseURL: PRODUCT_SERVICE_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getAllProductsApi = async () => {
  const response = await productClient.get('/products');
  return response.data;
};

export const createProductApi = async (productData) => {
  const response = await productClient.post('/products', productData);
  return response.data;
};