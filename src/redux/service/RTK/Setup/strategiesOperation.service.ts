import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPoolStrategies } from "../../../interface/Setup/IStrategyOperations";
import { IResponse } from "../../../interface/Setup/IResponse";

export const strategiesOperationAPI = createApi({
  reducerPath: "strategiesOperationAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["StrategiesOperation"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    fetchAllPoolStrategies: build.query<IPoolStrategies, { id: number }>({
      query: ({ id }) => ({
        url: `/strategy-operation`
      }),
      providesTags: () => ["StrategiesOperation"]
    }),
    updatePoolStrategies: build.mutation<
      IResponse<IPoolStrategies>,
      { id: number; enabled: boolean }
    >({
      query: (strategyOperation) => ({
        url: `/strategy-operation/${strategyOperation.id}`,
        method: "PATCH",
        body: strategyOperation
      }),
      invalidatesTags: ["StrategiesOperation"]
    })
  })
});
