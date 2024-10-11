import { useEffect } from "react";
import { useSnackbar } from "notistack";

interface UseSelectDappIdProps {
  updateData: any;
  data: any;
  setSelectId: (id: number | undefined) => void;
}

export const useSelectDappId = ({
                                     updateData,
                                     data,
                                     setSelectId
                                   }: UseSelectDappIdProps) => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (updateData) {
      if (updateData?.approved) {
        if (data) {
          setSelectId(
            data.find((i: { id: any }) => i.id === updateData.data.id)?.id
          );
        }
      }
    }

    // if (updateDate.data.active) {
    //   if (data)
    //     setSelectId(
    //       data.find((i: { id: any }) => i.id === updateDate.data.id)?.id
    //     );
    // } else {
    //   if (data) {
    //     let dataRes = data.filter(
    //       (it: { id: any }) => it.id !== updateDate.data.id
    //     );
    //     setSelectId(
    //       dataRes.find((it: { active: boolean }) => it.active)?.id
    //     );
    //   }
    // }
  }, [updateData, data, setSelectId]);
};
