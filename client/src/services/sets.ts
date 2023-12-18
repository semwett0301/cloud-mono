import { SetRequest, SetResponse } from "@project/meta";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const setsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_SERVER}/sets`,
  }),
  endpoints: (builder) => ({
    getSetById: builder.query<SetResponse, string>({
      query: (id) => ({
        method: "GET",
        url: `/${id}`,
      }),
    }),
    getSets: builder.query<SetResponse[], SetRequest>({
      query: (params) => ({
        method: "GET",
        params,
        url: `/`,
      }),
    }),
  }),
  reducerPath: "sets",
  tagTypes: [],
});

export const { useGetSetByIdQuery, useGetSetsQuery } = setsApi;
