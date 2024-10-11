import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IMarketCategory, IMarketCategoryData} from "../../../interface/Setup/IMarketCategory";
import {IResponse} from "../../../interface/Setup/IResponse";

export const marketCategoryAPI = createApi({
  reducerPath: "marketCategoryAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["marketCategoryAPI"],
  endpoints: (build) => ({
    allMarketCategory: build.query<IResponse<IMarketCategoryData>, void>({
      query: () => ({
        url: "/market-categories"
      }),
      providesTags: ["marketCategoryAPI"]
    }),
    updateMarketCategory: build.mutation<IResponse<IMarketCategoryData>, IMarketCategory>({
      query: (data) => ({
        url: `/market-categories/${data.id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ["marketCategoryAPI"]
    })
  })
});
