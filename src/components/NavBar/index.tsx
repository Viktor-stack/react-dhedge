import React, { FC, useEffect, useLayoutEffect, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AppBarTypes } from "../../types/AppBarTypes";
import menuArr from "../../router/router";
import { ExpandMore } from "@mui/icons-material";
import { ListItemLink } from "./ListItemLink";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLocation, useNavigate } from "react-router-dom";
import { MIN_WIDTH } from "../../shared/configMedia/config";
import {
  listItemButtonStyles,
  listItemIconStyles,
  listItemTextStyles,
  listStyled
} from "./style";
import { useHover, useLocalStorage } from "usehooks-ts";
import Typography from "@mui/material/Typography";

const NavBar: FC<AppBarTypes> = ({ handleDrawer, open, setOpen }) => {
  const matches = useMediaQuery(MIN_WIDTH);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [menuString, setMenuString] = useLocalStorage<string>(
    "isOpenCollapse",
    "Dashboard"
  );

  useLayoutEffect(() => {
    if (location.pathname === "/") {
      setMenuString("Dashboard");
    }
    // eslint-disable-next-line
  }, []);
  const handleClick = (nameLink: string) => {
    if (nameLink === "Dashboard") {
      navigate("/");
      if (!matches) {
        handleDrawer();
      }
    }
    if (nameLink === "Discovery") {
      navigate("/discovery");
      if (!matches) {
        handleDrawer();
      }
    }
    if (nameLink === "Trading") {
      navigate("/trading");
      if (!matches) {
        handleDrawer();
      }
    }
    if (nameLink === "Pair details") {
      navigate("/pair-details");
      if (!matches) {
        handleDrawer();
      }
    }
    setMenuString(nameLink);
    if (!open) {
      handleDrawer();
    }
  };

  return (
    <List sx={listStyled()}>
      {menuArr.map((item) => (
        <Box
          key={item.linkName}
          component="div"
          aria-label="mailbox folders"
          sx={{ overflow: "hidden", marginBottom: "5px" }}>
          <ListItemButton
            title={item.linkName}
            key={item.linkName}
            sx={listItemButtonStyles(
              menuString,
              item.linkName,
              theme,
              matches,
              open
            )}
            onClick={() => handleClick(item.linkName)}>
            <ListItemIcon
              sx={listItemIconStyles(menuString, item.linkName, theme, open)}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.linkName}
              sx={listItemTextStyles(menuString, item.linkName, theme, open)}
            />
            {open && item.isIconsVisible && (
              <>
                {menuString === item.linkName ? (
                  <ExpandMore color={"success"} />
                ) : (
                  <ArrowForwardIosIcon fontSize={"inherit"} />
                )}
              </>
            )}
          </ListItemButton>
          <Collapse
            component="div"
            in={!!(menuString === item.linkName && open)}
            timeout="auto"
            unmountOnExit>
            <List disablePadding>
              {item.children?.map((items, index) => (
                <ListItemLink
                  handleDrawer={handleDrawer}
                  key={index}
                  open={open}
                  linkName={items.linkName}
                  href={items.href}
                />
              ))}
            </List>
          </Collapse>
        </Box>
      ))}
    </List>
  );
};

export default NavBar;
