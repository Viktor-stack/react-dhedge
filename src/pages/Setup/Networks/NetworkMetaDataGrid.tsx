import React, { useMemo } from "react";
import { GridColumns } from "@mui/x-data-grid";
import { INetwork } from "../../../redux/interface/Setup/INetwork";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import ActionsButtonTable from "@UI/ActionButtonTable/ActionsButtonTable";

export interface NetworkMetaDataGridProps {
  handleOpenModal: () => void;
  handleOpenDrawer: () => void;
  isSuccess: boolean;
}

const NetworkMetaDataGrid = ({
  handleOpenDrawer,
  handleOpenModal,
  isSuccess
}: NetworkMetaDataGridProps) => {
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
        width: 60,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        resizable: false,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"70px"} headerName={"id"} />
          // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
        )
      },
      {
        field: "chainId",
        width: 120,
        flex: 1,
        filterable: false,
        align: "center",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"chainId"} />
        )
        // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
      },
      {
        field: "key",
        flex: 1,
        width: 320,
        minWidth: 100,
        align: "center",
        filterable: false,
        sortable: false,
        disableColumnMenu: true,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"key"} />
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
        field: "currency",
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
          <GridSotBtn width={"100vh"} headerName={"currency"} />
        )
        // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
      },
      {
        field: "active",
        flex: 1,
        filterable: false,
        type: "boolean",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"active"} />
        )
        // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)} flex={1}
      },
      {
        field: "actions",
        type: "actions",
        width: 150,
        minWidth: 90,
        align: "center",
        // renderHeader: () => {
        //   return (
        //     <>
        //       {!isArrLength && <ResetSorting isResetHandler={handlerReset} isArrLength={isArrLength} />}
        //     </>
        //   );
        // },
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

export default NetworkMetaDataGrid;
