import { Slice, createSlice } from "@reduxjs/toolkit";
import { RegisterThunk } from "../../action/register/Repository.Thunk";

interface UserRegisterStates {
  data: any;
  isLoading: boolean;
  error: string | null | any;
}

const initialStates: UserRegisterStates = {
  data: null,
  isLoading: false,
  error: null,
};

export const RegisterAction = RegisterThunk;

// Create a userSlice
export const registerUserSlices: Slice<UserRegisterStates, {}, "registerUser"> = createSlice({
  name: "registerUser",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RegisterAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(RegisterAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(RegisterAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer
