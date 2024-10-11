import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AppBarTypes } from "../../types/AppBarTypes";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { AppBar } from "./style";
import { ReactComponent as BurgerMenu } from "../../assets/Dashboard/shape.svg";
import { MIN_WIDTH } from "../../shared/configMedia/config";
import NetworkActiveWidgetContains from "../UI/UIWidget/NetworkActiveWidget/NetworkActiveWidgetContains";
import Button from "@mui/material/Button/Button";
import { tradingAPI } from "@RTK/Trading/trading.service";
import { useLocalStorage } from "usehooks-ts";
import { IStartDhedge } from "../../redux/interface/Trading/IStartDhedge";
import { useHandlerMessage } from "../../hooks/useHandlerMessage";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import UiSelect from "@UI/FormContainer/Select/UiSelect";
import { networkAPI } from "@RTK/Setup/network.service";

const MyAppBar: FC<AppBarTypes> = ({ open, colorMode, handleDrawer }) => {
  const theme = useTheme();
  const matches = useMediaQuery(MIN_WIDTH);
  const [selectId, setSelectId] = useLocalStorage<number>("selectValueId", 1);
   const { data: network, refetch } = networkAPI.useFetchNetworksSelectQuery();
  // const {data} = settingsAPI.useFetchSettingsValuesQuery()
  const [startDhedge, { data: resDate, isLoading: startIsLoading }] = tradingAPI.useStartDhedgeMutation();
  const [syncPool, { data: resSyncPool, isLoading: syncIsLoading }] = tradingAPI.useSyncPoolMutation();
  const [data, setData] = useLocalStorage("isStarted", {
    id: Number(localStorage.getItem("selectValueId")),
    start: true
  });
  useEffect(() => {
    if (resDate?.approved) {
      setData({
        id: Number(localStorage.getItem("selectValueId")),
        start: !resDate.data
      });
    }
  }, [resDate]);
  useHandlerMessage(resDate);
  const startHandler = (data: IStartDhedge) => {
    startDhedge(data);
  };
  const selectHandler = (id: number) => {
    setSelectId(id);
  };
  return (
    <AppBar
      sx={
        !matches
          ? {
            width: "100%"
          }
          : null
      }
      position="fixed"
      open={open}>
      <Toolbar
        sx={{
          backdropFilter: "blur(6px)",
          background: `${theme.palette.background.default}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "none"
        }}>
        {!matches && (
          <Typography component="div">
            <IconButton
              sx={{
                width: "40px",
                height: "40px"
              }}
              onClick={handleDrawer}>
              <BurgerMenu fill={theme.palette.text.primary} />
            </IconButton>
          </Typography>
        )}
        <Box />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
          }}>
          {!data.start && (
            <LoadingButton
              color={"success"}
              size={"small"}
              sx={{
                marginRight: "10px",
                width: "105px"
              }}
              onClick={() => syncPool({ networkId: Number(localStorage.getItem("selectValueId")) })}
              loading={syncIsLoading}
              loadingIndicator="Loading…"
              variant="contained"
            >
              <span>Sync</span>
            </LoadingButton>)
          }
          <LoadingButton
            color={data.start ? "success" : "error"}
            size={"small"}
            sx={{
              marginRight: "10px",
              width: "105px"
            }}
            onClick={() => startHandler(data)}
            loading={startIsLoading}
            loadingIndicator="Loading…"
            variant="contained"
          >
            <span>{data.start ? "Start Dhedge" : "Stop Dhedge"}</span>
          </LoadingButton>
          <Box
            sx={{
              paddingTop: '7px',
              paddingRight: '5px',
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
            <UiSelect
              isDisabled={!data.start}
              selectNode={network}
              field={"network"}
              handleInput={(filed, value) => selectHandler(value.id)}
              data={selectId}
              setDirty={() => {
              }}
              titleForm={""}
            />
          </Box>
          {/*<NetworkActiveWidgetContains />*/}
          <Typography component="div">
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
