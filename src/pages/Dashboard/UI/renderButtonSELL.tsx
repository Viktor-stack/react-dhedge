import {Signals} from "../../../redux/interface/Trading/Signals";
import React from "react";
import Button from "@mui/material/Button";
import {checkColor, handleButton} from "./index";
import {Theme} from "@mui/material/styles";

export const renderButtonSELL = (
  signal: any,
  index: number,
  theme: Theme,
  handlerDialogModal: (res: any) => void
) => {
  if (
    signal.key === Signals.SELL_LONG ||
    signal.key === Signals.SELL_SHORT  ||
    signal.key === Signals.SELL_SPOT
  ) {
    return (
      <Button
        onClick={() => handleButton(signal, handlerDialogModal)}
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
    );
  }
};
