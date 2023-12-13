import { configureStore } from "@reduxjs/toolkit";
import { authApi, ordersApi, productsApi, setsApi } from "services";
import { basketSlice } from "slices";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productsApi.middleware)
      .concat(setsApi.middleware)
      .concat(ordersApi.middleware)
      .concat((req, next) => {
        console.log(req);
        console.log(next);
        const token = localStorage.getItem("token");
        req.headers.set("Authorization", `Bearer ${token}`);
        return next(req);
      }),
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [setsApi.reducerPath]: setsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    basket: basketSlice.reducer,
  },
});
