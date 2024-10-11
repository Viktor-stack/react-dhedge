import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  // ITrading,
  // ITradingPoolDetails,
  ITradingPoolDetailsData
} from "../../../interface/Trading/ITrading";
import { IPool } from "../../../interface/Setup/IPool";
import { IResponse } from "../../../interface/Setup/IResponse";
import { IResponseSwap, ISwap } from "../../../interface/Setup/ISwap";
import { IPair, ITx } from "../../../interface/Setup/IPair";
import { ISwapPair } from "../../../interface/Setup/ISwapPair";
import { IStartDhedge } from "../../../interface/Trading/IStartDhedge";

export const tradingAPI = createApi({
  reducerPath: "tradingAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["Trading"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    tradingFetchAll: build.query<ITradingPoolDetailsData, { id: number }>({
      query: ({ id }) => ({
        url: `/dashboard`
      }),
      providesTags: ["Trading"]
    }),
    startDhedge: build.mutation<IResponse<boolean>,IStartDhedge>({
      query: (arg) => ({
        url: '/dashboard/start',
        method: 'POST',
        body: arg
      }),
      invalidatesTags: ["Trading"]
    }),
    syncPool: build.mutation<IResponse<any>, {networkId: number}>({
      query: (arg) => ({
        url: '/dashboard/sync',
        method: 'POST',
        body: arg
      }),
      invalidatesTags: ["Trading"]
    }),
    swapPool: build.mutation<IResponseSwap, ISwap>({
      query: (swap) => ({
        url: `/dashboard/manage/swap`,
        method: "POST",
        body: swap
      }),
      invalidatesTags: ["Trading"]
    }),
    updatePool: build.mutation<IResponse<IPool>, IPool>({
      query: (pool) => ({
        url: `/pools/${pool.id}`,
        method: "PATCH",
        body: pool
      }),
      invalidatesTags: ["Trading"]
    }),
    getSwapPairById: build.mutation<ISwapPair, { id: number }>({
      query: ({ id }) => ({
        url: `/swap-pairs/${id}`,
        method: "GET"
      })
    }),
    getPairById: build.mutation<IPair, { id: number }>({
      query: ({ id }) => ({
        url: `/dashboard/pairs/${id}`,
        method: "GET"
      })
    }),
    getTxById: build.mutation<ITx, { id: number }>({
      query: ({ id }) => ({
        url: `/swap/tx/${id}`,
        method: "GET"
      })
    })
  })
});
