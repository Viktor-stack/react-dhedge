import { FC } from "react";
import { DrawerHeader } from "../AppBar/style";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AppBarTypes } from "../../types/AppBarTypes";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/logo/logodark.png";
import { IconButtonStyled, ImgLogo } from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MIN_WIDTH } from "../../shared/configMedia/config";

const MyDrawerHeader: FC<AppBarTypes> = ({ handleDrawer, open }) => {
  const matches = useMediaQuery(MIN_WIDTH);
  const theme = useTheme();
  return (
    <DrawerHeader>
      <ImgLogo src={logo} />
      {matches && (
        <Typography
          sx={{
            width:'100%',
            paddingLeft: '15px'
          }}
          fontWeight="bold"
          color={theme.palette.text.primary}
          variant="h3"
          noWrap>
          Dhedge
        </Typography>
      )}
      <Box
        sx={{
          position: "absolute",
          zIndex: 1202,
          right: -15
        }}
      >
        {matches && (
          <Typography component="div">
            <IconButton sx={IconButtonStyled(theme)} onClick={handleDrawer}>
              {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Typography>
        )}
      </Box>
    </DrawerHeader>
  );
};

export default MyDrawerHeader;
