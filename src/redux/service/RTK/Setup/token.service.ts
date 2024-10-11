import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IResponse } from "../../../interface/Setup/IResponse";
import { IToken } from "../../../interface/Setup/IToken";

export const tokenAPI = createApi({
  reducerPath: "tokenAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["Tokens"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 0,
  endpoints: (build) => ({
    // fetchAllTokens: build.query<IResponse<IToken[]>, { id: number }>({
    fetchAllToken: build.query<IResponse<IToken[]>, void>({
      // query: ({ id }) => ({
      query: () => ({
        url: `/tokens`
      }),
      providesTags: () => ["Tokens"]
    }),
    createToken: build.mutation<IResponse<IToken>, IToken>({
      query: (token) => ({
        url: "/tokens",
        method: "POST",
        body: token
      }),
      invalidatesTags: ["Tokens"]
    }),
    updateToken: build.mutation<IResponse<IToken>, IToken>({
      query: (token) => ({
        url: `/tokens/${token.id}`,
        method: "PATCH",
        body: token
      }),
      invalidatesTags: ["Tokens"]
    }),
    deleteToken: build.mutation<IResponse<IToken>, { id: number }>({
      query: (post) => ({
        url: `/tokens/${post.id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Tokens"]
    })
  })
});
