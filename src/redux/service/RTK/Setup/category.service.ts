import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICategory } from "../../../interface/Setup/ICategory";
import { IResponse } from "../../../interface/Setup/IResponse";

export const categoryAPI = createApi({
  reducerPath: "categoryAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["Category"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    allCategory: build.query<IResponse<ICategory[]>, void>({
      query: () => ({
        url: "/categories"
      }),
      providesTags: ["Category"]
    }),
    selectCategory: build.query<ICategory[], void>({
      query: () => ({
        url: "/categories"
      }),
      transformResponse: (res: IResponse<ICategory[]>) => {
        let items: ICategory[] = [];
        for (let i = 0; i < res.data?.length; i++) {
          items.push(res.data[i]);
        }
        return items as ICategory[];
      },
      providesTags: () => ["Category"]
    }),

  })
});
