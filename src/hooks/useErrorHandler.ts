import { useEffect } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { ICustomError } from "../redux/interface/Setup/ICustomError";
import { useSnackbar } from "notistack";

export const useErrorHandler = (error: any) => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (error !== undefined) {
      const myDataError = error as ICustomError | SerializedError;
      if (myDataError && "data" in myDataError && myDataError.data) {
        enqueueSnackbar(myDataError.data.message, {
          variant: "error"
        });
      }
    }
  }, [error, enqueueSnackbar]);
};
