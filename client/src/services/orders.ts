import { OrderCreateRequest, OrderResponse } from "@project/meta";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Key } from "react";

import { RootState, TagTypes } from "../types";

export const ordersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_SERVER}/orders`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;

      headers.set(
        "Authorization",
        `Bearer ${state.auth.token || window.localStorage.getItem("token")}`,
      );

      return headers;
    },
  }),

  endpoints: (builder) => ({
    changeOrder: builder.mutation<
      OrderResponse,
      Partial<Omit<OrderCreateRequest, "set_ids">> & {
        id: string;
      }
    >({
      invalidatesTags: [TagTypes.ORDERS],
      query: (body) => ({
        body,
        method: "PATCH",
        url: `/${body.id}`,
      }),
    }),
    createOrder: builder.mutation<OrderResponse, OrderCreateRequest>({
      invalidatesTags: [TagTypes.ORDERS],
      query: (body) => ({
        body,
        method: "POST",
        url: "/",
      }),
    }),
    deleteOrder: builder.mutation<null, Key>({
      invalidatesTags: [TagTypes.ORDERS],
      query: (id) => ({
        method: "DELETE",
        url: `/groups/${id}`,
      }),
    }),
    getOrderById: builder.query<OrderResponse, string>({
      providesTags: [TagTypes.ORDERS],
      query: (id) => ({
        method: "GET",
        url: `/${id}`,
      }),
    }),
    getOrders: builder.query<OrderResponse[], null>({
      providesTags: [TagTypes.ORDERS],
      query: () => ({
        method: "GET",
        url: `/`,
      }),
    }),
  }),
  reducerPath: "orders",
  tagTypes: [TagTypes.ORDERS],
});

export const {
  useChangeOrderMutation,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderByIdQuery,
  useGetOrdersQuery,
} = ordersApi;
