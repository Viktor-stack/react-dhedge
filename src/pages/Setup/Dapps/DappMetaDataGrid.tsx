import React, { useMemo } from "react";
import { GridColumns } from "@mui/x-data-grid";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import {IDapp} from "../../../redux/interface/Setup/IDapp";
import ActionsButtonTable from "@UI/ActionButtonTable/ActionsButtonTable";

export interface DappMetaDataGridProps {
  handleOpenModal: () => void;
  handleOpenDrawer: () => void;
  isSuccess: boolean;
}

const DappMetaDataGrid = ({
  handleOpenDrawer,
  handleOpenModal,
  isSuccess
}: DappMetaDataGridProps) => {
  const columns: GridColumns<IDapp> = useMemo(() => {
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
      },
      {
        field: "minSlippage",
        flex: 1,
        minWidth: 100,
        width: 200,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        sortable: false,
        renderHeader: () => <GridSotBtn width={"100vh"} headerName={"minSlippage"} />
      },
      {
        field: "maxSlippage",
        flex: 1,
        minWidth: 100,
        width: 200,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        sortable: false,
        renderHeader: () => <GridSotBtn width={"100vh"} headerName={"maxSlippage"} />
      },
      {
        field: "stepSlippage",
        flex: 1,
        minWidth: 100,
        width: 200,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        sortable: false,
        renderHeader: () => <GridSotBtn width={"100vh"} headerName={"stepSlippage"} />
      },
      {
        field: "actions",
        type: "actions",
        width: 150,
        minWidth: 90,
        align: "center",
        renderCell: (params) => (
            <ActionsButtonTable
                {...{ params, handleOpenModal, handleOpenDrawer }}
            />
        )
      }

    ];
  }, [isSuccess]);
  return {
    columns
  };
};

export default DappMetaDataGrid;
