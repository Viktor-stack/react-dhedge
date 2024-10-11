import { FC } from "react";
import TokenIcon from "@mui/icons-material/Token";
import PoolIcon from "@mui/icons-material/Pool";
import { IToken } from "../../../redux/interface/Setup/IToken";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit, Preview } from "@mui/icons-material";

interface ActionsButtonTableProps {
  params: any;
  handleOpenModal: (open: boolean, updateObj: any, titleForm: string) => void;
  handleOpenDrawer: (open: boolean, updateObj: any[], title: string) => void;
  handlerDialogModal?: (deleteObj: any) => void;
  isActiveDeleteBtn?: boolean;
  isActiveTokenBtn?: boolean;
  isDisabled?: boolean;
}

const ActionsButtonTable: FC<ActionsButtonTableProps> = ({
  params,
  handleOpenModal,
  handleOpenDrawer,
  handlerDialogModal = (deleteObj: any) => {},
  isActiveDeleteBtn = false,
  isActiveTokenBtn = false,
  isDisabled = false
}) => {
  return (
    <Box>
      <Tooltip title="View">
        <span>
          <IconButton
            disabled={isDisabled}
            color={"info"}
            onClick={() => handleOpenModal(true, params.row, "View")}>
            <Preview />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Edit">
        <span>
          <IconButton
            disabled={isDisabled}
            color={"success"}
            onClick={() => handleOpenModal(true, params.row, "Edit")}>
            <Edit />
          </IconButton>
        </span>
      </Tooltip>
      {isActiveDeleteBtn && (
        <Tooltip title="Delete">
          <span>
            <IconButton
              disabled={params.row.enabled}
              color={"error"}
              onClick={() => handlerDialogModal(params.row,)}>
              <Delete />
            </IconButton>
          </span>
        </Tooltip>
      )}
      {isActiveTokenBtn && (
        <Tooltip title="Tokens">
          <span>
            <IconButton
              color={"secondary"}
              onClick={() =>
                handleOpenDrawer(true, params.row.tokens, "Tokens")
              }>
              <TokenIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
      {isActiveTokenBtn && (
        <Tooltip title="Pool">
          <span>
            <IconButton
              color={"warning"}
              onClick={() => handleOpenDrawer(true, params.row.pools, "Pools")}>
              <PoolIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Box>
  );
};

export default ActionsButtonTable;
