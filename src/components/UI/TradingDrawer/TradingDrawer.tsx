import React, { FC, ReactNode } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import { Close } from "@mui/icons-material";
import { ITrading } from "../../../redux/interface/Trading/ITrading";
// import { Divider } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

interface TradingDrawerProps {
  data: ITrading;
  title: string;
  open: boolean;
  onCloseDrawer: (open: boolean, updateObj: any, title: string) => void;
  children: ReactNode;
}

const TradingDrawer: FC<TradingDrawerProps> = ({
  data,
  onCloseDrawer,
  open,
  children
}) => {
  const theme = useTheme();
  return (
    <Drawer
      anchor={"right"}
      open={open}
      hideBackdrop={false}
      onClose={() => onCloseDrawer(false, null, "")}>
      <Box
        sx={{
          padding: "10px",
          paddingTop: "40px",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : "#cfcfcf"
        }}>
        {children}
      </Box>
    </Drawer>
  );
};

export default TradingDrawer;
