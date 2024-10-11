import ActionsButtonTable from "@UI/ActionButtonTable/ActionsButtonTable";
import { GridColumns } from "@mui/x-data-grid";
import { ISetting } from "../../../redux/interface/Setup/ISetting";
import { useMemo } from "react";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";

export interface ISettingMetaData {
  handleOpenDrawer: () => void,
  handleOpenModal: () => void,
  isSuccess: boolean
}

const SettingMetaData = ({
                           handleOpenDrawer,
                           handleOpenModal,
                           isSuccess
                         }: ISettingMetaData) => {
  const columns: GridColumns<ISetting> = useMemo(() => {
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
        width: 50,
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
        field: "key",
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
          <GridSotBtn width={"100vh"} headerName={"key"} />
        )
        // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
      },
      {
        field: "description",
        width: 120,
        flex: 1,
        filterable: false,
        align: "center",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"description"} />
        )
        // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
      },
      {
        field: "type",
        width: 50,
        flex: 1,
        filterable: false,
        align: "center",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"type"} />
        )
        // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
      },
      {
        field: "value",
        width: 120,
        flex: 1,
        filterable: false,
        align: "center",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn width={"100vh"} headerName={"value"} />
        )
        // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
      },
      // {
      //   field: "enabled",
      //   flex: 1,
      //   filterable: false,
      //   type: "boolean",
      //   disableColumnMenu: true,
      //   sortable: false,
      //   renderHeader: () => (
      //     <GridSotBtn width={"100vh"} headerName={"enabled"} />
      //   )
      //   // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)} flex={1}
      // },
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

export default SettingMetaData;