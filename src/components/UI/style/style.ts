import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
const UiWidget = styled(Box)(({ theme, sx }) => ({
  width: "100%",
  height: "156px",
  backgroundColor: `${theme.palette.background.paper}`,
  borderRadius: "16px",
  padding: "16px 16px 16px 24px",
  boxShadow:
    "rgb(0 0 0 / 20%) 0px 0px 2px 0px, rgb(0 0 0 / 12%) 0px 12px 24px -4px",
  display: "flex",
  justifyContent: "space-between",
  sx: {
    ...sx
  }
}));
export default UiWidget;
