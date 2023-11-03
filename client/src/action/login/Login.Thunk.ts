import { createAsyncThunk } from "@reduxjs/toolkit";
import { postLoginUser, RefreshSession } from "./Login.Repository";

export const LoginThunk =  createAsyncThunk('user/loginUser', postLoginUser);
export const RefreshThunk =  createAsyncThunk('user/refresh', RefreshSession);
