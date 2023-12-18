import { ProductResponse } from "@project/meta";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_SERVER}/products`,
  }),
  endpoints: (builder) => ({
    getProductById: builder.query<ProductResponse, string>({
      query: (id) => ({
        method: "GET",
        url: `/${id}`,
      }),
    }),
    getProducts: builder.query<ProductResponse[], null>({
      query: () => ({
        method: "GET",
        url: `/`,
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
