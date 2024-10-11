import React, { FC } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import useTheme from "@mui/material/styles/useTheme";

interface UiSkeletonProps {
  width?: string;
  height?: string;
}

const UiSkeleton: FC<UiSkeletonProps> = ({
                                           width, height
                                         }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width:  width,
        padding: " 10px",
        margin: "10px 0px",
        borderRadius: "10px",
        backgroundColor: theme.palette.background.paper,
        border: `1px dashed #00AB55`,
        height: height,
        transition: "all 300ms",
        overflow: "hidden"
      }}>
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
    </Box>
  );
};

export default UiSkeleton;
