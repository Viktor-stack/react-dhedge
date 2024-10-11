import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IVolumes } from "../../../interface/Setup/IVolumes";
import { IResponse } from "../../../interface/Setup/IResponse";

export const eventAPI = createApi({
  reducerPath: "eventAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["Event"],
  endpoints: (build) => ({
    getAllSignals: build.query<IResponse<IVolumes[]>, void>({
      query: () => ({
        url: "/signals"
      }),
      providesTags: ["Event"]
    })
  })
});
