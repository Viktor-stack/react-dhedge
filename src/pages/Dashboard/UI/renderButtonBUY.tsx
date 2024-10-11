import {ITradingPoolDetails} from "../../../redux/interface/Trading/ITrading";
import {Signals} from "../../../redux/interface/Trading/Signals";
import Button from "@mui/material/Button";
import {checkColor, handleButton} from "./index";
import {Theme} from "@mui/material/styles";
import React from "react";
import Box from "@mui/material/Box";

export const renderButtonBUY = (
  itTrading: ITradingPoolDetails,
  signal: any,
  index: number,
  theme: Theme,
  handlerDialogModal: (res: any) => void
) => {
  if (
    signal.key === Signals.BUY_LONG ||
    signal.key === Signals.BUY_SHORT ||
    signal.key === Signals.BUY_SPOT

  ) {
    return (
      <Box sx={{
        display: "inline-block",
        alignItems: "center"
      }}>
        <Button
          onClick={() => handleButton(itTrading, signal, handlerDialogModal)}
          key={index}
          color={checkColor(signal.key.toString().split('_'))}
          sx={{
            width: "152px",
            margin: "5px",
            fontWeight: "bold",
            fontSize: "12px"
          }}
          variant={"contained"}>
          {signal.key}
        </Button>
      </Box>
    );
  }
};
