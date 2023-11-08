import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCart, getCart, removeCart } from "./Cart.Repository";

export const AddCartThunk = createAsyncThunk<
  void,
  { userId: string; productId: string; size: string }
>("user/addCart", addCart);

export const GetCartThunk = createAsyncThunk<void, { userId: string }>(
  "user/getCart",
  getCart
);
export const RemoveCartThunk = createAsyncThunk("user/removeCart", removeCart);
