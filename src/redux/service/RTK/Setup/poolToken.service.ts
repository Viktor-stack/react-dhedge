import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPoolToken } from "../../../interface/Setup/IPoolToken";
import { IResponse } from "../../../interface/Setup/IResponse";

export const poolTokenAPI = createApi({
  reducerPath: "poolTokenAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["PoolToken"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    fetchAllPoolToken: build.query<IResponse<IPoolToken>, { id: number }>({
      query: ({ id }) => ({
        url: `/pool-tokens`
      }),
      providesTags: () => ["PoolToken"]
    }),
    updatePoolToken: build.mutation<
      IResponse<IPoolToken>,
      { id: number; enabled: boolean }
    >({
      query: (network) => ({
        url: `/pool-tokens/${network.id}`,
        method: "PATCH",
        body: network
      }),
      invalidatesTags: ["PoolToken"]
    }),
    checkPool: build.mutation<IPoolToken[], { id: number }>({
      query: ({ id }) => ({
        url: `/pool-tokens/check/network/${id}`,
        method: "GET"
      }),
      invalidatesTags: ["PoolToken"]
    })
  })
});
