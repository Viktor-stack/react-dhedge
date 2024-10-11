import Box from "@mui/material/Box";
import React, { FC, useEffect, useRef, useState } from "react";
import { useSSE } from "react-hooks-sse";
import { useTheme } from "@mui/material/styles";
import { tradingAPI } from "@RTK/Trading/trading.service";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import { Chip, Link } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { IPair, SwapPairStatus } from "../../../redux/interface/Setup/IPair";
import Paper from "@mui/material/Paper";

interface EventType {
  type: string;
  pairId?: number;
  id: number;
}

interface CommentsSseProps {
  handleOpen: (open: any) => void;
}

const styleBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

const CommentsSse: FC<CommentsSseProps> = ({ handleOpen }) => {
  const theme = useTheme();
  const state = useSSE<EventType>("message", {
    type: "",
    id: 0,
    pairId: 0
  });
  const refScroll = useRef<HTMLUListElement>(null);
  const [pair, setPair] = useState<IPair[]>([]);
  const [tx, setTx] = useState<any[]>([]);

  const [useGetPairById, { data: pairRes }] =
    tradingAPI.useGetPairByIdMutation();
  const [useGetTxById, { data: txRes }] = tradingAPI.useGetTxByIdMutation();

  useEffect(() => {
    if (state.type === "pair") {
      useGetPairById({ id: state.id });
    }
  }, [state]);

  useEffect(() => {
    if (state.type === "tx") {
      useGetTxById({ id: state.id });
    }
  }, [state]);

  useEffect(() => {
    if (pairRes) {
      setTx((prevState) => [...prevState, pairRes]);
    }
  }, [pairRes]);

  useEffect(() => {
    if (txRes) {
      setTx((prevState) => [...prevState, txRes]);
    }
  }, [txRes]);

  // const addSwapTxById = (pairId: number | undefined, newSwapTx: any) => {
  //   setPair((prevPair) => {
  //     return prevPair.map((pair) => {
  //       if (pair.id === pairId) {
  //         // Если найден элемент с заданным id, добавляем новый swapTx к нему
  //         return {
  //           ...pair,
  //           swapTxs: [...(pair.swapTxs || []), newSwapTx]
  //         };
  //       }
  //       // Возвращаем оригинальный элемент, если id не совпадает
  //       return pair;
  //     });
  //   });
  // };
  // console.log("Pair[] result", pair);
  // useEffect(() => {
  //   if (txRes) {
  //     setTx((prevState) => [...prevState, txRes]);
  //   }
  // }, [txRes]);

  useEffect(() => {
    if (refScroll.current && tx.length > 0) {
      refScroll.current.lastElementChild?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }
  }, [tx]);

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
    <Paper
      sx={{
        position: "relative",
        width: "1000px",
        height: "90%",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "20px",
        boxSizing: "border-box"
      }}>
      <Box
        ref={refScroll}
        sx={{
          height: "100%",
          padding: "15px",
          overflow: "hidden",
          overflowY: "scroll"
        }}>
        {tx.length >= 0
          ? tx?.map((it: any, idx) => (
              <Box
                key={idx}
                sx={{
                  transform: "translateX(-50%, 100px)",
                  transition: "all 0.5s",
                  padding: "10px 15px",
                  borderRadius: "15px",
                  margin: "10px 0",
                  backgroundColor: theme.palette.action.disabledBackground,
                  width: "100%",
                  "&:last-child": {
                    marginBottom: "40px"
                  }
                }}>
                {it.tokenIn && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center"
                    }}>
                    {it.tokenIn && (
                      <Typography
                        padding={"5px"}
                        fontSize={20}
                        fontWeight={"bold"}
                        display={"block"}
                        color={changeColor(it.tokenIn?.category?.name)}>
                        {it.tokenIn?.symbol}
                      </Typography>
                    )}
                    <ArrowForwardIcon fontSize={"medium"} fontWeight={"bold"} />
                    {it.tokenOut && (
                      <Typography
                        padding={"5px"}
                        fontSize={20}
                        fontWeight={"bold"}
                        display={"block"}
                        color={changeColor(it.tokenOut?.category?.name)}>
                        {it.tokenOut?.symbol}
                      </Typography>
                    )}
                  </Box>
                )}
                {it.operation && (
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      Operation
                    </Typography>
                    <span>{it.operation}</span>
                  </Box>
                )}
                {it.tokenInAmount && (
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      TokenInAmount
                    </Typography>
                    <span>{it.tokenInAmount}</span>
                  </Box>
                )}
                {it.tokenOutAmount && (
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      TokenOutAmount
                    </Typography>
                    <span>{it?.tokenOutAmount}</span>
                  </Box>
                )}
                {it.hash && (
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={20}
                      color={theme.palette.success.main}>
                      Hash
                    </Typography>
                    <Link
                      target={"_blank"}
                      color={theme.palette.success.main}
                      href={`https://polygonscan.com/tx/${it.hash}`}>
                      {it.hash}
                    </Link>
                  </Box>
                )}
                {it.blockNumber && (
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      Block Number
                    </Typography>
                    <span>{it.blockNumber}</span>
                  </Box>
                )}
                {it.status >= 0 && (
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      Status
                    </Typography>
                    <Chip
                      label={
                        (it.status === SwapPairStatus.START && "Fail") ||
                        (it.status === SwapPairStatus.STOP && "Success") ||
                        (it.status === SwapPairStatus.FINISH && "Finish") ||
                        undefined
                      }
                      color={
                        (it.status === SwapPairStatus.START && "error") ||
                        (it.status === SwapPairStatus.STOP && "success") ||
                        (it.status === SwapPairStatus.FINISH && "info") ||
                        undefined
                      }
                      size="small"
                      icon={
                        (it.status === SwapPairStatus.START && (
                          <ErrorOutlineIcon />
                        )) ||
                        (it.status === SwapPairStatus.STOP && (
                          <CheckCircleOutlineIcon />
                        )) ||
                        (it.status === SwapPairStatus.FINISH && (
                          <CheckCircleOutlineIcon />
                        )) ||
                        undefined
                      }
                    />
                  </Box>
                )}
                {it.statusPair >= 0 && (
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      Status
                    </Typography>
                    <Chip
                      label={
                        (it.statusPair === SwapPairStatus.START && "Start") ||
                        (it.statusPair === SwapPairStatus.STOP && "Success") ||
                        (it.statusPair === SwapPairStatus.FINISH && "Finish") ||
                        undefined
                      }
                      color={
                        (it.statusPair === SwapPairStatus.START && "info") ||
                        (it.statusPair === SwapPairStatus.STOP && "warning") ||
                        (it.statusPair === SwapPairStatus.FINISH &&
                          "success") ||
                        undefined
                      }
                      size="small"
                      icon={
                        (it.statusPair === SwapPairStatus.START && (
                          <ErrorOutlineIcon />
                        )) ||
                        (it.statusPair === SwapPairStatus.STOP && (
                          <CancelIcon />
                        )) ||
                        (it.statusPair === SwapPairStatus.FINISH && (
                          <CheckCircleOutlineIcon />
                        )) ||
                        undefined
                      }
                    />
                  </Box>
                )}
                {it.from && (
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      From
                    </Typography>
                    <span>{it.from}</span>
                  </Box>
                )}
                {it.to && (
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      To
                    </Typography>{" "}
                    <span>{it.to}</span>
                  </Box>
                )}
                {it.gasLimit && (
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      Gas Limit
                    </Typography>
                    <span>{it.gasLimit}</span>
                  </Box>
                )}
                {it.nonce && (
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      Nonce
                    </Typography>
                    <span>{it.nonce}</span>
                  </Box>
                )}
                {it.confirmations && (
                  <Box sx={styleBox}>
                    <Typography
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      display={"block"}>
                      Confirmations
                    </Typography>
                    <span>{it.confirmations}</span>
                  </Box>
                )}
              </Box>
            ))
          : null}
      </Box>
      {state.type === "close" && (
        <Box
          sx={{
            position: "absolute",
            width: "950px",
            left: "23px",
            bottom: "15px"
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
  );
};

export default CommentsSse;
