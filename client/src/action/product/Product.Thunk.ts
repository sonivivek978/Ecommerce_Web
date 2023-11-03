import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProduct, getProductDetails } from "./Product.Repository";

export const ProductThunk = createAsyncThunk("product/getProduct", getProduct);
export const ProductDetailsThunk = createAsyncThunk<void,{ productId: string }>(
  "product/detailsProduct",
  getProductDetails
);
