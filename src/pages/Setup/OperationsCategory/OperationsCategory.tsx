import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import TransitionAlerts from "@UI/TransitionAlerts/TransitionAlerts";
import {LayoutTable} from "@UI/MyTableContains/MyTable/styles/styles";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import {MIN_WIDTH} from "../../../shared/configMedia/config";
import {operationCategoryAPI} from "@RTK/Setup/operationCategory.service";
import {IOperationsCategoryData} from "../../../redux/interface/Setup/IOperationsCategoryData";
import OperationsCategoryMetaGrid, {SignalStrategiesMetaGridProps} from "./OperationsCategoryMetaGrid";
import {DataGridInner} from "@UI/DataInner/DataInner";

const OperationsCategory = () => {
  const theme = useTheme();
  const matches = useMediaQuery(MIN_WIDTH);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [signal, setData] = useState<IOperationsCategoryData>({
    categories: [],
    operationCategories: [],
    operations: []
  });

  const {
    data: operationsCategoryData,
    isLoading: isLoadingFetch,
    isSuccess: isSuccessSignalStrategies,
    isError: eventStrategiesDataIsError
  } = operationCategoryAPI.useGetAllEventStrategiesQuery();

  const [
    updateOperationsCategory,
    {data: updateData}
  ] = operationCategoryAPI.useUpdateOperationsCategoryMutation()

  useEffect(() => {
    if (operationsCategoryData) {
      setData(operationsCategoryData.data);
    }
    setTimeout(() => {
      setIsLoading(isLoadingFetch);
    }, 500);
  }, [operationsCategoryData]);


  const submitData = (data: any) => {
    console.log(data)
  }

  const {columns} = OperationsCategoryMetaGrid({
    signalStrategiesData: operationsCategoryData?.data,
    isSuccessEventStrategies: isSuccessSignalStrategies,
    data: signal,
    submitData
  } as SignalStrategiesMetaGridProps);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "5px",
          mb: "5px"
        }}>
        <Typography textAlign={"center"} fontWeight="bold" variant="h4">
          {operationsCategoryData?.message}
        </Typography>
      </Box>
      {eventStrategiesDataIsError ? (
        <TransitionAlerts
          isOpen={eventStrategiesDataIsError}
          content={errorMessage}
        />
      ) : (
        <>
          {operationsCategoryData?.data.categories.length ||
          !isSuccessSignalStrategies ? (
            operationsCategoryData?.data.categories.length ||
            !isSuccessSignalStrategies ? (
              <LayoutTable sx={{height: "80vh"}}>
                <DataGridInner
                  columns={columns}
                  rows={signal.operations}
                  isLoading={isLoading}
                />
              </LayoutTable>
            ) : (
              <TransitionAlerts isOpen={true} content={"No active tokens"}/>
            )
          ) : (
            <TransitionAlerts isOpen={true} content={"No active pools"}/>
          )}
        </>
      )}
    </>
  );
};
export default OperationsCategory;
