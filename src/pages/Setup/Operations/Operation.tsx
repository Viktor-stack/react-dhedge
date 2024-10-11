import React, { useEffect, useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import { LayoutTable } from "@UI/MyTableContains/MyTable/styles/styles";
// import { DataGrid } from "@mui/x-data-grid/DataGrid";
// import CustomToolbar from "@UI/CustomToolbar/CustomToolbar";
// import CustomPagination from "@UI/CustomPagination/CustomPagination";
// import LinearProgress from "@mui/material/LinearProgress";
// import CustomNoRowsOverlay from "@UI/CustomNoRowsOverlay/CustomNoRowsOverlay";
// import ModalContainer from "@UI/ModalContainer/ModalContainer";
// import UiForm from "@UI/UiForm/UiForm";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MIN_WIDTH } from "../../../shared/configMedia/config";
import OperationMetaDataGrid, {
  OperationMetaDataGridProps
} from "./OperationMetaDataGrid";
import { operationAPI } from "@RTK/Setup/operation.service";
import { useTheme } from "@mui/material/styles";
import {DataGridInner} from "@UI/DataInner/DataInner";
import {IOperation} from "../../../redux/interface/Setup/IOperation";
import {IMarketCategory} from "../../../redux/interface/Setup/IMarketCategory";

const Operation = () => {
  const theme = useTheme();
  const matches = useMediaQuery(MIN_WIDTH);
  const [open, setOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<IOperation[]>([]);
  const [titleForm, setTitleForm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [updateObj, setUpdateObj] = useState<IOperation>({
    id: 0,
    key: "",
    name: "",
    marketCategories: []
  });
  const {
    data: operationData,
    isSuccess,
    isError,
    refetch,
    error
  } = operationAPI.useFetchAllOperationQuery();

  useEffect(() => {
    if (operationData) {
      setRows(operationData.data);
      // setTotalCount(data?.data.totalCount)
      setIsLoading(!isSuccess);
    }
  }, [operationData]);
  const handleOpenDrawer = (open: boolean, updateObj: any, title: string) => {
    // setChildArr(updateObj);
    // setOpenChildDowers(open);
    // setTitle(title);
  };
  const handleOpenModal = (
    open: boolean,
    updateObj: any,
    titleForm: string
  ) => {
    setUpdateObj(updateObj);
    setTitleForm(titleForm);
    setOpen(open);
  };
  const createHandler = () => {};
  const { columns } = OperationMetaDataGrid({
    handleOpenDrawer,
    handleOpenModal,
    isSuccess
  } as OperationMetaDataGridProps);
  const handleSubmit = (data: any) => {};
  const initialState = useMemo(
    () => ({
      columns: {
        columnVisibilityModel: {
          id: matches,
          key: matches,
          name: matches
        }
      }
    }),
    [matches]
  );
  return (
    <>
      <Box
        sx={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "5px",
          mb: "5px"
        }}>
        <Typography textAlign={"center"} fontWeight="bold" variant="h4">
          Operations
        </Typography>
      </Box>
      <LayoutTable sx={{ height: "80vh" }}>
        <DataGridInner
          columns={columns}
          rows={rows}
          isLoading={isLoading}
          initialState={initialState}
        />
      </LayoutTable>
    </>
  );
};

export default Operation;
