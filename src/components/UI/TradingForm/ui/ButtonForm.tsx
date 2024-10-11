import Box from "@mui/material/Box/Box";
import { Button } from "@mui/material";
import { FC, useContext } from "react";
import { MarketFormProps } from "@UI/TradingForm/MarketForm";
import { WebSocketContext } from "../../../../shared/utils/websocket/WebSocketContext";

const ButtonForm: FC<MarketFormProps> = ({ onOpen }) => {
  const wsContext = useContext(WebSocketContext);
  const cancelHandler = () => {
    wsContext.socket?.emit("market-delete")
    onOpen(false);
  }
  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "15px"
    }}>
      <Button
        onClick={() => {}}
        type={"submit"} sx={{
        fontSize: "20px",
        fontWeight: "bold",
        marginRight: "10px"
      }} fullWidth color={"success"} variant="contained">
        Swap
      </Button>
      <Button
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
          marginLeft: "10px"
        }}
        fullWidth color={"error"}
        variant="contained"
        onClick={cancelHandler}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default ButtonForm;