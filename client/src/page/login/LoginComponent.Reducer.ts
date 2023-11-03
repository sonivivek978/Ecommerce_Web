import { createSlice } from "@reduxjs/toolkit";
import { LoginThunk } from "../../action/login/Login.Thunk";

interface UserLoginStates {
  data: any; // Define the type of user data
  isLoading: boolean;
  error: string | null | any;
}

// Define the initial state
const initialStates: UserLoginStates = {
  data: null,
  isLoading: false,
  error: null,
};

export const LoginAction = LoginThunk;

// Create a userSlice
export const loginUserSlices = createSlice({
  name: "loginUser",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(LoginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(LoginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
