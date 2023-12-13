import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponse } from "@project/meta";

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_SERVER}/products`,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse[], null>({
      query: () => ({
        method: "GET",
        url: `/`,
      }),
    }),
    getProductById: builder.query<ProductResponse, string>({
      query: (id) => ({
        method: "GET",
        url: `/${id}`,
      }),
    }),
    getProductsBySet: builder.query<ProductResponse[], string>({
      query: (setId) => ({
        method: "POST",
        url: `/get-products-by-set/${setId}`,
      }),
    }),
  }),
  reducerPath: "products",
  tagTypes: [],
});

export const {
  useGetProductByIdQuery,
  useGetProductsBySetQuery,
  useGetProductsQuery,
} = productsApi;
