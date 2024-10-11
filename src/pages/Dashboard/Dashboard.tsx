import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { tradingAPI } from "@RTK/Trading/trading.service";
import useTheme from "@mui/material/styles/useTheme";
import UiSkeleton from "@UI/Skeleton/Skeleton";
import useLocalStorage from "usehooks-ts/dist/esm/useLocalStorage/useLocalStorage";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MIN_WIDTH } from "../../shared/configMedia/config";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch/Switch";
import React, { useEffect, useRef, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Link } from "@mui/material";
import TableUi from "./UI/TableUi/TableUI";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useHandlerMessage } from "../../hooks/useHandlerMessage";
import { useSSE } from "react-hooks-sse";
import { useErrorHandler } from "../../hooks/useErrorHandler";
// import MyDialog from "@UI/MyDialog/MyDialog";
import { ISignalCandidate } from "../../redux/interface/Setup/IVolumes";
import CommentsSseV1 from "@UI/CommentsSSE/CommentsSSEV1";
import TransitionAlerts from "@UI/TransitionAlerts/TransitionAlerts";
import { AccordionInnerStyle, BoxInner } from "./styled";
import MarketForm from "@UI/TradingForm/MarketForm";
import { MarketMetaForm } from "@UI/TradingForm/meta/MarketMetaForm";
import ModalContainer from "@UI/ModalContainer/ModalContainer";
import TabContainer from "@UI/TabContainer/TabContainer";
import { ISignal } from "../../redux/interface/Trading/ITrading";
import { IToken } from "../../redux/interface/Setup/IToken";
import WebSocketProvider from "../../shared/utils/websocket/WebSocketProvider";

