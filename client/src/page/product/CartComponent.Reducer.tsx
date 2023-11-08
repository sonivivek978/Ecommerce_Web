import { createSlice } from "@reduxjs/toolkit";
import { GetCartThunk } from "../../action/cart/Cart.Thunk";

interface GetCartStates {
  data: any;
  isLoading: boolean;
  error: string | null | any;
}

// Define the initial state
const initialStates: GetCartStates = {
  data: null,
  isLoading: false,
  error: null,
};

export const getCartAction = GetCartThunk;

export const getCartSlices = createSlice({
  name: "getCart",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCartAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getCartAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
