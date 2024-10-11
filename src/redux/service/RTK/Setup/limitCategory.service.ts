import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ILimitCategory, ILimitCategoryData} from "../../../interface/Setup/ILimitCategory";
import {IResponse} from "../../../interface/Setup/IResponse";

export const limitCategoryAPI = createApi({
  reducerPath: "limitCategoryAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["limitCategoryAPI"],
  endpoints: (build) => ({
    allLimitCategory: build.query<IResponse<ILimitCategoryData>, void>({
      query: () => ({
        url: "/limit-categories"
      }),
      providesTags: ["limitCategoryAPI"]
    }),
    updateMarketCategory: build.mutation<IResponse<ILimitCategoryData>, ILimitCategory>({
      query: (data) => ({
        url: `/limit-categories/${data.id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ["limitCategoryAPI"]
    })
  })
});
