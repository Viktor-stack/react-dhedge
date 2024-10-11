import Box from "@mui/material/Box";
import React, {ElementRef, FC, ReactElement, SyntheticEvent, useCallback, useEffect, useRef, useState} from "react";
import {useSSE} from "react-hooks-sse";
import {useTheme} from "@mui/material/styles";
import {tradingAPI} from "@RTK/Trading/trading.service";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import {Chip, Divider, Link} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import {IPair, SwapPairStatus} from "../../../redux/interface/Setup/IPair";
import Paper from "@mui/material/Paper";
import "winbox-js-v3/dist/css/themes/modern.min.css"; // optional
import "winbox-js-v3/dist/css/themes/white.min.css"; // optional
import "winbox-js-v3/dist/css/winbox.min.css";
import {ActionSse} from "../../../redux/interface/Sse/ActionSse";
import WinBox from "react-winbox-v2";
// import {WinBoxPropType} from "react-winbox-v2";

interface EventType {
  type: string;
  pairId?: number;
  id: number;
}

interface CommentsSseProps {
  handleOpen: (open: any) => void;
  elementRoot: ElementRef<"div">;
}

const styleBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

interface ScrollEvent extends SyntheticEvent {
  target: Element;
}

const CommentsSseV1: FC<CommentsSseProps> = ({handleOpen, elementRoot}) => {
  const theme = useTheme();
  const state = useSSE<EventType>("message", {
    type: "",
    id: 0
  });
  const refScroll = useRef<HTMLUListElement>(null);
  const [pair, setPair] = useState<IPair[]>([]);
  // const [tx, setTx] = useState<any[]>([]);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [useGetPairById, {data: pairRes}] =
    tradingAPI.useGetPairByIdMutation();
  const [useGetTxById, {data: txRes}] = tradingAPI.useGetTxByIdMutation();
  const winBoxRef = useRef<WinBox>(null);
  useEffect(() => {
    if (state.type === ActionSse.OPEN_PAIR) {
      useGetPairById({id: state.id});
    }
    if (state.type === ActionSse.UPRATE_PAIR) {
      useGetPairById({id: state.id});
    }
    if (state.type === ActionSse.CLOSE_PAIR) {
      useGetPairById({id: state.id});
      // winBoxRef?.current?.minimize();
    }
  }, [state]);
  useEffect(() => {
    if (pairRes) {
      updateOrAddPair(pairRes);
    }
  }, [pairRes]);

  const updateOrAddPair = (updatedPair: IPair) => {
    setPair((prevPair) => {
      // Проверяем, существует ли элемент с заданным id
      const existingPair = prevPair.find((item) => item.id === updatedPair.id);

      if (existingPair) {
        // Если элемент существует, обновляем его
        return prevPair.map((item) => {
          if (item.id === updatedPair.id) {
            return updatedPair;
          }
          return item;
        });
      } else {
        // Если элемент не найден, добавляем его
        return [...prevPair, updatedPair];
      }
    });
  };
  // useEffect(() => {
  //   if (pairRes) {
  //     setPair((prevPair) => {
  //       return prevPair.map((pair) => {
  //         if (pair.id === state.id) {
  //           return {
  //             ...pair
  //           };
  //         } else {
  //         return [...prevPair, pairRes];
  //         }
  //         return pair
  //       });
  //     });
  //   }
  // }, [pairRes]);

  useEffect(() => {
    autoScrollHandler();
  }, [pair]);
  const autoScrollHandler = () => {
    if (refScroll.current && pair.length > 0) {
      refScroll.current.lastElementChild?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  };

  const changeColor = (categoryName: string | undefined): string => {
    switch (categoryName) {
      case "Stable":
        return theme.palette.info.main;
      case "Spot":
        return theme.palette.success.dark;
      case "Long":
        return theme.palette.success.light;
      case "Short":
        return theme.palette.error.light;
      default: {
        return "";
      }
    }
  };

  return (
    <WinBox
      ref={winBoxRef}
      noClose={true}
      noMax={true}
      noFull={true}
      background={theme.palette.success.dark}
      title={"Pair"}
      x={"center"}
      y={"center"}
      index={5000}
      height={"400px"}
      width={"1000px"}
      root={elementRoot}
    >
      <Paper
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: 0,
          backgroundColor: theme.palette.background.paper
        }}>
        <Box
          ref={refScroll}
          sx={{
            height: "100%",
            padding: "15px",
            overflow: "hidden",
            overflowY: "scroll"
          }}>
          {pair.length
            ? pair.map((it, idx) => (
              <Box
                key={idx}
                sx={{
                  transform: "translateX(-50%, 100px)",
                  transition: "all 0.5s",
                  padding: "10px 0px",
                  borderRadius: "15px",
                  margin: "10px 0",
                  backgroundColor: theme.palette.action.disabledBackground,
                  width: "100%",
                  "&:last-child": {
                    marginBottom: "40px"
                  }
                }}>
                <Box
                  sx={{
                    padding: "0px 15px"
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center"
                    }}>
                    <Typography
                      padding={"5px"}
                      fontSize={20}
                      fontWeight={"bold"}
                      display={"block"}
                      color={changeColor(it.tokenIn?.category?.name)}>
                      {it.tokenIn.symbol}
                    </Typography>
                    <ArrowForwardIcon fontSize={"medium"} fontWeight={"bold"}/>
                    <Typography
                      padding={"5px"}
                      fontSize={20}
                      fontWeight={"bold"}
                      display={"block"}
                      color={changeColor(it.tokenOut?.category?.name)}>
                      {it.tokenOut.symbol}
                    </Typography>
                  </Box>
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      Operation
                    </Typography>
                    <span style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      color: it.operation === "sell" ? "red" : "green"
                    }}>{it.operation}</span>
                  </Box>
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      Amount In
                    </Typography>
                    <span>{it.amountIn}</span>
                  </Box>
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      Amount Out
                    </Typography>
                    <span>{it.amountOut}</span>
                  </Box>
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      Status
                    </Typography>
                    <Chip
                      label={
                        (it.status === SwapPairStatus.START && "Start") ||
                        (it.status === SwapPairStatus.STOP && "Success") ||
                        (it.status === SwapPairStatus.FINISH && "Finish") ||
                        undefined
                      }
                      color={
                        (it.status === SwapPairStatus.START && "info") ||
                        (it.status === SwapPairStatus.STOP && "warning") ||
                        (it.status === SwapPairStatus.FINISH &&
                          "success") ||
                        undefined
                      }
                      size="small"
                      icon={
                        (it.status === SwapPairStatus.START && (
                          <ErrorOutlineIcon/>
                        )) ||
                        (it.status === SwapPairStatus.STOP && (
                          <CancelIcon/>
                        )) ||
                        (it.status === SwapPairStatus.FINISH && (
                          <CheckCircleOutlineIcon/>
                        )) ||
                        undefined
                      }
                    />
                  </Box>
                </Box>
                <Divider
                  sx={{
                    marginTop: "10px"
                  }}
                />
                <Box
                  sx={{
                    padding: "0px 15px"
                  }}>
                  <Typography fontWeight={"bold"} fontSize={"20px"}>
                    Transaction
                  </Typography>
                  {it.swapTxs.map((tx, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        transform: "translateX(-50%, 100px)",
                        transition: "all 0.5s",
                        padding: "10px 15px",
                        borderRadius: "15px",
                        margin: "10px 0",
                        backgroundColor:
                        theme.palette.action.disabledBackground,
                        width: "100%"
                      }}>
                      <Box sx={styleBox}>
                        <Typography
                          fontSize={20}
                          color={theme.palette.success.main}>
                          Hash
                        </Typography>
                        <Link
                          target={"_blank"}
                          color={theme.palette.success.main}
                          href={`https://polygonscan.com/tx/${tx.hash}`}>
                          {tx.hash}
                        </Link>
                      </Box>
                      <Box sx={styleBox}>
                        <Typography
                          fontSize={"15px"}
                          fontWeight={"bold"}
                          display={"block"}>
                          Block Number
                        </Typography>
                        <span>{tx.blockNumber}</span>
                      </Box>
                      <Box sx={styleBox}>
                        <Typography
                          fontSize={"15px"}
                          fontWeight={"bold"}
                          display={"block"}>
                          Status
                        </Typography>
                        <Chip
                          label={
                            (tx.status === SwapPairStatus.START && "Fail") ||
                            (tx.status === SwapPairStatus.STOP && "Success") ||
                            (tx.status === SwapPairStatus.FINISH && "Finish") ||
                            undefined
                          }
                          color={
                            (tx.status === SwapPairStatus.START && "error") ||
                            (tx.status === SwapPairStatus.STOP && "success") ||
                            (tx.status === SwapPairStatus.FINISH && "info") ||
                            undefined
                          }
                          size="small"
                          icon={
                            (tx.status === SwapPairStatus.START && (
                              <ErrorOutlineIcon/>
                            )) ||
                            (tx.status === SwapPairStatus.STOP && (
                              <CheckCircleOutlineIcon/>
                            )) ||
                            (tx.status === SwapPairStatus.FINISH && (
                              <CheckCircleOutlineIcon/>
                            )) ||
                            undefined
                          }
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))
            : null}
        </Box>
        {state.type === ActionSse.CLOSE_PAIR && (
          <Box
            sx={{
              position: "absolute",
              padding: "0 5px",
              width: "100%",
              bottom: "5px"
            }}>
            <Button
              variant={"contained"}
              onClick={() => handleOpen(null)}
              fullWidth
              color={"success"}>
              Close
            </Button>
          </Box>
        )}
      </Paper>

    </WinBox>
  );
};

export default CommentsSseV1;
