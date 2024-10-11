import { ColorModeContext, useMode } from "@theme";
import { MIN_WIDTH } from "../configMedia/config";
import MyAppBar from "../../components/AppBar";
import { DrawerHeader, MyDrawer } from "../../components/AppBar/style";
import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";
import MyDrawerHeader from "../../components/MyDrawerHeader";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import useLocalStorage from "usehooks-ts/dist/esm/useLocalStorage/useLocalStorage";

const MainLayout = () => {
  const matches = useMediaQuery(MIN_WIDTH);
  const [theme, colorMode] = useMode();
  const [open, setOpen] = useLocalStorage<boolean>("isOpen", true);

  const handleDrawer = () => {
    setOpen((prevState: boolean) => !prevState);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <MyAppBar
            setOpen={setOpen}
            handleDrawer={handleDrawer}
            open={open}
            colorMode={colorMode}
          />
          {matches && (
            <MyDrawer hideBackdrop={false} variant="permanent" open={open}>
              <MyDrawerHeader
                setOpen={setOpen}
                handleDrawer={handleDrawer}
                open={open}
              />
              <NavBar
                setOpen={setOpen}
                handleDrawer={handleDrawer}
                open={open}
              />
            </MyDrawer>
          )}
          <Container
            sx={
              !matches
                ? {
                    paddingLeft: "0px",
                    paddingRight: "0px"
                  }
                : { maxWidth: "1600px !important" }
            }>
            <Box
              component="main"
              sx={matches ? { flexGrow: 1 } : { ml: 2, mr: 2, mb: 2 }}>
              <DrawerHeader />
              <Outlet />
            </Box>
          </Container>
          {!matches && (
            <Drawer
              sx={{
                width: "280px",
                "& .MuiDrawer-paper": {
                  width: "280px",
                  backgroundColor: `${theme.palette.background.default}`
                }
              }}
              anchor={"left"}
              open={open}
              onClose={handleDrawer}>
              <MyDrawerHeader
                setOpen={setOpen}
                handleDrawer={handleDrawer}
                open={open}
              />
              <NavBar
                setOpen={setOpen}
                handleDrawer={handleDrawer}
                open={open}
              />
            </Drawer>
          )}
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default MainLayout;
