import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SetRequest, SetResponse } from "@project/meta";

export const setsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_SERVER}/sets`,
  }),
  endpoints: (builder) => ({
    getSets: builder.query<SetResponse[], SetRequest>({
      query: (params) => ({
        params,
        method: "GET",
        url: `/`,
      }),
    }),
    getSetById: builder.query<SetResponse, string>({
      query: (id) => ({
        method: "GET",
        url: `/${id}`,
      }),
    }),
  }),
  reducerPath: "sets",
  tagTypes: [],
});

export const { useGetSetByIdQuery, useGetSetsQuery } = setsApi;
