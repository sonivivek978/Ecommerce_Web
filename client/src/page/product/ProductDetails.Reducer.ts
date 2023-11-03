import { createSlice } from "@reduxjs/toolkit";
import { ProductDetailsThunk } from "../../action/product/Product.Thunk";

interface productDetailStates {
  data: any;
  isLoading: boolean;
  error: string | null | any;
}

// Define the initial state
const initialStates: productDetailStates = {
  data: null,
  isLoading: false,
  error: null,
};

export const getProductDetailsAction = ProductDetailsThunk;

// Create a userSlice
export const getProductDetailsSlices = createSlice({
  name: "getProductDetails",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetailsAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductDetailsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getProductDetailsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
