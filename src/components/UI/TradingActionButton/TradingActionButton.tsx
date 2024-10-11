import React, { FC } from "react";
import Tooltip from "@mui/material/Tooltip";
import PoolIcon from "@mui/icons-material/Pool";
import Button from "@mui/material/Button";

interface TradingActionButtonProps {
  params: any;
  handleOpenDrawer: (open: boolean, updateObj: any, title: string) => void;
}

const TradingActionButton: FC<TradingActionButtonProps> = ({
  handleOpenDrawer,
  params
}) => {
  return (
    <div>
      <Tooltip title="Pool ditails" placement="right">
        <span>
          <Button
            variant={"outlined"}
            color={"warning"}
            onClick={() => handleOpenDrawer(true, params.row, "Pools")}>
            <PoolIcon />
          </Button>
        </span>
      </Tooltip>
    </div>
  );
};
export default TradingActionButton;
