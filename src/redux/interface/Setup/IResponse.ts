import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// @ts-ignore
export interface IResponse<T> extends FetchBaseQueryError {
  message: string;
  approved: boolean;
  statusCode: number;
  responseId: number | undefined;
  data: T ;
}
