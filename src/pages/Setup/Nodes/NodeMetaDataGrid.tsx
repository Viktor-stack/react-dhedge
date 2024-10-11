import React, { useMemo } from "react";
import { GridColumns } from "@mui/x-data-grid";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import ActionsButtonTable from "@UI/ActionButtonTable/ActionsButtonTable";
import { INode } from "../../../redux/interface/Setup/INode";
import { INetwork } from "../../../redux/interface/Setup/INetwork";

export interface NodeMetaDataGridProps {
  handleOpenModal: () => void;
  handleOpenDrawer: () => void;
  isSuccess: boolean;
}

const NodeMetaDataGrid = ({
  handleOpenDrawer,
  handleOpenModal,
  isSuccess
}: NodeMetaDataGridProps) => {
  const columns: GridColumns<INode> = useMemo(() => {
    return [
      {
        field: "id",
        maxWidth: 50,
        resizable: false,
        filterable: false,
        align: "center",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => <GridSotBtn width={"70px"} headerName={"id"} />
      },
      {
        field: "name",
        flex: 1,
        width: 320,
        minWidth: 100,
        align: "center",
        filterable: false,
        sortable: false,
        disableColumnMenu: true,
        renderHeader: () => <GridSotBtn width={"100vh"} headerName={"name"} />
      },
      {
        field: "network",
        flex: 1,
        maxWidth: 100,
        width: 350,
        align: "center",
        filterable: false,
        disableColumnMenu: true,
        sortable: false,
        renderCell: (params) => {
          let network = params.row.network as INetwork;
          return <div>{network.name}</div>;
        },
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"network"} />
        )
      },
      {
        field: "active",
        width: 90,
        type: "boolean",
        filterable: false,
        align: "center",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => <GridSotBtn width={"100vh"} headerName={"active"} />
      },
      {
        field: "endpoint",
        // flex: 1,
        minWidth: 100,
        width: 450,
        align: "center",
        filterable: false,
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"endpoint"} />
        )
      },
      {
        field: "createdAt",
        flex: 1,
        minWidth: 100,
        width: 300,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"createdAt"} />
        )
      },
      {
        field: "updatedAt",
        flex: 1,
        minWidth: 100,
        width: 300,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"updatedAt"} />
        )
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

  return { columns };
};

export default NodeMetaDataGrid;
