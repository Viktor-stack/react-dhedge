import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IOperation } from "../../../interface/Setup/IOperation";
import { IResponse } from "../../../interface/Setup/IResponse";

export const operationAPI = createApi({
  reducerPath: "operationAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["Operation"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    fetchAllOperation: build.query<IResponse<IOperation[]>, void>({
      query: () => ({
        url: `/operations`
      }),
      providesTags: () => ["Operation"]
    }),
    fetchSelectOperation: build.query<IOperation[], void>({
      query: () => ({
        url: "/operations"
      }),
      transformResponse: (res: IResponse<IOperation[]>) => {
        let items: IOperation[] = [];
        for (let i = 0; i < res.data?.length; i++) {
          items.push(res.data[i]);
        }
        return items as IOperation[];
      },
      providesTags: () => ["Operation"]
    }),
  })
});
