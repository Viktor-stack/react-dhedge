import React, { FC } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { INetwork } from "../../../../../redux/interface/Setup/INetwork";
import { MIN_WIDTH } from "../../../../../shared/configMedia/config";

type NetworkActiveWidgetActiveProps = {
  network: INetwork;
};
const NetworkActiveWidgetActive: FC<NetworkActiveWidgetActiveProps> = ({
  network
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(MIN_WIDTH);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "7px",
        borderRight: "1px dashed #00AB55",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:last-child": {
          borderRight: "none"
        }
      }}>
      <Box>
        <Typography
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",

            textOverflow: "ellipsis",
            color: `${theme.palette.text.secondary}`
          }}
          fontSize={"15px"}
          fontWeight={"bold"}
          variant={"h6"}>
          {network.name}
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            width: "100px",
            marginLeft: "30px",
            height: "25px",
            boxShadow:
              "rgb(0 0 0 / 20%) 0px 0px 2px 0px, rgb(0 0 0 / 12%) 0px 12px 24px -4px",
            borderRadius: "15px",
            padding: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: `rgba(0, 171, 85, 0.22)`
          }}>
          <Typography
            fontWeight={"bold"}
            fontSize={"15px"}
            sx={{
              color: `${
                theme.palette.mode === "dark"
                  ? `rgb(134, 232, 171)`
                  : `rgb(27, 128, 106)`
              } `
            }}>
            Active
          </Typography>
        </Box>
        {/*{network.enabled ? (*/}
        {/*  <Box*/}
        {/*    sx={{*/}
        {/*      width: "100px",*/}
        {/*      marginLeft: "30px",*/}
        {/*      height: "25px",*/}
        {/*      boxShadow:*/}
        {/*        "rgb(0 0 0 / 20%) 0px 0px 2px 0px, rgb(0 0 0 / 12%) 0px 12px 24px -4px",*/}
        {/*      borderRadius: "15px",*/}
        {/*      padding: "5px",*/}
        {/*      display: "flex",*/}
        {/*      justifyContent: "center",*/}
        {/*      alignItems: "center",*/}
        {/*      background: `rgba(0, 171, 85, 0.22)`*/}
        {/*    }}>*/}
        {/*    <Typography*/}
        {/*      fontWeight={"bold"}*/}
        {/*      fontSize={"15px"}*/}
        {/*      sx={{*/}
        {/*        color: `${*/}
        {/*          theme.palette.mode === "dark"*/}
        {/*            ? `rgb(134, 232, 171)`*/}
        {/*            : `rgb(27, 128, 106)`*/}
        {/*        } `*/}
        {/*      }}>*/}
        {/*      Active*/}
        {/*    </Typography>*/}
        {/*  </Box>*/}
        {/*) : (*/}
        {/*  <Box*/}
        {/*    sx={{*/}
        {/*      width: "100px",*/}
        {/*      height: "25px",*/}
        {/*      boxShadow:*/}
        {/*        "rgb(0 0 0 / 20%) 0px 0px 2px 0px, rgb(0 0 0 / 12%) 0px 12px 24px -4px",*/}
        {/*      borderRadius: "15px",*/}
        {/*      padding: "5px",*/}
        {/*      display: "flex",*/}
        {/*      justifyContent: "center",*/}
        {/*      alignItems: "center",*/}
        {/*      background: `rgba(171, 0, 0, 0.22)`,*/}
        {/*      marginLeft: "30px"*/}
        {/*    }}>*/}
        {/*    <Typography*/}
        {/*      fontWeight={"bold"}*/}
        {/*      fontSize={"15px"}*/}
        {/*      sx={{*/}
        {/*        color: `${*/}
        {/*          theme.palette.mode === "dark"*/}
        {/*            ? `rgb(232, 134, 134)`*/}
        {/*            : `rgb(128, 27, 27)`*/}
        {/*        } `*/}
        {/*      }}>*/}
        {/*      Inactive*/}
        {/*    </Typography>*/}
        {/*  </Box>*/}
        {/*)}*/}
      </Box>
    </Box>
  );
};

export default NetworkActiveWidgetActive;
