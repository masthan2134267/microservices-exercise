import axios from "axios";

const BASE_URL = "http://localhost:8081/products";

export const getAllProductsApi = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createProductApi = async (productData) => {
  const response = await axios.post(BASE_URL, productData);
  return response.data;
};