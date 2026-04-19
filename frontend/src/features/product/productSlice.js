import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProductApi, getAllProductsApi } from '../../services/productApi';

const initialState = {
  products: [],
  loading: false,
  createLoading: false,
  error: null,
  createError: null
};

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, thunkAPI) => {
    try {
      return await getAllProductsApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products'
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (productData, thunkAPI) => {
    try {
      return await createProductApi(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to create product'
      );
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductErrors: (state) => {
      state.error = null;
      state.createError = null;
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
        state.error = action.payload;
      })

      .addCase(createProduct.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createLoading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
      });
  }
});

export const { clearProductErrors } = productSlice.actions;
export default productSlice.reducer;