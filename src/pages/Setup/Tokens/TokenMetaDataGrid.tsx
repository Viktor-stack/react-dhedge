import React, {useMemo} from "react";
import {GridColumns} from "@mui/x-data-grid";
import {IToken} from "../../../redux/interface/Setup/IToken";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import ActionsButtonTable from "@UI/ActionButtonTable/ActionsButtonTable";
// import {INetwork} from "../../../redux/interface/Setup/INetwork";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";

export interface TokenMetaDataGridProps {
  handleOpenModal: () => void;
  handleOpenDrawer: () => void;
  isSuccess: boolean;
}

const TokenMetaDataGrid = ({
                             handleOpenModal,
                             handleOpenDrawer,
                             isSuccess
                           }: TokenMetaDataGridProps) => {
  const theme = useTheme();
  const columns: GridColumns<IToken> = useMemo(
    () => [
      {
        field: "id",
        maxWidth: 60,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        resizable: false,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn flex={1} width={"100vh"} headerName={"id"}/>
        )
      },
      {
        field: "symbol",
        maxWidth: 120,
        align: "center",
        flex: 1,
        disableColumnMenu: true,
        filterable: false,
        resizable: false,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn flex={1} width={"100vh"} headerName={"symbol"}/>
        )
      },
      // {
      //   field: "name",
      //   maxWidth: 150,
      //   flex: 1,
      //   resizable: false,
      //   filterable: false,
      //   align: "center",
      //   disableColumnMenu: true,
      //   sortable: false,
      //   renderHeader: () => (
      //     <GridSotBtn flex={1} width={"100vh"} headerName={"name"}/>
      //   )
      // },
      {
        field: "network",
        maxWidth: 90,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        resizable: false,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn flex={1} width={"100vh"} headerName={"network"}/>
        ),
        renderCell: (params) => {
          if (params.row.network) return <div>{params.row.network.name}</div>;
        }
      },
      {
        field: "category",
        maxWidth: 90,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        resizable: false,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn flex={1} width={"100vh"} headerName={"category"}/>
        ),
        renderCell: (params) => {
          const colorHandler = (name: string) => {
            switch (name) {
              case "Stable":
                return theme.palette.info.main;
              case "Spot":
                return theme.palette.success.dark;
              case "Long":
                return theme.palette.success.light;
              case "Short":
                return theme.palette.error.light;
            }
          };
          if (params.row.category)
            return (
              <Typography
                fontWeight={"bold"}
                color={colorHandler(params.row.category.name)}>
                {params.row.category.name.toUpperCase()}
              </Typography>
            );
        }
      },
      {
        field: "wrappedToken",
        maxWidth: 120,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        resizable: false,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn flex={1} width={"100vh"} headerName={"wrapped"}/>
        ),
        renderCell: (params) => {
          if (params.row.wrappedToken) return <div>{params.row.wrappedToken.symbol}</div>;
        }
      },
      {
        field: "maxTxAmountBuy",
        maxWidth: 160,
        flex: 1,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        resizable: false,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn flex={1} width={"100vh"} headerName={"maxTxAmountBuy"}/>
        )
      },
      {
        field: "maxTxAmountSell",
        maxWidth: 160,
        flex: 1,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        resizable: false,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn flex={1} width={"100vh"} headerName={"maxTxAmountSell"}/>
        )
      },
      {
        field: "multiFactor",
        maxWidth: 120,
        flex: 1,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        resizable: false,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn flex={1} width={"100vh"} headerName={"multiFactor"}/>
        )
      },
      {
        field: "enabled",
        width: 90,
        align: "center",
        type: "boolean",
        disableColumnMenu: true,
        filterable: false,
        resizable: false,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn flex={1} width={"100vh"} headerName={"enabled"}/>
        )
      },
      {
        field: "address",
        flex: 1,
        align: "center",
        disableColumnMenu: true,
        filterable: false,
        resizable: false,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn flex={1} width={"100vh"} headerName={"address"}/>
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
            {...{params, handleOpenModal, handleOpenDrawer}}
          />
        )
      }
    ],
    [isSuccess]
  );
  return {
    columns
  };
};

export default TokenMetaDataGrid;
