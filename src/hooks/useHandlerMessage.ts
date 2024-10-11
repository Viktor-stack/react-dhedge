import { useEffect } from "react";
import { useSnackbar } from "notistack";

export const useHandlerMessage = (updateDate: any) => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (updateDate) {
      if (updateDate.approved) {
        enqueueSnackbar(updateDate.message, { variant: "success" });
      } else {
        enqueueSnackbar(updateDate.message, { variant: "error" });
      }
    }
  }, [updateDate, enqueueSnackbar]);
};
