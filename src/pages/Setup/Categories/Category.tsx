import React, {useEffect, useMemo, useState} from "react";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import {MIN_WIDTH} from "../../../shared/configMedia/config";
import {categoryAPI} from "@RTK/Setup/category.service";
import CategoryMetaDataGrid, { CategoryMetaDataGridProps } from "./CategoryMetaDataGrid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {LayoutTable} from "@UI/MyTableContains/MyTable/styles/styles";
// import {DataGrid} from "@mui/x-data-grid/DataGrid";
// import CustomToolbar from "@UI/CustomToolbar/CustomToolbar";
// import CustomPagination from "@UI/CustomPagination/CustomPagination";
// import LinearProgress from "@mui/material/LinearProgress";
// import CustomNoRowsOverlay from "@UI/CustomNoRowsOverlay/CustomNoRowsOverlay";
import {ICategory, ICategoryCreate} from "../../../redux/interface/Setup/ICategory";
import {DataGridInner} from "@UI/DataInner/DataInner";

const Category = () => {
  const theme = useTheme();
  const matches = useMediaQuery(MIN_WIDTH);
  const [open, setOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<ICategory[]>([]);
  const [titleForm, setTitleForm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [updateObj, setUpdateObj] = useState<ICategory>({
    id: 0,
    key: "",
    name: "",
    firstMarketCategories: [],
    lastMarketCategories: [],
    tokens: []
  });
  const [create, setCreate] = useState<ICategoryCreate>({
    key: "",
    name: "",
  });
  const {
    data: categoryData,
    refetch,
    error,
    isError,
    isSuccess
  } = categoryAPI.useAllCategoryQuery();

  useEffect(() => {
    if (categoryData) {
      setRows(categoryData.data);
      setIsLoading(!isSuccess);
    }
  }, [categoryData]);
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
  const {columns} = CategoryMetaDataGrid({
    handleOpenDrawer,
    handleOpenModal,
    isSuccess
  } as CategoryMetaDataGridProps);

  const handleSubmit = (data: any) => {
  };

  const initialState = useMemo(
    () => ({
      columns: {
        columnVisibilityModel: {
          id: matches,
          alias: matches,
          type: matches,
          factor: matches,
          createdAt: matches,
          updatedAt: matches
        }
      }
    }),
    [matches]
  );

  const createHandler = () => {
    setOpen(true);
    setCreate(create);
    setTitleForm("Create");
  };

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
          Category
        </Typography>
        <Button
          onClick={createHandler}
          sx={{
            marginRight: "20px",
            height: "25px",
            fontWeight: "bold"
          }}
          color={`success`}
          variant={"contained"}>
          Create
        </Button>
      </Box>
      <LayoutTable sx={{height: "80vh"}}>
        <DataGridInner
          columns={columns}
          rows={rows}
          initialState={initialState}
          isLoading={isLoading}
        />
      </LayoutTable>
    </>
  );
};

export default Category;
