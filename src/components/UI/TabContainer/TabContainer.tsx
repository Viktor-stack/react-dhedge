import Box from "@mui/material/Box";
import React, { FC, ReactNode } from "react";
import { Tab, Tabs } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: { index: number, value: any, children: ReactNode }) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

interface TabContainerProps {
  children?: React.ReactNode;
}

const TabContainer: FC<TabContainerProps> = ({ children }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ background: theme.palette.background.default, width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs sx={{
          ".MuiTabs-indicator": {
            backgroundColor: theme.palette.success.dark
          }
        }} value={value} onChange={handleChange}
              aria-label="basic tabs example">
          <Tab
            sx={{
              width: "50%",
              color: "#cccccc",
              fontWeight: "bold",
              fontSize: "20px",
              "&.Mui-selected": {
                color: theme.palette.success.dark
              }
            }}
            label="Market" {...a11yProps(0)}
          />
          {/*<Tab sx={{*/}
          {/*  width: "50%",*/}
          {/*  color: "#cccccc",*/}
          {/*  fontWeight: "bold",*/}
          {/*  fontSize: "20px",*/}
          {/*  "&.Mui-selected": {*/}
          {/*    color: theme.palette.success.dark*/}
          {/*  }*/}
          {/*}}*/}
          {/*     label="Limit" {...a11yProps(1)}*/}
          {/*/>*/}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/*<h4>Market Form</h4>*/}
        {children}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/*<h4>Limit Form</h4>*/}
        {children}
      </CustomTabPanel>
    </Box>
  );
};

export default TabContainer;