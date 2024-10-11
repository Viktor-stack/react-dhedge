import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IDapp } from "../../../interface/Setup/IDapp";
import { IResponse } from "../../../interface/Setup/IResponse";

export const dappAPI = createApi({
  reducerPath: "dappAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["Dapp"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    fetchAllDapp: build.query<IResponse<IDapp[]>, void>({
      query: () => ({
        url: "/dapps"
      }),
      providesTags: ["Dapp"]
    }),
    fetchSelectDapp: build.query<IDapp[], void>({
      query: () => ({
        url: "/dapps"
      }),
      transformResponse: (res: IResponse<IDapp[]>) => {
        let items: IDapp[] = [];
        for (let i = 0; i < res.data?.length; i++) {
          items.push(res.data[i]);
        }
        return items as IDapp[];
      },
      providesTags: () => ["Dapp"]
    }),
    createDapp: build.mutation<IResponse<IDapp>, IDapp>({
      query: (dapp) => ({
        url: "/dapps",
        method: "POST",
        body: dapp
      }),
      // transformErrorResponse: (
      // 	response: FetchBaseQueryError
      // ): FetchBaseQueryError => {
      // 	return response
      // },
      invalidatesTags: ["Dapp"]
    }),
    updateDapp: build.mutation<IResponse<IDapp>, IDapp>({
      query: (dapp) => ({
        url: `/dapps/${dapp.id}`,
        method: "PATCH",
        body: dapp
      }),
      invalidatesTags: ["Dapp"]
    }),
  })
});
