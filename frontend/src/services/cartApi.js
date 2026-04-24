import axios from "axios";

const BASE_URL = "http://localhost:8082/carts";

export const addToCartApi = async (cartData) => {
  const response = await axios.post(`${BASE_URL}/add`, cartData, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response.data;
};