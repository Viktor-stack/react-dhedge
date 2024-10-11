import { FC, useMemo } from "react";
import Box from "@mui/material/Box";
import { Close } from "@mui/icons-material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import CustomToolbar from "@UI/CustomToolbar/CustomToolbar";
import CustomPagination from "@UI/CustomPagination/CustomPagination";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import { MIN_WIDTH } from "../../../shared/configMedia/config";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

interface IMyDrawerProps {
  open: boolean;
  arr: any[];
  title: string;
  configFieldsVisible?: any;
  onCloseDrawer: (open: boolean, arr: any, title: string) => void;
}

const MyDrawer: FC<IMyDrawerProps> = ({
  open,
  arr = [],
  onCloseDrawer,
  title = "",
  configFieldsVisible = {}
}) => {
  const matches = useMediaQuery(MIN_WIDTH);
  const theme = useTheme();
  const columns: GridColumns = useMemo(() => {
    const columns: GridColumns = [];
    if (arr.length) {
      for (const key in arr[0]) {
        if (configFieldsVisible[key]) continue;
        if (key === "id" || key === "symbol") {
          columns.push({
            field: key,
            width: 90,
            type: typeof arr[0][key],
            align: "center",
            filterable: false,
            disableColumnMenu: true,
            sortable: false,
            renderHeader: () => <GridSotBtn width={"100%"} headerName={key} />
          });
        }
        if (key !== "id" && key !== "symbol") {
          debugger;
          columns.push({
            field: key,
            flex: 1,
            width: 200,
            type:
              key === "createdAt" || key === "updatedAt"
                ? "dateTime"
                : typeof arr[0][key],
            editable: true,
            filterable: false,
            disableColumnMenu: true,
            sortable: false,
            renderHeader: () => <GridSotBtn width={"100%"} headerName={key} />
          });
        }
      }
    }
    return columns;
  }, [arr]);
  const initialState = useMemo(
    () => ({
      columns: {
        columnVisibilityModel: {
          id: matches,
          chainId: matches,
          scanNodeId: matches,
          key: matches,
          poolTokens: false,
          network: false,
          networkEnabledLocked: false
        }
      }
    }),
    [matches]
  );
  return (
    <Drawer
      sx={{
        borderRadius: 25
      }}
      anchor={"bottom"}
      open={open}
      hideBackdrop={false}
      onClose={(event, reason) => onCloseDrawer(false, [], "")}>
      <Box
        sx={{
          backgroundColor: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 10px",
          width: "100",
          height: 40
        }}>
        <Typography variant={"h5"}>{title}</Typography>
        <IconButton
          color={"error"}
          size={"small"}
          onClick={() => onCloseDrawer(false, [], "")}>
          <Close />
        </IconButton>
      </Box>
      <Box
        sx={{
          height: "400px",
          padding: "20px"
        }}>
        <DataGrid
          showCellRightBorder={true}
          showColumnRightBorder={true}
          initialState={initialState}
          columns={columns}
          rows={arr}
          getRowId={(row) => row.id}
          components={{
            Toolbar: CustomToolbar,
            Pagination: CustomPagination
          }}
          density={matches ? "compact" : "standard"}
          sx={{
            backgroundColor: `${theme.palette.background.paper}`,
            borderRadius: "15px",
            ".MuiDataGrid-cellContent": {
              fontSize: "14px"
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
      </Box>
    </Drawer>
  );
};

export default MyDrawer;
