import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPair } from "../../../interface/Setup/IPair";

export const pairDetailsAPI = createApi({
  reducerPath: "pairDetailsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["PairDetails"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    fetchAllPair: build.query<IPair[], any>({
      query: () => ({
        url: `/dashboard/pairs`
      }),
      providesTags: ["PairDetails"]
    })
  })
});
