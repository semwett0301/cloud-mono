import { configureStore } from "@reduxjs/toolkit";
import { authApi, ordersApi, productsApi, setsApi } from "services";
import { authSlice, basketSlice } from "slices";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productsApi.middleware)
      .concat(setsApi.middleware)
      .concat(ordersApi.middleware),
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [setsApi.reducerPath]: setsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    auth: authSlice.reducer,
    basket: basketSlice.reducer,
  },
});
