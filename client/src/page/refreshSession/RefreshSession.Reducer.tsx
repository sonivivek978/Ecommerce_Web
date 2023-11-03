import { createSlice } from "@reduxjs/toolkit";
import { RefreshThunk } from "../../action/login/Login.Thunk";

interface RefreshSessionStates {
  data: any; // Define the type of user data
  isLoading: boolean;
  error: string | null | any;
}

// Define the initial state
const initialStates: RefreshSessionStates = {
  data: null,
  isLoading: false,
  error: null,
};

export const refreshAction = RefreshThunk;

// Create a userSlice
export const refreshSessionSlices = createSlice({
  name: "refreshSession",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(refreshAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
