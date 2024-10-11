import React, { useMemo } from "react";
import { GridColumns } from "@mui/x-data-grid";
import { INetwork } from "../../../redux/interface/Setup/INetwork";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import ActionsButtonTable from "@UI/ActionButtonTable/ActionsButtonTable";

  export interface DiscoveryMetaDataGridProps {
  handleOpenModal: () => void;
  handleOpenDrawer: () => void;
  isSuccess: boolean;
}

const DiscoveryMetaDataGrid = ({
  handleOpenDrawer,
  handleOpenModal,
  isSuccess
}: DiscoveryMetaDataGridProps) => {
  const columns: GridColumns<INetwork> = useMemo(() => {
    // const sortHandler = (value: SortModel) => {
    //     handleSortModelChange(value)
    //     setIsLoading(isSuccess)
    // };
    // const handlerReset = (isReset: boolean) => {
    //     resetSortHandler(isReset)
    //     setIsLoading(!isSuccess)
    // }
    return [
      {
        field: "id",
        width: 90,
        resizable: false,
        filterable: false,
        align: "center",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"70px"} headerName={"id"} />
          // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
        )
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
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"name"} />
          // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
        )
      },
      {
        field: "pid",
        flex: 1,
        minWidth: 100,
        align: "center",
        width: 350,
        filterable: false,
        disableColumnMenu: true,
        sortable: false,
        // renderCell: (params) => {
        //   let swapNodeId = params.row.swapNodeDto as INode;
        //   return (
        //     <div>{swapNodeId.name}</div>
        //   );
        // },
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"pid"} />
        )
        // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
      },
      {
        field: "url",
        width: 120,
        flex: 1,
        filterable: false,
        align: "center",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"url"} />
        )
        // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
      },
      {
        field: "status",
        flex: 1,
        align: "center",
        filterable: false,
        type: "string",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"status"} />
        )
        // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)} flex={1}
      },{
        field: "confirmedAt",
        flex: 1,
        filterable: false,
        type: "string",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"confirmedAt"} />
        )
        // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)} flex={1}
      },{
        field: "createdAt",
        flex: 1,
        filterable: false,
        type: "string",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"createdAt"} />
        )
        // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)} flex={1}
      },{
        field: "updatedAt",
        flex: 1,
        filterable: false,
        type: "string",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"updatedAt"} />
        )
        // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)} flex={1}
      },
    ];
  }, [isSuccess]);

  return { columns };
};

export default DiscoveryMetaDataGrid;
