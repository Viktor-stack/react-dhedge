import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IResponse} from "../../../interface/Setup/IResponse";
import {IDiscovery} from "../../../interface/Discovery/IDiscovery";

export const discoveryAPI = createApi({
  reducerPath: "discoveryAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["discovery"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    fetchAllDiscovery: build.query<IResponse<IDiscovery[]>,void>({
      query: () => ({
        url: `/discovery`
      }),
      providesTags: () => ["discovery"]
    }),
  })
});
