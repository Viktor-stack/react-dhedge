import CustomNoRowsOverlay from "@UI/CustomNoRowsOverlay/CustomNoRowsOverlay";
import LinearProgress from "@mui/material/LinearProgress";
import CustomPagination from "@UI/CustomPagination/CustomPagination";
import CustomToolbar from "@UI/CustomToolbar/CustomToolbar";
import {DataGrid} from "@mui/x-data-grid";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {MIN_WIDTH} from "../../../shared/configMedia/config";
import {FC} from "react";

interface IDataInner {
  columns: any;
  rows: any
  isLoading: boolean
  initialState?: any;
}

export const DataGridInner: FC<IDataInner> = (
  {initialState = {},
    columns = {},
    rows = {},
    isLoading
  }) => {
  const matches = useMediaQuery(MIN_WIDTH)
  const theme = useTheme()
  return (
    <DataGrid
      showCellRightBorder={true}
      showColumnRightBorder={true}
      initialState={initialState}
      columns={columns}
      rows={rows}
      getRowId={(row) => row.id}
      components={{
        Toolbar: CustomToolbar,
        Pagination: CustomPagination,
        LoadingOverlay: LinearProgress,
        NoRowsOverlay: CustomNoRowsOverlay
      }}
      filterMode={"server"}
      density={matches ? "compact" : "standard"}
      loading={isLoading}
      sx={{
        backgroundColor: `${theme.palette.background.paper}`,
        borderRadius: "15px",
        ".MuiDataGrid-cellContent": {
          fontSize: "14px"
        },
        ".MuiDataGrid-cell:focus": {
          outline: "solid #00ab55 1px"
        },
        ".MuiCircularProgress-root": {
          color: `${theme.palette.text.primary}`
        },
        '.MuiDataGrid-booleanCell[data-value="false"]': {
          color: "rgba(234,5,5,0.98)"
        },
        '.MuiDataGrid-booleanCell[data-value="true"]': {
          color: "rgb(2,168,68)",
          ".MuiSvgIcon-root": {
            width: "30px",
            height: "30px"
          }
        },
        ".MuiDataGrid-footerContainer": {
          justifyContent: "center"
        }
      }}
    />
  )
}

