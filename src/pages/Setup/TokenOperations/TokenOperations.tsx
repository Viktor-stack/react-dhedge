import { useEffect, useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import LinearProgress from "@mui/material/LinearProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { MIN_WIDTH } from "../../../shared/configMedia/config";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import { LayoutTable } from "@UI/MyTableContains/MyTable/styles/styles";
import CustomToolbar from "@UI/CustomToolbar/CustomToolbar";
import CustomPagination from "@UI/CustomPagination/CustomPagination";
import { networkAPI } from "@RTK/Setup/network.service";
import UiSelect from "@UI/FormContainer/Select/UiSelect";
import CustomNoRowsOverlay from "@UI/CustomNoRowsOverlay/CustomNoRowsOverlay";
import useLocalStorage from "usehooks-ts/dist/esm/useLocalStorage/useLocalStorage";
import TransitionAlerts from "@UI/TransitionAlerts/TransitionAlerts";
import { useHandlerMessage } from "../../../hooks/useHandlerMessage";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { ITokenOperations } from "../../../redux/interface/Setup/ITokenOperations";
import { tokenOperationsAPI } from "@RTK/Setup/tokenOperations.service";

const TokenOperations = () => {
  const theme = useTheme();
  const matches = useMediaQuery(MIN_WIDTH);
  const [data, setData] = useState<ITokenOperations>({
    tokenOperations: [],
    tokens: [],
    operations: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [selectId, setSelectId] = useLocalStorage<number>("selectValueId", 3);
  const { data: network, refetch } = networkAPI.useFetchNetworksSelectQuery();
  const {
    data: tokenOperationsData,
    isLoading: isLoadingFetch,
    isSuccess: isSuccessPoolStrategies,
    refetch: refetchPoolStrategies,
    isError: poolStrategiesDataIsError,
    error: poolStrategiesError
  } = tokenOperationsAPI.useFetchAllTokenOperationsQuery(
    {
      id: selectId
    },
    { refetchOnFocus: true }
  );
  const [update, { data: updateData }] =
    tokenOperationsAPI.useUpdateTokenOperationsMutation();

  useHandlerMessage(updateData);
  useErrorHandler(poolStrategiesError);

  useEffect(() => {
    if (tokenOperationsData) {
      if (tokenOperationsData.tokens.length !== 0) {
        setData(tokenOperationsData);
      } else {
        setData({
          tokens: [],
          tokenOperations: [],
          operations: []
        });
      }
    }
    setTimeout(() => {
      setIsLoading(isLoadingFetch);
    }, 500);
  }, [tokenOperationsData]);

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
        width: 150,
        filterable: false,
        headerName: "Token",
        align: "center",
        sortable: false,
        disableColumnMenu: true,
        renderHeader: () => <GridSotBtn width={"100vh"} headerName={"token"} />
      });
      for (let i = 0; i < tokenOperationsData.operations.length; i++) {
        columnsHead.push({
          field: `${tokenOperationsData.operations[i].id}`,
          minWidth: 150,
          flex: 1,
          headerName: `${tokenOperationsData.operations[i].name}`,
          filterable: false,
          sortable: false,
          type: "boolean",
          disableColumnMenu: true,
          renderCell: (params) => {
            return (
              tokenOperationsData.tokenOperations && (
                <Checkbox
                  onClick={() =>
                    handleSubmit(
                      tokenOperationsData.tokenOperations.find(
                        (i) =>
                          i.operation.id.toString() === params.field &&
                          i.token.id === params.id
                      )
                    )
                  }
                  color={"success"}
                  checked={
                    tokenOperationsData.tokenOperations.find(
                      (i) =>
                        i.operation.id.toString() === params.field &&
                        i.token.id === params.id
                    )?.enabled
                  }
                />
              )
            );
          },
          renderHeader: () => (
            <GridSotBtn
              isStringTransform={true}
              flex={1}
              width={"100vh"}
              headerName={tokenOperationsData.operations[i].name}
            />
          )
        });
      }
    }
    return columnsHead;
  }, [tokenOperationsData, data]);

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
          Token operations
        </Typography>
        <UiSelect
          selectNode={network}
          field={"network"}
          handleInput={(filed, value) => selectHandler(value.id)}
          data={selectId}
          setDirty={() => {}}
          titleForm={""}
        />
      </Box>
      {poolStrategiesDataIsError ? (
        <TransitionAlerts
          isOpen={poolStrategiesDataIsError}
          content={errorMessage}
        />
      ) : (
        <>
          {tokenOperationsData?.tokens.length || !isSuccessPoolStrategies ? (
            <LayoutTable sx={{ height: "80vh" }}>
              <DataGrid
                showCellRightBorder={true}
                showColumnRightBorder={true}
                loading={isLoading}
                getRowId={(row) => row.id}
                components={{
                  Toolbar: CustomToolbar,
                  Pagination: CustomPagination,
                  LoadingOverlay: LinearProgress,
                  NoRowsOverlay: CustomNoRowsOverlay
                }}
                density={matches ? "compact" : "standard"}
                sx={{
                  backgroundColor: `${theme.palette.background.paper}`,
                  borderRadius: "15px",
                  ".MuiDataGrid-cellContent": {
                    fontSize: "14px"
                  },
                  ".MuiDataGrid-cell:focus": {
                    outline: "solid #00ab55 1px"
                  },
                  ".MuiCircularProgress-root": {
                    color: `${theme.palette.text.primary}`
                  },
                  '.MuiDataGrid-booleanCell[data-value="false"]': {
                    color: "rgba(234,5,5,0.98)"
                  },
                  '.MuiDataGrid-booleanCell[data-value="true"]': {
                    color: "rgb(2,168,68)",
                    ".MuiSvgIcon-root": {
                      width: "30px",
                      height: "30px"
                    }
                  },
                  ".MuiDataGrid-footerContainer": {
                    justifyContent: "center"
                  }
                }}
                columns={columns}
                rows={data?.tokens}
              />
            </LayoutTable>
          ) : (
            <TransitionAlerts isOpen={true} content={"No Active Tokens"} />
          )}
        </>
      )}
    </>
  );
};

export default TokenOperations;
