import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import DataNotFound from "./DataNotFound/DataNotFound";
import NetworkActiveWidgetActive from "./NetworkActiveWidgetActive/NetworkActiveWidgetActive";
import { INetwork } from "../../../../redux/interface/Setup/INetwork";
import { networkAPI } from "@RTK/Setup/network.service";
import { MIN_WIDTH } from "../../../../shared/configMedia/config";
import useMediaQuery from "@mui/material/useMediaQuery";

const NetworkActiveWidgetContains: FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(MIN_WIDTH);
  const [network, setNetworks] = useState<INetwork[] | any>([]);
  const { data: networkAction, isLoading } =
    networkAPI.useFetchAllNetworksQuery();
  useEffect(() => {
    if (networkAction) {
      setNetworks(networkAction.data);
    }
  }, [networkAction]);

  return (
    <>
      {!isLoading ? (
        <Box
          sx={{
            width: `${!matches && "280px"}`,
            overflow: "hidden",
            boxSizing: "border-box",
            borderRadius: "15px",
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: "10px",
            backgroundColor: `${theme.palette.background.paper}`,
            boxShadow:
              "rgb(0 0 0 / 20%) 0px 0px 2px 0px, rgb(0 0 0 / 12%) 0px 12px 24px -4px",
            padding: "10px",
            border: "1px dashed #00AB55"
          }}>
          <Box
            sx={{
              minWidth: "280px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              "&:last-child": {
                borderRight: "none"
              },
              "@keyframes text": {
                "0%": {
                  transform: "translate(130%, 0)"
                },
                "100%": {
                  transform: "translate(-340%, 0)"
                }
              }
            }}>
            {network?.map((i: INetwork) => (
              <NetworkActiveWidgetActive key={i.id} network={i} />
            ))}
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default NetworkActiveWidgetContains;
