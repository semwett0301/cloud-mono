import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderCreateRequest, OrderResponse } from "@project/meta";
import { Key } from "react";

export const ordersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_SERVER}/orders`,
  }),
  endpoints: (builder) => ({
    getOrders: builder.query<OrderResponse[], null>({
      query: () => ({
        method: "GET",
        url: `/`,
      }),
    }),
    getOrderById: builder.query<OrderResponse, string>({
      query: (id) => ({
        method: "GET",
        url: `/${id}`,
      }),
    }),
    createOrder: builder.mutation<OrderResponse, OrderCreateRequest>({
      query: (body) => ({
        body,
        method: "POST",
        url: "/",
      }),
    }),
    changeOrder: builder.mutation<
      OrderResponse,
      Partial<Omit<OrderCreateRequest, "set_ids">> & {
        id: string;
      }
    >({
      query: (body) => ({
        body,
        method: "PATCH",
        url: `/${body.id}`,
      }),
    }),
    deleteOrder: builder.mutation<null, Key>({
      query: (id) => ({
        method: "DELETE",
        url: `/groups/${id}`,
      }),
    }),
  }),
  reducerPath: "orders",
  tagTypes: [],
});

export const {
  useChangeOrderMutation,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderByIdQuery,
  useGetOrdersQuery,
} = ordersApi;
