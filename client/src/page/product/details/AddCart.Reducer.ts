import { createSlice } from "@reduxjs/toolkit";
import { AddCartThunk } from "../../../action/cart/Cart.Thunk";

interface CartStates {
  data: any;
  isLoading: boolean;
  error: string | null | any;
}

// Define the initial state
const initialStates: CartStates = {
  data: null,
  isLoading: false,
  error: null,
};

export const addCartAction = AddCartThunk;

// Create a userSlice
export const addCartSlices = createSlice({
  name: "addCart",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCartAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCartAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(addCartAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
