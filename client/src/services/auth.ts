import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthLogin, AuthRegister, AuthResponse } from "@project/meta";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_SERVER}/auth`,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, AuthRegister>({
      query: (body) => ({
        body,
        method: "POST",
        url: `/register`,
      }),
    }),
    login: builder.mutation<AuthResponse, AuthLogin>({
      query: (body) => ({
        body,
        method: "POST",
        url: `/login`,
      }),
    }),
  }),
  reducerPath: "auth",
  tagTypes: [],
});

export const { useRegisterMutation, useLoginMutation } = authApi;
