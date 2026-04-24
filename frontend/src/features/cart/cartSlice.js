import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartApi } from "../../services/cartApi";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData, thunkAPI) => {
    try {
      return await addToCartApi(cartData);
    } catch (error) {
      const responseData = error.response?.data;

      let message = "Failed to add item to cart";

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

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
    successMessage: ""
  },
  reducers: {
    clearCartMessage: (state) => {
      state.successMessage = "";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload);
        state.successMessage = "Item added to cart successfully!";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add item to cart";
      });
  }
});

export const { clearCartMessage } = cartSlice.actions;
export default cartSlice.reducer;