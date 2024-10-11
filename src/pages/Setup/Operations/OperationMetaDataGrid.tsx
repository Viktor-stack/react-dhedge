import { GridColumns } from "@mui/x-data-grid";
import { useMemo } from "react";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import { IOperation } from "../../../redux/interface/Setup/IOperation";

export interface OperationMetaDataGridProps {
  handleOpenModal: () => void;
  handleOpenDrawer: () => void;
  isSuccess: boolean;
}

const OperationMetaDataGrid = ({
  handleOpenDrawer,
  handleOpenModal,
  isSuccess
}: OperationMetaDataGridProps) => {
  const columns: GridColumns<IOperation> = useMemo(() => {
    return [
      {
        field: "id",
        width: 60,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        resizable: false,
        sortable: false,
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
        width: 320,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        sortable: false,
        renderHeader: () => <GridSotBtn width={"100vh"} headerName={"name"} />
      },
      // {
      //   field: "category",
      //   width: 120,
      //   flex: 1,
      //   filterable: false,
      //   align: "center",
      //   disableColumnMenu: true,
      //   sortable: false,
      //   renderCell: (params) => {
      //     return <div>{params.row.category.name}</div>;
      //   },
      //   renderHeader: () => (
      //     <GridSotBtn width={"100vh"} headerName={"category"} />
      //   )
      // }
    ];
  }, [isSuccess]);

  return {
    columns
  };
};

export default OperationMetaDataGrid;
