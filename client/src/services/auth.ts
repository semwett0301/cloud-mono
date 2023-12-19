import {
  AuthLogin,
  AuthRegister,
  AuthResponse,
  UserResponse,
} from "@project/meta";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../types";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_SERVER}/auth`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;

      headers.set("Authorization", `Bearer ${state.auth.token}`);

      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthLogin>({
      query: (body) => ({
        body,
        method: "POST",
        url: `/login`,
      }),
    }),
    me: builder.query<UserResponse, null>({
      query: () => ({
        method: "GET",
        url: "/me",
      }),
    }),
    register: builder.mutation<AuthResponse, AuthRegister>({
      query: (body) => ({
        body,
        method: "POST",
        url: `/register`,
      }),
    }),
  }),
  reducerPath: "authApi",
  tagTypes: [],
});

export const { useLoginMutation, useMeQuery, useRegisterMutation } = authApi;
