import React, {FC, Fragment} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {pairDetailsAPI} from "@RTK/PairDetails/pair-details.service";
import UiSkeleton from "@UI/Skeleton/Skeleton";
import MuiAccordion, {AccordionProps} from "@mui/material/Accordion";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import {MIN_WIDTH} from "../../shared/configMedia/config";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {styled} from "@mui/material/styles";
import {AccordionDetails, AccordionSummary, Chip, Link} from "@mui/material";
import {PairMeta} from "./PairMeta";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {SwapPairStatus} from "../../redux/interface/Setup/IPair";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface PairDetailsProps {
}

const styleBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "5px"
};
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&:before": {
    display: "none"
  }
}));
const PairDetails: FC<PairDetailsProps> = ({}) => {
  const [expanded, setExpanded] = React.useState<string | false>("");
  const media = useMediaQuery(MIN_WIDTH);
  const theme = useTheme();
  const {
    data = [],
    error,
    isError,
    status,
    isLoading: isLoadingOne,
    refetch
  } = pairDetailsAPI.useFetchAllPairQuery({
    id: 1
  });
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const checkColor = (operator: string): string => {
    switch (operator) {
      case "sell":
        return theme.palette.success.dark;
      case "buy":
        return theme.palette.error.dark;
      default: {
        return theme.palette.info.dark;
      }
    }
  };
  const renderData = () => {
    if (data) {
      return data?.map((it, idx) => {
        return (
          <Fragment key={idx}>
            <Accordion
              sx={{
                overflowX: "hidden",
                width: '100%'
              }}
              variant={"elevation"}
              TransitionProps={{unmountOnExit: true}}
              expanded={expanded === it.id.toString()}
              onChange={handleChange(it.id.toString())}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  padding: "0 20px 0 0",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover
                  },
                  ".MuiAccordionSummary-content": {
                    margin: "0px"
                  }
                }}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                  <Typography
                    sx={{
                      width: "20%",
                      textAlign: "center"
                    }}
                    fontWeight={"bold"}>
                    {it.id}
                  </Typography>
                  <Box sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Typography
                      sx={{
                        marginRight: "15px"
                      }}
                      color={theme.palette.error.dark}
                      fontWeight={"bold"}
                      variant={"h6"}>
                      {it.tokenIn.symbol.toUpperCase()}
                    </Typography>
                    <ArrowForwardIcon fontSize={"inherit"} fontWeight={"bold"}/>
                    <Typography
                      sx={{
                        marginLeft: "15px"
                      }}
                      color={theme.palette.success.dark}
                      fontWeight={"bold"}
                      variant={"h6"}>
                      {it.tokenOut.symbol.toUpperCase()}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      width: "100%",
                      textAlign: "center"
                    }}
                    color={checkColor(it.operation)}
                    fontWeight={"bold"}
                    variant={"h5"}>
                    {it.operation.toUpperCase()}
                  </Typography>

                  <Typography
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      // marginRight: media ? "40px" : "0px",
                      padding: "5px"
                    }}
                    variant={"caption"}
                    fontWeight={"bold"}
                    fontSize={"12px"}>
                    {it.amountIn}
                  </Typography>
                  <Typography
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      padding: "5px"
                    }}
                    variant={"caption"}
                    fontWeight={"bold"}
                    fontSize={"12px"}>
                    {it.amountOut}
                  </Typography>
                  <Typography
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      padding: "5px"
                    }}
                    variant={"caption"}
                    fontWeight={"bold"}
                    fontSize={"12px"}>
                    {it.rate}
                  </Typography>
                  <Typography
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      padding: "5px"
                    }}
                    variant={"caption"}
                    fontWeight={"bold"}
                    fontSize={"12px"}>
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
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  width: '100%',
                  backgroundColor: theme.palette.action.hover,
                  borderTop: `1px solid ${theme.palette.divider}`,
                  "&:not(:last-child)": {
                    borderBottom: 0
                  },
                  "&:before": {
                    display: "none"
                  }
                }}>
                <Typography fontSize={20} fontWeight={"bold"}>
                  Transaction
                </Typography>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap"
                }}>
                  {it?.swapTxs?.map((itTx, idx) => (
                    <Fragment key={idx}>
                      <Box sx={{
                        border: "1px dashed #00AB55",
                        marginBottom: "10px",
                        borderRadius: "20px",
                        marginRight: "10px",
                        backgroundColor: theme.palette.action.focus,
                        padding: "15px",
                        minWidth: "570px"
                      }}>
                        <Box sx={styleBox}>
                          <Typography fontWeight={"bold"} fontSize={15}>
                            Hash
                          </Typography>
                          <Link target={"_blank"}
                                color={theme.palette.success.main}
                                href={`https://polygonscan.com/tx/${itTx.hash}`}>
                            {itTx.hash}
                          </Link>
                        </Box>
                        <Box sx={styleBox}>
                          <Typography fontWeight={"bold"} fontSize={15}>
                            Block
                          </Typography>
                          <Link target={"_blank"}
                                color={theme.palette.success.main}
                                href={`https://polygonscan.com/block/${itTx.blockNumber}`}>
                            {itTx.blockNumber}
                          </Link>
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
                              (itTx.status === SwapPairStatus.START && "Fail") ||
                              (itTx.status === SwapPairStatus.STOP && "Success") ||
                              (itTx.status === SwapPairStatus.FINISH && "Finish") ||
                              undefined
                            }
                            color={
                              (itTx.status === SwapPairStatus.START && "error") ||
                              (itTx.status === SwapPairStatus.STOP && "success") ||
                              (itTx.status === SwapPairStatus.FINISH && "info") ||
                              undefined
                            }
                            size="small"
                            icon={
                              (itTx.status === SwapPairStatus.START && (
                                <ErrorOutlineIcon/>
                              )) ||
                              (itTx.status === SwapPairStatus.STOP && (
                                <CheckCircleOutlineIcon/>
                              )) ||
                              (itTx.status === SwapPairStatus.FINISH && (
                                <CheckCircleOutlineIcon/>
                              )) ||
                              undefined
                            }
                          />
                        </Box>
                       {/* <Box sx={styleBox}>
                          <Typography fontWeight={"bold"} fontSize={15}>
                            Address In
                          </Typography>
                          <Link target={"_blank"}
                                color={theme.palette.success.main}
                                href={`https://polygonscan.com/address/${itTx.tokenIn?.address}`}>
                            {itTx.tokenIn?.address}
                          </Link>
                        </Box>
                        <Box sx={styleBox}>
                          <Typography fontWeight={"bold"} fontSize={15}>
                            Address Out
                          </Typography>
                          <Link target={"_blank"}
                                color={theme.palette.success.main}
                                href={`https://polygonscan.com/address/${itTx.tokenOut?.address}`}>
                            {itTx.tokenOut?.address}
                          </Link>
                        </Box>*/}
                        <Box sx={styleBox}>
                          <Typography fontWeight={"bold"} fontSize={15}>
                            Rate
                          </Typography>
                          <Typography color={theme.palette.info.main} fontWeight={"bold"}
                                      fontSize={15}>
                            {itTx.rate}
                          </Typography>
                        </Box><Box sx={styleBox}>
                        <Typography fontWeight={"bold"} fontSize={15}>
                          Amount In
                        </Typography>
                        <Typography color={theme.palette.info.main} fontWeight={"bold"}
                                    fontSize={15}>
                          {itTx.amountIn}
                        </Typography>
                      </Box>
                        <Box sx={styleBox}>
                          <Typography fontWeight={"bold"} fontSize={15}>
                            Amount Out
                          </Typography>
                          <Typography color={theme.palette.info.main} fontWeight={"bold"}
                                      fontSize={15}>
                            {itTx.amountOut}
                          </Typography>
                        </Box>
                        <Box sx={styleBox}>
                          <Typography fontWeight={"bold"} fontSize={15}>
                            Confirmations
                          </Typography>
                          <Typography fontWeight={"bold"}
                                      fontSize={15}>
                            {itTx.confirmations}
                          </Typography>
                        </Box>
                        <Box sx={styleBox}>
                          <Typography fontWeight={"bold"} fontSize={15}>
                            Nonce
                          </Typography>
                          <Typography fontWeight={"bold"}
                                      fontSize={15}>
                            {itTx.nonce}
                          </Typography>
                        </Box>
                        <Box sx={styleBox}>
                          <Typography fontWeight={"bold"} fontSize={15}>
                            Gas limit
                          </Typography>
                          <Typography fontWeight={"bold"}
                                      fontSize={15}>
                            {itTx.gasLimit}
                          </Typography>
                        </Box>
                        <Box sx={styleBox}>
                          <Typography fontWeight={"bold"} fontSize={15}>
                            Gas price
                          </Typography>
                          <Typography fontWeight={"bold"}
                                      fontSize={15}>
                            {itTx.gasPrice}
                          </Typography>
                        </Box>
                        <Box sx={styleBox}>
                          <Typography fontWeight={"bold"} fontSize={15}>
                            Chain Id
                          </Typography>
                          <Typography fontWeight={"bold"}
                                      fontSize={15}>
                            {itTx.chainId}
                          </Typography>
                        </Box>
                      </Box>
                    </Fragment>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Fragment>
        );
      });
    }
  };

  const renderHead = () => {
    return (
      <Accordion sx={{
        overflowX: 'hidden',
        position: "field",
        top: 0
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{
            opacity: 0
          }}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            overflow: "hidden",
            backgroundColor: theme.palette.action.focus,
            padding: "0 20px 0 0",
            width: '100%'
          }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            {PairMeta.map((it, idx) => {
              if (it.name === "Id") {
                return (
                  <Typography
                    key={idx}
                    sx={{
                      width: "25%",
                      textAlign: "center"
                    }}
                    fontWeight={"bold"}>
                    {it.name}
                  </Typography>
                );
              } else {
                return (<Typography
                    key={idx}
                    sx={{
                      width: "100%",
                      textAlign: "center"
                    }}
                    fontWeight={"bold"}
                    variant={"h5"}>
                    {it.name}
                  </Typography>
                );
              }
            })}
          </Box>
        </AccordionSummary>
      </Accordion>
    )
      ;
  };

  return (
    <Box
      sx={{
        margin: "10px 0px"
      }}>
      <Box
        sx={{
          marginBottom: "12px"
        }}>
        <Typography fontWeight={"bold"} component={"h4"} fontSize={20}>
          Pair Details
        </Typography>
      </Box>

      {isLoadingOne && <UiSkeleton/>}
      {renderHead()}
      <Box sx={{
        position: "relative",
        borderBottom: `1px solid ${theme.palette.action.disabledBackground}`,
        height: "80vh"
      }}>
        {!isLoadingOne && renderData()}
      </Box>
    </Box>
  );
};

export default PairDetails;
