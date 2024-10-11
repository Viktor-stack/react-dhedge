import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPool } from "../../../interface/Setup/IPool";
import { IResponse } from "../../../interface/Setup/IResponse";

export const poolAPI = createApi({
  reducerPath: "poolAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["Pools"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    fetchAllPools: build.query<IResponse<IPool[]>, { id: number }>({
      query: ({ id }) => ({
        url: `/pools`
      }),
      providesTags: () => ["Pools"]
    }),
    createPool: build.mutation<IResponse<IPool>, IPool>({
      query: (poll) => ({
        url: `/pools`,
        method: "POST",
        body: poll
      }),
      invalidatesTags: ["Pools"]
    }),
    updatePool: build.mutation<IResponse<IPool>, IPool>({
      query: (pool) => ({
        url: `/pools/${pool.id}`,
        method: "PATCH",
        body: pool
      }),
      invalidatesTags: ["Pools"]
    }),
    deletePools: build.mutation<IResponse<IPool>, { id: number }>({
      query: ({id}) => ({
        url: `/pools/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Pools"]
    })
  })
});
