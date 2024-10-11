import { GridColumns } from "@mui/x-data-grid";
import { useMemo } from "react";
import { IVolumes } from "../../../redux/interface/Setup/IVolumes";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";

export interface EventMetaDataGridProps {
  isSuccess: boolean;
}

export const EventMetaDataGrid = ({ isSuccess }: EventMetaDataGridProps) => {
  const columns: GridColumns<IVolumes> = useMemo(() => {
    return [
      {
        field: "id",
        width: 60,
        resizable: false,
        filterable: false,
        align: "center",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => <GridSotBtn width={"70px"} headerName={"id"} />
      },
      {
        field: "alias",
        width: 320,
        resizable: false,
        filterable: false,
        align: "center",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => <GridSotBtn width={"100vh"} headerName={"alias"} />
      },
      {
        field: "name",
        width: 320,
        resizable: false,
        filterable: false,
        align: "center",
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => <GridSotBtn width={"320px"} headerName={"name"} />
      }
    ];
  }, [isSuccess]);
  return {
    columns
  };
};
