import { FC, useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { strUtils } from "../../../shared/utils";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import {SortModel} from "../../../hooks/sortHooks";

interface GridSotBtnProps {
  headerName: string;
  width: string;
  flex?: number;
  isStringTransform?: boolean;
  // handleSortRes: (value: SortModel) => void

  // isArrLength?: boolean
}

const GridSotBtn: FC<GridSotBtnProps> = ({
  headerName,
  width,
  flex,
  isStringTransform = false
}) => {
  const [sort, setSort] = useState<"asc" | "desc" | undefined>(undefined);
  const [headerNameLabel, setHeaderNameLabel] = useState("");
  useEffect(() => {
    if (isStringTransform) {
      return setHeaderNameLabel(headerName);
    }
    setHeaderNameLabel(strUtils(headerName));
  }, [headerName, sort]);

  // useEffect(() => {
  //     if (isArrLength) {
  //         setSort(undefined)
  //     }
  // }, [isArrLength]);

  // const handleSort = () => {
  //   const newSort =
  //     sort === undefined ? "asc" : "desc" === sort ? undefined : "desc";
  //   setSort(newSort);
  //   // handleSortRes({
  //   //     value: newSort,
  //   //     key: headerName
  //   // })
  // };
  return (
    <Box
      sx={{
        flex: flex,
        width: width,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "5px",
        paddingRight: "5px",
        cursor: "pointer",
        borderRadius: "15px",
        background: `${
          sort === "asc"
            ? `rgb(28 128 0 / 18%)`
            : sort === "desc"
            ? `rgb(128 0 0 / 21%)`
            : null
        }`
      }}>
      <Typography
        fontSize={"15px"}
        sx={{
          userSelect: "none"
        }}>
        {!sort && headerNameLabel}
      </Typography>

      <Typography
        fontSize={"13px"}
        sx={{
          userSelect: "none",
          textAlign: "center"
        }}>
        {sort && headerName !== "id" && sort}
      </Typography>
      <Box>
        {/*<IconButton*/}
        {/*  sx={{*/}
        {/*    width: "30px",*/}
        {/*    height: "30px"*/}
        {/*  }}>*/}
        {/*  {sort === "asc" && <ExpandLessIcon />}*/}
        {/*  {sort === "desc" && <ExpandMoreIcon />}*/}
        {/*  {sort === undefined && <DragHandleIcon fontSize={"small"} />}*/}
        {/*</IconButton>*/}
      </Box>
    </Box>
  );
};

export default GridSotBtn;
