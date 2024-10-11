import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {IOperationVolumes, IOperationsCategoryData} from "../../../interface/Setup/IOperationsCategoryData";
import { IResponse } from "../../../interface/Setup/IResponse";

export const operationCategoryAPI = createApi({
  reducerPath: "operationCategoryAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["operationCategoryAPI"],
  endpoints: (build) => ({
    getAllEventStrategies: build.query<IResponse<IOperationsCategoryData>, void>({
      query: () => ({
        url: "/operation-categories"
      }),
      providesTags: ["operationCategoryAPI"]
    }),
    updateOperationsCategory: build.mutation<IResponse<IOperationsCategoryData>, IOperationVolumes>({
      query: (data) => ({
        url: `/operation-volumes/${data.id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ["operationCategoryAPI"]
    })
  })
});
