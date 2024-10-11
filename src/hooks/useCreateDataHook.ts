import { useEffect } from "react";
import { useSnackbar } from "notistack";
export const useCreateDataHook = (createDate: any) => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (createDate) {
      if (createDate.approved) {
        enqueueSnackbar(createDate.message, { variant: "success" });
      } else {
        enqueueSnackbar(createDate.message, { variant: "error" });
      }
    }
  }, [createDate, enqueueSnackbar]);
};
