import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRegisterUser, postUploadProfile } from "./Register.Repository";

export const RegisterThunk = createAsyncThunk(
  "user/registerUser",
  postRegisterUser
);
export const UploadProfileThunk = createAsyncThunk(
  "user/uploadProfile",
  postUploadProfile
);
