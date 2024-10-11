import { GridColumns } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import { ICategory } from "../../../redux/interface/Setup/ICategory";

export interface CategoryMetaDataGridProps {
  handleOpenModal: () => void;
  handleOpenDrawer: () => void;
  isSuccess: boolean;
}

const CategoryMetaDataGrid = ({
  handleOpenDrawer,
  handleOpenModal,
  isSuccess
}: CategoryMetaDataGridProps) => {
  const columns: GridColumns<ICategory> = useMemo(() => {
    return [
      {
        field: "id",
        width: 60,
        resizable: false,
        align: "center",
        filterable: false,
        sortable: false,
        disableColumnMenu: true,
        renderHeader: () => <GridSotBtn width={"70px"} headerName={"id"} />
      },
      {
        field: "key",
        flex: 1,
        minWidth: 100,
        width: 350,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        sortable: false,
        renderHeader: () => <GridSotBtn width={"100vh"} headerName={"key"} />
      },
      {
        field: "name",
        flex: 1,
        minWidth: 100,
        width: 350,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        sortable: false,
        renderHeader: () => <GridSotBtn width={"100vh"} headerName={"name"} />
      }
    ];
  }, [isSuccess]);
  return {
    columns
  };
};

export default CategoryMetaDataGrid;
