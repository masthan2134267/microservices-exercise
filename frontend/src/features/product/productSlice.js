import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPaginatedProductsApi,
  createProductApi
} from "../../services/productApi";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ page, size, sortBy }, thunkAPI) => {
    try {
      return await getPaginatedProductsApi(page, size, sortBy);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch products";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData, thunkAPI) => {
    try {
      return await createProductApi(productData);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to add product";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    pageNumber: 0,
    pageSize: 5,
    totalPages: 0,
    totalElements: 0,
    loading: false,
    error: null,
    successMessage: ""
  },
  reducers: {
    clearProductMessage: (state) => {
      state.successMessage = "";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.content || [];
        state.pageNumber = action.payload.number || 0;
        state.pageSize = action.payload.size || 5;
        state.totalPages = action.payload.totalPages || 0;
        state.totalElements = action.payload.totalElements || 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })

      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Product added successfully!";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add product";
      });
  }
});

export const { clearProductMessage } = productSlice.actions;
export default productSlice.reducer;