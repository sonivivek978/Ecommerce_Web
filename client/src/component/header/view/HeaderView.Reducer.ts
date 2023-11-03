import { createSlice } from "@reduxjs/toolkit";
import { UploadProfileThunk } from "../../../action/register/Repository.Thunk";

interface UserProfileStates {
  data: any;
  isLoading: boolean;
  error: string | null | any;
}

const initialStates: UserProfileStates = {
  data: null,
  isLoading: false,
  error: null,
};

export const userProfileAction = UploadProfileThunk;

// Create a userSlice
const profileUserSlices = createSlice({
  name: "userProfile",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfileAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userProfileAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(userProfileAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer
export default profileUserSlices.reducer;