const Dashboard = () => {
  const theme = useTheme();
  const media = useMediaQuery(MIN_WIDTH);
  const [expanded, setExpanded] = useState<string | boolean>("0");
  const refLink = useRef(null);
  // const [openWinBox, setOpenWinBox] = useState<boolean>(false);
  const refWinBox = useRef<HTMLDivElement>(null);
  const [event, setEvent] = useState<ISignalCandidate>({
    poolId: 0,
    limitCategoryId: 0,
    marketCategoryId: 0,
    key: ""
  });
  const state = useSSE("message", {
    id: 0,
    type: ""
  });
  const [open, setOpen] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isAlerts, setIsAlerts] = useState<number | null>(null);
  const [selectId, setSelectId] = useLocalStorage<number>("selectValueId", 1);
  const {
    data: tradingDetails,
    isLoading: isLoadingOne,
    refetch
  } = tradingAPI.useTradingFetchAllQuery(
    { id: selectId },
    { pollingInterval: open !== null ? undefined : 15000 }
  );
  const [
    updatePool,
    {
      data: updatePoolRes,
      error: updateErrorPool,
      isLoading: isLoadingPollUpdate
    }
  ] = tradingAPI.useUpdatePoolMutation();
  const [swapPool, { data: resSwapPool, error: errorDataMessage, isLoading }] =
    tradingAPI.useSwapPoolMutation();


  useEffect(() => {
    refetch();
  }, []);


  useHandlerMessage(updatePoolRes);
  useErrorHandler(errorDataMessage);
  const categoryHandler = (category: { name: string }): string => {
    switch (category.name) {
      case "Stable":
        return theme.palette.info.main;
      case "Short":
        return theme.palette.error.main;
      case "Long":
        return theme.palette.success.main;
      case "Spot":
        return theme.palette.success.dark;
      default:
        return "";
    }
  };
  const handleOpen = (open: any) => {
    setOpen(open);
    refetch();
  };
  const handleChange = async (pool: any) => {
    const res = !pool.automatic;
    await updatePool({ ...pool, automatic: res });
  };

  const handleDialogModal = (res: ISignal) => {
    handleClose();
    setIsAlerts(res.poolId);
    setEvent({
      poolId: res.poolId,
      marketCategoryId: res.marketCategoryId,
      limitCategoryId: res.limitCategoryId,
      key: res.key
    });
  };

  const handleOpenDialogToken = (it: IToken) => {

  };


  const handleDialogAction = async (type: boolean, percent: number) => {
    if (type) {
      await swapPool({ key: event.key, poolId: event.poolId, percent: percent });
      setOpen(event.poolId);
      setIsAlerts(null);
    } else {
      setIsAlerts(null);
    }
  };

  const handleChangeOpen = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClose = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Box
        sx={{
          marginBottom: "12px"
        }}>
        <Typography fontWeight={"bold"} variant={"h4"}>
          Pool Dashboard
        </Typography>
      </Box>
      {isLoadingOne && <UiSkeleton width={"100%"}  height={"auto"}/>}
      {!isLoadingOne && (
        <>
          {tradingDetails?.approved ? tradingDetails?.data.pools.map((itTrading, index) => (
            <React.Fragment key={index}>
              <Accordion
                sx={AccordionInnerStyle}
                // expanded={expanded === index.toString()}
                ref={refLink}
                defaultExpanded={true}
                onChange={handleChangeOpen(index.toString())}
              >
                {isLoading && (
                  <BoxInner>
                    <CircularProgress size={"50px"} color="success" />
                  </BoxInner>
                )}
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}>
                    <Typography
                      sx={{
                        marginBottom: "5px"
                      }}
                      color={
                        theme.palette.mode === "dark"
                          ? "rgba(241,239,239,0.71)"
                          : "rgba(0,0,0,0.9)"
                      }
                      fontWeight={"bold"}
                      variant={"h4"}>
                      {itTrading.pool.name}
                    </Typography>
                    <Box sx={{
                      // width: '747px',
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}>
                      <Typography
                        sx={{
                          borderRadius: "2px",
                          marginRight: media ? "30px" : "0px",
                          padding: "8px",
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(69,71,73,0.15)"
                              : "#efefef"
                        }}
                        color={theme.palette.success.main}
                        variant={"caption"}
                        fontWeight={"bold"}
                        fontSize={"16px"}>
                        <Link
                          target={"_blank"}
                          color={theme.palette.success.main}
                          href={`https://app.dhedge.org/vault/${itTrading.pool.address}`}>
                          Pool address: {itTrading.pool.address}
                        </Link>
                      </Typography>
                      <Typography
                        sx={{
                          borderRadius: "4px",
                          marginRight: media ? "30px" : "0px",
                          padding: "8px",
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(69,71,73,0.15)"
                              : "#efefef"
                        }}
                        color={theme.palette.success.main}
                        variant={"caption"}
                        fontWeight={"bold"}
                        fontSize={"16px"}>
                        <Link
                          target={"_blank"}
                          color={theme.palette.success.main}
                          href={`https://app.dhedge.org/vault/${itTrading.pool.address}`}>
                          Balance: {itTrading.balance}
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                    justifyContent: "flex-start"
                  }}>
                  <FormControlLabel
                    color="warning"
                    control={
                      <Switch
                        checked={itTrading.pool.automatic}
                        onChange={() => handleChange(itTrading.pool)}
                        name={"automatic"}
                        color="info"
                      />
                    }
                    label="Automatic"
                  />
                  <TableUi
                    handleOpenDialogToken={handleOpenDialogToken}
                    handlerDialogModal={handleDialogModal}
                    tokens={itTrading.tokens}
                    poolBalance={itTrading.balance}
                    signals={itTrading.signals}
                    pool={itTrading.pool}
                    itTrading={itTrading}
                  />
                </AccordionDetails>
                {isAlerts === itTrading.pool.id && (
                  <ModalContainer isVisible={false} open={openModal} handleClose={handleClose}>
                    <TabContainer>
                      <WebSocketProvider>
                        <MarketForm
                          onOpen={setOpenModal}
                          formMeta={MarketMetaForm}
                        />
                      </WebSocketProvider>
                    </TabContainer>
                  </ModalContainer>
                )}
                {open === itTrading.pool.id
                  // && (state.type === ActionSse.CLOSE_PAIR || state.type === ActionSse.UPRATE_PAIR || state.type === ActionSse.OPEN_PAIR)
                  && (
                    <>
                      <Box
                        component={"div"}
                        sx={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: 0,
                          top: 0,
                          borderRadius: "10px",
                          overflow: "hidden",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "rgba(0,0,0,0.49)"
                        }}>
                      </Box>
                      {
                        // @ts-ignore
                        <CommentsSseV1 handleOpen={handleOpen} elementRoot={refLink.current} />
                      }
                    </>
                  )}
              </Accordion>
            </React.Fragment>
          )) : <TransitionAlerts severity={"warning"} isOpen={true} content={tradingDetails?.message + " "} />}
        </>
      )}
    </>
  );
};
export default Dashboard;
