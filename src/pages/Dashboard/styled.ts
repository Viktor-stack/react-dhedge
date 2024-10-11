import {styled} from "@mui/material/styles";
import {Accordion, SxProps} from "@mui/material";
import Box from "@mui/material/Box";

export const AccordionInnerStyle: SxProps = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  width: "auto",
  height: "100%",
  flex: "1 0 auto",
  margin: "10px 0px",
  marginBottom: "20px!important",
  borderRadius: "10px!important",
  // backgroundColor:
  //   theme.palette.mode === "dark"
  //     ? theme.palette.background.paper
  //     : "rgba(123,123,123,0.24)",
  transition: "all 300ms",
  ":before": {
    display: "none"
  }
}

export const BoxInner = styled(Box)(({theme}) => ({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
  borderRadius: "10px",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "1500",
  backgroundColor: "rgba(0,0,0,0.49)"
}))