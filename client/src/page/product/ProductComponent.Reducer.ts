import { createSlice } from "@reduxjs/toolkit";
import { LoginThunk } from "../../action/login/Login.Thunk";
import { ProductThunk } from "../../action/product/Product.Thunk";

interface productStates {
  data: any;
  isLoading: boolean;
  error: string | null | any;
}

// Define the initial state
const initialStates: productStates = {
  data: null,
  isLoading: false,
  error: null,
};

export const getProductAction = ProductThunk;

// Create a userSlice
export const getProductSlices = createSlice({
  name: "getProduct",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getProductAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
