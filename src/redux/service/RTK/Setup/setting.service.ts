import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ISetting } from "../../../interface/Setup/ISetting";
import { IResponse } from "../../../interface/Setup/IResponse";

export const settingAPI = createApi({
  reducerPath: "settingAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["Settings"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    settingsFetchAll: build.query<IResponse<ISetting[]>, void>({
      query: () => ({
        url: `/settings`
      }),
      providesTags: ["Settings"]
    }),
  })
});
