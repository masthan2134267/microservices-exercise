import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsApi, createProductApi } from "../../services/productApi";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await getAllProductsApi();
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
      const responseData = error.response?.data;

      let message = "Failed to add product";

      if (responseData?.message) {
        message = responseData.message;
      } else if (
        responseData?.errors &&
        typeof responseData.errors === "object" &&
        Object.keys(responseData.errors).length > 0
      ) {
        message = Object.values(responseData.errors).join(", ");
      } else if (error.message) {
        message = error.message;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
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
        state.products = action.payload;
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
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
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