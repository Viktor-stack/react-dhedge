import {useEffect, useMemo, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import LinearProgress from "@mui/material/LinearProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {useSnackbar} from "notistack";
import {strategiesOperationAPI} from "@RTK/Setup/strategiesOperation.service";
import {MIN_WIDTH} from "../../../shared/configMedia/config";
import {DataGrid, GridColumns} from "@mui/x-data-grid";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import {LayoutTable} from "@UI/MyTableContains/MyTable/styles/styles";
import CustomToolbar from "@UI/CustomToolbar/CustomToolbar";
import CustomPagination from "@UI/CustomPagination/CustomPagination";
import {IPoolStrategies} from "../../../redux/interface/Setup/IStrategyOperations";
import {networkAPI} from "@RTK/Setup/network.service";
import UiSelect from "@UI/FormContainer/Select/UiSelect";
import CustomNoRowsOverlay from "@UI/CustomNoRowsOverlay/CustomNoRowsOverlay";
import useLocalStorage from "usehooks-ts/dist/esm/useLocalStorage/useLocalStorage";
import {ICustomError} from "../../../redux/interface/Setup/ICustomError";
import {SerializedError} from "@reduxjs/toolkit";
import TransitionAlerts from "@UI/TransitionAlerts/TransitionAlerts";
import {useHandlerMessage} from "../../../hooks/useHandlerMessage";
import {useErrorHandler} from "../../../hooks/useErrorHandler";
import {renderCheckbox} from "./halperStrategies";
import {DataGridInner} from "@UI/DataInner/DataInner";

const StrategiesOperation = () => {
  const theme = useTheme();
  const matches = useMediaQuery(MIN_WIDTH);
  const [data, setData] = useState<IPoolStrategies>({
    strategyOperations: [],
    operations: [],
    strategies: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const {enqueueSnackbar} = useSnackbar();
  const [selectId, setSelectId] = useLocalStorage<number>("selectValueId", 3);
  const {data: network, refetch} = networkAPI.useFetchNetworksSelectQuery();
  const {
    data: poolStrategiesData,
    isLoading: isLoadingFetch,
    isSuccess: isSuccessPoolStrategies,
    refetch: refetchPoolStrategies,
    isError: poolStrategiesDataIsError,
    error: poolStrategiesError
  } = strategiesOperationAPI.useFetchAllPoolStrategiesQuery(
    {
      id: selectId
    },
    {refetchOnFocus: true}
  );
  const [update, {data: updateData}] =
    strategiesOperationAPI.useUpdatePoolStrategiesMutation();

  useHandlerMessage(updateData);
  useErrorHandler(poolStrategiesError);

  useEffect(() => {
    if (poolStrategiesData) {
      if (poolStrategiesData.operations.length !== 0) {
        setData(poolStrategiesData);
      } else {
        setData({
          operations: [],
          strategyOperations: [],
          strategies: []
        });
      }
    }
    setTimeout(() => {
      setIsLoading(isLoadingFetch);
    }, 500);
  }, [poolStrategiesData]);

  useEffect(() => {
    if (!localStorage.getItem("selectValueId")) {
      if (network) {
        setSelectId(network[0].id);
      }
    }
  }, [network]);

  useEffect(() => {
    refetchPoolStrategies();
    refetch();
  }, [refetchPoolStrategies]);

  const handleSubmit = (updateObj: any) => {
    console.log(updateObj);
    update({
      id: updateObj?.id,
      enabled: !updateObj.enabled
    });
    setIsLoading((prevState) => !prevState);
  };

  const selectHandler = (id: number) => {
    setSelectId(id);
  };

  const columns: GridColumns = useMemo(() => {
    const columnsHead: GridColumns = [];
    if (isSuccessPoolStrategies) {
      columnsHead.push({
        field: `name`,
        width: 90,
        filterable: false,
        headerName: "Strategy",
        align: "center",
        sortable: false,
        disableColumnMenu: true,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"strategy"}/>
        )
      });
      for (let i = 0; i < poolStrategiesData.operations.length; i++) {
        columnsHead.push({
          field: `${poolStrategiesData.operations[i].id}`,
          minWidth: 150,
          flex: 1,
          headerName: `${poolStrategiesData.operations[i].name}`,
          filterable: false,
          sortable: false,
          type: "boolean",
          disableColumnMenu: true,
          renderCell: (params) =>
            renderCheckbox(poolStrategiesData, handleSubmit, params),
          renderHeader: () => (
            <GridSotBtn
              isStringTransform={true}
              flex={1}
              width={"100vh"}
              headerName={poolStrategiesData.operations[i].name}
            />
          )
        });
      }
    }
    return columnsHead;
  }, [poolStrategiesData, data]);

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
          Strategies operation
        </Typography>
      </Box>
      {poolStrategiesDataIsError ? (
        <TransitionAlerts
          isOpen={poolStrategiesDataIsError}
          content={errorMessage}
        />
      ) : (
        <>
          {poolStrategiesData?.operations.length || !isSuccessPoolStrategies ? (
            <LayoutTable sx={{height: "80vh"}}>
              <DataGridInner
                columns={columns}
                rows={data.strategies}
                isLoading={isLoading}
              />
            </LayoutTable>
          ) : (
            <TransitionAlerts isOpen={true} content={"No active pools"}/>
          )}
        </>
      )}
    </>
  );
};

export default StrategiesOperation;
