import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IResponse } from "../../../interface/Setup/IResponse";
import { INode } from "../../../interface/Setup/INode";

export const nodesAPI = createApi({
  reducerPath: "nodesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["Node"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    fetchAllNodes: build.query<IResponse<INode[]>, { id: number }>({
      query: ({ id }) => ({
        url: `/nodes`
      }),
      providesTags: () => ["Node"]
    }),
    createNode: build.mutation<IResponse<INode>, INode>({
      query: (node) => ({
        url: "/nodes",
        method: "POST",
        body: node
      }),
      invalidatesTags: ["Node"]
    }),
    updateNode: build.mutation<IResponse<INode>, INode>({
      query: (node) => ({
        url: `/nodes/${node.id}`,
        method: "PATCH",
        body: node
      }),
      invalidatesTags: ["Node"]
    }),
    deleteNode: build.mutation<INode, INode>({
      query: (node) => ({
        url: `/nodes/${node.id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Node"]
    })
  })
});
