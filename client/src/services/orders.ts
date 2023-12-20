import { OrderCreateRequest, OrderResponse, ReturnOrder } from "@project/meta";
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
      invalidatesTags: [TagTypes.ORDERS, TagTypes.ID_ORDER],
      query: (body) => ({
        body,
        method: "PATCH",
        url: `/${body.id}`,
      }),
    }),
    createOrder: builder.mutation<OrderResponse, OrderCreateRequest>({
      invalidatesTags: [TagTypes.ORDERS, TagTypes.ID_ORDER],
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
        url: `/${id}`,
      }),
    }),
    getOrderById: builder.query<OrderResponse, string>({
      providesTags: [TagTypes.ID_ORDER],
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
    returnOrder: builder.mutation<
      null,
      ReturnOrder & {
        id: Key;
      }
    >({
      invalidatesTags: [TagTypes.ORDERS],
      query: ({ id, ...body }) => ({
        body,
        method: "POST",
        url: `/${id}/return`,
      }),
    }),
  }),
  reducerPath: "orders",
  tagTypes: [TagTypes.ORDERS, TagTypes.ID_ORDER],
});

export const {
  useChangeOrderMutation,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useReturnOrderMutation,
} = ordersApi;
