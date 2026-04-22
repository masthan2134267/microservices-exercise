import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsApi } from "../../services/productApi";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    return await getAllProductsApi();
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch products";
      });
  }
});

export default productSlice.reducer;