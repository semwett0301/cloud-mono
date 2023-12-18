import { AuthLogin, AuthRegister, AuthResponse } from "@project/meta";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_SERVER}/auth`,
  }),

  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthLogin>({
      query: (body) => ({
        body,
        method: "POST",
        url: `/login`,
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
  reducerPath: "auth",
  tagTypes: [],
});

export const { useLoginMutation, useRegisterMutation } = authApi;
