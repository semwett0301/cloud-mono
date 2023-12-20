import {
  AuthLogin,
  AuthRegister,
  AuthResponse,
  UserResponse,
} from "@project/meta";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState, TagTypes } from "../types";
import { ordersApi } from "./orders";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_SERVER}/auth`,
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
    login: builder.mutation<AuthResponse, AuthLogin>({
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(ordersApi.util.resetApiState());
        } catch (e) {
          console.log(e);
        }
      },
      query: (body) => ({
        body,
        method: "POST",
        url: `/login`,
      }),
    }),
    me: builder.query<UserResponse, null>({
      providesTags: [TagTypes.AUTH],
      query: () => ({
        method: "GET",
        url: "/me",
      }),
    }),
    register: builder.mutation<AuthResponse, AuthRegister>({
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(ordersApi.util.resetApiState());
        } catch (e) {
          console.log(e);
        }
      },
      query: (body) => ({
        body,
        method: "POST",
        url: `/register`,
      }),
    }),
  }),
  reducerPath: "authApi",
  tagTypes: [TagTypes.AUTH],
});

export const { useLoginMutation, useMeQuery, useRegisterMutation } = authApi;
