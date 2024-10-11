import React, {useEffect, useMemo, useState} from "react";
import {MIN_WIDTH} from "../../../shared/configMedia/config";
import {poolTokenAPI} from "@RTK/Setup/poolToken.service";
import {LayoutTable} from "@UI/MyTableContains/MyTable/styles/styles";
import {DataGrid, GridColumns, GridRowId} from "@mui/x-data-grid";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import {useTheme} from "@mui/material/styles";
import {useSnackbar} from "notistack";
import {IPoolToken} from "../../../redux/interface/Setup/IPoolToken";
import CustomPagination from "@UI/CustomPagination/CustomPagination";
import CustomToolbar from "@UI/CustomToolbar/CustomToolbar";
import {networkAPI} from "@RTK/Setup/network.service";
import CustomNoRowsOverlay from "@UI/CustomNoRowsOverlay/CustomNoRowsOverlay";
import useMediaQuery from "@mui/material/useMediaQuery";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import useLocalStorage from "usehooks-ts/dist/esm/useLocalStorage/useLocalStorage";
import TransitionAlerts from "@UI/TransitionAlerts/TransitionAlerts";
import {useHandlerMessage} from "../../../hooks/useHandlerMessage";
import {useErrorHandler} from "../../../hooks/useErrorHandler";

const PoolToken = () => {
  const matches = useMediaQuery(MIN_WIDTH);
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectId, setSelectId] = useLocalStorage<number>("selectValueId", 1);
  const { data: network, refetch } = networkAPI.useFetchNetworksSelectQuery();
  const [data, setData] = useState<IPoolToken | any>({
    poolTokens: [],
    pools: [],
    tokens: []
  });
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: poolTokensData,
    isLoading: isLoadingFetch,
    isSuccess: isSuccessPoolTokens,
    refetch: refetchPoolTokens,
    isError: poolTokensDataIsError,
    error: poolTokensDataError
  } = poolTokenAPI.useFetchAllPoolTokenQuery(
    { id: selectId },
    { refetchOnFocus: true }
  );
  const [check, { isLoading: isLoadingChecked }] =
    poolTokenAPI.useCheckPoolMutation();
  const [update, { data: updateData }] =
    poolTokenAPI.useUpdatePoolTokenMutation();

  useHandlerMessage(updateData);
  useErrorHandler(poolTokensDataError);

  useEffect(() => {
    if (poolTokensData) {
      setData(poolTokensData.data);
    }
    setTimeout(() => {
      setIsLoading(isLoadingFetch);
    }, 500);
  }, [poolTokensData]);

  useEffect(() => {
    refetchPoolTokens();
    refetch();
  }, [refetchPoolTokens]);

  const handleSubmit = (updateObj: any) => {
    update({
      id: updateObj?.id,
      enabled: !updateObj.enabled
    });
    setIsLoading((prevState) => !prevState);
  };

  const columns: GridColumns = useMemo(() => {
    const columnsHead: GridColumns = [];
    if (isSuccessPoolTokens) {
      columnsHead.push({
        field: `symbol`,
        width: 120,
        filterable: false,
        headerName: "Token",
        align: "center",
        sortable: false,
        disableColumnMenu: true,
        renderHeader: () => <GridSotBtn width={"100vh"} headerName={"token"} />
      });
      for (let i = 0; i < data.pools.length; i++) {
        columnsHead.push({
          field: `${data.pools[i].id}`,
          minWidth: 155,
          flex: 1,
          headerName: `${data.pools[i].name}`,
          filterable: false,
          sortable: false,
          type: "boolean",
          disableColumnMenu: true,
          renderCell: (params) => (
              data.poolTokens && (
                <Checkbox
                  sx={{
                    "&.Mui-disabled": {
                      color: "#66bb6a"
                    }
                  }}
                  onClick={() =>
                    handleSubmit(
                      data.poolTokens.find(
                        (i: { pool: { id: { toString: () => string; }; }; token: { id: GridRowId; }; }) =>
                          i.pool.id.toString() === params.field &&
                          i.token.id === params.id
                      )
                    )
                  }
                  color={"success"}
                  disabled={true}
                  checked={
                    data.poolTokens.find(
                      (i: { pool: { id: { toString: () => string; }; }; token: { id: GridRowId; }; }) =>
                        i.pool.id.toString() === params.field &&
                        i.token.id === params.id
                    )?.enabled
                  }
                />
              )
            ),
          renderHeader: () => (
            <GridSotBtn
              isStringTransform={true}
              width={"100vh"}
              headerName={data.pools[i].name}
            />
          )
        });
      }
    }
    return columnsHead;
  }, [poolTokensData, data]);


  function checkHandler() {
    check({
      id: selectId
    });
  }

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
          Pool Token
        </Typography>
      </Box>
      {poolTokensDataIsError ? (
        <TransitionAlerts
          isOpen={poolTokensDataIsError}
          content={errorMessage}
        />
      ) : (
        <>
          {data.pools.length || !isSuccessPoolTokens ? (
            data.tokens.length || !isSuccessPoolTokens ? (
              <LayoutTable sx={{ height: "80vh" }}>
                <DataGrid
                  showCellRightBorder={true}
                  showColumnRightBorder={true}
                  getRowId={(row) => row.id}
                  loading={isLoading || isLoadingChecked}
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
                    ".MuiDataGrid-booleanCell[data-value=\"false\"]": {
                      color: "rgba(234,5,5,0.98)"
                    },
                    ".MuiDataGrid-booleanCell[data-value=\"true\"]": {
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
                  rows={data.tokens}
                />
              </LayoutTable>
            ) : (
              <TransitionAlerts isOpen={true} content={"No active tokens"} />
            )
          ) : (
            <TransitionAlerts isOpen={true} content={"No active pools"} />
          )}
        </>
      )}
    </>
  );
};

export default PoolToken;
