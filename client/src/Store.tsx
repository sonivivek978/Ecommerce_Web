import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { loginUserSlices } from "./page/login/LoginComponent.Reducer";
import { registerUserSlices } from "./page/register/RegisterComponent.Reducer";
import { refreshSessionSlices } from "./page/refreshSession/RefreshSession.Reducer";
import { getProductSlices } from "./page/product/ProductComponent.Reducer";
import { getProductDetailsSlices } from "./page/product/ProductDetails.Reducer";
const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredPaths: ["refresh.data.headers", "filters.endDate"],
  },
};

export const AppReducer = {
  login: loginUserSlices.reducer,
  register: registerUserSlices.reducer,
  refresh: refreshSessionSlices.reducer,
  product: getProductSlices.reducer,
  productDetails: getProductDetailsSlices.reducer,
};
const store = configureStore({
  reducer: AppReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(defaultMiddlewareConfig),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
