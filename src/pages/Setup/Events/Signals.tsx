import React, { useEffect, useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import { EventMetaDataGrid, EventMetaDataGridProps } from "./SignalsMeataData";
import { eventAPI } from "@RTK/Setup/signals.service";
import TransitionAlerts from "@UI/TransitionAlerts/TransitionAlerts";
import Box from "@mui/material/Box";
import { LayoutTable } from "@UI/MyTableContains/MyTable/styles/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MIN_WIDTH } from "../../../shared/configMedia/config";
// import { DataGrid } from "@mui/x-data-grid";
// import CustomToolbar from "@UI/CustomToolbar/CustomToolbar";
// import CustomPagination from "@UI/CustomPagination/CustomPagination";
// import LinearProgress from "@mui/material/LinearProgress";
// import CustomNoRowsOverlay from "@UI/CustomNoRowsOverlay/CustomNoRowsOverlay";
import useTheme from "@mui/material/styles/useTheme";
import { IVolumes } from "../../../redux/interface/Setup/IVolumes";
import {DataGridInner} from "@UI/DataInner/DataInner";

const Signals = () => {
  const theme = useTheme();
  const matches = useMediaQuery(MIN_WIDTH);
  const [rows, setRows] = useState<IVolumes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: signalsData, isSuccess, isError, error } = eventAPI.useGetAllSignalsQuery();

  useEffect(() => {
    if (signalsData) {
      setRows(signalsData.data);
      setIsLoading(!isSuccess);
    }
  }, [signalsData]);

  const initialState = useMemo(
    () => ({
      columns: {
        columnVisibilityModel: {
          id: matches,
          currency: matches,
          chainId: matches
        }
      }
    }),
    [matches]
  );

  function handleOpenDrawer() {}

  function handleOpenModal() {}

  const { columns } = EventMetaDataGrid({
    handleOpenDrawer,
    handleOpenModal,
    isSuccess
  } as EventMetaDataGridProps);

  return (
    <>
      {isError && (
        <TransitionAlerts isOpen={isError} content={"Server Not found"} />
      )}
      <Box
        sx={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "5px",
          mb: "5px"
        }}>
        <Typography fontWeight={"bold"} fontSize={"medium"}>
          Events
        </Typography>
      </Box>
      <LayoutTable sx={{ height: "80vh" }}>
        <DataGridInner
          initialState={initialState}
          columns={columns}
          rows={rows}
          isLoading={isLoading}
        />
      </LayoutTable>
    </>
  );
};

export default Signals;
