import { INetwork } from "../../../interface/Setup/INetwork";
import { IResponse } from "../../../interface/Setup/IResponse";
import {
  BaseQueryError,
  BaseQueryMeta
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const networkAPI = createApi({
  reducerPath: "networkAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["Network"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
      fetchAllNetworks: build.query<IResponse<INetwork[]>, void>({
      query: () => ({
        url: `/networks`
      }),
      providesTags: () => ["Network"]
    }),
    fetchNetworksSelect: build.query<INetwork[], void>({
      query: () => ({
        url: "/networks"
      }),
      transformResponse: (res: IResponse<INetwork[]>) => {
        let items: INetwork[] = [];
        for (let i = 0; i < res.data?.length; i++) {
          if (res.data[i].active) {
            items.push(res.data[i]);
          }
        }
        return items as INetwork[];
      },
      providesTags: () => ["Network"]
    }),
    createNetwork: build.mutation<IResponse<INetwork>, INetwork>({
      query: (network) => ({
        url: "/networks",
        method: "POST",
        body: network
      }),
      // transformErrorResponse: (
      // 	response: FetchBaseQueryError
      // ): FetchBaseQueryError => {
      // 	return response
      // },
      invalidatesTags: ["Network"]
    }),
    updateNetwork: build.mutation<IResponse<INetwork>, INetwork>({
      query: (network) => ({
        url: `/networks/${network.id}`,
        method: "PATCH",
        body: network
      }),
      invalidatesTags: ["Network"]
    })
    // deleteNetwork: build.mutation<INetwork, INetwork>({
    //   query: (post) => ({
    //     url: `/networks/${post.id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Network'],
    // }),
  })
});
