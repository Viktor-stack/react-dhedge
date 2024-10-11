import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPoolStrategies } from "../../../interface/Setup/IStrategyOperations";
import { IResponse } from "../../../interface/Setup/IResponse";
import { ITokenOperations } from "../../../interface/Setup/ITokenOperations";

export const tokenOperationsAPI = createApi({
  reducerPath: "tokenOperationsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["TokenOperations"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    fetchAllTokenOperations: build.query<ITokenOperations, { id: number }>({
      query: ({ id }) => ({
        url: `/token-operations/network/${id}`
      }),
      providesTags: () => ["TokenOperations"]
    }),
    updateTokenOperations: build.mutation<
      IResponse<IPoolStrategies>,
      { id: number; enabled: boolean }
    >({
      query: (tokenOperations) => ({
        url: `/token-operations/${tokenOperations.id}`,
        method: "PATCH",
        body: tokenOperations
      }),
      invalidatesTags: ["TokenOperations"]
    })
  })
});
